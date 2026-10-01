"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Galaxy (React Bits), adaptado: estrelas tingidas de vermelho/âmbar (uTint), fundo
 * transparente sobre o degradê do site e mouse lido da janela.
 */
const VS = `attribute vec2 uv;attribute vec2 position;varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position,0,1);}`;

const FS = `precision highp float;
uniform float uTime;uniform vec3 uResolution;uniform float uStarSpeed;uniform float uDensity;
uniform float uSpeed;uniform vec2 uMouse;uniform float uGlow;uniform float uTwinkle;
uniform float uRotSpeed;uniform float uRepulsion;uniform float uMouseActive;
uniform vec3 uTintA;uniform vec3 uTintB;
varying vec2 vUv;
#define NUM_LAYER 4.0
#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)
#define PERIOD 3.0
float Hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float tri(float x){return abs(fract(x)*2.0-1.0);}
float tris(float x){float t=fract(x);return 1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0));}
float trisn(float x){float t=fract(x);return 2.0*(1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)))-1.0;}
float Star(vec2 uv,float flare){
  float d=length(uv);float m=(0.05*uGlow)/d;
  float rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*flare*uGlow;
  uv*=MAT45;rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*0.3*flare*uGlow;
  m*=smoothstep(1.0,0.2,d);return m;}
vec3 StarLayer(vec2 uv){
  vec3 col=vec3(0.0);vec2 gv=fract(uv)-0.5;vec2 id=floor(uv);
  for(int y=-1;y<=1;y++){for(int x=-1;x<=1;x++){
    vec2 offset=vec2(float(x),float(y));vec2 si=id+offset;float seed=Hash21(si);
    float size=fract(seed*345.32);float gloss=tri(uStarSpeed/(PERIOD*seed+1.0));
    float flareSize=smoothstep(0.9,1.0,size)*gloss;
    vec3 base=mix(uTintA,uTintB,smoothstep(0.55,1.0,Hash21(si+1.0)));
    base=mix(vec3(1.0),base,0.75+0.25*Hash21(si+3.0));
    vec2 pad=vec2(tris(seed*34.0+uTime*uSpeed/10.0),tris(seed*38.0+uTime*uSpeed/30.0))-0.5;
    float star=Star(gv-offset-pad,flareSize);
    float tw=trisn(uTime*uSpeed+seed*6.2831)*0.5+1.0;star*=mix(1.0,tw,uTwinkle);
    col+=star*size*base;}}
  return col;}
void main(){
  vec2 focalPx=vec2(0.5)*uResolution.xy;
  vec2 uv=(vUv*uResolution.xy-focalPx)/uResolution.y;
  vec2 mousePosUV=(uMouse*uResolution.xy-focalPx)/uResolution.y;
  float md=length(uv-mousePosUV);
  uv+=normalize(uv-mousePosUV)*(uRepulsion/(md+0.1))*0.05*uMouseActive;
  float a=uTime*uRotSpeed;uv=mat2(cos(a),-sin(a),sin(a),cos(a))*uv;
  vec3 col=vec3(0.0);
  for(float i=0.0;i<1.0;i+=1.0/NUM_LAYER){
    float depth=fract(i+uStarSpeed*uSpeed);
    float scale=mix(20.0*uDensity,0.5*uDensity,depth);
    float fade=depth*smoothstep(1.0,0.9,depth);
    col+=StarLayer(uv*scale+i*453.32)*fade;}
  float alpha=min(smoothstep(0.0,0.3,length(col)),1.0);
  gl_FragColor=vec4(col,alpha);
}`;

export function Galaxy({
  density = 1,
  glow = 0.4,
  speed = 0.8,
  starSpeed = 0.4,
  rotationSpeed = 0.04,
  twinkle = 0.4,
  repulsion = 1.6,
  tintA = [0.95, 0.18, 0.15],
  tintB = [1.0, 0.82, 0.2],
}: {
  density?: number;
  glow?: number;
  speed?: number;
  starSpeed?: number;
  rotationSpeed?: number;
  twinkle?: number;
  repulsion?: number;
  tintA?: [number, number, number];
  tintB?: [number, number, number];
}): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const tintKey = [...tintA, ...tintB].join(",");

  useEffect(() => {
    const ctn = ref.current;
    if (!ctn) return;
    const tints = tintKey.split(",").map(Number);
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: 1 });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const program = new Program(gl, {
      vertex: VS,
      fragment: FS,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(1, 1, 1) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uSpeed: { value: speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uGlow: { value: glow },
        uTwinkle: { value: twinkle },
        uRotSpeed: { value: rotationSpeed },
        uRepulsion: { value: repulsion },
        uMouseActive: { value: 0 },
        uTintA: { value: tints.slice(0, 3) },
        uTintB: { value: tints.slice(3, 6) },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = (): void => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution!.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    ctn.appendChild(gl.canvas);

    const target = { x: 0.5, y: 0.5, a: 0 };
    const smooth = { x: 0.5, y: 0.5, a: 0 };
    const onMove = (e: PointerEvent): void => {
      const r = ctn.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      target.a = 1;
    };
    const onLeave = (): void => {
      target.a = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const update = (t: number): void => {
      raf = requestAnimationFrame(update);
      if (document.hidden) return;
      const u = program.uniforms;
      u.uTime!.value = t * 0.001;
      u.uStarSpeed!.value = (t * 0.001 * starSpeed) / 10;
      smooth.x += (target.x - smooth.x) * 0.05;
      smooth.y += (target.y - smooth.y) * 0.05;
      smooth.a += (target.a - smooth.a) * 0.05;
      (u.uMouse!.value as Float32Array)[0] = smooth.x;
      (u.uMouse!.value as Float32Array)[1] = smooth.y;
      u.uMouseActive!.value = smooth.a;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [density, glow, speed, starSpeed, rotationSpeed, twinkle, repulsion, tintKey]);

  return <div ref={ref} className="relative h-full w-full" />;
}
