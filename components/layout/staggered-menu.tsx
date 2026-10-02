"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { NavThemeToggle } from "@/components/layout/nav";
import { CV_URL, SECTIONS, SOCIALS } from "@/lib/nav";
import "./staggered-menu.css";

const LAYERS = ["#2a0707", "#e11d1d"];

/**
 * StaggeredMenu (React Bits), adaptado: camadas em vermelho escuro e vermelho que deslizam
 * antes do painel, itens grandes em Syne com numeração vermelha, redes sociais e currículo.
 */
export function StaggeredMenu(): ReactNode {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(["Menu", "Fechar"]);
  const panelRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openTl = useRef<gsap.core.Timeline | null>(null);
  const closeTw = useRef<gsap.core.Tween | null>(null);

  // Estado inicial: painel e camadas fora da tela, à direita.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = layersRef.current ? Array.from(layersRef.current.children) : [];
    if (!panel) return;
    const ctx = gsap.context(() => {
      // x: 0 zera o translateX(100%) do CSS (que o GSAP leria como pixels) e deixa só o xPercent.
      gsap.set([panel, ...layers], { x: 0, xPercent: 100 });
      gsap.set(".sm-panel-itemLabel", { yPercent: 140, rotate: 10 });
    }, panel);
    return () => ctx.revert();
  }, []);

  const play = (opening: boolean): void => {
    const panel = panelRef.current;
    const layers = layersRef.current ? (Array.from(layersRef.current.children) as HTMLElement[]) : [];
    if (!panel) return;
    const labels = panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel");
    const nums = panel.querySelectorAll<HTMLElement>(".sm-panel-list .sm-panel-item");
    const socials = panel.querySelectorAll<HTMLElement>(".sm-socials-title, .sm-socials-link");

    openTl.current?.kill();
    closeTw.current?.kill();

    if (opening) {
      gsap.set(labels, { yPercent: 140, rotate: 10 });
      gsap.set(nums, { "--sm-num-opacity": 0 });
      gsap.set(socials, { y: 20, opacity: 0 });
      const tl = gsap.timeline();
      layers.forEach((el, i) => tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07));
      const t = layers.length * 0.07 + 0.02;
      tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: "power4.out" }, t);
      tl.to(labels, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, t + 0.1);
      tl.to(nums, { "--sm-num-opacity": 1, duration: 0.6, ease: "power2.out", stagger: 0.08 }, t + 0.2);
      tl.to(socials, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.05 }, t + 0.3);
      openTl.current = tl;
    } else {
      closeTw.current = gsap.to([...layers, panel], { xPercent: 100, duration: 0.32, ease: "power3.in" });
    }

    // Ícone "+" gira para virar "×".
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: opening ? 225 : 0,
        duration: opening ? 0.8 : 0.35,
        ease: opening ? "power4.out" : "power3.inOut",
        overwrite: "auto",
      });
    }

    // Texto do botão rola Menu ↔ Fechar.
    const seq = opening ? ["Menu", "Fechar", "Menu", "Fechar"] : ["Fechar", "Menu", "Fechar", "Menu"];
    setLines(seq);
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { yPercent: 0 },
        { yPercent: -((seq.length - 1) / seq.length) * 100, duration: 0.75, ease: "power4.out" }
      );
    }
  };

  const toggle = (next = !open): void => {
    if (next === open) return;
    setOpen(next);
    play(next);
    window.dispatchEvent(new Event(next ? "lenis:stop" : "lenis:start"));
  };

  // Esc e clique fora fecham; foco vai para o primeiro item ao abrir.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        toggle(false);
        toggleRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent): void => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) toggle(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    const id = window.setTimeout(() => first?.focus({ preventScroll: true }), 350);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toggle usa só refs/estado atual
  }, [open]);

  // Item clicado: fecha o menu e deixa o Lenis rolar até a seção.
  const onItem = (): void => {
    toggle(false);
  };

  return (
    <div className="staggered-menu-wrapper" data-open={open || undefined}>
      <div ref={layersRef} className="sm-prelayers" aria-hidden="true">
        {LAYERS.map((c) => (
          <div key={c} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header">
        <a href="#inicio" className="sm-logo focus-ring" onClick={() => open && toggle(false)}>
          <span className="text-foreground">Felipe</span> <span className="text-accent">Bugalho</span>
        </a>
        <div className="sm-actions">
          <NavThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => toggle()}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            className="sm-toggle focus-ring"
          >
            <span className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textRef} className="sm-toggle-textInner">
                {lines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span className="sm-icon-line" />
              <span className="sm-icon-line sm-icon-line-v" />
            </span>
          </button>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        aria-label="Menu"
        data-lenis-prevent
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list">
            {SECTIONS.map((s) => (
              <li className="sm-panel-itemWrap" key={s.href}>
                <a className="sm-panel-item" href={s.href} tabIndex={open ? 0 : -1} onClick={onItem}>
                  <span className="sm-panel-itemLabel">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="sm-socials">
            <h3 className="sm-socials-title">Redes e currículo</h3>
            <ul className="sm-socials-list">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="sm-socials-link"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="sm-socials-link sm-socials-link--cv">
                  Currículo (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
