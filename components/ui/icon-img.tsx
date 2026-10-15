import type { CSSProperties, ReactNode } from "react";

import type { IconSrc } from "@/lib/icons";

/**
 * Ícone do Iconify como UM elemento (em vez de um <svg> com dezenas de <path>):
 * logos coloridos viram <img>, ícones monocromáticos viram uma máscara na cor do texto.
 * Reduz o DOM da página em centenas de nós.
 */
export function IconImg({
  icon,
  className = "",
  style,
}: {
  icon: IconSrc;
  className?: string;
  style?: CSSProperties;
}): ReactNode {
  if (icon.mono) {
    const mask = `url("${icon.url}") center / contain no-repeat`;
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
        style={{ ...style, backgroundColor: "currentColor", WebkitMask: mask, mask }}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element -- SVG embutido (data URI), sem otimização de imagem
  return <img src={icon.url} alt="" aria-hidden="true" decoding="async" className={`shrink-0 ${className}`} style={style} />;
}
