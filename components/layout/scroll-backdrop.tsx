"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

import { ShaderFlow } from "@/components/shaders/shader-flow";

const DotField = dynamic(() => import("@/components/effects/DotField"), { ssr: false });
const ShapeGrid = dynamic(() => import("@/components/backgrounds/shape-grid").then((m) => m.ShapeGrid), {
  ssr: false,
});
const LetterGlitch = dynamic(() => import("@/components/backgrounds/letter-glitch").then((m) => m.LetterGlitch), {
  ssr: false,
});

export type BackdropKind = "flow" | "grid" | "glitch" | "dots";
const KINDS: BackdropKind[] = ["grid", "glitch", "dots"];
const FADE_MS = 900;

/**
 * Fundo fixo da landing page: o degradê vermelho/preto (shader) corre o site inteiro e,
 * por cima dele, cada seção marcada com `data-bg` acende sua versão de fundo
 * (Shape Grid, Letter Glitch ou o DotField do final), com troca suave durante a rolagem.
 * Só os fundos visíveis (ou saindo) ficam montados, para poupar GPU.
 */
export function ScrollBackdrop(): ReactNode {
  const [active, setActive] = useState<BackdropKind>("flow");
  const [mounted, setMounted] = useState<BackdropKind[]>([]);
  // Tema claro: mesmo fluxo animado, com cores claras (rosado sobre branco) em vez do vermelho escuro.
  const light = useTheme().resolvedTheme === "light";

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
      <div className="absolute inset-0 opacity-90 dark:opacity-75">
        <ShaderFlow
          className="absolute inset-0 h-full w-full"
          brightness={light ? 1 : 1.7}
          iterations={8}
          resolution={0.35}
          maxFps={30}
          flowSpeed={[0, 0.06]}
          colorLowA={light ? [0.995, 0.975, 0.975] : [0.06, 0.008, 0.008]}
          colorHighA={light ? [0.98, 0.78, 0.78] : [0.42, 0.06, 0.05]}
          fadeCx={0.5}
          fadeCy={0}
          fadeRx={1.5}
          fadeRy={0.85}
        />
      </div>
      <div className="backdrop-gradient absolute inset-0" />

      {KINDS.map((k) =>
        mounted.includes(k) ? (
          <Layer key={k} kind={k} on={active === k} light={light} />
        ) : null
      )}
    </div>
  );
}

/** Camada de fundo: entra com opacidade 0 e sobe no quadro seguinte (fade-in de verdade). */
function Layer({ kind, on, light }: { kind: BackdropKind; on: boolean; light: boolean }): ReactNode {
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
      {kind === "dots" ? (
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          gradientFrom="rgba(225, 29, 29, 0.38)"
          gradientTo="rgba(140, 16, 16, 0.3)"
          glowColor="rgba(225, 29, 29, 0.25)"
        />
      ) : null}
      {kind === "grid" ? (
        <ShapeGrid
          {...(light
            ? { borderColor: "rgba(225, 29, 29, 0.14)", hoverColor: "rgba(225, 29, 29, 0.16)" }
            : {})}
        />
      ) : null}
      {kind === "glitch" ? (
        <LetterGlitch {...(light ? { colors: ["#f6e4e4", "#f1d2d2", "#ecbcbc", "#e6a5a5"] } : {})} />
      ) : null}
    </div>
  );
}
