import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import ScrollExpand from "@/components/effects/ScrollExpand";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projetos",
  description:
    "Sistemas corporativos, projetos acadêmicos e pessoais de Felipe Bugalho.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-foreground font-serif text-[2.75rem] leading-[1.05] font-bold tracking-tight md:text-[3.25rem] lg:text-[3.75rem]">
            Meus trabalhos
          </h1>
          <p className="text-foreground/65 max-w-[33ch] text-[20px] leading-[1.4] tracking-tight sm:text-[22px]">
            Do sistema corporativo em produção aos projetos acadêmicos e
            pessoais.
          </p>
        </FadeIn>
      </section>
      {/* Abertura do portfólio antigo: o logo do projeto principal cresce até a tela cheia */}
      <section aria-hidden="true" className="projects-intro mb-16 sm:mb-24">
        <ScrollExpand
          src="/projetos/tmg-caronas.webp"
          alt=""
          scrollHint="Role para abrir"
          useWindowScroll
          startWidth={44}
          startHeight={56}
          mediaZoom={1.15}
          scrollDistance={0.9}
          holdDistance={0.15}
          overlayScrim={0.3}
        />
      </section>
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
