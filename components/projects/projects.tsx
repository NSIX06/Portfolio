"use client";

import {
  ArrowLeft,
  Github,
  Globe,
  Lock,
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
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import {
  ALL_REPOS_URL,
  PROJECTS,
  type Project,
  type ProjectIcon,
} from "@/lib/projects";

const ICONS: Record<ProjectIcon, ComponentType<{ className?: string }>> = {
  car: Car,
  heart: HeartHandshake,
  cart: ShoppingCart,
  sprout: Sprout,
  utensils: UtensilsCrossed,
  brain: Brain,
  terminal: Terminal,
  clapper: Clapperboard,
  gauge: Gauge,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const [openId, setOpenId] = useState<string | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = (id: string, trigger: HTMLElement): void => {
    lastTrigger.current = trigger;
    setOpenId(id);
  };
  const close = (): void => {
    setOpenId(null);
    lastTrigger.current?.focus({ preventScroll: true });
  };

  const current = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <p className="section-label">{"// 03 — projetos"}</p>
            <h2 className="text-foreground font-serif text-[2.5rem] leading-[1.05] font-bold tracking-tight md:text-[3rem] lg:text-[3.5rem]">
              Meus projetos
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              De sistemas corporativos em produção a projetos acadêmicos e
              pessoais. Clique em um projeto para ver os detalhes.
            </p>
          </FadeIn>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={open}
            />
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
        ) : (
          <FadeIn className="mt-10 sm:mt-14">
            <a
              href={ALL_REPOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-banner focus-ring group border-accent/30 hover:border-accent/60 relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl border p-6 transition-colors sm:flex-row sm:items-center sm:p-8"
            >
              <span className="bg-foreground text-background relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <Github className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="relative flex flex-1 flex-col gap-1">
                <span className="text-accent font-mono text-[11px] tracking-[0.16em] uppercase">github.com/NSIX06</span>
                <span className="text-foreground font-serif text-[1.5rem] leading-tight font-bold tracking-tight sm:text-[1.8rem]">
                  Veja todos os meus repositórios
                </span>
                <span className="text-foreground/60 text-[15px] tracking-tight">
                  Código-fonte, estudos e projetos em andamento.
                </span>
              </span>
              <span className="bg-accent relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_var(--accent)] transition-transform group-hover:translate-x-1">
                Abrir GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </FadeIn>
        )}
      </div>

      <AnimatePresence>
        {current ? (
          <ProjectPanel
            key="panel"
            project={current}
            onClose={close}
            onNavigate={setOpenId}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (id: string, trigger: HTMLElement) => void;
}): ReactNode {
  const Icon = ICONS[project.icon];
  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <FadeIn delay={Math.min((index % 2) * 0.08, 0.3)} className="h-full">
      {/* O botão "estica" sobre o cartão inteiro; os links de repositório/site ficam por cima dele */}
      <article className="project-card glow-hover group border-foreground/8 bg-background relative flex h-full flex-col gap-4 rounded-3xl border p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
            <Icon className="text-accent h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 className="text-foreground text-sm font-medium tracking-tight">
            <button
              type="button"
              onClick={(e) => onOpen(project.id, e.currentTarget)}
              aria-haspopup="dialog"
              className="focus-ring rounded-md text-left after:absolute after:inset-0 after:z-[5] after:rounded-3xl after:content-['']"
            >
              {project.name}
            </button>
          </h3>
          {project.status ? (
            <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              {project.status}
            </span>
          ) : null}
        </header>

        <div className="project-card__image ring-foreground/5 bg-foreground/5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1">
          <div className="project-card__image-inner">
            <ProjectVisual
              project={project}
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-1">
          <p className="text-foreground line-clamp-2 min-h-[2.4em] text-[19px] leading-[1.2] font-medium tracking-tight sm:text-[20px]">
            {project.headline}
          </p>
          <p className="text-foreground/65 line-clamp-3 min-h-[4.5em] text-[14px] leading-normal tracking-tight sm:text-[15px]">
            {project.summary}
          </p>
        </div>

        <div className="border-foreground/8 mt-auto flex flex-wrap items-center gap-2 border-t px-1 pt-3 pb-1.5">
          <span className="text-foreground/50 mr-auto font-mono text-[11px] tracking-wide uppercase">{meta}</span>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring border-foreground/12 text-foreground hover:border-accent hover:text-accent relative z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              Site
              <span className="sr-only">de {project.name} (abre em nova aba)</span>
            </a>
          ) : null}
          {project.github && project.github !== "https://github.com/NSIX06" ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring bg-foreground text-background hover:bg-accent relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors hover:text-white"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Repositório
              <span className="sr-only">de {project.name} no GitHub (abre em nova aba)</span>
            </a>
          ) : !project.live ? (
            <span className="text-foreground/45 inline-flex items-center gap-1.5 text-[12px]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Privado
            </span>
          ) : null}
          <span className="text-accent inline-flex items-center gap-1 pl-1 text-[13px] font-medium">
            Detalhes
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    </FadeIn>
  );
}

/**
 * Aba de detalhes do projeto (inspirada na página de projeto do PortfolioPessoal do
 * GaaraSan01): categoria e ano, título, capa, "Sobre o projeto", objetivo, destaques e
 * uma lateral com tecnologias, ano, categoria, papel, status e links.
 */
function ProjectPanel({
  project,
  onClose,
  onNavigate,
}: {
  project: Project;
  onClose: () => void;
  onNavigate: (id: string) => void;
}): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];

  // Trava a rolagem da página, foca o painel e fecha com Esc.
  useEffect(() => {
    window.dispatchEvent(new Event("lenis:stop"));
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = previous;
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, []);

  // Ao trocar de projeto dentro da aba, volta ao topo dela.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const Icon = ICONS[project.icon];
  const label = [project.category, project.year].filter(Boolean).join(" · ");
  const titleId = `projeto-${project.id}-titulo`;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        aria-label="Fechar detalhes do projeto"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-background border-foreground/10 relative h-full w-full max-w-[56rem] overflow-y-auto overscroll-contain border-l shadow-2xl"
      >
        <div className="bg-background/90 border-foreground/8 sticky top-0 z-10 flex items-center justify-between border-b px-5 py-3 backdrop-blur sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="focus-ring text-foreground/70 hover:text-foreground inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todos os projetos
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="focus-ring border-foreground/10 text-foreground/70 hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-8 px-5 pt-8 pb-12 sm:px-8"
        >
          <header className="flex flex-col gap-4">
            <p className="section-label inline-flex items-center gap-2">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </p>
            <h2
              id={titleId}
              className="text-foreground font-serif text-[2rem] leading-[1.05] font-bold tracking-tight sm:text-[2.6rem]"
            >
              {project.name}
            </h2>
            <p className="text-foreground/70 max-w-[52ch] text-[17px] leading-relaxed tracking-tight sm:text-[19px]">
              {project.headline}
            </p>
          </header>

          <div
            className="ring-foreground/8 relative w-full overflow-hidden rounded-3xl ring-1"
            style={{ aspectRatio: 1024 / 768 }}
          >
            <ProjectVisual project={project} sizes="(min-width: 900px) 860px, 100vw" large />
          </div>

          <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-3">
                <h3 className="text-foreground text-[18px] font-semibold tracking-tight">
                  Sobre o projeto
                </h3>
                <p className="text-foreground/75 text-[16px] leading-[1.7] tracking-tight">
                  {project.about}
                </p>
              </section>

              {project.objective ? (
                <section className="flex flex-col gap-3">
                  <h3 className="text-foreground text-[18px] font-semibold tracking-tight">
                    Objetivo
                  </h3>
                  <p className="text-foreground/75 text-[16px] leading-[1.7] tracking-tight">
                    {project.objective}
                  </p>
                </section>
              ) : null}

              {project.highlights?.length ? (
                <section className="flex flex-col gap-3">
                  <h3 className="text-foreground text-[18px] font-semibold tracking-tight">
                    Destaques
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-foreground/75 flex gap-3 text-[15px] leading-relaxed tracking-tight"
                      >
                        <span
                          className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="border-foreground/8 bg-foreground/[0.02] flex h-fit flex-col gap-5 rounded-3xl border p-5">
              <SidebarBlock title="Tecnologias">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="border-foreground/10 text-foreground/80 rounded-full border px-2.5 py-1 text-[12px] tracking-tight"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </SidebarBlock>
              {project.year ? (
                <SidebarBlock title="Ano">{project.year}</SidebarBlock>
              ) : null}
              <SidebarBlock title="Categoria">{project.category}</SidebarBlock>
              <SidebarBlock title="Papel">{project.role}</SidebarBlock>
              {project.status ? (
                <SidebarBlock title="Status">{project.status}</SidebarBlock>
              ) : null}

              <div className="flex flex-col gap-2 pt-1">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring bg-accent inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Ver projeto ao vivo
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                ) : null}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring border-foreground/10 text-foreground hover:bg-foreground/5 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
                  >
                    Ver no GitHub
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                ) : null}
                {!project.live && !project.github ? (
                  <p className="text-foreground/55 text-[13px] leading-relaxed">
                    Sistema interno da empresa: código e acesso não são
                    públicos.
                  </p>
                ) : null}
              </div>
            </aside>
          </div>

          <nav
            aria-label="Outros projetos"
            className="border-foreground/8 flex items-center justify-between gap-4 border-t pt-6"
          >
            {prev ? (
              <button
                type="button"
                onClick={() => onNavigate(prev.id)}
                className="focus-ring text-foreground/70 hover:text-foreground inline-flex items-center gap-2 rounded-lg text-left text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="text-foreground/45 block font-mono text-[10px] tracking-wide uppercase">
                    Anterior
                  </span>
                  {prev.name}
                </span>
              </button>
            ) : (
              <span />
            )}
            {next ? (
              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="focus-ring text-foreground/70 hover:text-foreground inline-flex items-center gap-2 rounded-lg text-right text-sm transition-colors"
              >
                <span>
                  <span className="text-foreground/45 block font-mono text-[10px] tracking-wide uppercase">
                    Próximo
                  </span>
                  {next.name}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            ) : null}
          </nav>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Imagem do projeto ou, sem imagem real, o emoji grande sobre o pontilhado vermelho
 * (como os cards da primeira versão do portfólio).
 */
export function ProjectVisual({
  project,
  sizes,
  priority = false,
  large = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  large?: boolean;
}): ReactNode {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? ""}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    );
  }
  return (
    <div className="project-emoji absolute inset-0 flex flex-col items-center justify-center gap-3">
      <span
        aria-hidden="true"
        className={`project-emoji__glyph ${large ? "text-[7rem]" : "text-[5rem]"} leading-none`}
      >
        {project.emoji}
      </span>
      <span className="text-foreground font-serif text-[clamp(1.1rem,2.4vw,1.6rem)] font-bold tracking-tight">
        {project.name}
      </span>
      <span className="text-foreground/50 font-mono text-[10px] tracking-[0.18em] uppercase">
        {project.category}
      </span>
    </div>
  );
}

function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground/50 font-mono text-[10px] tracking-[0.16em] uppercase">
        {title}
      </h4>
      <div className="text-foreground text-[15px] tracking-tight">
        {children}
      </div>
    </div>
  );
}
