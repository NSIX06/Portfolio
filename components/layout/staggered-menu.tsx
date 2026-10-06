"use client";

import { gsap } from "gsap";
import { ArrowRight, Download, FileText, Github, Instagram, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { NavThemeToggle } from "@/components/layout/nav";
import { N6Logo } from "@/components/ui/n6-logo";
import { PALETTES, setPalette, usePalette } from "@/lib/palette";
import { CV_URL } from "@/lib/nav";
import { profile } from "@/lib/profile";
import "./staggered-menu.css";


const ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre mim", href: "#sobre" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Contato", href: "#contato" },
] as const;

const SOCIAL = [
  { label: "LinkedIn", href: profile.links.linkedin, Icon: Linkedin },
  { label: "GitHub", href: profile.links.github, Icon: Github },
  { label: "E-mail", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "Instagram", href: profile.links.instagram, Icon: Instagram },
] as const;

/** Seção sob ~45% da tela → índice do item ativo (scroll spy). */
function useActiveItem(): number {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = (): void => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let next = 0;
      ITEMS.forEach((it, i) => {
        const el = document.querySelector(it.href);
        if (el && el.getBoundingClientRect().top <= mid) next = i;
      });
      setActive(next);
    };
    const onScroll = (): void => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

/**
 * StaggeredMenu (React Bits) adaptado ao site: mantém as camadas vermelhas que deslizam
 * antes do painel, os itens que sobem em cascata e o botão Menu/Fechar com o "+" girando;
 * o painel ganha a organização de um "sistema de navegação": seção ativa destacada,
 * disponibilidade, redes e o currículo em destaque.
 */
export function StaggeredMenu(): ReactNode {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(["Menu", "Fechar"]);
  const active = useActiveItem();
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const pal = usePalette();
  const LAYERS = isLight ? pal.layers : pal.dark.layers;
  const panelRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openTl = useRef<gsap.core.Timeline | null>(null);
  const closeTl = useRef<gsap.core.Timeline | null>(null);

  // Estado inicial: painel e camadas fora da tela, à direita; fundo escurecido invisível.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = layersRef.current ? Array.from(layersRef.current.children) : [];
    if (!panel) return;
    const ctx = gsap.context(() => {
      // x: 0 zera o translateX(100%) do CSS (que o GSAP leria como pixels) e deixa só o xPercent.
      gsap.set([panel, ...layers], { x: 0, xPercent: 100 });
      gsap.set(".sm-item-label", { yPercent: 120, rotate: 6 });
      if (backdropRef.current) gsap.set(backdropRef.current, { autoAlpha: 0 });
    }, panel);
    return () => ctx.revert();
  }, []);

  const play = (opening: boolean): void => {
    const panel = panelRef.current;
    const layers = layersRef.current ? (Array.from(layersRef.current.children) as HTMLElement[]) : [];
    const backdrop = backdropRef.current;
    if (!panel) return;
    const labels = panel.querySelectorAll<HTMLElement>(".sm-item-label");
    const nums = panel.querySelectorAll<HTMLElement>(".sm-item-num");
    const reveal = panel.querySelectorAll<HTMLElement>("[data-sm-reveal]");

    openTl.current?.kill();
    closeTl.current?.kill();

    if (opening) {
      gsap.set(labels, { yPercent: 120, rotate: 6 });
      gsap.set(nums, { opacity: 0, x: -6 });
      gsap.set(reveal, { y: 16, opacity: 0 });
      const tl = gsap.timeline();
      if (backdrop) tl.to(backdrop, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0);
      layers.forEach((el, i) =>
        tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07)
      );
      const t = layers.length * 0.07 + 0.02;
      tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: "power4.out" }, t);
      tl.to(labels, { yPercent: 0, rotate: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }, t + 0.12);
      tl.to(nums, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 }, t + 0.2);
      tl.to(reveal, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07 }, t + 0.3);
      openTl.current = tl;
    } else {
      const tl = gsap.timeline();
      tl.to([...layers, panel], { xPercent: 100, duration: 0.32, ease: "power3.in" }, 0);
      if (backdrop) tl.to(backdrop, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0);
      closeTl.current = tl;
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

  // Esc e clique fora fecham; foco vai para o item ativo ao abrir.
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
    const target = panelRef.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const id = window.setTimeout(() => target?.focus({ preventScroll: true }), 380);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toggle usa só refs/estado atual
  }, [open]);

  const tab = open ? 0 : -1;

  return (
    <div className="staggered-menu-wrapper" data-open={open || undefined}>
      <div ref={backdropRef} className="sm-backdrop" aria-hidden="true" />
      <div ref={layersRef} className="sm-prelayers" aria-hidden="true">
        {LAYERS.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header">
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
        aria-label="Menu de navegação"
        data-lenis-prevent
      >
        <div className="sm-panel-head">
          <N6Logo size={1.5} className="sm-head-logo n6-logo--solid" />
          <p className="sm-kicker">{"// navegação"}</p>
        </div>

        <nav className="sm-panel-body" aria-label="Seções">
          <p className="sm-group-label">Seções principais</p>
          <ul className="sm-list">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <li key={it.href} className="sm-item-wrap">
                  <a
                    href={it.href}
                    tabIndex={tab}
                    aria-current={on ? "location" : undefined}
                    className={`sm-item focus-ring ${on ? "is-active" : ""}`}
                    onClick={() => toggle(false)}
                  >
                    <span className="sm-item-num">{String(i + 1).padStart(2, "0")}.</span>
                    <span className="sm-item-clip">
                      <span className="sm-item-label">{it.label}</span>
                    </span>
                    <ArrowRight className="sm-item-arrow" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="sm-themes" data-sm-reveal>
            <p className="sm-group-label">Aparência</p>
            <div className="sm-mode-row" role="radiogroup" aria-label="Modo">
              {(
                [
                  ["dark", "Escuro", Moon],
                  ["light", "Claro", Sun],
                ] as const
              ).map(([mode, label, ModeIcon]) => {
                const on = (mode === "light") === isLight;
                return (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={tab}
                    onClick={() => setTheme(mode)}
                    className={`sm-mode focus-ring ${on ? "is-on" : ""}`}
                  >
                    <ModeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="sm-theme-row" role="radiogroup" aria-label="Cor do site">
              {PALETTES.map((p) => {
                const on = pal.id === p.id;
                const c = isLight ? p.accent : p.dark.accent;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={tab}
                    onClick={() => setPalette(p.id)}
                    className={`sm-swatch focus-ring ${on ? "is-on" : ""}`}
                    title={p.label}
                  >
                    <span
                      className="sm-swatch-dot"
                      aria-hidden="true"
                      style={{
                        background: `linear-gradient(135deg, ${isLight ? "#ffffff" : "#050505"} 0 45%, ${c} 45% 100%)`,
                      }}
                    />
                    <span className="sm-swatch-label">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sm-status" data-sm-reveal>
            <span className="sm-status-dot" aria-hidden="true" />
            <span className="sm-status-text">Disponível para novos projetos</span>
            <span className="sm-status-meta">MT · Remoto</span>
          </div>
        </nav>

        <div className="sm-panel-foot">
          <div className="sm-foot-head" data-sm-reveal>
            <span>{"Conectar // redes"}</span>
            <span className="text-accent">@{profile.handle}</span>
          </div>
          <ul className="sm-social-grid" data-sm-reveal>
            {SOCIAL.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  tabIndex={tab}
                  className="sm-social focus-ring"
                  {...(href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={tab}
            className="sm-cv focus-ring"
            data-sm-reveal
          >
            <span className="sm-cv-icon" aria-hidden="true">
              <FileText className="h-4 w-4" />
            </span>
            <span className="sm-cv-text">
              <span className="sm-cv-title">Currículo completo</span>
              <span className="sm-cv-sub">Download em PDF · atualizado</span>
            </span>
            <Download className="sm-cv-arrow" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
