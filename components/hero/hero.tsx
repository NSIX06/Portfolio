import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import Image from "next/image";
import TextType from "@/components/effects/TextType";

// O título já diz "Desenvolvedor Full Stack": a linha digitada mostra o resto do perfil.
const ROLES = ["Técnico em Informática", "Graduando em ADS", "Desenvolvedor Web Freelancer"];

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="section-label">
              <span aria-hidden="true">{"// "}</span>
              <TextType
                as="span"
                text={ROLES}
                typingSpeed={60}
                deletingSpeed={30}
                pauseDuration={2200}
                initialDelay={700}
                cursorCharacter="_"
                srText={ROLES.join(", ")}
              />
            </p>
            <p className="text-foreground text-[20px] leading-tight font-medium tracking-tight">
              Oi <span aria-hidden="true">👋</span>, eu sou o Felipe
            </p>

            <h1 className="text-foreground font-serif text-[1.8rem] leading-[1.08] font-bold tracking-tight sm:text-[2.2rem] md:text-[2.3rem] lg:text-[2.7rem]">
              <span className="block whitespace-nowrap">Desenvolvedor</span>
              <span className="text-accent block whitespace-nowrap">
                Full Stack
              </span>
            </h1>

            <p className="text-foreground/65 max-w-[34ch] text-[22px] leading-[1.4] tracking-tight">
              Sistemas internos, automação de processos e integrações, da
              análise de requisitos à entrega.
            </p>

            <HeroCtas />

            <ul
              className="mt-1 flex flex-wrap gap-2"
              aria-label="Disponibilidade"
            >
              <li className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] tracking-wide text-emerald-600 dark:text-emerald-400">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Disponível para contratação
              </li>
              <li className="border-foreground/10 text-foreground/65 inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide">
                Rondonópolis - MT · remoto
              </li>
            </ul>
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="border-foreground/8 bg-background relative aspect-square w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm md:max-w-105">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/felipe_cor.webp"
                  alt="Foto de Felipe Bugalho"
                  fill
                  priority
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
