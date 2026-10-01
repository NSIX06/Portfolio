/**
 * Seções do portfólio tradicional e estações da jornada.
 * O menu é gerado de `sections` (inNav: true); a jornada (Fase 3) segue `journey`.
 */

/** @type {{id: string, label: string, inNav: boolean}[]} */
export const sections = [
  { id: 'inicio', label: 'Início', inNav: false },
  { id: 'sobre', label: 'Sobre', inNav: true },
  { id: 'experiencia', label: 'Experiência', inNav: true },
  { id: 'caso-tmg-caronas', label: 'TMG Caronas', inNav: false },
  { id: 'formacao', label: 'Formação', inNav: true },
  { id: 'habilidades', label: 'Habilidades', inNav: true },
  { id: 'metodologias', label: 'Metodologias', inNav: false },
  { id: 'projetos', label: 'Projetos', inNav: true },
  { id: 'certificados', label: 'Certificados', inNav: true },
  { id: 'disponibilidade', label: 'Disponibilidade', inNav: false },
  { id: 'contato', label: 'Contato', inNav: true },
]

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
