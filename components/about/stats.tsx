"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Stat = { value: number; suffix?: string; label: string };

/** Números reais do currículo (out/2026). */
const STATS: Stat[] = [
  { value: 4, suffix: "+", label: "anos em TI" },
  { value: 2, label: "sistemas lançados" },
  { value: 9, label: "projetos" },
  { value: 15, label: "certificados" },
];

/** Conta de 0 até o valor quando aparece na tela (como no portfólio antigo). */
function CountUp({ value }: { value: number }): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number): void => {
        const k = Math.min((t - start) / 1200, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

export function Stats(): ReactNode {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="glow-hover border-foreground/8 bg-background relative flex flex-col items-center gap-2 overflow-hidden rounded-3xl border px-5 py-6 text-center"
        >
          <span aria-hidden="true" className="bg-accent absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full" />
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-accent font-serif text-[2.4rem] leading-none font-extrabold tracking-tight">
            <CountUp value={s.value} />
            {s.suffix}
          </dd>
          <dd
            aria-hidden="true"
            className="text-foreground/60 font-mono text-[11px] tracking-[0.14em] uppercase"
          >
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
