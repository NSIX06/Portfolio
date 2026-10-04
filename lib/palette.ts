"use client";

import { useSyncExternalStore } from "react";

/**
 * Paletas do tema claro. O tema escuro é sempre o vermelho original; no claro o visitante
 * escolhe a paleta, e cursor, destaques e fundos animados acompanham a escolha.
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
};

export const PALETTES: Palette[] = [
  {
    id: "rubi",
    label: "Rubi",
    accent: "#e11d1d",
    cursor: "#e11d1d",
    cursorTarget: "#991b1b",
    shaderLow: [0.995, 0.975, 0.975],
    shaderHigh: [0.98, 0.78, 0.78],
    glitch: ["#f6e4e4", "#f1d2d2", "#ecbcbc", "#e6a5a5"],
    rgb: "225, 29, 29",
    layers: ["#fde2e2", "#e11d1d"],
  },
  {
    id: "oceano",
    label: "Oceano",
    accent: "#2563eb",
    cursor: "#2563eb",
    cursorTarget: "#1e40af",
    shaderLow: [0.975, 0.985, 1],
    shaderHigh: [0.76, 0.84, 0.99],
    glitch: ["#e4ecfb", "#d3e0f9", "#bccff6", "#a5bef2"],
    rgb: "37, 99, 235",
    layers: ["#dbe7ff", "#2563eb"],
  },
  {
    id: "lavanda",
    label: "Lavanda",
    accent: "#7c3aed",
    cursor: "#7c3aed",
    cursorTarget: "#5b21b6",
    shaderLow: [0.985, 0.978, 1],
    shaderHigh: [0.85, 0.78, 0.99],
    glitch: ["#ede6fb", "#e1d5f9", "#d1bdf5", "#c1a6f1"],
    rgb: "124, 58, 237",
    layers: ["#ece3ff", "#7c3aed"],
  },
  {
    id: "esmeralda",
    label: "Esmeralda",
    accent: "#059669",
    cursor: "#059669",
    cursorTarget: "#065f46",
    shaderLow: [0.975, 0.995, 0.985],
    shaderHigh: [0.74, 0.93, 0.85],
    glitch: ["#e2f5ec", "#cdeedf", "#b2e4cf", "#97dabf"],
    rgb: "5, 150, 105",
    layers: ["#d5f5e8", "#059669"],
  },
  {
    id: "ambar",
    label: "Âmbar",
    accent: "#ea580c",
    cursor: "#ea580c",
    cursorTarget: "#9a3412",
    shaderLow: [1, 0.985, 0.97],
    shaderHigh: [0.99, 0.85, 0.72],
    glitch: ["#fbeadf", "#f8dccb", "#f4c9ad", "#f0b690"],
    rgb: "234, 88, 12",
    layers: ["#ffe7d6", "#ea580c"],
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
