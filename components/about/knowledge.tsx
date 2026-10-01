"use client";

import { Icon, type IconifyIcon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

import type { SkillCategory, SkillColor } from "@/lib/skills";

export type KnowledgeCategory = Omit<SkillCategory, "icon" | "items"> & {
  iconData: IconifyIcon;
  items: { name: string; iconData?: IconifyIcon | undefined }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const DOT_COLORS: Record<SkillColor, string> = {
  red: "var(--accent)",
  yellow: "var(--accent-2)",
  blue: "#3b82f6",
  green: "#22c55e",
};

/**
 * Habilidades & Conhecimentos por categoria (como na primeira versão), com filtro
 * animado e logos do Iconify no espírito da "Tech Stack" de antonio-bastos.com.
 */
export function Knowledge({ categories }: { categories: KnowledgeCategory[] }): ReactNode {
  const [active, setActive] = useState<string>("todas");
  const visible = active === "todas" ? categories : categories.filter((c) => c.id === active);
  const total = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filtrar categorias" className="flex flex-wrap justify-center gap-2">
        <FilterPill on={active === "todas"} onClick={() => setActive("todas")} color="var(--accent)">
          Todas <span className="opacity-60">{total}</span>
        </FilterPill>
        {categories.map((c) => (
          <FilterPill key={c.id} on={active === c.id} onClick={() => setActive(c.id)} color={DOT_COLORS[c.color]}>
            {c.label}
          </FilterPill>
        ))}
      </div>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((c, ci) => (
            <motion.li
              layout
              key={c.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, ease: EASE, delay: active === "todas" ? (ci % 2) * 0.08 : 0 }}
              className={`glow-hover border-foreground/8 bg-background/80 relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-5 backdrop-blur-sm sm:p-6 ${
                visible.length === 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl"
                style={{ background: DOT_COLORS[c.color] }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: DOT_COLORS[c.color],
                    borderColor: `color-mix(in srgb, ${DOT_COLORS[c.color]} 35%, transparent)`,
                    background: `color-mix(in srgb, ${DOT_COLORS[c.color]} 10%, transparent)`,
                  }}
                >
                  <Icon icon={c.iconData} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-foreground text-[16px] font-semibold tracking-tight">{c.label}</h3>
                <span className="text-foreground/40 ml-auto font-mono text-[11px]">
                  {String(c.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {c.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: EASE, delay: 0.15 + i * 0.04 }}
                    whileHover={{ y: -3 }}
                    className="border-foreground/10 bg-foreground/3 text-foreground/85 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] tracking-tight"
                  >
                    {item.iconData ? (
                      <Icon icon={item.iconData} className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: DOT_COLORS[c.color],
                          boxShadow: `0 0 8px ${DOT_COLORS[c.color]}`,
                        }}
                      />
                    )}
                    {item.name}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function FilterPill({
  on,
  onClick,
  color,
  children,
}: {
  on: boolean;
  onClick: () => void;
  color: string;
  children: ReactNode;
}): ReactNode {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`focus-ring relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors ${
        on ? "border-transparent text-white" : "border-foreground/12 text-foreground/70 hover:text-foreground"
      }`}
    >
      {on ? (
        <motion.span
          layoutId="knowledge-pill"
          className="bg-accent absolute inset-0 rounded-full"
          transition={{ duration: 0.4, ease: EASE }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className="relative h-2 w-2 rounded-full"
        style={{ background: on ? "#fff" : color }}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
