"use client";

import type { ReactNode } from "react";

import { ContactButton } from "./contact-button";

/** Só o e-mail copiável: "Ver projetos" já está no início e no menu. */
export function ContactCardCtas(): ReactNode {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <ContactButton />
    </div>
  );
}
