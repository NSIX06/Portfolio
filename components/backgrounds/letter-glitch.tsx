"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * LetterGlitch (React Bits), adaptado: fundo transparente, cores da identidade,
 * pausa fora da tela/aba e sem estado React (tudo dentro de um único efeito).
 */
type Rgb = { r: number; g: number; b: number };

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";

function hexToRgb(hex: string): Rgb {
  const full = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => r + r + g + g + b + b);
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  return m ? { r: parseInt(m[1]!, 16), g: parseInt(m[2]!, 16), b: parseInt(m[3]!, 16) } : { r: 255, g: 255, b: 255 };
}

export function LetterGlitch({
  colors = ["#1a0404", "#2e0707", "#4d0b0b", "#7a1111"],
  speed = 60,
  className = "",
}: {
  colors?: string[];
  speed?: number;
  className?: string;
}): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsKey = colors.join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const palette = colorsKey.split(",").map(hexToRgb);
    const chars = Array.from(CHARS);
    const FONT = 16;
    const CW = 10;
    const CH = 20;
    let cols = 0;
    let letters: { char: string; rgb: Rgb; from: Rgb; to: Rgb; p: number }[] = [];
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]!;

    // Desenha uma célula só (apaga o retângulo dela e escreve a letra de novo).
    const drawCell = (i: number): void => {
      const l = letters[i];
      if (!l) return;
      const x = (i % cols) * CW;
      const y = Math.floor(i / cols) * CH;
      ctx.clearRect(x, y, CW, CH);
      ctx.fillStyle = `rgb(${l.rgb.r},${l.rgb.g},${l.rgb.b})`;
      ctx.fillText(l.char, x, y);
    };
    const drawAll = (): void => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let i = 0; i < letters.length; i++) drawCell(i);
    };

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT}px monospace`;
      ctx.textBaseline = "top";
      cols = Math.ceil(w / CW);
      const rows = Math.ceil(h / CH);
      letters = Array.from({ length: cols * rows }, () => {
        const rgb = pick(palette);
        return { char: pick(chars), rgb, from: rgb, to: pick(palette), p: 1 };
      });
      fading.clear();
      drawAll();
    };

    // Só as letras em transição são redesenhadas (antes: a tela inteira a cada quadro).
    const fading = new Set<number>();
    const FRAME_MS = 1000 / 30;
    let last = 0;
    let lastFrame = 0;
    let raf = 0;
    let running = false;
    const tick = (now: number): void => {
      raf = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME_MS - 1) return;
      lastFrame = now;
      if (now - last >= speed) {
        const n = Math.max(1, Math.floor(letters.length * 0.05));
        for (let k = 0; k < n; k++) {
          const i = Math.floor(Math.random() * letters.length);
          const l = letters[i];
          if (!l) continue;
          l.char = pick(chars);
          l.from = l.rgb;
          l.to = pick(palette);
          l.p = 0;
          fading.add(i);
        }
        last = now;
      }
      for (const i of fading) {
        const l = letters[i];
        if (!l) {
          fading.delete(i);
          continue;
        }
        l.p = Math.min(1, l.p + 0.1);
        l.rgb = {
          r: Math.round(l.from.r + (l.to.r - l.from.r) * l.p),
          g: Math.round(l.from.g + (l.to.g - l.from.g) * l.p),
          b: Math.round(l.from.b + (l.to.b - l.from.b) * l.p),
        };
        drawCell(i);
        if (l.p >= 1) fading.delete(i);
      }
    };
    const start = (): void => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = (): void => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVis = (): void => (document.hidden ? stop() : start());

    resize();
    start();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [colorsKey, speed]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />;
}
