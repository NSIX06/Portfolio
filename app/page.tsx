import { Knowledge } from "@/components/about/knowledge";
import { Methodologies } from "@/components/about/methodologies";
import { PassionCorner } from "@/components/about/passion-corner";
import { PolaroidStrip, type PolaroidItem } from "@/components/about/polaroid-strip";
import { Stats } from "@/components/about/stats";
import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { TechStack } from "@/components/stack/tech-stack";
import { Timeline } from "@/components/trajectory/timeline";
import { TechMarquee } from "@/components/trajectory/tech-marquee";
import { FadeIn } from "@/components/ui/motion-primitives";
import { icon } from "@/lib/icons";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { METHODOLOGIES, METHODOLOGIES_INTRO, SKILL_CATEGORIES } from "@/lib/skills";
import { LANGUAGES, TECHNOLOGIES } from "@/lib/tech-stack";
import { MILESTONES } from "@/lib/trajectory";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Início",
  description: siteConfig.description,
  path: "/",
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

const withIcon = <T extends { icon: string }>({ icon: name, ...rest }: T): Omit<T, "icon"> & { iconData: ReturnType<typeof icon> } => ({
  ...rest,
  iconData: icon(name),
});

/**
 * Landing page única: cada seção marca com `data-bg` qual versão de fundo acende
 * atrás dela (flow = degradê do shader, galaxy, grid = Shape Grid, glitch = Letter Glitch).
 */
export default function HomePage(): ReactNode {
  const timeline = MILESTONES.map((m) => ({ ...m, iconData: icon(m.icon) }));
  const knowledge = SKILL_CATEGORIES.map(({ icon: catIcon, items, ...c }) => ({
    ...c,
    iconData: icon(catIcon),
    items: items.map((it) => ({ name: it.name, iconData: it.icon ? icon(it.icon) : undefined })),
  }));
  const methodologies = METHODOLOGIES.map(withIcon);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <div id="inicio" data-bg="flow">
        <Hero />
        <TechMarquee />
      </div>

      <section id="sobre" data-bg="galaxy" aria-labelledby="sobre-title" className="scroll-mt-24 pt-24 sm:pt-32">
        <SectionHead label="// 01 — sobre" id="sobre-title" sub="Um pouco de quem eu sou e dos momentos que me trouxeram até aqui.">
          Prazer, <span className="text-accent">Felipe</span>
        </SectionHead>
        <div className="mx-auto mt-12 w-full max-w-312 sm:mt-16">
          <PolaroidStrip items={POLAROIDS} />
        </div>
        <div className="mx-auto w-full max-w-160 px-6 pt-16 pb-12 sm:px-10 sm:pt-24">
        <FadeIn delay={0.1}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <h2 className="text-foreground font-serif text-[1.75rem] font-bold tracking-tight sm:text-[2rem]">
              Olá! Eu sou o{" "}
              <span className="border-foreground/30 border-b pb-0.5">
                Luiz Felipe Pablos Bugalho
              </span>
              .
            </h2>
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
        </div>
        <div className="mx-auto w-full max-w-[40rem] px-6 pb-16 sm:px-10">
          <FadeIn delay={0.1}>
            <Stats />
          </FadeIn>
        </div>
      </section>

      {/* Trajetória: abas Profissional/Acadêmica + linha do tempo expansível */}
      <section
        id="trajetoria"
        aria-labelledby="trajetoria-title"
        data-bg="galaxy"
        className="relative w-full scroll-mt-24 pt-8 pb-16 sm:pb-24"
      >
        <FadeIn className="mx-auto flex w-full max-w-275 flex-col items-center gap-4 px-6 text-center sm:px-10">
          <p className="section-label">{"// 02 — trajetória"}</p>
          <h2
            id="trajetoria-title"
            className="text-foreground font-serif text-[2.4rem] leading-[1.05] font-extrabold tracking-tight md:text-[3rem] lg:text-[3.5rem]"
          >
            A estrada até <span className="text-accent">aqui</span>
          </h2>
          <p className="text-foreground/65 max-w-[36ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
            Carreira e formação, do técnico em informática ao TMG Caronas em
            produção. Clique em um item para ver os detalhes.
          </p>
        </FadeIn>
        <div className="mt-6 sm:mt-10">
          <Timeline items={timeline} />
        </div>
      </section>

      <div id="projetos" data-bg="grid" className="scroll-mt-24 pb-16 sm:pb-24">
        <Projects withHeadline />
      </div>

      <div data-bg="glitch" className="flex flex-col gap-0">
        <div className="pt-8 pb-16 sm:pb-24">
          <TechStack languages={LANGUAGES.map(withIcon)} technologies={TECHNOLOGIES.map(withIcon)} />
        </div>

        <section
          id="habilidades"
          aria-labelledby="habilidades-title"
          className="mx-auto w-full max-w-275 scroll-mt-24 px-6 pt-8 pb-16 sm:px-10 sm:pb-24"
        >
          <SectionHead label="// 05 — habilidades" id="habilidades-title" sub="Linguagens, frameworks, sistemas corporativos e infraestrutura, organizados por área.">
            Habilidades & <span className="text-accent">Conhecimentos</span>
          </SectionHead>
          <div className="mt-10">
            <Knowledge categories={knowledge} />
          </div>
        </section>

        <section
          id="metodologias"
          aria-labelledby="metodologias-title"
          className="mx-auto w-full max-w-275 scroll-mt-24 px-6 pt-8 pb-16 sm:px-10 sm:pb-24"
        >
          <SectionHead label="// 06 — metodologias" id="metodologias-title" sub="Como organizo o trabalho do backlog à entrega.">
            Metodologias <span className="text-accent">ágeis</span>
          </SectionHead>
          <div className="mt-10">
            <Methodologies items={methodologies} intro={METHODOLOGIES_INTRO} />
          </div>
        </section>
      </div>

      <section
        id="vitrine"
        data-bg="galaxy"
        aria-labelledby="vitrine-title"
        className="mx-auto w-full max-w-275 scroll-mt-24 px-6 pt-8 pb-16 sm:px-10 sm:pb-24"
      >
        <SectionHead label="// 07 — vitrine" id="vitrine-title" sub="Certificações, competências e idiomas em um só lugar.">
          Meu canto de <span className="text-accent">paixões</span>
        </SectionHead>
        <div className="mt-10">
          <PassionCorner />
        </div>
      </section>

      <div id="contato" data-bg="flow" className="scroll-mt-24 pb-12 sm:pb-16">
        <ContactCard />
      </div>
    </main>
  );
}

function SectionHead({
  label,
  id,
  sub,
  children,
}: {
  label: string;
  id: string;
  sub: string;
  children: ReactNode;
}): ReactNode {
  return (
    <FadeIn className="flex flex-col items-center gap-4 text-center">
      <p className="section-label">{label}</p>
      <h2
        id={id}
        className="text-foreground font-serif text-[1.55rem] leading-[1.05] min-[400px]:text-[1.85rem] sm:text-[2.4rem] font-extrabold tracking-tight md:text-[3rem] lg:text-[3.5rem]"
      >
        {children}
      </h2>
      <p className="text-foreground/65 max-w-[40ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
        {sub}
      </p>
    </FadeIn>
  );
}
