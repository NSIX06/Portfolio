import {
  PolaroidStrip,
  type PolaroidItem,
} from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { Stats } from "@/components/about/stats";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Timeline } from "@/components/trajectory/timeline";
import { TrajectoryVideo } from "@/components/trajectory/trajectory-video";
import { icon } from "@/lib/icons";
import { MILESTONES } from "@/lib/trajectory";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Sobre",
  description:
    "Trajetória, linha do tempo, formação e stack de Felipe Bugalho.",
  path: "/about",
});

/** Momentos da trajetória nos polaroids: foto, quatro marcos e o lançamento do TMG Caronas. */
const POLAROIDS: PolaroidItem[] = [
  {
    id: "eu",
    caption: "Felipe Bugalho",
    sub: "Rondonópolis - MT",
    src: "/felipe_cor.webp",
  },
  {
    id: "senac",
    caption: "Técnico em TI",
    sub: "SENAC",
    year: "2022",
    iconData: icon("ph:desktop-tower-duotone"),
  },
  {
    id: "unisenai",
    caption: "ADS",
    sub: "UniSENAI MT",
    year: "2024",
    iconData: icon("ph:graduation-cap-duotone"),
  },
  {
    id: "tmg",
    caption: "PCM",
    sub: "TMG",
    year: "2024",
    iconData: icon("ph:gear-six-duotone"),
  },
  {
    id: "escolinha",
    caption: "Escolinha do Bob",
    sub: "Projeto social",
    year: "2025",
    iconData: icon("ph:hand-heart-duotone"),
  },
  {
    id: "caronas",
    caption: "TMG Caronas",
    sub: "Lançado · 2026",
    src: "/projetos/tmg-caronas.webp",
    imageFit: "contain",
    imageBg: "#012b5b",
  },
];

const STACK_ICONS: Record<string, string> = {
  ".NET": "logos:dotnet",
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  TypeScript: "logos:typescript-icon",
  Python: "logos:python",
  FastAPI: "logos:fastapi-icon",
  PostgreSQL: "logos:postgresql",
  Supabase: "logos:supabase-icon",
  Flutter: "logos:flutter",
  Docker: "logos:docker-icon",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
};

export default function AboutPage(): ReactNode {
  const stackIcons = Object.fromEntries(
    Object.entries(STACK_ICONS).map(([label, name]) => [label, icon(name)])
  );
  const timeline = MILESTONES.map((m) => ({ ...m, iconData: icon(m.icon) }));

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip items={POLAROIDS} />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <h1 className="text-foreground font-serif text-[1.75rem] font-bold tracking-tight sm:text-[2rem]">
              Olá! Eu sou o{" "}
              <span className="border-foreground/30 border-b pb-0.5">
                Luiz Felipe Pablos Bugalho
              </span>
              .
            </h1>
            <div className="text-foreground/75 mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight sm:text-[18px]">
              <p>
                <strong className="text-foreground font-semibold">
                  Desenvolvedor Full Stack e técnico em informática
                </strong>
                , graduando em{" "}
                <strong className="text-foreground font-semibold">
                  Análise e Desenvolvimento de Sistemas
                </strong>{" "}
                na UniSENAI MT, em Rondonópolis - MT.
              </p>
              <p>
                Minha experiência combina desenvolvimento de software com{" "}
                <strong className="text-foreground font-semibold">
                  conhecimento de processos corporativos
                </strong>
                : fui usuário-chave do TOTVS Protheus no Planejamento e Controle
                de Manutenção (PCM) da TMG, onde também criei ferramentas
                internas, como o{" "}
                <strong className="text-foreground font-semibold">
                  TMG Caronas
                </strong>
                , hoje em produção.
              </p>
              <p>
                Atualmente atuo como{" "}
                <strong className="text-foreground font-semibold">
                  desenvolvedor web freelancer
                </strong>{" "}
                e busco aprimorar meus conhecimentos em{" "}
                <strong className="text-foreground font-semibold">
                  desenvolvimento web, backend, bancos de dados, cloud,
                  automação e Inteligência Artificial
                </strong>
                .
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-16 sm:px-10">
        <FadeIn delay={0.1}>
          <Stats />
        </FadeIn>
      </section>

      {/* Trajetória: vídeo controlado pela rolagem + linha do tempo */}
      <section
        id="trajetoria"
        aria-labelledby="trajetoria-title"
        className="relative w-full pt-8 pb-16 sm:pb-24"
      >
        <FadeIn className="mx-auto flex w-full max-w-275 flex-col items-center gap-4 px-6 text-center sm:px-10">
          <p className="section-label">{"// 01 — trajetória"}</p>
          <h2
            id="trajetoria-title"
            className="text-foreground font-serif text-[2.4rem] leading-[1.05] font-extrabold tracking-tight md:text-[3rem] lg:text-[3.5rem]"
          >
            A estrada até <span className="text-accent">aqui</span>
          </h2>
          <p className="text-foreground/65 max-w-[36ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
            Role para percorrer: do técnico em informática ao TMG Caronas em
            produção.
          </p>
        </FadeIn>
        <TrajectoryVideo />
        <div className="mt-6 sm:mt-10">
          <Timeline items={timeline} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Skills />
            <Stack icons={stackIcons} />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
