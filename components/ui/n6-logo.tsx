import type { ReactNode } from "react";

/**
 * Logo "N6." (de NSIX06): N cheio, 6 vazado em vermelho e o ponto vermelho.
 * `size` em rem; herda a fonte de títulos (Syne).
 */
export function N6Logo({ size = 2, className = "" }: { size?: number; className?: string }): ReactNode {
  return (
    <span
      className={`n6-logo ${className}`}
      style={{ fontSize: `${size}rem` }}
      role="img"
      aria-label="N6 — NSIX06"
    >
      <span aria-hidden="true" className="n6-logo__n">
        N
      </span>
      <span aria-hidden="true" className="n6-logo__six">
        6
      </span>
      <span aria-hidden="true" className="n6-logo__dot">
        .
      </span>
    </span>
  );
}
