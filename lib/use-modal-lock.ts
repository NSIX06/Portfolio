"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Trava a rolagem (Lenis + html), foca o botão de fechar, fecha com Esc e prende o Tab. */
export function useModalLock(
  panelRef: RefObject<HTMLElement | null>,
  closeRef: RefObject<HTMLElement | null>,
  onClose: () => void
): void {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    window.dispatchEvent(new Event("lenis:stop"));
    const html = document.documentElement;
    const previous = html.style.overflow;
    const returnFocus = document.activeElement as HTMLElement | null;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = f[0];
        const last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = previous;
      window.dispatchEvent(new Event("lenis:start"));
      returnFocus?.focus({ preventScroll: true });
    };
  }, [panelRef, closeRef]);
}
