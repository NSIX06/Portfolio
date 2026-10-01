"use client";

import { ArrowUpRight, Award, ChevronLeft, ChevronRight, Github, Globe, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ProjectVisual } from "@/components/projects/projects";
import { CERTIFICATES } from "@/lib/certificates";
import { PROJECTS } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

const LANGUAGES = [
  { language: "Português", level: "Nativo", dots: 4 },
  { language: "Inglês", level: "Intermediário · EF SET B1", dots: 3 },
  { language: "Espanhol", level: "Intermediário", dots: 3 },
  { language: "Francês", level: "Básico", dots: 1 },
];

const AREAS = [
  "Desenvolvimento Web",
  "Full Stack",
  "Sistemas Corporativos",
  "Automação de Processos",
  "Integração de Sistemas",
  "APIs REST",
  "Bancos de Dados",
  "Análise de Requisitos",
  "Suporte e Infraestrutura",
];

const SOFT_SKILLS = [
  "Comunicação eficaz",
  "Trabalho em equipe",
  "Resolução de problemas",
  "Relacionamento interpessoal",
  "Criatividade e inovação",
  "Planejamento e organização",
  "Proatividade",
  "Aprendizado contínuo",
];

const TABS = [
  { id: "projetos", label: "Projetos", count: PROJECTS.length },
  { id: "certificacoes", label: "Certificações", count: CERTIFICATES.length },
  { id: "competencias", label: "Competências", count: AREAS.length + SOFT_SKILLS.length },
  { id: "idiomas", label: "Idiomas", count: LANGUAGES.length },
] as const;
type TabId = (typeof TABS)[number]["id"];

/**
 * "Passion Corner" (referência: antonio-bastos.com): abas com projetos, certificações em
 * carrossel/acordeão automático, competências e idiomas.
 */
export function PassionCorner(): ReactNode {
  const [tab, setTab] = useState<TabId>("projetos");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Seções"
          className="bg-foreground/5 border-foreground/8 flex max-w-full gap-1 overflow-x-auto rounded-full border p-1 [scrollbar-width:none]"
        >
          {TABS.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="passion-panel"
                onClick={() => setTab(t.id)}
                className={`focus-ring relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors sm:px-6 sm:text-[14px] ${
                  on ? "text-white" : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="passion-tab"
                    className="bg-accent absolute inset-0 rounded-full shadow-[0_8px_24px_-8px_var(--accent)]"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                ) : null}
                <span className="relative">
                  {t.label} <span className="opacity-70">({t.count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="passion-panel"
        role="tabpanel"
        className="border-foreground/6 bg-foreground/2 rounded-[2rem] border p-3 sm:p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {tab === "projetos" ? <ProjectsTab /> : null}
            {tab === "certificacoes" ? <CertificatesTab /> : null}
            {tab === "competencias" ? <SkillsTab /> : null}
            {tab === "idiomas" ? <LanguagesTab /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function hostOf(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
}

function ProjectsTab(): ReactNode {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {PROJECTS.map((p, i) => {
        const link = p.live ?? p.github;
        return (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
            className="glow-hover group border-foreground/8 bg-background flex flex-col overflow-hidden rounded-3xl border"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <ProjectVisual project={p} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              {p.status ? (
                <span className="bg-accent absolute top-3 right-3 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white uppercase shadow">
                  {p.status}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <span className="text-foreground/45 font-mono text-[10px] tracking-[0.14em] uppercase">{p.category}</span>
              <h3 className="text-foreground text-[17px] font-semibold tracking-tight">{p.name}</h3>
              <p className="text-foreground/60 line-clamp-2 text-[13px] leading-relaxed">{p.headline}</p>
              <div className="border-foreground/8 mt-auto flex items-center gap-2 border-t pt-3">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-foreground/60 hover:text-accent inline-flex min-w-0 items-center gap-1.5 text-[12px] transition-colors"
                  >
                    {p.live ? <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <Github className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                    <span className="truncate">{p.live ? hostOf(p.live) : "GitHub"}</span>
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                ) : (
                  <span className="text-foreground/45 text-[12px]">Privado</span>
                )}
                {p.year ? <span className="text-foreground/40 ml-auto font-mono text-[11px]">{p.year}</span> : null}
                <Link
                  href="/projects"
                  className={`focus-ring bg-foreground text-background hover:bg-accent inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors hover:text-white ${p.year ? "" : "ml-auto"}`}
                >
                  Detalhes
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}

const PAGE = 5;
const AUTOPLAY_MS = 4200;

function CertificatesTab(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const total = CERTIFICATES.length;
  const page = Math.floor(active / PAGE);
  const slice = CERTIFICATES.slice(page * PAGE, page * PAGE + PAGE);
  const running = playing && !hover && inView;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [running, active, total]);

  const go = (d: number): void => setActive((a) => (a + d + total) % total);
  const cert = CERTIFICATES[active];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="project-emoji relative overflow-hidden rounded-3xl p-4 sm:p-6"
    >
      {/* Painel de fundo: nome grande do certificado ativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden items-end justify-end p-8 md:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex max-w-[22rem] flex-col items-end gap-3 text-right"
          >
            <Award className="text-accent h-16 w-16 opacity-80" strokeWidth={1.25} />
            <p className="text-foreground/90 font-serif text-[1.8rem] leading-[1.05] font-extrabold tracking-tight">
              {cert?.name}
            </p>
            <p className="text-foreground/50 font-mono text-[11px] tracking-[0.16em] uppercase">{cert?.institution}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="relative flex max-w-md flex-col gap-2">
        {slice.map((c, i) => {
          const idx = page * PAGE + i;
          const on = idx === active;
          return (
            <motion.li key={c.name} layout transition={{ duration: 0.35, ease: EASE }}>
              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-expanded={on}
                className={`focus-ring w-full rounded-2xl border text-left backdrop-blur-md transition-colors ${
                  on
                    ? "border-accent/40 bg-background/90 p-4 shadow-xl"
                    : "border-foreground/10 bg-background/60 hover:bg-background/80 px-4 py-2.5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${on ? "bg-accent" : "bg-foreground/25"}`}
                  />
                  <span className={`text-foreground tracking-tight ${on ? "text-[15px] font-semibold" : "text-[13px] font-medium"}`}>
                    {c.name}
                  </span>
                </span>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="block overflow-hidden"
                    >
                      <span className="text-foreground/60 mt-2 block pl-4 text-[13px] leading-relaxed">
                        {c.institution}
                        {c.partner ? ` + ${c.partner}` : ""}
                        {c.workload ? ` · ${c.workload}` : ""}
                      </span>
                      <span
                        className={`mt-2 ml-4 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase ${
                          c.inProgress ? "border-accent-2/50 text-accent-2 border" : "bg-foreground text-background"
                        }`}
                      >
                        {c.inProgress ? "Em andamento" : "Concluído"}
                      </span>
                      {running ? (
                        <span className="bg-foreground/10 mt-3 ml-4 block h-0.5 overflow-hidden rounded-full">
                          <motion.span
                            key={`bar-${active}`}
                            className="bg-accent block h-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                          />
                        </span>
                      ) : null}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <div className="relative mt-4 flex items-center gap-2">
        <div className="border-foreground/10 bg-background/80 inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur-md">
          <button type="button" onClick={() => go(-1)} aria-label="Certificado anterior" className="focus-ring hover:bg-foreground/8 inline-flex h-7 w-7 items-center justify-center rounded-full">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="text-foreground/70 min-w-14 text-center font-mono text-[11px]" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Próximo certificado" className="focus-ring hover:bg-foreground/8 inline-flex h-7 w-7 items-center justify-center rounded-full">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar rotação" : "Retomar rotação"}
          className="focus-ring border-foreground/10 bg-background/80 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md"
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

function ChipList({ items, delay = 0 }: { items: string[]; delay?: number }): ReactNode {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: delay + i * 0.03 }}
          whileHover={{ y: -3 }}
          className="border-foreground/10 bg-background text-foreground/85 rounded-full border px-4 py-2 text-[14px] tracking-tight"
        >
          {s}
        </motion.li>
      ))}
    </ul>
  );
}

function SkillsTab(): ReactNode {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border-foreground/8 bg-background flex flex-col gap-3 rounded-3xl border p-5">
        <h3 className="text-foreground/50 font-mono text-[10px] tracking-[0.16em] uppercase">O que faço</h3>
        <ChipList items={AREAS} />
      </div>
      <div className="border-foreground/8 bg-background flex flex-col gap-3 rounded-3xl border p-5">
        <h3 className="text-foreground/50 font-mono text-[10px] tracking-[0.16em] uppercase">Competências comportamentais</h3>
        <ChipList items={SOFT_SKILLS} delay={0.15} />
      </div>
    </div>
  );
}

function LanguagesTab(): ReactNode {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {LANGUAGES.map((l, i) => (
        <motion.li
          key={l.language}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
          className="glow-hover border-foreground/8 bg-background flex items-center justify-between gap-4 rounded-3xl border p-5"
        >
          <span className="flex flex-col">
            <span className="text-foreground text-[17px] font-semibold tracking-tight">{l.language}</span>
            <span className="text-foreground/55 text-[13px] tracking-tight">{l.level}</span>
          </span>
          <span className="flex gap-1" aria-hidden="true">
            {[0, 1, 2, 3].map((d) => (
              <motion.span
                key={d}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.06 + d * 0.06 }}
                className={`h-1.5 w-5 origin-left rounded-full ${d < l.dots ? "bg-accent" : "bg-foreground/15"}`}
              />
            ))}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
