import type { ReactNode } from "react";

export function SkipToContent(): ReactNode {
  return (
    <a href="#main-content" className="skip-to-content">
      Pular para o conteúdo
    </a>
  );
}
