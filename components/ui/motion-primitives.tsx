"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useSiteLoaded } from "@/lib/site-loaded";

/** Curva macia da referência (cubic-bezier(0.16, 1, 0.3, 1)): sai rápido e assenta devagar. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Sobe e aparece quando entra na tela (uma vez), depois que o site terminou de carregar.
 * Antes animava no carregamento da página, então as seções de baixo já chegavam paradas.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 1.1,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  const loaded = useSiteLoaded();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      {...(loaded ? { whileInView: { opacity: 1, y: 0 } } : {})}
      viewport={{ once: true, margin: "0px 0px -24px 0px" }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleUnblur({
  children,
  delay = 0,
  duration = 1.2,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  const loaded = useSiteLoaded();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
      {...(loaded ? { whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" } } : {})}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      style={{ transformOrigin: "center" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Linha de título que sobe de dentro de uma máscara (revelação "de baixo para cima"). */
export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): ReactNode {
  const loaded = useSiteLoaded();
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 3 }}
        {...(loaded ? { animate: { y: "0%", rotate: 0 } } : {})}
        transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.span>
    </span>
  );
}
