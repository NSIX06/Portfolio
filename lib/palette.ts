"use client";

import { useSyncExternalStore } from "react";

/**
 * Paletas de cor do site. Valem para o tema escuro e para o claro: o visitante escolhe a
 * cor e o modo, e destaques, cursor e fundos animados acompanham. Rubi + escuro é o original.
 */
export type PaletteId = "rubi" | "oceano";

export type Palette = {
  id: PaletteId;
  label: string;
  /** Cor de destaque (títulos, botões, linha do tempo…). */
  accent: string;
  /** Cursor: cor normal e sobre alvos (botões, links). */
  cursor: string;
  cursorTarget: string;
  /** Fundo animado (shader), em 0–1: tom de base e tom do brilho. */
  shaderLow: [number, number, number];
  shaderHigh: [number, number, number];
  /** Letras do Letter Glitch (claras e suaves). */
  glitch: string[];
  /** Hexágonos dos Projetos e pontos do topo, em r,g,b. */
  rgb: string;
  /** Camadas que deslizam no menu lateral. */
  layers: [string, string];
  /** Versão escura (mesma estética do tema escuro original, nesta cor). */
  dark: {
    accent: string;
    shaderLow: [number, number, number];
    shaderHigh: [number, number, number];
    glitch: string[];
    layers: [string, string];
    /** Shader do cartão de contato. */
    cardLow: [number, number, number];
    cardHigh: [number, number, number];
  };
};

export const PALETTES: Palette[] = [
  {
    id: "rubi",
    label: "Rubi",
    accent: "#e11d1d",
    cursor: "#e11d1d",
    cursorTarget: "#991b1b",
    shaderLow: [0.99, 0.9, 0.9],
    shaderHigh: [0.9, 0.2, 0.2],
    glitch: ["#f3d0d0", "#eeb4b4", "#e89595", "#e27474"],
    rgb: "225, 29, 29",
    layers: ["#fde2e2", "#e11d1d"],
    dark: {
      accent: "#e11d1d",
      shaderLow: [0.06, 0.008, 0.008],
      shaderHigh: [0.42, 0.06, 0.05],
      glitch: ["#1a0404", "#2e0707", "#4d0b0b", "#7a1111"],
      layers: ["#2a0707", "#e11d1d"],
      cardLow: [0.1, 0.02, 0.02],
      cardHigh: [0.62, 0.1, 0.08],
    },
  },
  {
    id: "oceano",
    label: "Oceano",
    accent: "#2563eb",
    cursor: "#2563eb",
    cursorTarget: "#1e40af",
    shaderLow: [0.9, 0.93, 1.0],
    shaderHigh: [0.2, 0.42, 0.96],
    glitch: ["#d0dcf8", "#b4c8f4", "#95b2f0", "#7499ea"],
    rgb: "37, 99, 235",
    layers: ["#dbe7ff", "#2563eb"],
    dark: {
      accent: "#3b82f6",
      shaderLow: [0.008, 0.02, 0.07],
      shaderHigh: [0.06, 0.17, 0.5],
      glitch: ["#040a1a", "#07132e", "#0b1f4d", "#11307a"],
      layers: ["#07112a", "#3b82f6"],
      cardLow: [0.02, 0.04, 0.12],
      cardHigh: [0.1, 0.26, 0.72],
    },
  },
];

export const DEFAULT_PALETTE: PaletteId = "rubi";
const KEY = "palette";

function read(): PaletteId {
  const v = document.documentElement.dataset.palette as PaletteId | undefined;
  return v && PALETTES.some((p) => p.id === v) ? v : DEFAULT_PALETTE;
}

const listeners = new Set<() => void>();

export function setPalette(id: PaletteId): void {
  document.documentElement.dataset.palette = id;
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // sem storage: vale só nesta visita
  }
  listeners.forEach((l) => l());
}

export function usePaletteId(): PaletteId {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => DEFAULT_PALETTE
  );
}

export function usePalette(): Palette {
  const id = usePaletteId();
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0]!;
}

/** Script que roda antes da pintura e aplica a paleta salva (evita piscar a cor errada). */
export const PALETTE_BOOT = `try{var p=localStorage.getItem("${KEY}");if(p==="rubi"||p==="oceano")document.documentElement.dataset.palette=p}catch(e){}`;
