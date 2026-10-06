"use client";

import { ArrowRight, FileDown } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroCtas(): ReactNode {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <ContactButton />

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <a
            href="#projetos"
            className="border-foreground/5 focus-ring group bg-background text-foreground hover:bg-foreground/4 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium shadow-2xl transition-colors"
          >
            Ver projetos
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <a
            href="/curriculo-felipe-bugalho.pdf"
            target="_blank"
            rel="noopener"
            className="focus-ring border-accent/40 text-accent hover:bg-accent group inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors hover:text-white"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Currículo (PDF)
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
