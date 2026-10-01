/**
 * "O que faço" — serviços exibidos na seção de rolagem logo após o Hero.
 * Os nomes vêm de availability.specialties; textos e tecnologias saem do
 * currículo (experiências e projetos). `projectId` liga a um projeto real.
 *
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} tech
 * @property {string|null} projectId
 */

/** @type {Service[]} */
export const services = [
  {
    id: 'sistemas-corporativos',
    name: 'Sistemas Corporativos',
    description:
      'Ferramentas internas que digitalizam rotinas da operação, integradas ao ambiente Microsoft da empresa.',
    tech: ['.NET', 'ASP.NET Core', 'SQL Server', 'Microsoft Entra ID'],
    projectId: 'tmg-caronas',
  },
  {
    id: 'desenvolvimento-web',
    name: 'Desenvolvimento Web',
    description: 'Sites institucionais e interfaces responsivas, publicados e em uso.',
    tech: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3'],
    projectId: 'escolinha-skate-bob',
  },
  {
    id: 'full-stack',
    name: 'Full Stack',
    description: 'Aplicações e sistemas sob medida, da interface ao banco de dados.',
    tech: ['C#', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase'],
    projectId: null,
  },
  {
    id: 'automacao',
    name: 'Automação de Processos',
    description:
      'Fluxos que eliminam trabalho manual, como a conferência automatizada de produtos com a base do Protheus.',
    tech: ['Microsoft Power Automate', 'Python', 'Microsoft Teams'],
    projectId: null,
  },
  {
    id: 'integracao',
    name: 'Integração de Sistemas',
    description: 'APIs e integrações entre sistemas, ERPs e serviços em nuvem.',
    tech: ['APIs REST', 'Integração com ERPs', 'Azure'],
    projectId: null,
  },
]
