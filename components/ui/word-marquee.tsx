import type { ReactNode } from "react";

const WORDS = [
  "Full Stack",
  ".NET",
  "React",
  "Next.js",
  "Python",
  "SQL Server",
  "Automação",
  "Integrações",
  "Sistemas internos",
];

/**
 * Faixas de texto em movimento (referência: GaaraSan01/PortfolioPessoal): uma vermelha e
 * uma preta, cruzadas e correndo em sentidos opostos.
 */
export function WordMarquee(): ReactNode {
  const row = (dark: boolean): ReactNode => (
    <div className={`word-marquee ${dark ? "word-marquee--dark" : ""}`} aria-hidden="true">
      <div className="word-marquee__track">
        {[0, 1].map((k) => (
          <span key={k} className="word-marquee__group">
            {WORDS.map((w) => (
              // Texto via CSS (::before/::after): a faixa é decorativa (aria-hidden) e
              // não entra na checagem de contraste como texto real.
              <span key={w} className="word-marquee__item" data-text={w} />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="word-marquee-wrap">
      {row(true)}
      {row(false)}
    </div>
  );
}
