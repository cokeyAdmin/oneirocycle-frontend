/*
MIT License

Copyright (c) 2026 Manjunath Irukulla

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
'use client';

import { useEffect, useRef, type ComponentProps } from 'react';
import { useReducedMotion } from '../ui/liquid-text-utils/liquid-text-core-loop';

/** Number of accent-mix levels for marks near the cursor. */
const LEVELS = 6;
/** Number of resting alpha steps used for ambient shimmer and fades. */
const FADE = 4;
/** Palette size: FADE resting steps followed by LEVELS accent mixes. */
const NB = FADE + LEVELS;
const BASE = FADE; // palette index of a resting mark at full `opacity`
const TAU = Math.PI * 2;
const RIPPLES = 4;
const RIPPLE_SPEED = 620; // px per second
const RIPPLE_LIFE = 1.6; // seconds
const RIPPLE_WIDTH = 34;

interface Live {
  color: string;
  accent: string;
  size: number;
  speed: number;
  sign: number; // 1 repel, -1 attract, 0 none
  radius: number;
  strength: number;
  opacity: number;
  clickRipple: boolean;
  fps: number;
}

interface World {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Animation clock, scaled by `speed`. */
  t: number;
  px: number;
  py: number;
  pvx: number;
  pvy: number;
  presence: number;
  rip: Float32Array;
  rippling: boolean;
  /** Direction output of rippleAt(). */
  rx: number;
  ry: number;
  o: Live;
  pal: string[];
  rng: () => number;
  noise: (x: number, y: number) => number;
  density: number;
  counts: Int32Array;
}

interface Scene {
  step(dt: number): void;
  draw(): void;
}

type SceneFactory = (W: World) => Scene;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded 2D value noise in the 0..1 range. */
function makeNoise(rng: () => number) {
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    vals[i] = rng();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = perm[i]!;
    perm[i] = perm[j]!;
    perm[j] = tmp;
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]!;
  return (x: number, y: number) => {
    const xf0 = Math.floor(x);
    const yf0 = Math.floor(y);
    const xi = xf0 & 255;
    const yi = yf0 & 255;
    const fx = x - xf0;
    const fy = y - yf0;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    const a = vals[perm[perm[xi]! + yi]!]!;
    const b = vals[perm[perm[xi + 1]! + yi]!]!;
    const c = vals[perm[perm[xi]! + yi + 1]!]!;
    const d = vals[perm[perm[xi + 1]! + yi + 1]!]!;
    const top = a + (b - a) * u;
    return top + (c + (d - c) * u - top) * v;
  };
}

/** Smooth 0..1 cursor influence at a point. */
function influence(W: World, x: number, y: number) {
  if (W.presence < 0.002) return 0;
  const R = W.o.radius;
  const dx = x - W.px;
  const dy = y - W.py;
  const d2 = dx * dx + dy * dy;
  if (d2 >= R * R) return 0;
  const k = 1 - Math.sqrt(d2) / R;
  return k * k * (3 - 2 * k) * W.presence;
}

/** Ripple intensity at a point; writes the outward direction to W.rx / W.ry. */
function rippleAt(W: World, x: number, y: number) {
  W.rx = 0;
  W.ry = 0;
  if (!W.rippling) return 0;
  let s = 0;
  for (let i = 0; i < RIPPLES; i++) {
    const age = W.rip[i * 3 + 2]!;
    if (age < 0) continue;
    const dx = x - W.rip[i * 3]!;
    const dy = y - W.rip[i * 3 + 1]!;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const off = dist - age * RIPPLE_SPEED;
    if (off > RIPPLE_WIDTH * 3 || off < -RIPPLE_WIDTH * 3) continue;
    const g =
      Math.exp(-(off * off) / (2 * RIPPLE_WIDTH * RIPPLE_WIDTH)) *
      (1 - age / RIPPLE_LIFE);
    s += g;
    W.rx += (dx / dist) * g;
    W.ry += (dy / dist) * g;
  }
  return s;
}

/** Palette index for an influence value: accent mix when lit, otherwise `rest`. */
function paletteIndex(f: number, rest: number) {
  if (f <= 0.03) return rest;
  return BASE + Math.min(LEVELS - 1, 1 + Math.floor(f * (LEVELS - 1)));
}

function resetCounts(W: World) {
  W.counts.fill(0);
}

// ---------------------------------------------------------------- dots

const dots: SceneFactory = (W) => {
  const sp = Math.max(8, 26 / W.density);
  const cols = Math.ceil(W.w / sp) + 1;
  const rows = Math.ceil(W.h / sp) + 1;
  const n = cols * rows;
  const x0 = (W.w - (cols - 1) * sp) / 2;
  const y0 = (W.h - (rows - 1) * sp) / 2;
  const hx = new Float32Array(n);
  const hy = new Float32Array(n);
  const ox = new Float32Array(n);
  const oy = new Float32Array(n);
  const vx = new Float32Array(n);
  const vy = new Float32Array(n);
  const sc = new Float32Array(n);
  const lv = new Uint8Array(n);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      hx[j * cols + i] = x0 + i * sp;
      hy[j * cols + i] = y0 + j * sp;
    }
  }

  return {
    step(dt) {
      const o = W.o;
      const push = o.strength * o.radius * 0.22 * o.sign;
      const k = 170 * dt;
      const damp = Math.exp(-13 * dt);
      const ease = 1 - Math.exp(-dt * 10);
      const ns = 0.006;
      for (let i = 0; i < n; i++) {
        const x = hx[i]!;
        const y = hy[i]!;
        const f = influence(W, x, y);
        const r = rippleAt(W, x, y);
        let tx = 0;
        let ty = 0;
        if (f > 0) {
          const dx = x - W.px;
          const dy = y - W.py;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          let m = f * push;
          if (m < -d * 0.8) m = -d * 0.8;
          tx = (dx / d) * m;
          ty = (dy / d) * m;
        }
        if (r > 0) {
          tx += W.rx * sp * 0.5 * o.strength;
          ty += W.ry * sp * 0.5 * o.strength;
        }
        vx[i] = (vx[i]! + (tx - ox[i]!) * k) * damp;
        vy[i] = (vy[i]! + (ty - oy[i]!) * k) * damp;
        ox[i] = ox[i]! + vx[i]! * dt;
        oy[i] = oy[i]! + vy[i]! * dt;
        const lit = Math.min(1, (f + r * 0.8) * Math.min(1.4, o.strength));
        sc[i] = sc[i]! + (lit * 1.3 - sc[i]!) * ease;
        const amb = W.noise(x * ns + W.t * 0.12, y * ns - W.t * 0.05);
        lv[i] = paletteIndex(lit, 1 + Math.min(2, Math.floor(amb * 3)));
      }
    },
    draw() {
      const ctx = W.ctx;
      const base = W.o.size;
      resetCounts(W);
      for (const level of lv) W.counts[level] = W.counts[level]! + 1;
      for (let p = 0; p < NB; p++) {
        if (!W.counts[p]) continue;
        ctx.fillStyle = W.pal[p]!;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (lv[i] !== p) continue;
          const r = base * (1 + sc[i]!);
          const x = hx[i]! + ox[i]!;
          const y = hy[i]! + oy[i]!;
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, TAU);
        }
        ctx.fill();
      }
    },
  };
};

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function resolveColor(
  probe: HTMLElement,
  value: string,
  scratch: CanvasRenderingContext2D | null,
): Rgba {
  probe.style.color = '';
  probe.style.color = value;
  if (!probe.style.color) probe.style.color = 'currentColor';
  const computed = getComputedStyle(probe).color;
  if (!scratch) return { r: 128, g: 128, b: 128, a: 1 };
  scratch.clearRect(0, 0, 1, 1);
  scratch.fillStyle = '#808080';
  scratch.fillStyle = computed;
  scratch.fillRect(0, 0, 1, 1);
  const d = scratch.getImageData(0, 0, 1, 1).data;
  return { r: d[0]!, g: d[1]!, b: d[2]!, a: d[3]! / 255 };
}

const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;

function buildPalette(W: World, c: Rgba, a: Rgba) {
  const op = Math.max(0, Math.min(1, W.o.opacity));
  for (let i = 0; i < FADE; i++)
    W.pal[i] = rgba(c.r, c.g, c.b, c.a * op * ((i + 1) / FADE));
  for (let k = 0; k < LEVELS; k++) {
    const t = k / (LEVELS - 1);
    const alpha = (c.a + (a.a - c.a) * t) * (op + (1 - op) * t * 0.9);
    W.pal[BASE + k] = rgba(
      c.r + (a.r - c.r) * t,
      c.g + (a.g - c.g) * t,
      c.b + (a.b - c.b) * t,
      alpha,
    );
  }
}

export function DesktopWorkspaceBackground({
  light,
  children,
  ...mainProps
}: ComponentProps<'main'> & { light: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const probe = probeRef.current;
    const ctx = canvas?.getContext('2d');
    const live: Live = {
      color: light ? '#617698' : '#8094b5',
      accent: light ? '#566fcc' : '#99b9ff',
      size: 1.25,
      speed: 1,
      sign: 1,
      radius: 160,
      strength: 0.84,
      opacity: light ? 0.32 : 0.36,
      clickRipple: true,
      fps: 30,
    };
    if (!root || !canvas || !probe || !ctx) return;

    const scratchCanvas = document.createElement('canvas');
    scratchCanvas.width = scratchCanvas.height = 1;
    const scratch = scratchCanvas.getContext('2d', {
      willReadFrequently: true,
    });
    const rip = new Float32Array(RIPPLES * 3);
    for (let i = 0; i < RIPPLES; i++) rip[i * 3 + 2] = -1;

    const W: World = {
      ctx,
      w: 0,
      h: 0,
      t: 0,
      px: 0,
      py: 0,
      pvx: 0,
      pvy: 0,
      presence: 0,
      rip,
      rippling: false,
      rx: 0,
      ry: 0,
      o: live,
      pal: new Array<string>(NB).fill('transparent'),
      rng: mulberry32(1),
      noise: makeNoise(mulberry32(1 ^ 0x9e3779b9)),
      density: 1,
      counts: new Int32Array(NB),
    };

    let scene: Scene | null = null;
    let raf = 0;
    let last = 0;
    let colorsDirty = true;
    let onScreen = true;
    let tx = 0;
    let ty = 0;
    let inside = false;
    let nextRipple = 0;

    const refreshColors = () => {
      if (!colorsDirty) return;
      colorsDirty = false;
      buildPalette(
        W,
        resolveColor(probe, W.o.color, scratch),
        resolveColor(probe, W.o.accent, scratch),
      );
    };

    const render = () => {
      ctx.clearRect(0, 0, W.w, W.h);
      scene?.draw();
    };

    const advance = (dt: number) => {
      refreshColors();
      const follow = 1 - Math.exp(-dt * 16);
      if (inside && W.presence < 0.02) {
        W.px = tx;
        W.py = ty;
      }
      const lpx = W.px;
      const lpy = W.py;
      W.px += (tx - W.px) * follow;
      W.py += (ty - W.py) * follow;
      const vEase = 1 - Math.exp(-dt * 10);
      W.pvx += ((W.px - lpx) / dt - W.pvx) * vEase;
      W.pvy += ((W.py - lpy) / dt - W.pvy) * vEase;
      W.presence +=
        ((inside ? 1 : 0) - W.presence) *
        (1 - Math.exp(-dt * (inside ? 8 : 4)));
      W.rippling = false;
      for (let i = 0; i < RIPPLES; i++) {
        const ageIndex = i * 3 + 2;
        const age = rip[ageIndex]!;
        if (age < 0) continue;
        rip[ageIndex] = age + dt;
        if (age + dt > RIPPLE_LIFE) rip[ageIndex] = -1;
        else W.rippling = true;
      }
      W.t += dt * W.o.speed;
      scene?.step(dt);
    };

    const shouldRun = () =>
      !reduced && onScreen && !document.hidden && W.w > 0 && W.h > 0;

    const frame = (now: number) => {
      raf = 0;
      if (!shouldRun()) return;
      raf = requestAnimationFrame(frame);
      const minGap = 1000 / W.o.fps;
      if (last && now - last < minGap - 1.5) return;
      const dt = last
        ? Math.min(Math.max((now - last) / 1000, 0.001), 0.05)
        : 1 / 60;
      last = now;
      advance(dt);
      render();
    };

    const start = () => {
      if (raf || !shouldRun()) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    /** Reduced motion: settle and draw a single frame. */
    const renderStatic = () => {
      if (!scene) return;
      refreshColors();
      scene.step(1 / 60);
      render();
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === W.w && h === W.h && scene) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W.w = w;
      W.h = h;
      W.t = 0;
      W.rng = mulberry32(1);
      colorsDirty = true;
      scene = w > 0 && h > 0 ? dots(W) : null;
      if (reduced) renderStatic();
      else {
        refreshColors();
        advance(1 / 60);
        render();
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      inside = true;
    };
    const onLeave = () => {
      inside = false;
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      if (!W.o.clickRipple) return;
      rip[nextRipple * 3] = tx;
      rip[nextRipple * 3 + 1] = ty;
      rip[nextRipple * 3 + 2] = 0;
      nextRipple = (nextRipple + 1) % RIPPLES;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
      if (onScreen) start();
    });
    io.observe(root);
    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    const listen = !reduced;
    if (listen) {
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerdown', onDown);
      root.addEventListener('pointerleave', onLeave);
      root.addEventListener('pointercancel', onLeave);
    }
    resize();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (listen) {
        root.removeEventListener('pointermove', onMove);
        root.removeEventListener('pointerdown', onDown);
        root.removeEventListener('pointerleave', onLeave);
        root.removeEventListener('pointercancel', onLeave);
      }
    };
  }, [light, reduced]);

  return (
    <div ref={rootRef} className="pc-workspace-background">
      <div className="pc-workspace-background-layer" aria-hidden="true">
        <canvas ref={canvasRef} />
        <span ref={probeRef} hidden />
      </div>
      <main {...mainProps}>{children}</main>
    </div>
  );
}
