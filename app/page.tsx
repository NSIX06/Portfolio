import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { TechStack } from "@/components/stack/tech-stack";
import { icon } from "@/lib/icons";
import { LANGUAGES, TECHNOLOGIES } from "@/lib/tech-stack";
import { TechMarquee } from "@/components/trajectory/tech-marquee";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Início",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  const withIcon = <T extends { icon: string }>({ icon: name, ...rest }: T) => ({ ...rest, iconData: icon(name) });
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero />
      <TechMarquee />
      <Projects withHeadline viewMoreVisible />
      <TechStack languages={LANGUAGES.map(withIcon)} technologies={TECHNOLOGIES.map(withIcon)} />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
