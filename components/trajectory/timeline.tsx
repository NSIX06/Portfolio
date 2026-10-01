"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BookOpen, Briefcase, GraduationCap, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { Milestone, MilestoneKind } from "@/lib/trajectory";
import { useModalLock } from "@/lib/use-modal-lock";

export type TimelineItem = Milestone & { iconData: IconifyIcon };

const EASE = [0.22, 1, 0.36, 1] as const;
const KINDS: { id: MilestoneKind; label: string; Icon: typeof Briefcase }[] = [
  { id: "profissional", label: "Profissional", Icon: Briefcase },
  { id: "academica", label: "Acadêmica", Icon: GraduationCap },
  { id: "curso", label: "Cursos", Icon: BookOpen },
];

/**
 * Trajetória com abas Profissional/Acadêmica/Cursos (referência: barretolopes.com) sobre a
 * linha do tempo que se preenche com a rolagem (GSAP). Cada cartão abre uma janela com os
 * detalhes, como os cartões da Tech Stack. Os cursos aparecem em destaque.
 */
export function Timeline({ items }: { items: TimelineItem[] }): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [kinds, setKinds] = useState<MilestoneKind[]>(["profissional", "academica", "curso"]);
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = items.filter((i) => kinds.includes(i.kind));
  const visibleKey = visible.map((i) => i.id).join("|");
  const open = items.find((i) => i.id === openId) ?? null;

  const toggleKind = (k: MilestoneKind): void => {
    setKinds((prev) => {
      if (prev.includes(k)) return prev.length > 1 ? prev.filter((x) => x !== k) : prev;
      return [...prev, k];
    });
  };

  // Linha que se preenche e marcos que acendem; refeito quando a lista muda.
  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        }
      );
      root.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
        ScrollTrigger.create({
          trigger: dot,
          start: "top 60%",
          onEnter: () => dot.classList.add("is-on"),
          onLeaveBack: () => dot.classList.remove("is-on"),
        });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [visibleKey]);

  return (
    <div className="relative overflow-x-clip">
      <div className="mx-auto mb-10 flex w-full max-w-275 flex-col items-center gap-3 px-6 sm:px-10">
        <p className="text-foreground/55 text-center text-[14px] tracking-tight">
          Selecione pelo menos um tipo de experiência para ver a trajetória.
        </p>
        <div role="group" aria-label="Tipo de experiência" className="flex flex-wrap justify-center gap-2">
          {KINDS.map(({ id, label, Icon: KindIcon }) => {
            const on = kinds.includes(id);
            const count = items.filter((i) => i.kind === id).length;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleKind(id)}
                className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium tracking-tight transition-colors ${
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-foreground/12 text-foreground/70 hover:text-foreground"
                }`}
              >
                <KindIcon className="h-4 w-4" aria-hidden="true" />
                {label}
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={rootRef} className="relative mx-auto w-full max-w-275 px-6 sm:px-10">
        <div
          aria-hidden="true"
          className="bg-foreground/10 absolute top-0 bottom-0 left-[2.15rem] w-px sm:left-[3.15rem] md:left-1/2"
        >
          <div ref={fillRef} className="bg-accent absolute inset-0 origin-top" style={{ transform: "scaleY(0)" }} />
        </div>

        <ol className="relative flex flex-col gap-10 md:gap-6">
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <TimelineEntry key={item.id} item={item} left={i % 2 === 0} onOpen={() => setOpenId(item.id)} />
            ))}
          </AnimatePresence>
        </ol>
      </div>

      <AnimatePresence>
        {open ? <MilestoneModal key={open.id} item={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

function TimelineEntry({
  item,
  left,
  onOpen,
}: {
  item: TimelineItem;
  left: boolean;
  onOpen: () => void;
}): ReactNode {
  const isCourse = item.kind === "curso";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative grid grid-cols-[2.5rem_1fr] items-start gap-4 md:grid-cols-[1fr_4rem_1fr] md:gap-0"
    >
      <div className="flex justify-center md:col-start-2 md:row-start-1">
        <span
          data-dot
          className={`timeline-dot bg-background relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
            isCourse ? "border-accent/50 text-accent" : "border-foreground/15 text-foreground/50"
          }`}
        >
          <Icon icon={item.iconData} className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: left ? -28 : 28, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`md:row-start-1 ${left ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6"}`}
      >
        <motion.button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className={`glow-hover focus-ring group relative flex w-full flex-col gap-3 overflow-hidden rounded-3xl border p-5 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] transition-colors sm:p-6 ${
            isCourse
              ? "course-card border-accent/35 hover:border-accent/60"
              : "border-foreground/8 bg-background hover:border-accent/30"
          } ${item.current && !isCourse ? "ring-accent/30 ring-1" : ""}`}
        >
          {isCourse ? (
            <span className="bg-accent absolute top-0 right-6 rounded-b-lg px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white uppercase">
              Destaque
            </span>
          ) : null}

          <span className="flex w-full flex-wrap items-center gap-3">
            <span className="text-accent font-serif text-[2rem] leading-none font-extrabold tracking-tight">
              {item.year}
            </span>
            <span className="border-accent/40 text-accent rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.16em] uppercase">
              {item.badge}
            </span>
            <span className="text-foreground/45 ml-auto font-mono text-[11px] tracking-wide">{item.period}</span>
            <span
              aria-hidden="true"
              className="bg-foreground/6 text-foreground/50 group-hover:bg-accent inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors group-hover:text-white"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>

          <span className="block">
            <span className="text-foreground block text-[19px] font-semibold tracking-tight sm:text-[20px]">
              {item.title}
            </span>
            {item.subtitle ? (
              <span className="text-accent mt-1 block font-mono text-[11px] tracking-[0.1em] uppercase">
                {item.subtitle}
              </span>
            ) : null}
            <span className="text-foreground/55 mt-1 block font-mono text-[11px] tracking-[0.08em] uppercase">
              {item.place}
            </span>
          </span>

          <span className="text-foreground/75 block text-[15px] leading-relaxed tracking-tight">{item.text}</span>
        </motion.button>
      </motion.div>
    </motion.li>
  );
}

function MilestoneModal({ item, onClose }: { item: TimelineItem; onClose: () => void }): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModalLock(panelRef, closeRef, onClose);
  const titleId = `trajetoria-${item.id}-titulo`;

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
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="border-foreground/10 bg-background relative flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-[1.75rem] border shadow-2xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--accent)" }}
        />
        <div className="border-foreground/8 relative flex items-start gap-4 border-b p-6">
          <span className="border-foreground/8 bg-foreground/4 text-accent inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border">
            <Icon icon={item.iconData} className="h-7 w-7" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="flex flex-wrap items-center gap-2">
              <span className="border-accent/40 text-accent rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                {item.badge}
              </span>
              <span className="text-foreground/50 font-mono text-[11px]">{item.period}</span>
            </span>
            <h3 id={titleId} className="text-foreground font-serif text-[1.45rem] leading-tight font-bold tracking-tight">
              {item.title}
            </h3>
            {item.subtitle ? (
              <p className="text-accent font-mono text-[11px] tracking-[0.1em] uppercase">{item.subtitle}</p>
            ) : null}
            <p className="text-foreground/55 font-mono text-[11px] tracking-[0.08em] uppercase">{item.place}</p>
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

        <div className="relative flex flex-col gap-5 overflow-y-auto overscroll-contain p-6">
          <Group title="Visão geral">
            <p className="text-foreground/80 text-[15px] leading-relaxed tracking-tight">{item.text}</p>
          </Group>

          {item.roles?.map((r) => (
            <Box key={r.title} title={r.title}>
              <Bullets items={r.activities} />
            </Box>
          ))}
          {item.activities?.length ? (
            <Box title="Atividades">
              <Bullets items={item.activities} />
            </Box>
          ) : null}

          {item.systems?.length ? (
            <Group title="Sistemas utilizados">
              <div className="grid gap-2">
                {item.systems.map((s) => (
                  <div key={s.name} className="border-foreground/8 bg-foreground/3 rounded-2xl border p-3">
                    <p className="text-foreground text-[14px] font-semibold">{s.name}</p>
                    <p className="text-foreground/60 mt-1 text-[13px] leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </Group>
          ) : null}

          {item.courses?.length ? (
            <Group title="Cursos">
              <ul className="flex flex-col gap-2">
                {item.courses.map((c, i) => (
                  <motion.li
                    key={c.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.05 }}
                    className="border-foreground/8 bg-foreground/3 flex items-start gap-3 rounded-2xl border p-3"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${c.inProgress ? "bg-accent animate-pulse" : "bg-foreground/40"}`}
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-foreground text-[14px] font-semibold tracking-tight">{c.name}</span>
                      <span className="text-foreground/55 text-[12px]">
                        {c.institution}
                        {c.partner ? ` + ${c.partner}` : ""}
                        {c.workload ? ` · ${c.workload}` : ""}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase ${
                        c.inProgress ? "border-accent/50 text-accent border" : "bg-foreground/8 text-foreground/60"
                      }`}
                    >
                      {c.inProgress ? "Em andamento" : "Concluído"}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Group>
          ) : null}

          {item.projects?.length ? (
            <Group title="Projetos">
              <ul className="flex flex-col gap-2">
                {item.projects.map((p) => (
                  <li key={p.name} className="text-[14px] leading-relaxed">
                    <span className="text-foreground font-semibold">{p.name}</span>
                    <span className="text-foreground/60"> — {p.detail}</span>
                  </li>
                ))}
              </ul>
            </Group>
          ) : null}

          {item.tech?.length ? (
            <Group title="Tecnologias">
              <ul className="flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <li
                    key={t}
                    className="border-foreground/10 text-foreground/75 rounded-full border px-2.5 py-1 text-[12px] tracking-tight"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Group>
          ) : null}

          {item.link ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring bg-foreground text-background hover:bg-accent inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors hover:text-white"
            >
              {item.link.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Bullets({ items }: { items: string[] }): ReactNode {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((a) => (
        <li key={a} className="text-foreground/75 flex gap-3 text-[14px] leading-relaxed tracking-tight">
          <span className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
          {a}
        </li>
      ))}
    </ul>
  );
}

function Box({ title, children }: { title: string; children: ReactNode }): ReactNode {
  return (
    <div className="border-foreground/8 bg-foreground/3 flex flex-col gap-3 rounded-2xl border p-4">
      <h4 className="text-foreground text-[14px] font-semibold tracking-tight">{title}</h4>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }): ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground/45 font-mono text-[10px] tracking-[0.16em] uppercase">{title}</h4>
      {children}
    </div>
  );
}
