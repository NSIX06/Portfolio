/**
 * Ícones do Iconify embutidos no build (sem chamar a API do Iconify no navegador).
 * Use só em Server Components: as coleções inteiras ficam no servidor e apenas
 * os dados de cada ícone usado chegam ao cliente.
 */
import type { IconifyIcon } from "@iconify/react";
import { getIconData } from "@iconify/utils";
import logos from "@iconify-json/logos/icons.json";
import ph from "@iconify-json/ph/icons.json";

const COLLECTIONS = { logos, ph } as const;

/** "ph:car-profile-duotone" → dados do ícone para <Icon icon={...} />. */
export function icon(name: string): IconifyIcon {
  const [prefix, id] = name.split(":") as [keyof typeof COLLECTIONS, string];
  const data = getIconData(COLLECTIONS[prefix] as never, id);
  if (!data) throw new Error(`Ícone não encontrado: ${name}`);
  return data as IconifyIcon;
}
