"use client";

import { useEffect, useState, type ReactNode } from "react";

import { N6Logo } from "@/components/ui/n6-logo";
import { markSiteLoaded } from "@/lib/site-loaded";

const KEY = "fb-preloaded";
const MIN_MS = 1100;
const MAX_MS = 2600;

/**
 * Tela de carregamento (referência: GaaraSan01/PortfolioPessoal): fundo preto, nome e barra
 * vermelha; ao terminar sobe como uma cortina e libera as animações de entrada.
 * Só aparece na primeira visita da sessão; nas seguintes o site libera na hora.
 */
export function Preloader(): ReactNode {
  const [phase, setPhase] = useState<"on" | "leaving" | "gone">("on");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      // sem storage: mostra normalmente
    }
    if (seen) {
      markSiteLoaded();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- some sem animação em visitas repetidas
      setPhase("gone");
      return;
    }

    const start = performance.now();
    let done = false;
    const finish = (): void => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          // ignora
        }
        setPhase("leaving");
        markSiteLoaded();
        window.setTimeout(() => setPhase("gone"), 900);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const fallback = window.setTimeout(finish, MAX_MS);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "leaving" ? "is-leaving" : ""}`} aria-hidden="true">
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
