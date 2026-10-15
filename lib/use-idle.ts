"use client";

import { useEffect, useState, type RefObject } from "react";

/* Os efeitos pesados (WebGL, canvas, cursor) acordam na primeira interação do visitante
   (mover o mouse, tocar, rolar, teclar) ou, sem interação, alguns segundos depois do load.
   Assim a primeira pintura e a hidratação não disputam a thread principal com eles. */
const WAKE_EVENTS = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
const WAKE_FALLBACK_MS = 7000;
let woken = false;
let armed = false;
const listeners = new Set<() => void>();

function armWake(): void {
  if (armed) return;
  armed = true;
  let timer = 0;
  const wake = (): void => {
    if (woken) return;
    woken = true;
    window.clearTimeout(timer);
    for (const e of WAKE_EVENTS) window.removeEventListener(e, wake);
    for (const fn of listeners) fn();
    listeners.clear();
  };
  for (const e of WAKE_EVENTS) window.addEventListener(e, wake, { passive: true });
  const startTimer = (): void => {
    timer = window.setTimeout(wake, WAKE_FALLBACK_MS);
  };
  if (document.readyState === "complete") startTimer();
  else window.addEventListener("load", startTimer, { once: true });
}

/**
 * Fica `true` depois que o visitante interage (ou após o tempo de espera) e o navegador
 * fica ocioso. Usado para montar WebGL/canvas e efeitos pesados fora do caminho crítico.
 */
export function useIdle(timeout = 2000): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let idleId = 0;
    let timer = 0;
    let alive = true;
    const go = (): void => {
      if (!alive) return;
      const ric = window.requestIdleCallback;
      if (ric) idleId = ric(() => setIdle(true), { timeout });
      else timer = window.setTimeout(() => setIdle(true), 200);
    };
    if (woken) go();
    else {
      listeners.add(go);
      armWake();
    }
    return () => {
      alive = false;
      listeners.delete(go);
      if (idleId) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timer);
    };
  }, [timeout]);
  return idle;
}

/** Fica `true` (uma vez) quando o elemento chega perto da tela. */
export function useNearViewport(ref: RefObject<Element | null>, margin = "400px"): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
