import { profile } from "@/lib/profile";

/** Itens de navegação da landing page (âncoras das seções), usados pelos menus. */
export const SECTIONS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
] as const;

export const SOCIALS = [
  { label: "E-mail", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Instagram", href: profile.links.instagram },
] as const;

export const CV_URL = "/curriculo-felipe-bugalho.pdf";

/** Grupos do CardNav: três cartões com os atalhos do site. */
export const NAV_GROUPS = [
  {
    label: "Sobre mim",
    tone: "dark",
    links: [
      { label: "Quem sou eu", href: "#sobre" },
      { label: "Trajetória", href: "#trajetoria" },
      { label: "Certificações", href: "#vitrine" },
    ],
  },
  {
    label: "Trabalho",
    tone: "mid",
    links: [
      { label: "Projetos", href: "#projetos" },
      { label: "Tech Stack", href: "#stack" },
      { label: "Habilidades", href: "#habilidades" },
      { label: "Metodologias", href: "#metodologias" },
    ],
  },
  {
    label: "Contato",
    tone: "accent",
    links: [
      { label: "Fale comigo", href: "#contato" },
      { label: "LinkedIn", href: profile.links.linkedin },
      { label: "GitHub", href: profile.links.github },
      { label: "Currículo (PDF)", href: CV_URL },
    ],
  },
] as const;
