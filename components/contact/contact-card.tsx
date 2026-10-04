import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import PulseHeart from "@/components/ui/pulse-heart";
import { profile } from "@/lib/profile";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  return (
    <section className="mx-auto mt-4 mb-10 w-full max-w-275 px-6 sm:mt-8 sm:mb-12 sm:px-10">
      <FadeIn>
        <div className="border-foreground/8 bg-background relative w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow
                className="absolute inset-0 h-full w-full"
                scale={3}
                resolution={0.5}
                maxFps={30}
                iterations={10}
                brightness={2.6}
                colorLowA={[0.1, 0.02, 0.02]}
                colorHighA={[0.62, 0.1, 0.08]}
              />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="text-foreground font-serif text-[2.25rem] leading-[1.05] font-bold tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
                  Vamos conversar
                </h2>
                <p className="text-foreground/65 mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight sm:text-[22px]">
                  Aberto a oportunidades de emprego e a projetos freelance. Se
                  quiser conversar sobre uma vaga ou um sistema, é só chamar.
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 bg-background flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border p-6 sm:p-8">
                <div className="flex items-center gap-3 opacity-75">
                  <SocialIcon
                    href={`mailto:${profile.email}`}
                    label="E-mail"
                    lucideIcon={Mail}
                  />
                  <SocialIcon
                    href={profile.links.linkedin}
                    label="LinkedIn"
                    imageSrc="/linkedin.svg"
                  />
                  <SocialIcon
                    href={profile.links.github}
                    label="GitHub"
                    imageSrc="/github.svg"
                  />
                  <SocialIcon
                    href={profile.links.instagram}
                    label="Instagram"
                    imageSrc="/instagram.svg"
                  />
                </div>
                <PulseHeart likedLabel="Valeu!" />
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-foreground/70 text-[13px] tracking-tight">
                    {new Date().getFullYear()} &copy; {profile.name}
                  </p>
                  <p className="text-foreground/45 text-[12px] tracking-tight">
                    {profile.location} · Template React Bits Pro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}: {
  href: string;
  label: string;
  lucideIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  imageSrc?: string;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const ariaLabel = isExternal ? `${label} (abre em nova aba)` : label;
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="border-foreground/8 hover:border-foreground/15 focus-ring bg-background text-foreground/70 hover:text-foreground inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
          className="max-h-[14px] max-w-[14px] object-contain dark:invert"
        />
      ) : null}
    </Link>
  );
}
