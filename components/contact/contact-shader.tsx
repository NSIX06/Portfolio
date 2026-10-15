"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useRef, type ReactNode } from "react";

import { usePalette } from "@/lib/palette";
import { useNearViewport } from "@/lib/use-idle";

// WebGL do cartão só quando ele chega perto da tela.
const ShaderFlow = dynamic(() => import("@/components/shaders/shader-flow").then((m) => m.ShaderFlow), {
  ssr: false,
});

/** Fundo animado do cartão de contato, na cor e no modo escolhidos. */
export function ContactShader(): ReactNode {
  const light = useTheme().resolvedTheme === "light";
  const pal = usePalette();
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref);
  return (
    <div ref={ref} className="absolute inset-0">
      {near ? (
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
      ) : null}
    </div>
  );
}
