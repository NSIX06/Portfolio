"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { CONTEXT_LABEL, CONTEXT_RANK, type StackItem } from "@/lib/tech-stack";
import { useModalLock } from "@/lib/use-modal-lock";

export type TechStackItem = Omit<StackItem, "icon"> & { iconData: IconifyIcon };

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_DOTS = 5;

function topContext(item: TechStackItem): string {
  const best = CONTEXT_RANK.find((k) => item.used.some((u) => u.kind === k)) ?? "curso";
  return CONTEXT_LABEL[best];
}

/**
 * Tech Stack em abas (Linguagens/Tecnologias) com cartões que abrem um modal de detalhes
 * (referência: antonio-bastos.com). Os pontos contam os contextos reais de uso.
 */
export function TechStack({
  languages,
  technologies,
}: {
  languages: TechStackItem[];
  technologies: TechStackItem[];
}): ReactNode {
  const tabs = [
    { id: "lang", label: "Linguagens", items: languages },
    { id: "tech", label: "Tecnologias", items: technologies },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("lang");
  const [openId, setOpenId] = useState<string | null>(null);
  const items = tabs.find((t) => t.id === tab)?.items ?? [];
  const open = [...languages, ...technologies].find((i) => i.id === openId) ?? null;

  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto w-full max-w-275 px-6 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <p className="section-label">{"// 04 — stack"}</p>
        <h2
          id="stack-title"
          className="text-foreground font-serif text-[2.4rem] leading-[1.05] font-extrabold tracking-tight md:text-[3rem] lg:text-[3.5rem]"
        >
          Tech <span className="text-accent">Stack</span>
        </h2>
        <p className="text-foreground/65 max-w-[40ch] text-[18px] leading-[1.45] tracking-tight">
          Clique em um cartão para ver onde usei cada tecnologia.
        </p>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <div role="tablist" aria-label="Tipo" className="bg-foreground/5 border-foreground/8 inline-flex rounded-full border p-1">
          {tabs.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="stack-panel"
                onClick={() => setTab(t.id)}
                className={`focus-ring relative rounded-full px-5 py-2 text-[14px] font-medium tracking-tight transition-colors sm:px-7 ${
                  on ? "text-white" : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="stack-tab"
                    className="bg-accent absolute inset-0 rounded-full shadow-[0_8px_24px_-8px_var(--accent)]"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                ) : null}
                <span className="relative">
                  {t.label} <span className="opacity-70">({t.items.length})</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="stack-panel"
        role="tabpanel"
        className="border-foreground/6 bg-foreground/2 mt-8 rounded-[2rem] border p-3 sm:p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              >
                <StackCard item={item} onOpen={() => setOpenId(item.id)} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open ? <StackModal key={open.id} item={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

function Dots({ n }: { n: number }): ReactNode {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: MAX_DOTS }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < n ? "bg-accent w-4" : "bg-foreground/15 w-1.5"
          }`}
        />
      ))}
    </span>
  );
}

function StackCard({ item, onOpen }: { item: TechStackItem; onOpen: () => void }): ReactNode {
  const n = Math.min(item.used.length, MAX_DOTS);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      aria-haspopup="dialog"
      className="glow-hover focus-ring group border-foreground/8 bg-background flex w-full flex-col gap-4 rounded-3xl border p-5 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="bg-foreground/6 text-foreground/60 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] uppercase">
          {item.area}
        </span>
        <span className="bg-foreground/6 text-foreground/50 group-hover:bg-accent inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </span>
      <span className="flex items-center gap-3">
        <span className="border-foreground/8 bg-foreground/4 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
          <Icon icon={item.iconData} className="text-accent h-6 w-6" aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-foreground text-[18px] font-semibold tracking-tight">{item.name}</span>
          <span className="text-foreground/50 text-[13px] tracking-tight">
            {item.used.length} {item.used.length === 1 ? "contexto de uso" : "contextos de uso"}
          </span>
        </span>
      </span>
      <span className="border-foreground/8 flex items-center justify-between border-t pt-3">
        <Dots n={n} />
        <span className="text-foreground/50 font-mono text-[10px] tracking-[0.1em] uppercase">{topContext(item)}</span>
      </span>
    </motion.button>
  );
}

function StackModal({ item, onClose }: { item: TechStackItem; onClose: () => void }): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModalLock(panelRef, closeRef, onClose);
  const titleId = `stack-${item.id}-titulo`;
  const pct = Math.round((Math.min(item.used.length, MAX_DOTS) / MAX_DOTS) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="border-foreground/10 bg-background relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border shadow-2xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--accent)" }}
        />
        <div className="border-foreground/8 relative flex items-center gap-4 border-b p-6">
          <span className="border-foreground/8 bg-foreground/4 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border">
            <Icon icon={item.iconData} className="text-accent h-7 w-7" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="bg-foreground/6 text-foreground/60 w-fit rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase">
              {item.area}
            </span>
            <h3 id={titleId} className="text-foreground font-serif text-[1.7rem] leading-none font-bold tracking-tight">
              {item.name}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="focus-ring bg-foreground/6 text-foreground/70 hover:text-foreground ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-foreground/45 font-mono text-[10px] tracking-[0.16em] uppercase">Visão geral</p>
            <p className="text-foreground/80 text-[15px] leading-relaxed tracking-tight">{item.overview}</p>
          </div>

          <div className="border-foreground/8 bg-foreground/3 flex flex-col gap-4 rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <span className="bg-accent inline-flex h-8 w-8 items-center justify-center rounded-lg text-white">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <span className="text-foreground text-[14px] font-semibold">Onde usei</span>
                <span className="text-foreground/50 text-[12px]">
                  {item.used.length} {item.used.length === 1 ? "contexto" : "contextos"}
                </span>
              </div>
              <span className="bg-foreground text-background ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold">
                {topContext(item)}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {item.used.map((u, i) => (
                <motion.li
                  key={u.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className="flex items-center gap-3 text-[14px]"
                >
                  <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                  <span className="text-foreground/80 flex-1">{u.label}</span>
                  <span className="text-foreground/45 font-mono text-[10px] tracking-wide uppercase">
                    {CONTEXT_LABEL[u.kind]}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5">
              <div className="text-foreground/50 flex justify-between text-[11px]">
                <span>Contextos de uso</span>
                <span>
                  {Math.min(item.used.length, MAX_DOTS)}/{MAX_DOTS}
                </span>
              </div>
              <div className="bg-foreground/10 h-2 overflow-hidden rounded-full">
                <motion.div
                  className="bg-accent h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
