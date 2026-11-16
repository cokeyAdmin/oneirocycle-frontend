'use client';

import { useEffect, useRef, useState } from 'react';

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
 float pa=clamp(pm*(fres*.5+spec*.9+spec2),0.,1.);
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

interface SidebarWaterProps {
  collapsed: boolean;
  light: boolean;
}

/** A short glass-water ripple along the moving edge of the existing sidebar. */
export function SidebarWater({ collapsed, light }: SidebarWaterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ collapsed, light });
  const animateRef = useRef<(() => void) | null>(null);
  const [fallbackKey, setFallbackKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) {
      animateRef.current = () => {
        if (!reduce.matches) setFallbackKey((key) => key + 1);
      };
      return () => {
        animateRef.current = null;
      };
    }
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (program) gl.deleteProgram(program);
      animateRef.current = () => {
        if (!reduce.matches) setFallbackKey((key) => key + 1);
      };
      return () => {
        animateRef.current = null;
      };
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      animateRef.current = () => {
        if (!reduce.matches) setFallbackKey((key) => key + 1);
      };
      return () => {
        animateRef.current = null;
      };
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const attrib = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(attrib);
    gl.vertexAttribPointer(attrib, 2, gl.FLOAT, false, 0, 0);
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      res: uniform('uRes'),
      dpr: uniform('uDpr'),
      time: uniform('uTime'),
      card: uniform('uCard'),
      box: uniform('uBox[0]'),
      boxR: uniform('uBoxR[0]'),
      sat: uniform('uSat[0]'),
      rip: uniform('uRip[0]'),
      mouse: uniform('uMouse'),
      front: uniform('uFront'),
      dark: uniform('uDark'),
      amb: uniform('uAmb'),
    };
    let frame = 0;
    let started = 0;
    let lost = false;
    let visible = true;
    let previousWidth = 0;
    const render = (now: number) => {
      frame = 0;
      if (
        lost ||
        !visible ||
        reduce.matches ||
        document.visibilityState !== 'visible'
      )
        return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      const elapsed = (now - started) / 1000;
      const progress = Math.min(1, elapsed / 0.75);
      const strength = Math.sin(Math.PI * progress);
      const drift = Math.min(
        24,
        Math.abs(width - previousWidth) * 2 + strength * 14,
      );
      previousWidth = width;
      const edge = Math.max(8, width - 10);
      gl.viewport(0, 0, pixelWidth, pixelHeight);
      gl.uniform2f(u.res, width, height);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.time, elapsed);
      gl.uniform4f(u.card, 0, 0, width, height);
      gl.uniform4fv(
        u.box,
        new Float32Array([
          edge - drift * 0.15,
          height * 0.5,
          5 + strength * 4,
          Math.max(4, height * 0.47),
          edge - drift,
          height * 0.5,
          Math.max(0, strength * 5),
          Math.max(4, height * 0.42),
        ]),
      );
      gl.uniform1fv(u.boxR, new Float32Array([8, 8]));
      const sats = new Float32Array(16);
      for (let i = 0; i < 3; i++) {
        sats.set(
          [
            edge - drift * (0.5 + i * 0.3),
            height * (0.32 + i * 0.18),
            strength * (4 - i * 0.6),
            0,
          ],
          i * 4,
        );
      }
      gl.uniform4fv(u.sat, sats);
      const ripples = new Float32Array(24);
      ripples.set([edge, height * 0.5, elapsed, strength * 0.7]);
      gl.uniform4fv(u.rip, ripples);
      gl.uniform3f(u.mouse, 0, 0, 0);
      gl.uniform3f(u.front, height * 0.5, strength * 2, 0);
      gl.uniform1f(u.dark, stateRef.current.light ? 0 : 1);
      gl.uniform1f(u.amb, strength * 0.5);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (progress < 1) frame = requestAnimationFrame(render);
      else gl.clear(gl.COLOR_BUFFER_BIT);
    };
    const start = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (reduce.matches || lost || !visible) return;
      started = performance.now();
      previousWidth = canvas.clientWidth;
      frame = requestAnimationFrame(render);
    };
    animateRef.current = start;
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      animateRef.current = () => {
        if (!reduce.matches) setFallbackKey((key) => key + 1);
      };
    };
    canvas.addEventListener('webglcontextlost', onLost);
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(canvas);
    return () => {
      animateRef.current = null;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  useEffect(() => {
    if (stateRef.current.collapsed !== collapsed) animateRef.current?.();
    stateRef.current = { collapsed, light };
  }, [collapsed, light]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {fallbackKey > 0 && (
        <span
          key={fallbackKey}
          aria-hidden="true"
          className="sidebar-water-fallback"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 14,
            pointerEvents: 'none',
            zIndex: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(170,220,255,.26), transparent)',
            animation: 'sidebar-water-flash 750ms ease-out forwards',
          }}
        />
      )}
      <style>
        {
          '@keyframes sidebar-water-flash{0%,100%{opacity:0}45%{opacity:1}}@media(prefers-reduced-motion:reduce){.sidebar-water-fallback{animation:none!important;opacity:0}}'
        }
      </style>
    </>
  );
}
