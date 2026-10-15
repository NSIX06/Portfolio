/**
 * Ícones do Iconify embutidos no build (sem chamar a API do Iconify no navegador).
 * Use só em Server Components: as coleções ficam no servidor e cada ícone usado chega
 * ao cliente já pronto, como um SVG em data URI (um único elemento no DOM).
 */
import { getIconData, iconToHTML, iconToSVG, replaceIDs, svgToData } from "@iconify/utils";
import logos from "@iconify-json/logos/icons.json";
import ph from "@iconify-json/ph/icons.json";

const COLLECTIONS = { logos, ph } as const;

/** Ícone pronto para <IconImg />: data URI do SVG e se ele usa a cor do texto. */
export type IconSrc = { url: string; mono: boolean };

const cache = new Map<string, IconSrc>();

/** "ph:car-profile-duotone" → { url: "data:image/svg+xml,…", mono }. */
export function icon(name: string): IconSrc {
  const hit = cache.get(name);
  if (hit) return hit;
  const [prefix, id] = name.split(":") as [keyof typeof COLLECTIONS, string];
  const data = getIconData(COLLECTIONS[prefix] as never, id);
  if (!data) throw new Error(`Ícone não encontrado: ${name}`);
  const r = iconToSVG(data, { height: "1em" });
  const body = replaceIDs(r.body);
  const out = {
    url: svgToData(iconToHTML(body, r.attributes)),
    mono: body.includes("currentColor"),
  };
  cache.set(name, out);
  return out;
}
