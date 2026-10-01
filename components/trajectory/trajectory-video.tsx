"use client";

import dynamic from "next/dynamic";
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

/**
 * "A estrada até aqui": o carrinho do TMG Caronas percorre os marcos da trajetória
 * enquanto a página rola.
 */
export function TrajectoryVideo(): ReactNode {
  const source = useVideoSource();

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
