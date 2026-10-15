import type { ReactNode } from "react";

import { N6Logo } from "@/components/ui/n6-logo";

/**
 * Tela de carregamento só com CSS (sem esperar o JavaScript): aparece na primeira pintura,
 * sobe como cortina aos ~0,85 s e some. Em visitas seguintes da sessão, o script de boot
 * marca <html class="pl-skip"> e ela nem aparece. O tempo das entradas do topo usa a mesma
 * variável (--enter-delay), então tudo continua sincronizado.
 */
export function Preloader(): ReactNode {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-name">
          <N6Logo size={5} />
        </div>
        <div className="preloader-bar">
          <span />
        </div>
        <p className="preloader-label">{"// nsix06 · carregando"}</p>
      </div>
    </div>
  );
}
