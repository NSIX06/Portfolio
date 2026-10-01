"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";


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
  { id: "competencias", label: "Competências", count: AREAS.length + SOFT_SKILLS.length },
  { id: "idiomas", label: "Idiomas", count: LANGUAGES.length },
] as const;
type TabId = (typeof TABS)[number]["id"];

/**
 * "Passion Corner" (referência: antonio-bastos.com): abas com certificações em
 * carrossel/acordeão automático, competências e idiomas (os projetos têm seção própria).
 */
export function PassionCorner(): ReactNode {
  const [tab, setTab] = useState<TabId>("competencias");

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
            {tab === "competencias" ? <SkillsTab /> : null}
            {tab === "idiomas" ? <LanguagesTab /> : null}
          </motion.div>
        </AnimatePresence>
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
