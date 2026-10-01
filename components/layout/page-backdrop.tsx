import type { ReactNode } from "react";

import DotField from "@/components/effects/DotField";
import { ShaderFlow } from "../shaders/shader-flow";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 md:opacity-100">
        <ShaderFlow
          className="absolute inset-0 h-full w-full"
          brightness={2.6}
          iterations={10}
          flowSpeed={[0, 0.1]}
          colorLowA={[0.1, 0.02, 0.02]}
          colorHighA={[0.62, 0.1, 0.08]}
        />
      </div>
      {/* Fundo original do template (shader) mesclado com o DotField do portfólio antigo */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <DotField
          dotRadius={1.6}
          dotSpacing={18}
          gradientFrom="rgba(225, 29, 29, 0.5)"
          gradientTo="rgba(255, 209, 0, 0.32)"
          glowColor="rgba(225, 29, 29, 0.35)"
        />
      </div>
    </div>
  );
}
