/**
 * Perfil profissional. Fonte: currículo atual (set/2026).
 * @typedef {Object} Profile
 * @property {string} fullName
 * @property {string} shortName
 * @property {string} handle
 * @property {string} title       Título exibido no Hero e no SEO
 * @property {string[]} roles     Tags curtas do Hero
 * @property {string} location
 * @property {string} tagline     Frase curta (SEO e jornada)
 * @property {string} greeting    Saudação do Hero
 * @property {string} statement   Frase de proposta do Hero
 * @property {string[]} about     Parágrafos da seção Sobre
 * @property {{label: string, value: string}[]} highlights  Números/rótulos fixos do Sobre
 * @property {{language: string, level: string, note?: string}[]} languages
 * @property {string[]} softSkills
 * @property {{github: string}} stats  Usuário usado na API do GitHub
 */

/** @type {Profile} */
export const profile = {
  fullName: 'Luiz Felipe Pablos Bugalho',
  shortName: 'Felipe Bugalho',
  handle: 'NSIX06',
  title: 'Desenvolvedor Full Stack',
  roles: ['Desenvolvedor Full Stack', 'Técnico em Informática', 'Freelancer'],
  location: 'Rondonópolis - MT',
  tagline:
    'Sistemas internos para o agronegócio, automação de processos e integração de sistemas, da análise de requisitos à entrega.',
  greeting: 'Oi, eu sou o Felipe.',
  statement:
    'Desenvolvo sistemas internos, automações e integrações para o agronegócio, da análise de requisitos à entrega.',
  about: [
    'Minha experiência combina desenvolvimento de software com conhecimento de processos corporativos: fui usuário-chave do TOTVS Protheus no Planejamento e Controle de Manutenção (PCM) da TMG, onde também criei ferramentas internas. Isso me ajuda a transformar necessidades operacionais em ferramentas digitais mais eficientes.',
    'Busco constantemente aprimorar meus conhecimentos em desenvolvimento web, backend, bancos de dados, cloud, automação e Inteligência Artificial.',
  ],
  highlights: [],
  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Intermediário', note: 'EF SET English Certificate — B1' },
    { language: 'Espanhol', level: 'Intermediário' },
    { language: 'Francês', level: 'Básico' },
  ],
  softSkills: [
    'Comunicação eficaz',
    'Trabalho em equipe',
    'Resolução de problemas',
    'Relacionamento interpessoal',
    'Criatividade e inovação',
    'Planejamento e organização',
    'Proatividade',
    'Aprendizado contínuo',
  ],
  stats: { github: 'NSIX06' },
}
