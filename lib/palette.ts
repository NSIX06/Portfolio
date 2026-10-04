"use client";

import { useSyncExternalStore } from "react";

/**
 * Paletas de cor do site. Valem para o tema escuro e para o claro: o visitante escolhe a
 * cor e o modo, e destaques, cursor e fundos animados acompanham. Rubi + escuro é o original.
 */
export type PaletteId = "rubi" | "oceano" | "lavanda" | "esmeralda" | "ambar";

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
  {
    id: "lavanda",
    label: "Lavanda",
    accent: "#7c3aed",
    cursor: "#7c3aed",
    cursorTarget: "#5b21b6",
    shaderLow: [0.94, 0.9, 1.0],
    shaderHigh: [0.5, 0.3, 0.95],
    glitch: ["#ddd0f8", "#cab4f4", "#b495f0", "#9d74ea"],
    rgb: "124, 58, 237",
    layers: ["#ece3ff", "#7c3aed"],
    dark: {
      accent: "#8b5cf6",
      shaderLow: [0.03, 0.01, 0.07],
      shaderHigh: [0.22, 0.08, 0.48],
      glitch: ["#0e041a", "#19072e", "#290b4d", "#3f117a"],
      layers: ["#15072a", "#8b5cf6"],
      cardLow: [0.05, 0.02, 0.11],
      cardHigh: [0.34, 0.13, 0.7],
    },
  },
  {
    id: "esmeralda",
    label: "Esmeralda",
    accent: "#059669",
    cursor: "#059669",
    cursorTarget: "#065f46",
    shaderLow: [0.88, 0.97, 0.93],
    shaderHigh: [0.08, 0.62, 0.42],
    glitch: ["#c9ecdc", "#a8e1c8", "#84d4b2", "#5ec59a"],
    rgb: "5, 150, 105",
    layers: ["#d5f5e8", "#059669"],
    dark: {
      accent: "#10b981",
      shaderLow: [0.005, 0.05, 0.03],
      shaderHigh: [0.03, 0.36, 0.22],
      glitch: ["#04140e", "#072619", "#0b4029", "#116640"],
      layers: ["#062218", "#10b981"],
      cardLow: [0.01, 0.08, 0.05],
      cardHigh: [0.05, 0.55, 0.34],
    },
  },
  {
    id: "ambar",
    label: "Âmbar",
    accent: "#ea580c",
    cursor: "#ea580c",
    cursorTarget: "#9a3412",
    shaderLow: [1.0, 0.93, 0.86],
    shaderHigh: [0.96, 0.45, 0.12],
    glitch: ["#f9dcc8", "#f5c4a4", "#f1aa7d", "#ec8f55"],
    rgb: "234, 88, 12",
    layers: ["#ffe7d6", "#ea580c"],
    dark: {
      accent: "#f97316",
      shaderLow: [0.07, 0.025, 0.005],
      shaderHigh: [0.48, 0.18, 0.03],
      glitch: ["#1a0c04", "#2e1507", "#4d230b", "#7a3811"],
      layers: ["#2a1407", "#f97316"],
      cardLow: [0.11, 0.04, 0.01],
      cardHigh: [0.7, 0.27, 0.05],
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
export const PALETTE_BOOT = `try{var p=localStorage.getItem("${KEY}");if(p)document.documentElement.dataset.palette=p}catch(e){}`;
