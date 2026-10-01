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
    tag: 'Plataforma corporativa · TMG · 2026',
    summary:
      'Plataforma corporativa de compartilhamento de viagens entre colaboradores da TMG, conectando motoristas e passageiros.',
    description:
      'Concepção e desenvolvimento de uma plataforma corporativa de compartilhamento de viagens entre colaboradores: criação de caronas, gestão de reservas e notificações automáticas. O sistema foi implantado em produção em setembro de 2026.',
    objective:
      'Facilitar a conexão entre motoristas e passageiros e otimizar o deslocamento dos colaboradores.',
    highlights: [
      'Selecionado como um dos quatro pilotos do programa TMG IA, iniciativa da área de TI voltada a soluções com Inteligência Artificial',
      'Implantado em produção em setembro de 2026',
      'Notificações automatizadas integradas a Power Automate e Microsoft Teams',
    ],
    tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Power Automate', 'Microsoft Teams'],
    links: { live: null, github: null },
    image: null,
    status: 'producao',
    date: '2026',
    featured: true,
    experienceId: 'tmg',
  },
  {
    id: 'consulta-produtos',
    title: 'Consulta de Produtos Cadastrados',
    emoji: '🔎',
    origin: 'profissional',
    tag: 'Ferramenta interna · Suprimentos · TMG',
    summary:
      'Automatiza a conferência de itens de orçamentos e cotações com a base de produtos do ERP Protheus.',
    description:
      'Ferramenta interna desenvolvida para automatizar a conferência de produtos usados em orçamentos e cotações com a base de produtos cadastrados no ERP Protheus, apoiando o setor de Suprimentos.',
    objective:
      'Reduzir tarefas manuais, agilizar as conferências e melhorar a consulta de produtos no processo de Suprimentos.',
    highlights: ['Primeira versão em React + Supabase; versão atual em ASP.NET Core com SQL Server'],
    tech: ['ASP.NET Core', '.NET', 'SQL Server', 'Dapper', 'Azure'],
    links: { live: null, github: null },
    image: null,
    status: null,
    date: '2026',
    featured: false,
    experienceId: 'tmg',
  },
  {
    id: 'catalogo-pecas',
    title: 'Catálogo de Peças Industriais',
    emoji: '⚙️',
    origin: 'profissional',
    tag: 'Dados mestres · PCM · TMG',
    summary:
      'Cadastro e padronização do catálogo de peças e ferramentas industriais no TOTVS Protheus e no Astrein.',
    description:
      'Atuação no cadastro e na padronização do catálogo de peças industriais usado pela manutenção e pelo almoxarifado.',
    objective:
      'Melhorar a organização, a padronização e a qualidade dos dados usados nos processos internos.',
    highlights: [],
    tech: ['TOTVS Protheus', 'Astrein (SSA-CAD)'],
    links: { live: null, github: null },
    image: null,
    status: null,
    date: null,
    featured: false,
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
