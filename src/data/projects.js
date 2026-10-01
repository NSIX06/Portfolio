/**
 * Projetos. Para adicionar um projeto, acrescente um objeto a esta lista:
 * ele aparece sozinho na seção Projetos (e, na Fase 3, na jornada).
 *
 * @typedef {'profissional'|'freelancer'|'academico'|'pessoal'|'curso'} ProjectOrigin
 * @typedef {'producao'|'concluido'|'em-desenvolvimento'|null} ProjectStatus
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} emoji
 * @property {ProjectOrigin} origin
 * @property {string} tag            Linha curta acima do título
 * @property {string} summary        Texto do card (1–2 frases)
 * @property {string} [description]  Texto completo do painel de detalhes
 * @property {string} [objective]
 * @property {string[]} [highlights]
 * @property {string[]} tech
 * @property {{live?: string|null, github?: string|null}} links
 * @property {string|null} image     Caminho em /public ou import
 * @property {ProjectStatus} status
 * @property {string|null} date
 * @property {boolean} featured
 * @property {string|null} experienceId  Experiência relacionada, quando houver
 */

/** Rótulos das origens, na ordem do filtro. */
export const projectOrigins = {
  profissional: 'Profissionais',
  freelancer: 'Freelancer',
  curso: 'Cursos',
  academico: 'Acadêmicos',
  pessoal: 'Pessoais',
}

export const projectStatusLabels = {
  producao: 'Em produção',
  concluido: 'Concluído',
  'em-desenvolvimento': 'Em desenvolvimento',
}

/** @type {Project[]} */
export const projects = [
  {
    id: 'tmg-caronas',
    title: 'TMG Caronas',
    emoji: '🚗',
    origin: 'profissional',
    tag: 'Sistema corporativo · TMG · 2026',
    summary:
      'Sistema corporativo de caronas entre colaboradores das bases da TMG, integrado ao Microsoft Entra ID, SQL Server, Azure e Microsoft Teams.',
    description:
      'Concepção e desenvolvimento de um sistema para ofertar e solicitar caronas, gerenciar participações, avaliar viagens, acompanhar indicadores gerenciais e administrar acessos. Construído sobre o template corporativo da TMG em .NET 10 e implantado em produção em setembro de 2026.',
    objective:
      'Facilitar a organização de caronas entre colaboradores, reduzindo custos e emissões e fortalecendo a integração entre as bases.',
    highlights: [
      'Selecionado como um dos quatro pilotos do programa TMG IA, iniciativa da área de TI voltada a soluções com Inteligência Artificial',
      'Implantado em produção em setembro de 2026',
      'Arquitetura em camadas (Web, Application, Infrastructure, Shared), tempo real com SignalR e PWA instalável',
    ],
    tech: ['.NET 10', 'ASP.NET Core MVC', 'Dapper', 'SQL Server', 'Microsoft Entra ID', 'SignalR', 'Azure Blob Storage', 'Microsoft Teams'],
    links: { live: null, github: null, caseStudy: '#caso-tmg-caronas' },
    image: null,
    status: 'producao',
    date: '2026',
    featured: true,
    experienceId: 'tmg',
  },
  {
    id: 'escolinha-skate-bob',
    title: 'Escolinha de Skate do Bob',
    emoji: '🛹',
    origin: 'academico',
    tag: 'Projeto de Extensão · FATEC/UniSENAI · 2025',
    summary:
      'Site institucional para a ONG que atende mais de 200 alunos por mês com aulas gratuitas de skate em Rondonópolis - MT.',
    description:
      'Site institucional para a ONG fundada em 2010 por Igor "Bob" Silva. Atende mais de 200 alunos/mês com aulas gratuitas de skate como ferramenta de inclusão social em Rondonópolis - MT. Orientado pelos Prof. Nailton Silva e Diego Bastos.',
    highlights: ['Projeto com impacto social real, publicado e em uso pela ONG'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsivo'],
    links: { live: 'https://www.escoladeskatedobob.org.br/', github: 'https://github.com/NSIX06' },
    image: null,
    status: 'producao',
    date: '2025',
    featured: true,
    experienceId: null,
  },
  {
    id: 'orderly-checkout',
    title: 'Orderly Checkout',
    emoji: '🛒',
    origin: 'pessoal',
    tag: 'Sistema · Full Stack',
    summary: 'Sistema de checkout e gestão de pedidos para otimizar fluxo de caixa e pagamentos.',
    description:
      'Sistema de checkout e gestão de pedidos para otimizar fluxo de caixa e pagamentos. Projeto com foco em experiência do usuário e controle de transações em tempo real.',
    tech: ['Full Stack', 'Checkout', 'Gestão'],
    links: { live: null, github: 'https://github.com/NSIX06/Orderly-Checkout-Main' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'agrodatahub',
    title: 'AgroDataHub',
    emoji: '🌾',
    origin: 'pessoal',
    tag: 'Plataforma · Agronegócio',
    summary:
      'Plataforma que centraliza, organiza e visualiza dados do setor agrícola para apoiar a tomada de decisão.',
    description:
      'Plataforma de dados para o agronegócio. Centraliza, organiza e visualiza informações do setor agrícola, auxiliando produtores e gestores na tomada de decisão baseada em dados.',
    tech: ['Data Hub', 'Agronegócio', 'Dashboard'],
    links: { live: null, github: 'https://github.com/NSIX06/AgroDataHub-Main' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'app-restaurant',
    title: 'App Restaurant',
    emoji: '🍽️',
    origin: 'pessoal',
    tag: 'App · Restaurante',
    summary: 'Aplicativo de gestão de restaurantes: mesas, pedidos e cardápio digital.',
    description:
      'Aplicativo para gestão de restaurantes. Controle de mesas, pedidos e cardápio digital integrados em uma interface prática para atendimento ágil e eficiente.',
    tech: ['App', 'Gestão', 'UX'],
    links: { live: null, github: 'https://github.com/NSIX06/App_Restaurant' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'braintag',
    title: 'BrainTag',
    emoji: '🧠',
    origin: 'academico',
    tag: 'Projeto Integrador',
    summary: 'Sistema em C# para organização e gerenciamento de informações.',
    description:
      'Projeto integrador da formação acadêmica. Sistema em C# para organização e gerenciamento de informações com foco em produtividade e estrutura de dados.',
    tech: ['C#', '.NET'],
    links: { live: null, github: 'https://github.com/NSIX06/BrainTag' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'motos',
    title: 'Motos',
    emoji: '🏍️',
    origin: 'pessoal',
    tag: 'Frontend · Web Design',
    summary: 'Interface web sobre motocicletas com foco em layout, tipografia e CSS puro.',
    description:
      'Interface web com estilização cuidadosa para o tema de motocicletas. Foco em layout visual, tipografia e composição com CSS puro.',
    tech: ['HTML5', 'CSS3'],
    links: { live: null, github: 'https://github.com/NSIX06/Motos' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'devops-py',
    title: 'Devops.py',
    emoji: '🐍',
    origin: 'pessoal',
    tag: 'DevOps · Automação',
    summary: 'Scripts em Python para automação de tarefas e integração entre sistemas.',
    description:
      'Scripts e automações em Python para práticas de DevOps. Automação de tarefas repetitivas e integração entre sistemas.',
    tech: ['Python', 'DevOps', 'Automação'],
    links: { live: null, github: 'https://github.com/NSIX06/Devops.py' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
  {
    id: 'projeto-cinematic',
    title: 'Projeto Cinematic',
    emoji: '🎬',
    origin: 'academico',
    tag: 'Fork · Colaboração',
    summary: 'Sistema de filmes em C# desenvolvido de forma colaborativa via GitHub.',
    description:
      'Fork colaborativo de um sistema de filmes em C#. Demonstra trabalho em equipe e colaboração via GitHub com outros desenvolvedores.',
    tech: ['C#', 'Colaboração'],
    links: { live: null, github: 'https://github.com/NSIX06/Projeto_Cinematic' },
    image: null,
    status: null,
    date: null,
    featured: false,
    experienceId: null,
  },
]

/** Link para todos os repositórios. */
export const allReposUrl = 'https://github.com/NSIX06?tab=repositories'
