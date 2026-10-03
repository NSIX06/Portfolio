"use client";

import { gsap } from "gsap";
import { ArrowUpRight, FileDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { NavThemeToggle } from "@/components/layout/nav";
import { CV_URL, NAV_GROUPS } from "@/lib/nav";
import "./card-nav.css";

const TOP = 60;

/**
 * CardNav (React Bits), adaptado à identidade do site: barra escura translúcida com o nome
 * em Syne, botão de currículo em vermelho e três cartões (Sobre mim, Trabalho, Contato)
 * que sobem em sequência quando o menu abre.
 */
export function CardNav(): ReactNode {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const measure = (): number => {
    const nav = navRef.current;
    if (!nav) return 280;
    if (!window.matchMedia("(max-width: 768px)").matches) return 280;
    const content = nav.querySelector<HTMLElement>(".card-nav-content");
    if (!content) return 280;
    const prev = content.style.cssText;
    content.style.cssText += ";visibility:visible;position:static;height:auto;";
    const h = content.scrollHeight;
    content.style.cssText = prev;
    return TOP + h + 12;
  };

  const build = (): gsap.core.Timeline | null => {
    const nav = navRef.current;
    if (!nav) return null;
    gsap.set(nav, { height: TOP, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 48, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(nav, { height: measure, duration: 0.42, ease: "power3.out" });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", stagger: 0.08 }, "-=0.12");
    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = build();
    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- monta a timeline uma vez
  }, []);

  // Recalcula a altura ao redimensionar.
  useEffect(() => {
    const onResize = (): void => {
      tlRef.current?.kill();
      const tl = build();
      if (tl && open) tl.progress(1);
      tlRef.current = tl;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- build lê só refs
  }, [open]);

  const toggle = (next = !open): void => {
    const tl = tlRef.current;
    if (!tl) return;
    setOpen(next);
    if (next) {
      tl.eventCallback("onReverseComplete", null);
      tl.play(0);
    } else {
      tl.reverse();
    }
  };

  // Fecha com Esc e ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") toggle(false);
    };
    const onDown = (e: PointerEvent): void => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) toggle(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toggle usa só refs/estado atual
  }, [open]);

  return (
    <div className="card-nav-container">
      <nav ref={navRef} aria-label="Navegação principal" className={`card-nav ${open ? "open" : ""}`}>
        <div className="card-nav-top">
          <button
            type="button"
            onClick={() => toggle()}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="card-nav-content"
            className={`hamburger-menu focus-ring ${open ? "open" : ""}`}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <a href="#inicio" className="card-nav-logo focus-ring" onClick={() => open && toggle(false)}>
            <span className="text-foreground">Felipe</span> <span className="text-accent">Bugalho</span>
          </a>

          <div className="card-nav-actions">
            <NavThemeToggle />
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card-nav-cta-button focus-ring"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Currículo{" "}
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>

        <div id="card-nav-content" className="card-nav-content" aria-hidden={!open}>
          {NAV_GROUPS.map((g, i) => (
            <div
              key={g.label}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`nav-card nav-card--${g.tone}`}
            >
              <div className="nav-card-label">{g.label}</div>
              <div className="nav-card-links">
                {g.links.map((l) => {
                  const external = !l.href.startsWith("#");
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      tabIndex={open ? 0 : -1}
                      className="nav-card-link focus-ring"
                      onClick={() => toggle(false)}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      {l.label}
                      {external ? <span className="sr-only">(abre em nova aba)</span> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
