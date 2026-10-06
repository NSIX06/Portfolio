"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import { ShaderFlow } from "@/components/shaders/shader-flow";
import { usePalette } from "@/lib/palette";

/** Fundo animado do cartão de contato, na cor e no modo escolhidos. */
export function ContactShader(): ReactNode {
  const light = useTheme().resolvedTheme === "light";
  const pal = usePalette();
  return (
    <ShaderFlow
      className="absolute inset-0 h-full w-full"
      scale={3}
      resolution={0.5}
      maxFps={30}
      iterations={10}
      brightness={light ? 1.05 : 2.6}
      colorLowA={light ? pal.shaderLow : pal.dark.cardLow}
      colorHighA={light ? pal.shaderHigh : pal.dark.cardHigh}
    />
  );
}
