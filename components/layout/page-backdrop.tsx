"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import { usePalette } from "@/lib/palette";
import { useIdle } from "@/lib/use-idle";

// Canvas dos pontos só depois da primeira pintura e da hidratação.
const DotField = dynamic(() => import("@/components/effects/DotField"), { ssr: false });

/** DotField do portfólio antigo sobre o topo (hero); no tema claro segue a paleta escolhida. */
export function PageBackdrop(): ReactNode {
  const light = useTheme().resolvedTheme === "light";
  const pal = usePalette();
  const rgb = pal.rgb;
  const idle = useIdle();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      {idle ? (
      <DotField
        key={`${light}-${rgb}`}
        dotRadius={1.6}
        dotSpacing={18}
        gradientFrom={`rgba(${rgb}, 0.5)`}
        gradientTo={light || pal.id !== "rubi" ? `rgba(${rgb}, 0.25)` : "rgba(255, 209, 0, 0.32)"}
        glowColor={`rgba(${rgb}, 0.35)`}
      />
      ) : null}
    </div>
  );
}
