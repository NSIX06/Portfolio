"use client";

import { useSyncExternalStore } from "react";

/**
 * Sinal global "o site terminou de carregar" (a tela de carregamento saiu).
 * As animações de entrada esperam por ele para não rodarem escondidas atrás do preloader.
 */
let loaded = false;
const listeners = new Set<() => void>();

export function markSiteLoaded(): void {
  if (loaded) return;
  loaded = true;
  document.documentElement.classList.add("is-loaded");
  listeners.forEach((l) => l());
}

export function useSiteLoaded(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => loaded,
    () => false
  );
}
