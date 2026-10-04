import type { ReactNode } from "react";

import DotField from "@/components/effects/DotField";

/** DotField do portfólio antigo sobre o topo (hero); o degradê do shader fica no ScrollBackdrop. */
export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      <DotField
        dotRadius={1.6}
        dotSpacing={18}
        gradientFrom="rgba(225, 29, 29, 0.5)"
        gradientTo="rgba(255, 209, 0, 0.32)"
        glowColor="rgba(225, 29, 29, 0.35)"
      />
    </div>
  );
}
