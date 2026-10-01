/**
 * Habilidades técnicas por categoria.
 * @typedef {Object} TechCategory
 * @property {string} id
 * @property {string} label
 * @property {string} icon
 * @property {'orange'|'blue'|'green'|'yellow'} color
 * @property {string[]} items
 */

/** @type {TechCategory[]} */
export const technologies = [
  {
    id: 'frontend',
    label: 'Front-end',
    icon: '🌐',
    color: 'orange',
    items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'backend',
    label: 'Back-end & Linguagens',
    icon: '🔧',
    color: 'blue',
    items: ['C#', '.NET', 'ASP.NET Core', 'Python', 'FastAPI', 'Django', 'PHP', 'Laravel', 'Node.js', 'Prisma', 'C / C++'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    color: 'yellow',
    items: ['Flutter', 'Dart', 'React Native'],
  },
  {
    id: 'database',
    label: 'Bancos de Dados & BI',
    icon: '🗄️',
    color: 'green',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Supabase', 'Modelagem de dados', 'Power BI'],
  },
  {
    id: 'integration',
    label: 'Integrações, Automação & Cloud',
    icon: '🔗',
    color: 'blue',
    items: ['APIs REST', 'Integração de sistemas', 'Integração com ERPs', 'Microsoft Power Automate', 'Microsoft Teams', 'Azure'],
  },
  {
    id: 'corporate',
    label: 'Sistemas Corporativos',
    icon: '🏢',
    color: 'yellow',
    items: ['TOTVS Protheus (SIGAMNT)', 'GLPI', 'Astrein (SSA-CAD)', 'Microsoft 365'],
  },
  {
    id: 'tools',
    label: 'Desenvolvimento & Ferramentas',
    icon: '🛠️',
    color: 'orange',
    items: ['Git', 'GitHub', 'Docker', 'Figma', 'Postman', 'Arquitetura Full Stack', 'UX/UI'],
  },
  {
    id: 'infra',
    label: 'Infraestrutura & Suporte',
    icon: '🔌',
    color: 'green',
    items: ['Redes', 'Servidores', 'Suporte técnico', 'Montagem e manutenção de computadores', 'Linux', 'Windows Server'],
  },
]
