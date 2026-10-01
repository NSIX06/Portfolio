import { Knowledge } from "@/components/about/knowledge";
import { Methodologies } from "@/components/about/methodologies";
import { PassionCorner } from "@/components/about/passion-corner";
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

const withIcon = <T extends { icon: string }>({ icon: name, ...rest }: T): Omit<T, "icon"> & { iconData: ReturnType<typeof icon> } => ({
  ...rest,
  iconData: icon(name),
});

/**
 * Landing page única: cada seção marca com `data-bg` qual versão de fundo acende
 * atrás dela (flow = degradê do shader, grid = Shape Grid, glitch = Letter Glitch, dots = degradê + DotField).
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

      <section id="sobre" data-bg="flow" aria-labelledby="sobre-title" className="scroll-mt-24 pt-24 sm:pt-32">
        <SectionHead label="// 01 — sobre" id="sobre-title" sub="Como eu trabalho e o que estou buscando.">
          Sobre <span className="text-accent">mim</span>
        </SectionHead>
        <div className="mx-auto w-full max-w-160 px-6 pt-10 pb-12 sm:px-10 sm:pt-14">
        <FadeIn delay={0.1}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <div className="text-foreground/75 space-y-6 text-[17px] leading-[1.7] tracking-tight sm:text-[18px]">
              <p>
                Minha experiência combina{" "}
                <strong className="text-foreground font-semibold">desenvolvimento de software</strong> com{" "}
                <strong className="text-foreground font-semibold">conhecimento de processos corporativos</strong>, o que
                me ajuda a criar ferramentas pensadas para a rotina de quem vai usá-las.
              </p>
              <p>
                Hoje busco aprimorar meus conhecimentos em{" "}
                <strong className="text-foreground font-semibold">
                  back-end, bancos de dados, cloud, automação e Inteligência Artificial
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
        data-bg="flow"
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
            Carreira, formação e cursos, do que está em andamento ao início. Clique em um card para ver os detalhes.
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
        data-bg="flow"
        aria-labelledby="vitrine-title"
        className="mx-auto w-full max-w-275 scroll-mt-24 px-6 pt-8 pb-16 sm:px-10 sm:pb-24"
      >
        <SectionHead label="// 07 — vitrine" id="vitrine-title" sub="Competências e idiomas.">
          Meu canto de <span className="text-accent">paixões</span>
        </SectionHead>
        <div className="mt-10">
          <PassionCorner />
        </div>
      </section>

      <div id="contato" data-bg="dots" className="scroll-mt-24 pb-12 sm:pb-16">
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
