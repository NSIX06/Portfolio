import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Sobre",
  description: "Trajetória, experiência, formação e stack de Felipe Bugalho.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <h1 className="text-foreground font-serif text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">
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

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
