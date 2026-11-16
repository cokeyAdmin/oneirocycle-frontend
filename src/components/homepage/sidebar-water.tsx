'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

/* Water shader adapted from the user-provided Nimbus UI Liquid Accordion. */
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;uniform vec4 uCard;
uniform vec4 uBox[2];uniform float uBoxR[2];uniform vec4 uSat[4];uniform vec4 uRip[6];uniform vec3 uMouse;uniform vec3 uFront;
uniform float uDark;uniform float uAmb;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float dropD(vec2 p){float d=1e4;
 for(int i=0;i<2;i++){vec4 B=uBox[i];if(B.z>.5){vec2 q=p;
  if(i==int(uFront.z)){float f=exp(-pow(q.y-uFront.x,2.)/260.);q.y+=f*uFront.y*(sin(q.x*.075+uTime*6.)+.5*sin(q.x*.19-uTime*4.3));}
  d=smin(d,sdRB(q-B.xy,B.zw,uBoxR[i]),13.);}}
 for(int i=0;i<4;i++){vec4 S=uSat[i];if(S.z>.5){d=smin(d,length(p-S.xy)-S.z,13.);}}
 return d;}
float cardD(vec2 p){vec2 h=uCard.zw*.5;return sdRB(p-uCard.xy-h,h,28.);}
float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;
 for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}
 vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1400.);
 w+=uAmb*(sin(p.x*.04+p.y*.02+uTime*1.1)*.45+sin(p.x*.11-uTime*.8+p.y*.13)*.25);return w;}
float H(vec2 p){float dc=cardD(p);return lens(dc,18.)*2.4+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,9.,-dc);}
float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){
 vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;
 float dp=cardD(p);if(dp>16.){gl_FragColor=vec4(0.);return;}
 float dd=dropD(p);
 float h0=H(p);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));
 vec3 V=vec3(0.,0.,1.);
 float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);
 float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.3;
 float fres=clamp((1.-n.z)*4.,0.,1.);
 vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+fres*.85+p.x*.0028+p.y*.0015+uTime*.035));
 float pm=smoothstep(1.,-1.,dp);float dm=smoothstep(1.,-1.,dd)*smoothstep(1.,-2.,dp);
 float sh=smoothstep(9.,-9.,dropD(p-vec2(0.,5.)))*(1.-dm)*pm*(.11+.07*uDark);
 vec3 c=vec3(0.,.14,.36)*sh;float a=sh;
 float pa=0.;
 c=mix(vec3(1.),irid,.5*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);
 float th=lens(dd,11.);
 float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);
 vec3 tint=mix(vec3(.80,.95,1.),vec3(.55,.82,1.),uDark);
 float rim=dm*(1.-smoothstep(0.,8.,-dd));
 float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);
 float body=.5+.5*clamp(-n.y*3.,-1.,1.);
 float da=dm*(.26+.14*body)*(1.-.35*uDark);vec3 dc=mix(tint,vec3(1.),body*.6);
 float la=rim*.22;vec3 lc=mix(vec3(0.,.42,.78),vec3(.1,.55,.95),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);
 la=clamp(cres*.7+smoothstep(.6,1.,cs)*.28*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(dm*(spec*1.2+spec2*.5),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=dm*smoothstep(-2.,0.,dd)*.4;dc=mix(vec3(1.),irid,.35)*la+dc*(1.-la);da=la+da*(1.-la);
 c=dc+c*(1.-da);a=da+a*(1.-da);
 gl_FragColor=vec4(c,a);
}`;

type Body = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  vw: number;
  vh: number;
};
type Target = Pick<Body, 'x' | 'y' | 'w' | 'h'>;
type Drop = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  k: number;
};
type Ripple = { x: number; y: number; age: number; amp: number };
const body = (): Body => ({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  vx: 0,
  vy: 0,
  vw: 0,
  vh: 0,
});
const PAD = 14;
const RADIUS = 20;

export interface SidebarWaterHandle {
  moveTo: (button: HTMLElement) => void;
}
interface SidebarWaterProps {
  light: boolean;
}

/** Original Spillway spring/water engine adapted to menu button geometry. */
export const SidebarWater = forwardRef<SidebarWaterHandle, SidebarWaterProps>(
  function SidebarWater({ light }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const moveRef = useRef<((button: HTMLElement) => void) | null>(null);
    const redrawRef = useRef<(() => void) | null>(null);
    const lightRef = useRef(light);
    const [fallback, setFallback] = useState<Target | null>(null);
    useImperativeHandle(
      ref,
      () => ({ moveTo: (button) => moveRef.current?.(button) }),
      [],
    );
    useEffect(() => {
      lightRef.current = light;
      redrawRef.current?.();
    }, [light]);

    useEffect(() => {
      const canvas = canvasRef.current;
      const nav = canvas?.parentElement?.parentElement;
      if (!canvas || !nav) return;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let selected =
        nav.querySelector<HTMLElement>(
          'button[data-preview-selected="true"]',
        ) ?? nav.querySelector<HTMLElement>('button');
      const s = {
        a: body(),
        b: body(),
        lead: 0,
        lagUntil: 0,
        drops: [] as Drop[],
        ripples: [] as Ripple[],
        moving: false,
        split: false,
        ready: false,
        raf: 0,
        last: 0,
        time: 0,
        visible: true,
        lost: false,
      };
      const gl = canvas.getContext('webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
      });
      let program: WebGLProgram | null = null;
      let buffer: WebGLBuffer | null = null;
      const shaders: WebGLShader[] = [];
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const compile = (type: number, source: string) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        shaders.push(shader);
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        return gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)
          ? shader
          : null;
      };
      if (gl) {
        const vertex = compile(gl.VERTEX_SHADER, VERT),
          fragment = compile(gl.FRAGMENT_SHADER, FRAG);
        program = gl.createProgram();
        if (program && vertex && fragment) {
          gl.attachShader(program, vertex);
          gl.attachShader(program, fragment);
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.deleteProgram(program);
            program = null;
          }
        } else if (program) {
          gl.deleteProgram(program);
          program = null;
        }
        if (program) {
          gl.useProgram(program);
          buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW,
          );
          const attribute = gl.getAttribLocation(program, 'a');
          gl.enableVertexAttribArray(attribute);
          gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
          for (const name of [
            'uRes',
            'uDpr',
            'uTime',
            'uCard',
            'uBox',
            'uBoxR',
            'uSat',
            'uRip',
            'uMouse',
            'uFront',
            'uDark',
            'uAmb',
          ])
            uniforms[name] = gl.getUniformLocation(
              program,
              ['uBox', 'uBoxR', 'uSat', 'uRip'].includes(name)
                ? name + '[0]'
                : name,
            );
        }
      }
      const target = (): Target | null => {
        if (!selected) return null;
        const root = nav.getBoundingClientRect(),
          rect = selected.getBoundingClientRect();
        return {
          x: PAD + rect.left - root.left + rect.width / 2,
          y: PAD + rect.top - root.top + rect.height / 2,
          w: Math.max(1, rect.width / 2 - 1),
          h: Math.max(1, rect.height / 2 - 1),
        };
      };
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        const width = nav.clientWidth + PAD * 2,
          height = nav.clientHeight + PAD * 2;
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        const T = target();
        if (!s.ready && T) {
          Object.assign(s.a, T);
          Object.assign(s.b, T);
          s.ready = true;
        }
      };
      const step = (dt: number, now: number) => {
        s.time += dt;
        const T = target();
        if (!T) return;
        let still = true;
        const bodies = [s.a, s.b];
        if (motion.matches) {
          for (const B of bodies)
            Object.assign(B, T, { vx: 0, vy: 0, vw: 0, vh: 0 });
          s.drops = [];
          s.ripples = [];
        } else {
          bodies.forEach((B, i) => {
            const lead = i === s.lead,
              k = lead ? 210 : 60,
              c = lead ? 25 : 13;
            const f = !lead && now < s.lagUntil ? 0.04 : 1,
              kh = lead ? 260 : 90;
            B.vx += (k * (T.x - B.x) - c * B.vx) * dt * f;
            B.vy += (k * (T.y - B.y) - c * B.vy) * dt * f;
            B.vw += (k * (T.w - B.w) - c * B.vw) * dt * f;
            B.vh += (kh * (T.h - B.h) - (lead ? 22 : 14) * B.vh) * dt * f;
            B.x += B.vx * dt;
            B.y += B.vy * dt;
            B.w = Math.max(0, B.w + B.vw * dt);
            B.h = Math.max(0, B.h + B.vh * dt);
            if (
              Math.abs(T.y - B.y) > 0.3 ||
              Math.abs(T.h - B.h) > 0.3 ||
              Math.abs(T.w - B.w) > 0.3 ||
              Math.abs(B.vy) + Math.abs(B.vh) > 3
            )
              still = false;
          });
          const head = bodies[s.lead]!,
            tail = bodies[1 - s.lead]!;
          const gap = Math.abs(head.y - tail.y) - (head.h + tail.h);
          if (!s.split && s.moving && gap > 4) {
            s.split = true;
            const top =
              Math.min(head.y, tail.y) + (head.y < tail.y ? head.h : tail.h);
            [0.25, 0.55, 0.85].forEach((t, j) =>
              s.drops.push({
                x: head.x + (Math.random() - 0.5) * nav.clientWidth * 0.35,
                y: top + gap * t,
                vx: (Math.random() - 0.5) * 80,
                vy: (head.vy + tail.vy) * 0.4,
                r: 9 - j * 1.5 + Math.random() * 2,
                k: 60 + Math.random() * 80,
              }),
            );
          }
          s.drops = s.drops.filter((d) => {
            d.vx += (25 * (head.x - d.x) - 6 * d.vx) * dt;
            d.vy += (d.k * (head.y - d.y) - 9 * d.vy) * dt;
            d.x += d.vx * dt;
            d.y += d.vy * dt;
            if (Math.abs(head.y - d.y) < head.h * 0.85 || head.h < 6)
              d.r -= dt * 30;
            return d.r > 0.6;
          });
          if (s.drops.length) still = false;
        }
        if (s.moving && still) {
          s.moving = false;
          if (!motion.matches)
            s.ripples.push({
              x: T.x,
              y: T.y - T.h + Math.min(22, T.h),
              age: 0,
              amp: s.split ? 1.1 : 0.6,
            });
        }
        s.ripples.forEach((p) => (p.age += dt));
        s.ripples = s.ripples.filter((p) => p.age < 2.4);
      };
      const draw = () => {
        const T = target();
        if (!T) return;
        if (!gl || !program || s.lost) {
          setFallback(T);
          return;
        }
        const head = s.lead === 0 ? s.a : s.b,
          tail = s.lead === 0 ? s.b : s.a;
        // The reference's fixed 80px overlap assumes an expanded answer panel.
        // Normalize for short menu rows so settled bodies never stay pinched.
        const separation =
          Math.abs(head.y - tail.y) / Math.max(1, head.h + tail.h);
        const thin = Math.max(0, Math.min(1, (separation - 0.25) / 0.75));
        const shape = (B: Body, k: number) => {
          const w = B.w * (1 - k * thin),
            h = B.h;
          return {
            w,
            h,
            r: Math.max(
              0,
              Math.min(RADIUS + (Math.min(w, h) - RADIUS) * thin, w, h),
            ),
          };
        };
        const hs = shape(head, 0.22),
          ts = shape(tail, 0.5);
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(
          uniforms.uRes ?? null,
          nav.clientWidth + PAD * 2,
          nav.clientHeight + PAD * 2,
        );
        gl.uniform1f(uniforms.uDpr ?? null, dpr);
        gl.uniform1f(uniforms.uTime ?? null, s.time);
        gl.uniform4f(
          uniforms.uCard ?? null,
          PAD,
          PAD,
          nav.clientWidth,
          nav.clientHeight,
        );
        gl.uniform4fv(
          uniforms.uBox ?? null,
          new Float32Array([
            head.x,
            head.y,
            hs.w,
            hs.h,
            tail.x,
            tail.y,
            ts.w,
            ts.h,
          ]),
        );
        gl.uniform1fv(uniforms.uBoxR ?? null, new Float32Array([hs.r, ts.r]));
        const drops = new Float32Array(16);
        s.drops
          .slice(0, 4)
          .forEach((d, i) => drops.set([d.x, d.y, d.r, 0], i * 4));
        gl.uniform4fv(uniforms.uSat ?? null, drops);
        const ripples = new Float32Array(24);
        s.ripples
          .slice(-6)
          .forEach((p, i) => ripples.set([p.x, p.y, p.age, p.amp], i * 4));
        gl.uniform4fv(uniforms.uRip ?? null, ripples);
        gl.uniform3f(uniforms.uMouse ?? null, 0, 0, 0);
        gl.uniform3f(
          uniforms.uFront ?? null,
          head.y + head.h,
          motion.matches ? 0 : Math.min(Math.abs(head.vh) * 0.012, 4.5),
          0,
        );
        gl.uniform1f(uniforms.uDark ?? null, lightRef.current ? 0 : 1);
        gl.uniform1f(uniforms.uAmb ?? null, motion.matches ? 0 : 1);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      const start = () => {
        if (s.raf || !s.visible || document.visibilityState !== 'visible')
          return;
        s.last = performance.now();
        const tick = (now: number) => {
          s.raf = 0;
          step(Math.min((now - s.last) / 1000, 1 / 30), now);
          s.last = now;
          draw();
          if (
            s.visible &&
            document.visibilityState === 'visible' &&
            !s.lost &&
            program &&
            !motion.matches
          )
            s.raf = requestAnimationFrame(tick);
        };
        s.raf = requestAnimationFrame(tick);
      };
      const move = (button: HTMLElement) => {
        selected = button;
        const T = target();
        if (!T) return;
        s.lead = Math.abs(T.y - s.a.y) <= Math.abs(T.y - s.b.y) ? 0 : 1;
        s.lagUntil = performance.now() + 120;
        s.moving = true;
        s.split = false;
        if (!program || s.lost) {
          setFallback(T);
          return;
        }
        start();
      };
      moveRef.current = move;
      redrawRef.current = () => {
        resize();
        draw();
        start();
      };
      const onResize = () => {
        resize();
        if (!program || s.lost) {
          const T = target();
          if (T) setFallback(T);
        }
        start();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(nav);
      const onVisibility = () => {
        if (document.visibilityState === 'visible') start();
        else {
          cancelAnimationFrame(s.raf);
          s.raf = 0;
        }
      };
      const onMotion = () => {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
        start();
      };
      const onLost = (event: Event) => {
        event.preventDefault();
        s.lost = true;
        cancelAnimationFrame(s.raf);
        s.raf = 0;
        const T = target();
        if (T) setFallback(T);
      };
      const io = new IntersectionObserver(([entry]) => {
        s.visible = !!entry?.isIntersecting;
        if (s.visible) start();
        else {
          cancelAnimationFrame(s.raf);
          s.raf = 0;
        }
      });
      io.observe(nav);
      document.addEventListener('visibilitychange', onVisibility);
      motion.addEventListener('change', onMotion);
      canvas.addEventListener('webglcontextlost', onLost);
      resize();
      draw();
      start();
      return () => {
        moveRef.current = null;
        redrawRef.current = null;
        cancelAnimationFrame(s.raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        motion.removeEventListener('change', onMotion);
        canvas.removeEventListener('webglcontextlost', onLost);
        if (gl) {
          if (buffer) gl.deleteBuffer(buffer);
          if (program) gl.deleteProgram(program);
          shaders.forEach((shader) => gl.deleteShader(shader));
        }
      };
    }, []);
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: -PAD,
            top: -PAD,
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        {fallback && (
          <span
            className="sidebar-water-pool"
            style={{
              position: 'absolute',
              left: fallback.x - fallback.w - PAD,
              top: fallback.y - fallback.h - PAD,
              width: fallback.w * 2,
              height: fallback.h * 2,
              borderRadius: RADIUS,
              background: light
                ? 'radial-gradient(120% 90% at 30% 0%,rgba(255,255,255,.7),transparent 55%),rgba(255,255,255,.34)'
                : 'radial-gradient(120% 90% at 30% 0%,rgba(255,255,255,.3),transparent 55%),rgba(140,200,255,.18)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,.95),inset 0 -2px 8px rgba(0,162,255,.2),inset 0 0 0 1px rgba(255,255,255,.55)',
              transition:
                'top 500ms cubic-bezier(.3,1.3,.4,1),width 500ms,height 500ms',
            }}
          />
        )}
        <style>
          {
            '@media(prefers-reduced-motion:reduce){.sidebar-water-pool{transition:none!important}}'
          }
        </style>
      </div>
    );
  },
);
