/**
 * Experiências profissionais, da atual para a mais antiga.
 * A experiência com `current: true` alimenta o "Cargo atual".
 *
 * @typedef {Object} ExperienceRole
 * @property {string} title
 * @property {string[]} activities
 *
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} company
 * @property {string} [companyNote]    Linha curta sobre a empresa
 * @property {ExperienceRole[]} roles  Um ou mais papéis na mesma experiência
 * @property {string} start            "Mês/Ano", ex.: "Ago/2022"
 * @property {string|null} end         null = atual
 * @property {boolean} current
 * @property {string} location
 * @property {string} description
 * @property {string[]} technologies
 * @property {{name: string, description: string}[]} tools  Sistemas utilizados
 * @property {string[]} projectIds      ids de projects.js ligados a esta experiência
 * @property {string} accent            Cor da barra do card (token CSS)
 */

/** @type {Experience[]} */
export const experiences = [
  {
    id: 'autonomo',
    company: 'Profissional Autônomo',
    roles: [
      {
        title: 'Desenvolvedor Web Freelancer',
        activities: [
          'Desenvolvimento de aplicações Full Stack e sistemas sob medida',
          'Criação de APIs e integrações entre sistemas',
          'Interfaces responsivas e integração com bancos de dados',
          'Automação de processos',
        ],
      },
      {
        title: 'Técnico em Informática',
        activities: [
          'Instalação, configuração e manutenção de computadores, notebooks, sistemas operacionais, softwares e periféricos',
          'Diagnóstico e solução de falhas de hardware, software, redes locais e conexões de internet',
          'Montagem, formatação, testes, atualização de antivírus, backup e recuperação de dados, com documentação dos atendimentos',
        ],
      },
    ],
    start: 'Ago/2022',
    end: null,
    current: true,
    location: 'Rondonópolis - MT · Remoto',
    description:
      'Desenvolvimento de aplicações web e soluções personalizadas para diferentes segmentos, da análise de requisitos à implementação e evolução dos sistemas, além de suporte técnico em informática.',
    technologies: [],
    tools: [],
    projectIds: [],
    accent: 'var(--color-accent)',
  },
  {
    id: 'tmg',
    company: 'TMG — Tropical Melhoramento & Genética',
    companyNote:
      'Empresa de pesquisa e desenvolvimento de sementes de soja, milho e algodão, focada em melhoramento genético e biotecnologia.',
    roles: [
      {
        title: 'Auxiliar Administrativo — PCM',
        activities: [
          'Suporte às rotinas administrativas, operacionais e documentais do Planejamento e Controle de Manutenção (PCM)',
          'Usuário-chave do TOTVS Protheus (SIGAMNT): planos de manutenção preventiva e preditiva, ordens de serviço, controle de peças e materiais e relatórios gerenciais',
          'Administração do GLPI: chamados, protocolo de notas fiscais e solicitações de cadastro',
          'Cadastro e padronização de peças e ferramentas no Protheus e no Astrein (SSA-CAD)',
          'Desenvolvimento de ferramentas internas para otimização de processos',
        ],
      },
    ],
    start: 'Nov/2024',
    end: '2026',
    current: false,
    location: 'Rondonópolis - MT',
    description:
      'Atuação no PCM conciliando atividades administrativas com o desenvolvimento de ferramentas internas para otimização de processos.',
    technologies: ['TOTVS Protheus', 'GLPI', 'Astrein', 'Power Automate', 'Microsoft Teams'],
    tools: [
      {
        name: 'TOTVS Protheus (SIGAMNT)',
        description:
          'Usuário-chave no módulo de Manutenção de Ativos: planos preventivos e preditivos, ordens de serviço, peças, materiais e relatórios.',
      },
      {
        name: 'GLPI',
        description:
          'Catálogo de serviços, chamados de suporte, protocolo de notas fiscais e solicitações de cadastro.',
      },
      {
        name: 'Astrein (SSA-CAD)',
        description:
          'Cadastro e padronização de peças e ferramentas, garantindo a integridade dos dados de manutenção e almoxarifado.',
      },
    ],
    projectIds: ['tmg-caronas', 'consulta-produtos', 'catalogo-pecas'],
    accent: 'var(--color-accent2)',
  },
]

/** Experiência marcada como atual (usada no "Cargo atual"). */
export const currentExperience = experiences.find((e) => e.current) ?? null
