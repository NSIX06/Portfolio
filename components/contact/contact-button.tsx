"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { profile } from "@/lib/profile";

const EMAIL = profile.email;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Botão "Contato": ao passar o mouse (ou focar), o e-mail aparece numa etiqueta flutuante
 * acima do botão — sem mudar o tamanho do botão nem empurrar os vizinhos. Clicar copia.
 */
export function ContactButton(): ReactNode {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const done = (): void => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      done();
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch {}
      document.body.removeChild(ta);
    }
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={copied ? "E-mail copiado" : `Copiar e-mail ${EMAIL}`}
        className="focus-ring bg-foreground text-background relative inline-flex h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-medium"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "ok" : "mail"}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copiado!" : "Contato"}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 4, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: EASE }}
            className="border-foreground/10 bg-background/90 text-foreground pointer-events-none absolute bottom-[calc(100%+10px)] left-0 z-30 inline-flex origin-bottom-left items-center gap-2 rounded-xl border px-3 py-2 text-[13px] whitespace-nowrap shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {copied ? (
              <Check className="text-accent h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="text-accent h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="font-medium">{EMAIL}</span>
            <span className="text-foreground/50 font-mono text-[10px] tracking-wide uppercase">
              {copied ? "copiado" : "clique p/ copiar"}
            </span>
            <span
              aria-hidden="true"
              className="border-foreground/10 bg-background absolute top-full left-6 -mt-[5px] h-2.5 w-2.5 rotate-45 border-r border-b"
            />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
