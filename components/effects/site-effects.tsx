"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";

// Cursor em mira do portfólio antigo (GSAP). Só no navegador e só com mouse.
const TargetCursor = dynamic(() => import("./TargetCursor"), { ssr: false });

const CURSOR_TARGETS = [
  ".cursor-target",
  "a[href]",
  "button:not([disabled])",
  ".project-card",
].join(", ");

/** Efeitos globais: cursor em mira e brilho vermelho que segue o mouse nos cards. */
export function SiteEffects(): ReactNode {
  useEffect(() => {
    const onMove = (e: PointerEvent): void => {
      const el = (e.target as Element | null)?.closest?.(
        ".glow-hover"
      ) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <TargetCursor targetSelector={CURSOR_TARGETS} />;
}
