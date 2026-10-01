/**
 * Trajetória do Felipe (carreira e formação) — usada na linha do tempo da página Sobre.
 * Fonte: currículo (out/2026) e conteúdo da primeira versão do portfólio.
 * `icon` é um nome do Iconify resolvido no servidor.
 */
export type MilestoneKind = "profissional" | "academica";

export type Milestone = {
  id: string;
  kind: MilestoneKind;
  /** Ano em destaque no cartão */
  year: string;
  /** Período completo, ex.: "Ago/2022 – Atual" */
  period: string;
  badge: string;
  title: string;
  subtitle?: string;
  place: string;
  text: string;
  current?: boolean;
  note?: string;
  roles?: { title: string; activities: string[] }[];
  activities?: string[];
  systems?: { name: string; description: string }[];
  tech?: string[];
  projects?: { name: string; detail: string }[];
  icon: string;
  link?: { href: string; label: string };
};

export const MILESTONES: Milestone[] = [
  {
    id: "autonomo",
    kind: "profissional",
    year: "2022",
    period: "Ago/2022 – Atual",
    badge: "Autônomo",
    current: true,
    title: "Desenvolvimento web e suporte técnico",
    place: "Rondonópolis - MT · Remoto",
    text: "Duas frentes de trabalho: aplicações web sob medida para diferentes segmentos e manutenção e suporte em informática.",
    roles: [
      {
        title: "Desenvolvedor Web Freelancer",
        activities: [
          "Desenvolvimento de aplicações Full Stack e sistemas sob medida",
          "Criação de APIs e integrações entre sistemas",
          "Interfaces responsivas e integração com bancos de dados",
          "Automação de processos",
        ],
      },
      {
        title: "Técnico em Informática",
        activities: [
          "Instalação, configuração e manutenção de computadores, notebooks, sistemas operacionais, softwares e periféricos",
          "Diagnóstico e solução de falhas de hardware, software, redes locais e conexões de internet",
          "Montagem, formatação, testes, atualização de antivírus, backup e recuperação de dados, com documentação dos atendimentos",
        ],
      },
    ],
    icon: "ph:code-duotone",
  },
  {
    id: "tmg",
    kind: "profissional",
    year: "2024",
    period: "Nov/2024 – 2026",
    badge: "PCM",
    title: "TMG — Tropical Melhoramento & Genética",
    subtitle: "Auxiliar Administrativo — PCM",
    place: "Rondonópolis - MT",
    text: "Empresa de pesquisa em sementes de soja, milho e algodão. No Planejamento e Controle de Manutenção (PCM), conciliei as rotinas administrativas com o desenvolvimento de ferramentas internas.",
    activities: [
      "Suporte às rotinas administrativas, operacionais e documentais do PCM",
      "Usuário-chave e administrador dos sistemas abaixo",
    ],
    systems: [
      {
        name: "TOTVS Protheus (SIGAMNT)",
        description:
          "Usuário-chave no módulo de Manutenção de Ativos: planos preventivos e preditivos, ordens de serviço, peças, materiais e relatórios.",
      },
      {
        name: "GLPI",
        description: "Catálogo de serviços, chamados de suporte, protocolo de notas fiscais e solicitações de cadastro.",
      },
      {
        name: "Astrein (SSA-CAD)",
        description:
          "Cadastro e padronização de peças e ferramentas, garantindo a integridade dos dados de manutenção e almoxarifado.",
      },
    ],
    tech: [".NET", "SQL Server", "Microsoft Entra ID", "Power Automate", "Microsoft Teams"],
    projects: [
      {
        name: "TMG Caronas",
        detail: "Sistema corporativo de caronas, em produção desde setembro de 2026 e piloto do programa TMG IA.",
      },
    ],
    icon: "ph:gear-six-duotone",
  },
  {
    id: "recode",
    kind: "academica",
    year: "Atual",
    period: "Em andamento",
    badge: "Curso",
    current: true,
    title: "Programadores Jr. com Ferramentas de IA",
    place: "Recode + UFR",
    text: "Formação em desenvolvimento com ferramentas de Inteligência Artificial aplicadas à programação.",
    tech: ["IA aplicada", "Desenvolvimento"],
    icon: "ph:sparkle-duotone",
  },
  {
    id: "unisenai",
    kind: "academica",
    year: "2024",
    period: "2024 – Atual",
    badge: "Graduando",
    current: true,
    title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    place: "UniSENAI MT · Mato Grosso",
    text: "Graduação com projetos de extensão e integradores ao longo do curso.",
    projects: [
      {
        name: "Escolinha de Skate do Bob",
        detail: "Projeto de extensão (FATEC/UniSENAI, 2025): site da ONG que atende mais de 200 alunos por mês. Publicado e em uso.",
      },
      { name: "BrainTag", detail: "Projeto integrador em C# para organização e gerenciamento de informações." },
      { name: "Projeto Cinematic", detail: "Sistema de filmes em C#, desenvolvido em colaboração via GitHub." },
    ],
    tech: ["C#", ".NET", "HTML", "CSS", "JavaScript", "Git"],
    icon: "ph:graduation-cap-duotone",
    link: { href: "https://www.escoladeskatedobob.org.br/", label: "Ver site da Escolinha" },
  },
  {
    id: "senac",
    kind: "academica",
    year: "2022",
    period: "2022 – 2024",
    badge: "Concluído",
    title: "Curso Técnico em Informática",
    place: "SENAC · Santos, SP",
    text: "Base em hardware, redes, sistemas operacionais e suporte técnico.",
    tech: ["Hardware", "Redes", "Sistemas operacionais", "Suporte técnico"],
    icon: "ph:desktop-tower-duotone",
  },
];
