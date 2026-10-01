import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Car,
  Clapperboard,
  Gauge,
  HeartHandshake,
  ShoppingCart,
  Sprout,
  Terminal,
  UtensilsCrossed,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

/**
 * Projetos. As capas ficam em /public/projetos (geradas a partir do nome e das
 * tecnologias de cada projeto; troque por capturas reais quando tiver).
 */

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  href?: string;
};

const RATIO = 1024 / 768;

const PROJECTS: Project[] = [
  {
    id: "tmg-caronas",
    icon: Car,
    iconLabel: "TMG Caronas",
    title:
      "Sistema corporativo de caronas entre colaboradores das bases da TMG, em produção desde setembro de 2026.",
    description:
      "Ofertar e solicitar caronas, gerenciar participações, avaliar viagens e acompanhar indicadores. Integrado ao Microsoft Entra ID, SQL Server, Azure e Microsoft Teams, e selecionado como um dos quatro pilotos do programa TMG IA.",
    meta: "Desenvolvedor · .NET 10, SQL Server, SignalR · 2026",
    imageRatio: RATIO,
    image: "/projetos/tmg-caronas.webp",
    imageAlt: "Logo do TMG Caronas",
  },
  {
    id: "escolinha-skate-bob",
    icon: HeartHandshake,
    iconLabel: "Escolinha de Skate do Bob",
    title:
      "Site institucional para uma ONG que atende mais de 200 alunos por mês com aulas gratuitas de skate.",
    description:
      'Projeto de extensão da FATEC/UniSENAI para a ONG fundada em 2010 por Igor "Bob" Silva, que usa o skate como ferramenta de inclusão social em Rondonópolis - MT. Publicado e em uso.',
    meta: "Projeto de extensão · HTML, CSS, JavaScript · 2025",
    imageRatio: RATIO,
    image: "/projetos/escolinha-skate-bob.webp",
    imageAlt: "Capa do projeto Escolinha de Skate do Bob",
    href: "https://www.escoladeskatedobob.org.br/",
  },
  {
    id: "orderly-checkout",
    icon: ShoppingCart,
    iconLabel: "Orderly Checkout",
    title:
      "Checkout e gestão de pedidos com controle de transações em tempo real.",
    description:
      "Sistema para otimizar o fluxo de caixa e os pagamentos, com foco na experiência do usuário.",
    meta: "Projeto pessoal · Full stack",
    imageRatio: RATIO,
    image: "/projetos/orderly-checkout.webp",
    imageAlt: "Capa do projeto Orderly Checkout",
    href: "https://github.com/NSIX06/Orderly-Checkout-Main",
  },
  {
    id: "agrodatahub",
    icon: Sprout,
    iconLabel: "AgroDataHub",
    title: "Plataforma de dados para o agronegócio.",
    description:
      "Centraliza, organiza e visualiza informações do setor agrícola para apoiar produtores e gestores na tomada de decisão.",
    meta: "Projeto pessoal · Dados e dashboard",
    imageRatio: RATIO,
    image: "/projetos/agrodatahub.webp",
    imageAlt: "Capa do projeto AgroDataHub",
    href: "https://github.com/NSIX06/AgroDataHub-Main",
  },
  {
    id: "app-restaurant",
    icon: UtensilsCrossed,
    iconLabel: "App Restaurant",
    title: "Gestão de restaurantes com mesas, pedidos e cardápio digital.",
    description:
      "Interface prática para um atendimento ágil, com controle de mesas, pedidos e cardápio integrados.",
    meta: "Projeto pessoal · App",
    imageRatio: RATIO,
    image: "/projetos/app-restaurant.webp",
    imageAlt: "Capa do projeto App Restaurant",
    href: "https://github.com/NSIX06/App_Restaurant",
  },
  {
    id: "braintag",
    icon: Brain,
    iconLabel: "BrainTag",
    title: "Projeto integrador em C# para organizar e gerenciar informações.",
    description:
      "Sistema da formação acadêmica com foco em produtividade e estrutura de dados.",
    meta: "Projeto acadêmico · C#, .NET",
    imageRatio: RATIO,
    image: "/projetos/braintag.webp",
    imageAlt: "Capa do projeto BrainTag",
    href: "https://github.com/NSIX06/BrainTag",
  },
  {
    id: "devops-py",
    icon: Terminal,
    iconLabel: "Devops.py",
    title: "Scripts e automações em Python para práticas de DevOps.",
    description:
      "Automação de tarefas repetitivas e integração entre sistemas.",
    meta: "Projeto pessoal · Python",
    imageRatio: RATIO,
    image: "/projetos/devops-py.webp",
    imageAlt: "Capa do projeto Devops.py",
    href: "https://github.com/NSIX06/Devops.py",
  },
  {
    id: "projeto-cinematic",
    icon: Clapperboard,
    iconLabel: "Projeto Cinematic",
    title: "Sistema de filmes em C#, desenvolvido em colaboração.",
    description:
      "Fork colaborativo que mostra trabalho em equipe e colaboração via GitHub.",
    meta: "Projeto acadêmico · C#",
    imageRatio: RATIO,
    image: "/projetos/projeto-cinematic.webp",
    imageAlt: "Capa do Projeto Cinematic",
    href: "https://github.com/NSIX06/Projeto_Cinematic",
  },
  {
    id: "motos",
    icon: Gauge,
    iconLabel: "Motos",
    title: "Interface web com tema de motocicletas.",
    description: "Foco em layout visual, tipografia e composição com CSS puro.",
    meta: "Projeto pessoal · HTML, CSS",
    imageRatio: RATIO,
    image: "/projetos/motos.webp",
    imageAlt: "Capa do projeto Motos",
    href: "https://github.com/NSIX06/Motos",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="text-foreground font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[3rem] lg:text-[3.5rem]">
              Meus projetos
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              De sistemas corporativos em produção a projetos acadêmicos e
              pessoais, uma seleção do que já entreguei.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Ver todos os projetos
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  const card = (
    <article
      className={`project-card flex flex-col ${project.href ? "cursor-pointer" : ""} border-foreground/8 bg-background gap-4 rounded-3xl border p-3 sm:p-3.5`}
    >
      <header className="flex items-center gap-2.5 px-1 pt-2">
        <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-foreground text-sm font-medium tracking-tight">
          {project.iconLabel}
        </span>
        {project.href ? (
          <ArrowUpRight
            className="text-foreground/40 ml-auto h-4 w-4"
            aria-hidden="true"
          />
        ) : null}
      </header>

      <div
        className="project-card__image ring-foreground/5 bg-foreground/5 relative w-full overflow-hidden rounded-2xl ring-1"
        style={{ aspectRatio: project.imageRatio }}
      >
        <div className="project-card__image-inner">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
            priority={index < 2}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-1 pb-1">
        <h3 className="text-foreground text-[20px] leading-[1.2] font-medium tracking-tight sm:text-[22px]">
          {project.title}
        </h3>
        <p className="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]">
          {project.description}
        </p>
      </div>

      <p className="text-foreground/50 px-1 pb-2 text-[12px] tracking-tight">
        {project.meta}
      </p>
    </article>
  );

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      {project.href ? (
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.iconLabel} (abre em nova aba)`}
          className="focus-ring block rounded-3xl"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </FadeIn>
  );
}
