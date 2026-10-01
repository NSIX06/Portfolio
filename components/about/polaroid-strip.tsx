"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Icon, type IconifyIcon } from "@iconify/react";
import Image from "next/image";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

/** Um momento da trajetória: foto (src) ou marco com ano e ícone. */
export type PolaroidItem = {
  id: string;
  caption: string;
  sub: string;
  src?: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  year?: string;
  iconData?: IconifyIcon;
};

type Polaroid = PolaroidItem & { rotate: number };

const ROTATIONS = [-8, 6, -4, 7, -6, 5];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
}: {
  photo: Polaroid;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      role="listitem"
      aria-label={`${photo.year ? `${photo.year}: ` : ""}${photo.caption} — ${photo.sub}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{
        opacity: 0,
        y: -120,
        filter: "blur(18px)",
        rotate: photo.rotate,
      }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
    >
      <div className="flex h-full w-full flex-col gap-1">
        <div
          className="relative flex-1 overflow-hidden rounded-xl"
          style={photo.imageBg ? { backgroundColor: photo.imageBg } : undefined}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="144px"
              className={
                photo.imageFit === "contain"
                  ? "object-contain p-1"
                  : "object-cover"
              }
            />
          ) : (
            <>
              <DottedPattern className="absolute inset-0" />
              <div className="relative flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-b from-transparent to-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
                {photo.iconData ? (
                  <Icon
                    icon={photo.iconData}
                    className="text-accent h-[38%] w-[38%]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="text-foreground font-serif text-[clamp(1rem,2vw,1.5rem)] leading-none font-extrabold tracking-tight">
                  {photo.year}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col px-0.5 pt-0.5 pb-0.5 text-center">
          <span className="truncate text-[clamp(0.55rem,0.9vw,0.72rem)] leading-tight font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {photo.caption}
          </span>
          <span className="truncate font-mono text-[clamp(0.45rem,0.7vw,0.58rem)] tracking-wide text-neutral-500 uppercase">
            {photo.sub}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function PolaroidStrip({ items }: { items: PolaroidItem[] }): ReactNode {
  const photos: Polaroid[] = items.slice(0, 6).map((it, i) => ({
    ...it,
    rotate: ROTATIONS[i % ROTATIONS.length] ?? 0,
  }));
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />
    );
  }

  return (
    <div
      role="list"
      aria-label="Momentos da trajetória"
      className="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8"
    >
      {photos.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
