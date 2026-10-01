"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore, type ReactNode } from "react";

/** H.264 (MP4) onde houver suporte; senão VP9 (WebM), que o Chromium sem codecs proprietários decodifica. */
function pickSource(): { src: string; webCodecs: boolean } {
  const v = document.createElement("video");
  if (v.canPlayType('video/mp4; codecs="avc1.640028"')) {
    return { src: "/video/trajetoria.mp4", webCodecs: true };
  }
  return { src: "/video/trajetoria.webm", webCodecs: false };
}

const noop = (): (() => void) => () => {};
let cachedSource: { src: string; webCodecs: boolean } | null = null;
function useVideoSource(): { src: string; webCodecs: boolean } | null {
  return useSyncExternalStore(
    noop,
    () => (cachedSource ??= pickSource()),
    () => null
  );
}

// Scrolly Video: o vídeo avança e volta conforme a rolagem (decodificado com WebCodecs).
const ScrollyVideo = dynamic(
  () => import("scrolly-video/dist/ScrollyVideo.esm.jsx"),
  { ssr: false }
);

const reducedQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false
  );
}

/**
 * "A estrada até aqui": o carrinho do TMG Caronas percorre os marcos da trajetória
 * enquanto a página rola. Com movimento reduzido, mostra o quadro final parado.
 */
export function TrajectoryVideo(): ReactNode {
  const reduced = useReducedMotion();
  const source = useVideoSource();

  if (reduced) {
    return (
      <div className="border-foreground/8 relative mx-auto aspect-video w-full max-w-275 overflow-hidden rounded-4xl border">
        <Image
          src="/video/trajetoria-final.webp"
          alt="Estrada com os marcos da trajetória de 2022 até hoje"
          fill
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="trajectory-video relative h-[260vh] w-full"
      aria-label="Animação da trajetória de 2022 até hoje"
      role="img"
    >
      {source ? (
        <ScrollyVideo
          src={source.src}
          cover={false}
          sticky
          full
          trackScroll
          transitionSpeed={10}
          useWebCodecs={source.webCodecs}
        />
      ) : null}
    </div>
  );
}
