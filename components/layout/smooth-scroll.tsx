"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const lenis = new Lenis(LENIS_OPTIONS);

    let rafId = 0;
    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: 0 }); // a margem fica no scroll-mt de cada seção
    }

    document.addEventListener("click", handleAnchorClick);

    // Painéis (ex.: aba de projeto) pausam a rolagem suave enquanto estão abertos.
    const stop = (): void => lenis.stop();
    const start = (): void => lenis.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
