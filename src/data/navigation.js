/**
 * Seções do portfólio tradicional e estações da jornada.
 *
 * `sections` define a ORDEM da página, o menu (inNav), o índice lateral (inRail)
 * e a numeração "// 01 — ..." (numbered). Reordenar aqui reordena tudo.
 * Seções com `parent` ficam dentro de outra (o menu destaca a seção-mãe).
 */

/** @type {{id: string, label: string, inNav: boolean, inRail: boolean, numbered: boolean, parent?: string}[]} */
export const sections = [
  { id: 'inicio', label: 'Início', inNav: false, inRail: true, numbered: false },
  { id: 'sobre', label: 'Sobre', inNav: true, inRail: true, numbered: true },
  { id: 'projetos', label: 'Projetos', inNav: true, inRail: true, numbered: true },
  { id: 'experiencia', label: 'Experiência', inNav: true, inRail: true, numbered: true },
  { id: 'habilidades', label: 'Habilidades', inNav: true, inRail: true, numbered: true },
  { id: 'metodologias', label: 'Metodologias', inNav: false, inRail: false, numbered: false, parent: 'habilidades' },
  { id: 'formacao', label: 'Formação', inNav: true, inRail: true, numbered: true },
  { id: 'certificados', label: 'Certificados', inNav: false, inRail: true, numbered: false, parent: 'formacao' },
  { id: 'contato', label: 'Contato', inNav: false, inRail: true, numbered: true },
  { id: 'disponibilidade', label: 'Disponibilidade', inNav: false, inRail: false, numbered: false, parent: 'contato' },
]

/** Número "01", "02"... de uma seção, calculado pela ordem acima. */
export const sectionNumber = (id) => {
  const numbered = sections.filter((s) => s.numbered)
  const i = numbered.findIndex((s) => s.id === id)
  return i < 0 ? '' : String(i + 1).padStart(2, '0')
}

/** Seção que o menu deve destacar para um id (seções internas apontam para a mãe). */
export const navSectionFor = (id) => sections.find((s) => s.id === id)?.parent ?? id

/** Ordem da trajetória na jornada interativa. `section` aponta para o conteúdo exibido. */
export const journey = [
  { id: 'inicio', label: 'Início', icon: '🚩', section: 'inicio' },
  { id: 'sobre', label: 'Sobre mim', icon: '👋', section: 'sobre' },
  { id: 'formacao', label: 'Formação', icon: '🎓', section: 'formacao' },
  { id: 'habilidades', label: 'Habilidades', icon: '💻', section: 'habilidades' },
  { id: 'metodologias', label: 'Metodologias', icon: '🗂️', section: 'metodologias' },
  { id: 'projetos', label: 'Projetos', icon: '🏗️', section: 'projetos' },
  { id: 'certificados', label: 'Certificados', icon: '📜', section: 'certificados' },
  { id: 'experiencia', label: 'Experiência', icon: '🏢', section: 'experiencia' },
  { id: 'cargo-atual', label: 'Cargo atual', icon: '⭐', section: 'experiencia' },
  { id: 'disponibilidade', label: 'Disponibilidade', icon: '🟢', section: 'disponibilidade' },
  { id: 'contato', label: 'Contato', icon: '✉️', section: 'contato' },
]
