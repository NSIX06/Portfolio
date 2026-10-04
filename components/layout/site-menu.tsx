"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { CardNav } from "@/components/layout/card-nav";
import { Nav } from "@/components/layout/nav";
import { StaggeredMenu } from "@/components/layout/staggered-menu";

type MenuKind = "card" | "staggered" | "pill";
const DEFAULT: MenuKind = "card";

/** Lê ?menu=card|staggered|pill da URL (para comparar os menus no preview). */
function readMenu(): MenuKind {
  const v = new URLSearchParams(window.location.search).get("menu");
  return v === "staggered" || v === "pill" || v === "card" ? v : DEFAULT;
}

export function SiteMenu(): ReactNode {
  const kind = useSyncExternalStore<MenuKind>(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    readMenu,
    () => DEFAULT
  );
  if (kind === "staggered") return <StaggeredMenu />;
  if (kind === "pill") return <Nav />;
  return <CardNav />;
}
