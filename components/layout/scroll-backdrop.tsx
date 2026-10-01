"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

import { ShaderFlow } from "@/components/shaders/shader-flow";

const Galaxy = dynamic(() => import("@/components/backgrounds/galaxy").then((m) => m.Galaxy), { ssr: false });
const ShapeGrid = dynamic(() => import("@/components/backgrounds/shape-grid").then((m) => m.ShapeGrid), {
  ssr: false,
});
const LetterGlitch = dynamic(() => import("@/components/backgrounds/letter-glitch").then((m) => m.LetterGlitch), {
  ssr: false,
});

export type BackdropKind = "flow" | "galaxy" | "grid" | "glitch";
const KINDS: BackdropKind[] = ["galaxy", "grid", "glitch"];
const FADE_MS = 900;

/**
 * Fundo fixo da landing page: o degradê vermelho/preto (shader) corre o site inteiro e,
 * por cima dele, cada seção marcada com `data-bg` acende sua versão de fundo
 * (Galaxy, Shape Grid ou Letter Glitch), com troca suave durante a rolagem.
 * Só os fundos visíveis (ou saindo) ficam montados, para poupar GPU.
 */
export function ScrollBackdrop(): ReactNode {
  const [active, setActive] = useState<BackdropKind>("flow");
  const [mounted, setMounted] = useState<BackdropKind[]>([]);

  useEffect(() => {
    let raf = 0;
    const measure = (): void => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let kind: BackdropKind = "flow";
      document.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) kind = (el.dataset.bg as BackdropKind) ?? "flow";
      });
      setActive(kind);
    };
    const onScroll = (): void => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Monta o fundo novo na hora; desmonta o antigo depois do fade.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza a lista de camadas com a seção ativa
    setMounted((prev) => (active !== "flow" && !prev.includes(active) ? [...prev, active] : prev));
    const t = window.setTimeout(() => {
      setMounted((prev) => prev.filter((k) => k === active));
    }, FADE_MS + 100);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <div aria-hidden="true" data-backdrop={active} className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Base: o degradê vermelho e preto do topo, agora no corpo inteiro */}
      <div className="absolute inset-0 opacity-60 dark:opacity-100">
        <ShaderFlow
          className="absolute inset-0 h-full w-full"
          brightness={2.2}
          iterations={10}
          flowSpeed={[0, 0.08]}
          colorLowA={[0.08, 0.01, 0.01]}
          colorHighA={[0.55, 0.08, 0.06]}
          fadeCx={0.5}
          fadeCy={0}
          fadeRx={1.5}
          fadeRy={0.85}
        />
      </div>
      <div className="backdrop-gradient absolute inset-0" />

      {KINDS.map((k) =>
        mounted.includes(k) ? (
          <Layer key={k} kind={k} on={active === k} />
        ) : null
      )}
    </div>
  );
}

/** Camada de fundo: entra com opacidade 0 e sobe no quadro seguinte (fade-in de verdade). */
function Layer({ kind, on }: { kind: BackdropKind; on: boolean }): ReactNode {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`backdrop-layer backdrop-layer--${kind} absolute inset-0 transition-opacity ease-out`}
      style={{ opacity: ready && on ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      {kind === "galaxy" ? <Galaxy /> : null}
      {kind === "grid" ? <ShapeGrid /> : null}
      {kind === "glitch" ? <LetterGlitch /> : null}
    </div>
  );
}
