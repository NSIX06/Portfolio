import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { MapPin } from "lucide-react";
import Image from "next/image";
import TextType from "@/components/effects/TextType";

// O título já diz "Desenvolvedor Full Stack": a linha digitada mostra o resto do perfil.
const ROLES = ["Desenvolvedor Full Stack", "Técnico em Informática", "Graduando em ADS"];

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
            <h1 className="font-serif text-[2.9rem] leading-[0.95] font-extrabold tracking-tight sm:text-[3.6rem] lg:text-[4.1rem]">
              <span className="text-foreground block">Luiz</span>
              <span className="text-foreground block whitespace-nowrap">Felipe P.</span>
              <span className="text-accent block">Bugalho</span>
            </h1>

            <p className="text-foreground/65 max-w-[36ch] text-[19px] leading-[1.45] tracking-tight sm:text-[21px]">
              Sistemas internos, automação de processos e integrações, da análise de requisitos à entrega.
            </p>

            <p className="border-accent/35 bg-accent/8 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border px-4 py-3">
              <span className="text-accent font-mono text-[11px] font-bold tracking-[0.2em] uppercase">Atualmente</span>
              <span className="text-foreground text-[15px] font-semibold tracking-tight sm:text-[16px]">
                Profissional Autônomo — Desenvolvedor Web Freelancer
              </span>
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
              <li className="border-accent-2/40 bg-accent-2/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide">
                <span className="bg-accent-2 h-1.5 w-1.5 animate-pulse rounded-full" aria-hidden="true" />
                Disponível para projetos
              </li>
              <li className="border-foreground/10 text-foreground/70 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide">
                <MapPin className="text-accent h-3.5 w-3.5" aria-hidden="true" />
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
