"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ShapeGrid (React Bits), adaptado: só quadrado e hexágono, rastro ao passar o mouse
 * lido da janela (o fundo fica atrás do conteúdo, sem eventos de ponteiro) e vinheta
 * na cor do fundo do site.
 */
type Cell = { x: number; y: number };

export function ShapeGrid({
  shape = "hexagon",
  direction = "diagonal",
  speed = 0.35,
  size = 38,
  borderColor = "rgba(200, 40, 40, 0.2)",
  hoverColor = "rgba(225, 29, 29, 0.32)",
  trail = 8,
}: {
  shape?: "square" | "hexagon";
  direction?: "diagonal" | "up" | "down" | "left" | "right";
  speed?: number;
  size?: number;
  borderColor?: string;
  hoverColor?: string;
  trail?: number;
}): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const isHex = shape === "hexagon";
    const hexH = size * 1.5;
    const hexV = size * Math.sqrt(3);
    const off = { x: 0, y: 0 };
    let hovered: Cell | null = null;
    let trailCells: Cell[] = [];
    const opac = new Map<string, number>();
    let vignette = "#0a0a0a";

    const resize = (): void => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      vignette = getComputedStyle(document.documentElement).getPropertyValue("--background").trim() || "#0a0a0a";
    };

    const hexPath = (cx: number, cy: number): void => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(a);
        const vy = cy + size * Math.sin(a);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const mod = (a: number, b: number): number => ((a % b) + b) % b;

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      if (isHex) {
        const colShift = Math.floor(off.x / hexH);
        const ox = mod(off.x, hexH);
        const oy = mod(off.y, hexV);
        const cols = Math.ceil(canvas.width / hexH) + 3;
        const rows = Math.ceil(canvas.height / hexV) + 3;
        for (let c = -2; c < cols; c++) {
          for (let r = -2; r < rows; r++) {
            const cx = c * hexH + ox;
            const cy = r * hexV + ((c + colShift) % 2 !== 0 ? hexV / 2 : 0) + oy;
            const a = opac.get(`${c},${r}`);
            hexPath(cx, cy);
            if (a) {
              ctx.globalAlpha = a;
              ctx.fillStyle = hoverColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
            ctx.stroke();
          }
        }
      } else {
        const ox = mod(off.x, size);
        const oy = mod(off.y, size);
        const cols = Math.ceil(canvas.width / size) + 3;
        const rows = Math.ceil(canvas.height / size) + 3;
        for (let c = -2; c < cols; c++) {
          for (let r = -2; r < rows; r++) {
            const sx = c * size + ox;
            const sy = r * size + oy;
            const a = opac.get(`${c},${r}`);
            if (a) {
              ctx.globalAlpha = a;
              ctx.fillStyle = hoverColor;
              ctx.fillRect(sx, sy, size, size);
              ctx.globalAlpha = 1;
            }
            ctx.strokeRect(sx, sy, size, size);
          }
        }
      }
      const g = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.hypot(canvas.width, canvas.height) / 2
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.55, "rgba(0,0,0,0)");
      g.addColorStop(1, vignette);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateOpacities = (): void => {
      const targets = new Map<string, number>();
      if (hovered) targets.set(`${hovered.x},${hovered.y}`, 1);
      trailCells.forEach((t, i) => {
        const k = `${t.x},${t.y}`;
        if (!targets.has(k)) targets.set(k, (trailCells.length - i) / (trailCells.length + 1));
      });
      for (const k of targets.keys()) if (!opac.has(k)) opac.set(k, 0);
      for (const [k, o] of opac) {
        const next = o + ((targets.get(k) ?? 0) - o) * 0.15;
        if (next < 0.005) opac.delete(k);
        else opac.set(k, next);
      }
    };

    const step = Math.max(speed, 0.05);
    const wrapX = isHex ? hexH * 2 : size;
    const wrapY = isHex ? hexV : size;
    let raf = 0;
    let running = false;
    const tick = (): void => {
      if (direction === "right" || direction === "diagonal") off.x = mod(off.x - step, wrapX);
      if (direction === "left") off.x = mod(off.x + step, wrapX);
      if (direction === "up") off.y = mod(off.y + step, wrapY);
      if (direction === "down" || direction === "diagonal") off.y = mod(off.y - step, wrapY);
      updateOpacities();
      draw();
      raf = requestAnimationFrame(tick);
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

    const onMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let cell: Cell;
      if (isHex) {
        const colShift = Math.floor(off.x / hexH);
        const c = Math.round((mx - mod(off.x, hexH)) / hexH);
        const rowOff = (c + colShift) % 2 !== 0 ? hexV / 2 : 0;
        cell = { x: c, y: Math.round((my - mod(off.y, hexV) - rowOff) / hexV) };
      } else {
        cell = { x: Math.floor((mx - mod(off.x, size)) / size), y: Math.floor((my - mod(off.y, size)) / size) };
      }
      if (!hovered || hovered.x !== cell.x || hovered.y !== cell.y) {
        if (hovered && trail > 0) trailCells = [hovered, ...trailCells].slice(0, trail);
        hovered = cell;
      }
    };
    const onVis = (): void => (document.hidden ? stop() : start());

    resize();
    start();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [shape, direction, speed, size, borderColor, hoverColor, trail]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
