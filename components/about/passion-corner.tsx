"use client";

import { Award, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { CERTIFICATES } from "@/lib/certificates";

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
  { id: "certificacoes", label: "Certificações", count: CERTIFICATES.length },
  { id: "competencias", label: "Competências", count: AREAS.length + SOFT_SKILLS.length },
  { id: "idiomas", label: "Idiomas", count: LANGUAGES.length },
] as const;
type TabId = (typeof TABS)[number]["id"];

/**
 * "Passion Corner" (referência: antonio-bastos.com): abas com certificações em
 * carrossel/acordeão automático, competências e idiomas (os projetos têm seção própria).
 */
export function PassionCorner(): ReactNode {
  const [tab, setTab] = useState<TabId>("certificacoes");

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
            {tab === "certificacoes" ? <CertificatesTab /> : null}
            {tab === "competencias" ? <SkillsTab /> : null}
            {tab === "idiomas" ? <LanguagesTab /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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

  const go = (d: number): void => setActive((a) => (a + d + total) % total);
  const cert = CERTIFICATES[active];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="project-emoji relative overflow-hidden rounded-3xl p-4 sm:p-6"
    >
      {/* Painel de fundo: nome grande do certificado ativo (troca com fade simples) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden items-end justify-end p-8 md:flex">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute right-8 bottom-8 flex max-w-[22rem] flex-col items-end gap-3 text-right"
          >
            <Award className="text-accent h-16 w-16 opacity-80" strokeWidth={1.25} />
            <p className="text-foreground/90 font-serif text-[1.8rem] leading-[1.05] font-extrabold tracking-tight">
              {cert?.name}
            </p>
            <p className="text-foreground/50 font-mono text-[11px] tracking-[0.16em] uppercase">{cert?.institution}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Altura reservada: o painel não muda de tamanho quando o item ativo troca */}
      <div className="relative min-h-[21.5rem] max-w-md">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={page}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-2"
          >
            {slice.map((c, i) => {
              const idx = page * PAGE + i;
              const on = idx === active;
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-expanded={on}
                    className={`focus-ring w-full rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-300 ${
                      on
                        ? "border-accent/40 bg-background shadow-xl"
                        : "border-foreground/10 bg-background/70 hover:bg-background/90"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-foreground/25"}`}
                      />
                      <span className={`text-[14px] tracking-tight transition-colors duration-300 ${on ? "text-foreground font-semibold" : "text-foreground/80 font-medium"}`}>
                        {c.name}
                      </span>
                    </span>
                    {/* Expansão por grid-rows (0fr → 1fr): suave e sem distorcer o texto */}
                    <span
                      className="grid transition-[grid-template-rows,opacity] duration-400 ease-out"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <span className="block overflow-hidden">
                        <span className="text-foreground/60 mt-2 block pl-4 text-[13px] leading-relaxed">
                          {c.institution}
                          {c.partner ? ` + ${c.partner}` : ""}
                          {c.workload ? ` · ${c.workload}` : ""}
                        </span>
                        <span
                          className={`mt-2 ml-4 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase ${
                            c.inProgress ? "border-accent/50 text-accent border" : "bg-foreground/10 text-foreground/70"
                          }`}
                        >
                          {c.inProgress ? "Em andamento" : "Concluído"}
                        </span>
                        <span className="bg-foreground/10 mt-3 ml-4 block h-0.5 overflow-hidden rounded-full">
                          {on && playing ? (
                            /* A barra comanda a rotação: ao terminar, avança; pausa junto com o mouse/fora da tela */
                            <span
                              key={`bar-${active}`}
                              className="cert-progress bg-accent block h-full"
                              style={{
                                animationDuration: `${AUTOPLAY_MS}ms`,
                                animationPlayState: running ? "running" : "paused",
                              }}
                              onAnimationEnd={() => go(1)}
                            />
                          ) : null}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        <div className="border-foreground/10 bg-background/90 inline-flex items-center gap-1 rounded-full border p-1">
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
          className="focus-ring border-foreground/10 bg-background/90 inline-flex h-9 w-9 items-center justify-center rounded-full border"
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
