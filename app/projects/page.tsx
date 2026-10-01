import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
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
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
