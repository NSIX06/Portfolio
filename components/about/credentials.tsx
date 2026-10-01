"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { CERTIFICATES } from "@/lib/certificates";

const LANGUAGES = [
  { language: "Português", level: "Nativo" },
  { language: "Inglês", level: "Intermediário · EF SET B1" },
  { language: "Espanhol", level: "Intermediário" },
  { language: "Francês", level: "Básico" },
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

const COLLAPSED = 6;
const EASE = [0.22, 1, 0.36, 1] as const;

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        {title}
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-2 sm:p-4">
        {children}
      </div>
    </div>
  );
}

/** Cursos e certificados, idiomas e competências (informações do currículo). */
export function Credentials(): ReactNode {
  const [open, setOpen] = useState(false);
  const shown = open ? CERTIFICATES : CERTIFICATES.slice(0, COLLAPSED);
  const done = CERTIFICATES.filter((c) => !c.inProgress).length;

  return (
    <div className="flex flex-col gap-10">
      <Block title={`Cursos e certificados · ${done} concluídos`}>
        <ul className="grid gap-2 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {shown.map((c, i) => (
              <motion.li
                key={c.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: i >= COLLAPSED ? (i - COLLAPSED) * 0.04 : 0,
                }}
                className="glow-hover bg-background border-foreground/5 flex flex-col gap-1 overflow-hidden rounded-3xl border p-3.5"
              >
                <span className="text-foreground text-[15px] leading-snug font-semibold tracking-tight">
                  {c.name}
                </span>
                <span className="text-foreground/55 font-mono text-[11px] tracking-wide">
                  {c.institution}
                  {c.partner ? ` + ${c.partner}` : ""}
                  {c.workload ? ` · ${c.workload}` : ""}
                </span>
                {c.inProgress ? (
                  <span className="text-accent-2 font-mono text-[10px] tracking-[0.14em] uppercase">
                    Em andamento
                  </span>
                ) : null}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="focus-ring text-foreground mt-3 flex w-full items-center justify-center gap-1.5 py-2 text-[15px] font-medium tracking-tight"
        >
          {open ? "Mostrar menos" : `Ver todos os ${CERTIFICATES.length}`}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </Block>

      <Block title="Idiomas">
        <ul className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((l) => (
            <li
              key={l.language}
              className="bg-background border-foreground/5 flex flex-col rounded-3xl border p-3.5"
            >
              <span className="text-foreground text-[16px] font-semibold tracking-tight">
                {l.language}
              </span>
              <span className="text-foreground/55 text-[13px] tracking-tight">
                {l.level}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Competências">
        <div className="flex flex-wrap gap-3">
          {SOFT_SKILLS.map((s) => (
            <span
              key={s}
              className="border-foreground/8 bg-background text-foreground/85 rounded-full border px-4 py-2 text-[14px] tracking-tight sm:text-[15px]"
            >
              {s}
            </span>
          ))}
        </div>
      </Block>
    </div>
  );
}
