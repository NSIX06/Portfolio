"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type NavItem = {
  label: string;
  href: string;
};

/** Landing page única: cada item leva a uma seção (rolagem suave pelo Lenis). */
const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

/** Seção sob o meio da tela → índice do item do menu (scroll spy). */
const SPY: { id: string; item: number }[] = [
  { id: "inicio", item: 0 },
  { id: "sobre", item: 1 },
  { id: "trajetoria", item: 1 },
  { id: "projetos", item: 2 },
  { id: "stack", item: 3 },
  { id: "habilidades", item: 3 },
  { id: "metodologias", item: 3 },
  { id: "vitrine", item: 3 },
  { id: "contato", item: 4 },
];

function useActiveSection(): number {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = (): void => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let next = 0;
      for (const { id, item } of SPY) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) next = item;
      }
      setActive(next);
    };
    const onScroll = (): void => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function NavThemeToggle(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Mudar para o tema claro"
            : "Mudar para o tema escuro"
          : "Alternar tema"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="focus-ring bg-background ring-foreground/8 relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ring-1 transition-colors"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          className={`text-foreground absolute inset-0 h-4 w-4 transition-all duration-300 ${
            mounted && isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
        <Moon
          className={`text-foreground absolute inset-0 h-4 w-4 transition-all duration-300 ${
            mounted && !isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function Nav(): ReactNode {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillRect, setPillRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const activeIndex = useActiveSection();

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl = activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (!list || !activeEl) {
      // Medição do DOM depois do layout: precisa atualizar o estado aqui.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPillRect(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed top-4 left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:top-6"
    >
      <div className="bg-background/80 border-foreground/8 flex items-center gap-0.5 rounded-full border p-1 shadow-sm backdrop-blur-md sm:gap-1 sm:p-1.5">
        <ul ref={listRef} className="relative flex items-center gap-1">
          {pillRect && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={
                hasMeasured
                  ? { type: "spring", stiffness: 380, damping: 32 }
                  : { duration: 0 }
              }
              style={{ left: 0, top: 0, bottom: 0 }}
              className="bg-foreground/5 ring-foreground/8 absolute rounded-full ring-1"
            />
          )}
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative"
              >
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-300 sm:px-4 sm:text-sm"
                >
                  <span
                    className={
                      isActive
                        ? "text-foreground relative z-10"
                        : "text-foreground/60 hover:text-foreground relative z-10"
                    }
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <NavThemeToggle />
      </div>
    </nav>
  );
}
