"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { Milestone, MilestoneKind } from "@/lib/trajectory";

export type TimelineItem = Milestone & { iconData: IconifyIcon };

const EASE = [0.22, 1, 0.36, 1] as const;
const KINDS: { id: MilestoneKind; label: string; Icon: typeof Briefcase }[] = [
  { id: "profissional", label: "Profissional", Icon: Briefcase },
  { id: "academica", label: "Acadêmica", Icon: GraduationCap },
];

/**
 * Trajetória com abas Profissional/Acadêmica (referência: barretolopes.com) sobre a
 * linha do tempo: a linha se preenche de vermelho com a rolagem (GSAP ScrollTrigger),
 * cada marco acende quando a linha chega nele e cada cartão expande com os detalhes
 * de carreira e formação (como na primeira versão do portfólio).
 */
export function Timeline({ items }: { items: TimelineItem[] }): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [kinds, setKinds] = useState<MilestoneKind[]>(["profissional", "academica"]);
  const [openIds, setOpenIds] = useState<string[]>([]);

  const visible = items.filter((i) => kinds.includes(i.kind));
  const visibleKey = visible.map((i) => i.id).join("|");

  const toggleKind = (k: MilestoneKind): void => {
    setKinds((prev) => {
      if (prev.includes(k)) return prev.length > 1 ? prev.filter((x) => x !== k) : prev;
      return [...prev, k];
    });
  };
  const toggleOpen = (id: string): void => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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
    return () => ctx.revert();
  }, [visibleKey]);

  // Expandir um cartão muda a altura da página: recalcula os gatilhos.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 520);
    return () => window.clearTimeout(t);
  }, [openIds]);

  return (
    <div className="relative overflow-x-clip">
      <div className="mx-auto mb-10 flex w-full max-w-275 flex-col items-center gap-3 px-6 sm:px-10">
        <p className="text-foreground/55 text-center text-[14px] tracking-tight">
          Selecione pelo menos um tipo de experiência para ver a trajetória.
        </p>
        <div role="group" aria-label="Tipo de experiência" className="flex gap-2">
          {KINDS.map(({ id, label, Icon: KindIcon }) => {
            const on = kinds.includes(id);
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
              <TimelineEntry
                key={item.id}
                item={item}
                left={i % 2 === 0}
                open={openIds.includes(item.id)}
                onToggle={() => toggleOpen(item.id)}
              />
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  );
}

function TimelineEntry({
  item,
  left,
  open,
  onToggle,
}: {
  item: TimelineItem;
  left: boolean;
  open: boolean;
  onToggle: () => void;
}): ReactNode {
  const detailsId = `trajetoria-${item.id}-detalhes`;
  const hasDetails = Boolean(
    item.roles?.length || item.activities?.length || item.systems?.length || item.projects?.length || item.tech?.length
  );

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
          className="timeline-dot border-foreground/15 bg-background text-foreground/50 relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500"
        >
          <Icon icon={item.iconData} className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <motion.article
        initial={{ opacity: 0, x: left ? -28 : 28, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`glow-hover border-foreground/8 bg-background hover:border-accent/30 flex flex-col gap-3 overflow-hidden rounded-3xl border p-5 transition-colors sm:p-6 md:row-start-1 ${
          left ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6"
        } ${item.current ? "ring-accent/30 ring-1" : ""}`}
      >
        {/* O cartão inteiro (resumo) é o botão que expande os detalhes */}
        <button
          type="button"
          onClick={hasDetails ? onToggle : undefined}
          aria-expanded={hasDetails ? open : undefined}
          aria-controls={hasDetails ? detailsId : undefined}
          disabled={!hasDetails}
          className="focus-ring group/card -m-2 flex flex-col gap-3 rounded-2xl p-2 text-left enabled:cursor-pointer"
        >
          <span className="flex w-full flex-wrap items-center gap-3">
            <span className="text-accent font-serif text-[2rem] leading-none font-extrabold tracking-tight">
              {item.year}
            </span>
            <span className="border-accent/40 text-accent rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.16em] uppercase">
              {item.badge}
            </span>
            <span className="text-foreground/45 ml-auto font-mono text-[11px] tracking-wide">{item.period}</span>
            {hasDetails ? (
              <motion.span
                aria-hidden="true"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="border-foreground/10 text-foreground/60 group-hover/card:border-accent/50 group-hover/card:text-accent inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            ) : null}
          </span>

          <span className="block">
            <span className="text-foreground group-hover/card:text-accent block text-[19px] font-semibold tracking-tight transition-colors sm:text-[20px]">
              {item.title}
            </span>
            {item.subtitle ? (
              <span className="text-accent mt-1 block font-mono text-[11px] tracking-[0.1em] uppercase">{item.subtitle}</span>
            ) : null}
            <span className="text-foreground/55 mt-1 block font-mono text-[11px] tracking-[0.08em] uppercase">{item.place}</span>
          </span>

          <span className="text-foreground/75 block text-[15px] leading-relaxed tracking-tight">{item.text}</span>
          {hasDetails && !open ? (
            <span className="sr-only">Clique para ver os detalhes</span>
          ) : null}
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="border-foreground/8 mt-2 flex flex-col gap-5 border-t pt-4">
                {item.roles?.map((r) => (
                  <div key={r.title} className="flex flex-col gap-2">
                    <h4 className="text-foreground text-[15px] font-semibold tracking-tight">{r.title}</h4>
                    <Bullets items={r.activities} />
                  </div>
                ))}
                {item.activities?.length ? <Bullets items={item.activities} /> : null}

                {item.systems?.length ? (
                  <Group title="Sistemas utilizados">
                    <div className="grid gap-2">
                      {item.systems.map((s) => (
                        <div key={s.name} className="border-foreground/8 rounded-2xl border p-3">
                          <p className="text-foreground text-[14px] font-semibold">{s.name}</p>
                          <p className="text-foreground/60 mt-1 text-[13px] leading-relaxed">{s.description}</p>
                        </div>
                      ))}
                    </div>
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
                    className="focus-ring text-foreground hover:text-accent inline-flex w-fit items-center gap-1.5 text-[14px] font-medium transition-colors"
                  >
                    {item.link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.article>
    </motion.li>
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

function Group({ title, children }: { title: string; children: ReactNode }): ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground/50 font-mono text-[10px] tracking-[0.16em] uppercase">{title}</h4>
      {children}
    </div>
  );
}
