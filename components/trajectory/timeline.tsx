"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import DotField from "@/components/effects/DotField";
import type { Milestone } from "@/lib/trajectory";

export type TimelineItem = Milestone & { iconData: IconifyIcon };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Linha do tempo alternada (ideia do PortfolioPessoal do GaaraSan01) no visual do template:
 * a linha central se preenche de vermelho com a rolagem (GSAP ScrollTrigger), cada marco
 * acende quando a linha chega nele e os cartões entram com Motion.
 */
export function Timeline({ items }: { items: TimelineItem[] }): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fill, { scaleY: 1 });
      root
        .querySelectorAll("[data-dot]")
        .forEach((d) => d.classList.add("is-on"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.4,
          },
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
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <DotField
          gradientFrom="rgba(225, 29, 29, 0.35)"
          gradientTo="rgba(255, 209, 0, 0.12)"
          dotSpacing={22}
        />
      </div>

      <div
        ref={rootRef}
        className="relative mx-auto w-full max-w-275 px-6 sm:px-10"
      >
        {/* Linha central (à esquerda no celular) */}
        <div
          aria-hidden="true"
          className="bg-foreground/10 absolute top-0 bottom-0 left-[2.15rem] w-px sm:left-[3.15rem] md:left-1/2"
        >
          <div
            ref={fillRef}
            className="bg-accent absolute inset-0 origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <ol className="relative flex flex-col gap-10 md:gap-6">
          {items.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={item.id}
                className="relative grid grid-cols-[2.5rem_1fr] items-start gap-4 md:grid-cols-[1fr_4rem_1fr] md:gap-0"
              >
                {/* Marcador */}
                <div className="flex justify-center md:col-start-2 md:row-start-1">
                  <span
                    data-dot
                    className="timeline-dot border-foreground/15 bg-background text-foreground/50 relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500"
                  >
                    <Icon
                      icon={item.iconData}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* Cartão */}
                <motion.article
                  initial={{
                    opacity: 0,
                    x: left ? -28 : 28,
                    filter: "blur(6px)",
                  }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`glow-hover cursor-target border-foreground/8 bg-background flex flex-col gap-3 overflow-hidden rounded-3xl border p-5 sm:p-6 md:row-start-1 ${
                    left ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-accent font-serif text-[2rem] leading-none font-extrabold tracking-tight">
                      {item.year}
                    </span>
                    <span className="border-accent/40 text-accent rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.16em] uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-foreground text-[19px] font-semibold tracking-tight sm:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="text-foreground/55 font-mono text-[11px] tracking-[0.08em] uppercase">
                    {item.place}
                  </p>
                  <p className="text-foreground/70 text-[15px] leading-relaxed tracking-tight">
                    {item.text}
                  </p>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="border-foreground/10 text-foreground/75 rounded-full border px-2.5 py-1 text-[12px] tracking-tight"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-foreground hover:text-accent mt-1 inline-flex w-fit items-center gap-1.5 text-[14px] font-medium transition-colors"
                    >
                      {item.link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  ) : null}
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
