import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

import { icon } from "@/lib/icons";

/** Stack do currículo, com logos do Iconify (coleção "logos") embutidos no build. */
const TECH: { label: string; icon: string }[] = [
  { label: ".NET", icon: "logos:dotnet" },
  { label: "C#", icon: "logos:c-sharp" },
  { label: "React", icon: "logos:react" },
  { label: "Next.js", icon: "logos:nextjs-icon" },
  { label: "TypeScript", icon: "logos:typescript-icon" },
  { label: "Python", icon: "logos:python" },
  { label: "FastAPI", icon: "logos:fastapi-icon" },
  { label: "PostgreSQL", icon: "logos:postgresql" },
  { label: "Supabase", icon: "logos:supabase-icon" },
  { label: "Flutter", icon: "logos:flutter" },
  { label: "Azure", icon: "logos:microsoft-azure" },
  { label: "Power BI", icon: "logos:microsoft-power-bi" },
  { label: "Teams", icon: "logos:microsoft-teams" },
  { label: "Docker", icon: "logos:docker-icon" },
  { label: "Git", icon: "logos:git-icon" },
  { label: "PHP", icon: "logos:php" },
];

export function TechMarquee(): ReactNode {
  const items = TECH.map((t) => ({ ...t, data: icon(t.icon) }));
  const row = (hidden: boolean): ReactNode => (
    <ul className="tech-marquee__group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t.label} className="tech-marquee__item">
          <Icon icon={t.data} className="h-6 w-6" aria-hidden="true" />
          <span>{t.label}</span>
          <span className="text-accent ml-6 text-[10px]" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section
      aria-label="Tecnologias que uso"
      className="tech-marquee border-foreground/8 relative w-full border-y py-5"
    >
      <div className="tech-marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
