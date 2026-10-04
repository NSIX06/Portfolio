"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import DotField from "@/components/effects/DotField";
import { usePalette } from "@/lib/palette";

/** DotField do portfólio antigo sobre o topo (hero); no tema claro segue a paleta escolhida. */
export function PageBackdrop(): ReactNode {
  const light = useTheme().resolvedTheme === "light";
  const pal = usePalette();
  const rgb = light ? pal.rgb : "225, 29, 29";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      <DotField
        key={rgb}
        dotRadius={1.6}
        dotSpacing={18}
        gradientFrom={`rgba(${rgb}, 0.5)`}
        gradientTo={light ? `rgba(${rgb}, 0.25)` : "rgba(255, 209, 0, 0.32)"}
        glowColor={`rgba(${rgb}, 0.35)`}
      />
    </div>
  );
}
