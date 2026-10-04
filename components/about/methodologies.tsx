"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { Methodology } from "@/lib/skills";

export type MethodologyItem = Omit<Methodology, "icon"> & { iconData: IconifyIcon };

const EASE = [0.22, 1, 0.36, 1] as const;
const COLUMNS = ["Backlog", "Em andamento", "Concluído"] as const;
/** Etapas típicas de um projeto, andando pelo quadro em ciclo. */
const TASKS = ["Requisitos", "Modelagem do banco", "API", "Interface", "Testes e deploy"];

export function Methodologies({ items, intro }: { items: MethodologyItem[]; intro: string }): ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/65 text-center text-[15px] tracking-tight">{intro}</p>
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_1.25fr]">
        {items.map((m, i) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            className="glow-hover border-foreground/8 bg-background/80 flex flex-col gap-4 rounded-3xl border p-5 backdrop-blur-sm sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="border-accent/35 bg-accent/10 text-accent inline-flex h-10 w-10 items-center justify-center rounded-xl border">
                <Icon icon={m.iconData} className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-foreground font-serif text-[22px] font-bold tracking-tight">{m.name}</h3>
              <span className="border-accent-2/40 text-accent-2 ml-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                {m.level}
              </span>
            </div>
            <p className="text-foreground/70 text-[14px] leading-relaxed tracking-tight">{m.description}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5">
              {m.practices.map((p) => (
                <li
                  key={p}
                  className="border-foreground/10 text-foreground/75 rounded-full border px-2.5 py-1 text-[12px] tracking-tight"
                >
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
        <KanbanBoard />
      </div>
    </div>
  );
}

/** Quadro decorativo: as etapas avançam sozinhas de coluna enquanto estão na tela. */
function KanbanBoard(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  // Coluna de cada tarefa (0 = backlog, 1 = andamento, 2 = concluído).
  const [cols, setCols] = useState<number[]>(() => TASKS.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setCols((prev) => {
        if (prev.every((c) => c === 2)) return prev.map(() => 0);
        // Avança a tarefa mais adiantada que ainda não terminou (WIP de uma por vez).
        const doing = prev.indexOf(1);
        const next = [...prev];
        if (doing !== -1) next[doing] = 2;
        else {
          const todo = prev.indexOf(0);
          if (todo !== -1) next[todo] = 1;
        }
        return next;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
      className="border-foreground/8 bg-background/80 grid grid-cols-3 gap-2 rounded-3xl border p-3 backdrop-blur-sm"
    >
      {COLUMNS.map((label, ci) => (
        <div key={label} className="bg-foreground/3 flex min-h-56 flex-col gap-2 rounded-2xl p-2">
          <p className="text-foreground/50 flex items-center gap-1.5 px-1 font-mono text-[9px] tracking-[0.12em] uppercase">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: ci === 0 ? "#3b82f6" : ci === 1 ? "var(--accent-2)" : "#22c55e" }}
            />
            {label}
          </p>
          {TASKS.map((t, ti) =>
            cols[ti] === ci ? (
              <motion.div
                key={t}
                layoutId={`kanban-${t}`}
                transition={{ duration: 0.5, ease: EASE }}
                className={`bg-background rounded-lg border px-2 py-1.5 text-[11px] leading-tight tracking-tight ${
                  ci === 1 ? "border-accent/50 text-foreground" : "border-foreground/10 text-foreground/70"
                } ${ci === 2 ? "line-through decoration-foreground/30" : ""}`}
              >
                {t}
              </motion.div>
            ) : null
          )}
        </div>
      ))}
    </motion.div>
  );
}
