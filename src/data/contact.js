/**
 * Contato e redes. Somente dados: os ícones ficam em components/icons.
 * @typedef {'github'|'linkedin'|'instagram'|'email'|'portfolio'} ContactIcon
 *
 * @typedef {Object} ContactLink
 * @property {string} id
 * @property {ContactIcon} icon
 * @property {string} label
 * @property {string} href
 * @property {string} ariaLabel
 * @property {boolean} external
 */

export const contact = {
  email: 'felipebugalho2016@gmail.com',
  intro:
    'Aberto a oportunidades, projetos freelance e colaborações. Se quiser conversar sobre uma vaga ou um sistema, é só chamar.',
  /** @type {ContactLink[]} */
  links: [
    {
      id: 'email',
      icon: 'email',
      label: 'felipebugalho2016@gmail.com',
      href: 'mailto:felipebugalho2016@gmail.com',
      ariaLabel: 'Enviar e-mail para Felipe Bugalho',
      external: false,
    },
    {
      id: 'linkedin',
      icon: 'linkedin',
      label: 'LinkedIn — Felipe Bugalho',
      href: 'https://www.linkedin.com/in/felipe-bugalho-089083269/',
      ariaLabel: 'Perfil no LinkedIn',
      external: true,
    },
    {
      id: 'github',
      icon: 'github',
      label: 'github.com/NSIX06',
      href: 'https://github.com/NSIX06',
      ariaLabel: 'Perfil no GitHub',
      external: true,
    },
    {
      id: 'instagram',
      icon: 'instagram',
      label: '@fe.bugalho',
      href: 'https://instagram.com/fe.bugalho',
      ariaLabel: 'Perfil no Instagram',
      external: true,
    },
  ],
}

/** Atalhos usados por Hero, Contato e rodapé. */
export const contactById = Object.fromEntries(contact.links.map((l) => [l.id, l]))
