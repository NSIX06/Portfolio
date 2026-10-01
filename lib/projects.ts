/**
 * Projetos do Felipe, com os detalhes exibidos na aba de cada projeto.
 * Fonte: currículo e repositórios (out/2026). Capas em /public/projetos.
 */
export type ProjectIcon =
  | "car"
  | "heart"
  | "cart"
  | "sprout"
  | "utensils"
  | "brain"
  | "terminal"
  | "clapper"
  | "gauge";

export type Project = {
  id: string;
  icon: ProjectIcon;
  name: string;
  headline: string;
  summary: string;
  about: string;
  objective?: string;
  highlights?: string[];
  tech: string[];
  category: string;
  year?: string;
  role: string;
  status?: "Lançado" | "Concluído";
  live?: string;
  github?: string;
  image: string;
  imageAlt: string;
};

export const PROJECTS: Project[] = [
  {
    id: "tmg-caronas",
    icon: "car",
    name: "TMG Caronas",
    headline:
      "Sistema corporativo de caronas entre colaboradores das bases da TMG, em produção desde setembro de 2026.",
    summary:
      "Ofertar e solicitar caronas, gerenciar participações, avaliar viagens e acompanhar indicadores, integrado ao ambiente Microsoft da empresa.",
    about:
      "Concepção e desenvolvimento de um sistema para ofertar e solicitar caronas, gerenciar participações, avaliar viagens, acompanhar indicadores gerenciais e administrar acessos. Construído sobre o template corporativo da TMG em .NET 10, integrado ao Microsoft Entra ID, SQL Server, Azure e Microsoft Teams.",
    objective:
      "Facilitar a organização de caronas entre colaboradores, reduzindo custos e emissões e fortalecendo a integração entre as bases.",
    highlights: [
      "Selecionado como um dos quatro pilotos do programa TMG IA, iniciativa da área de TI voltada a soluções com Inteligência Artificial",
      "Implantado em produção em setembro de 2026",
      "Arquitetura em camadas (Web, Application, Infrastructure, Shared), tempo real com SignalR e PWA instalável",
    ],
    tech: [
      ".NET 10",
      "ASP.NET Core MVC",
      "Dapper",
      "SQL Server",
      "Microsoft Entra ID",
      "SignalR",
      "Azure Blob Storage",
      "Microsoft Teams",
    ],
    category: "Sistema corporativo",
    year: "2026",
    role: "Desenvolvedor",
    status: "Lançado",
    image: "/projetos/tmg-caronas.webp",
    imageAlt: "Logo do TMG Caronas",
  },
  {
    id: "escolinha-skate-bob",
    icon: "heart",
    name: "Escolinha de Skate do Bob",
    headline:
      "Site institucional para uma ONG que atende mais de 200 alunos por mês com aulas gratuitas de skate.",
    summary:
      "Projeto de extensão da FATEC/UniSENAI para a ONG que usa o skate como ferramenta de inclusão social em Rondonópolis - MT.",
    about:
      'Site institucional para a ONG fundada em 2010 por Igor "Bob" Silva, que atende mais de 200 alunos por mês com aulas gratuitas de skate como ferramenta de inclusão social em Rondonópolis - MT. Desenvolvido como projeto de extensão, com orientação dos professores Nailton Silva e Diego Bastos.',
    objective:
      "Dar à ONG uma presença on-line para divulgar o trabalho, as aulas e as formas de apoio.",
    highlights: [
      "Projeto com impacto social real, publicado e em uso pela ONG",
      "Layout responsivo para celular e computador",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsivo"],
    category: "Projeto de extensão",
    year: "2025",
    role: "Desenvolvedor",
    status: "Lançado",
    live: "https://www.escoladeskatedobob.org.br/",
    github: "https://github.com/NSIX06",
    image: "/projetos/escolinha-skate-bob.webp",
    imageAlt: "Capa do projeto Escolinha de Skate do Bob",
  },
  {
    id: "orderly-checkout",
    icon: "cart",
    name: "Orderly Checkout",
    headline:
      "Checkout e gestão de pedidos com controle de transações em tempo real.",
    summary:
      "Sistema para otimizar o fluxo de caixa e os pagamentos, com foco na experiência do usuário.",
    about:
      "Sistema de checkout e gestão de pedidos para otimizar fluxo de caixa e pagamentos. Projeto com foco em experiência do usuário e controle de transações em tempo real.",
    tech: ["Full Stack", "Checkout", "Gestão de pedidos"],
    category: "Sistema full stack",
    role: "Desenvolvedor",
    github: "https://github.com/NSIX06/Orderly-Checkout-Main",
    image: "/projetos/orderly-checkout.webp",
    imageAlt: "Capa do projeto Orderly Checkout",
  },
  {
    id: "agrodatahub",
    icon: "sprout",
    name: "AgroDataHub",
    headline: "Plataforma de dados para o agronegócio.",
    summary:
      "Centraliza, organiza e visualiza informações do setor agrícola para apoiar a tomada de decisão.",
    about:
      "Plataforma de dados para o agronegócio. Centraliza, organiza e visualiza informações do setor agrícola, auxiliando produtores e gestores na tomada de decisão baseada em dados.",
    tech: ["Dados", "Dashboard", "Agronegócio"],
    category: "Plataforma de dados",
    role: "Desenvolvedor",
    github: "https://github.com/NSIX06/AgroDataHub-Main",
    image: "/projetos/agrodatahub.webp",
    imageAlt: "Capa do projeto AgroDataHub",
  },
  {
    id: "app-restaurant",
    icon: "utensils",
    name: "App Restaurant",
    headline: "Gestão de restaurantes com mesas, pedidos e cardápio digital.",
    summary:
      "Interface prática para um atendimento ágil, com mesas, pedidos e cardápio integrados.",
    about:
      "Aplicativo para gestão de restaurantes. Controle de mesas, pedidos e cardápio digital integrados em uma interface prática para atendimento ágil e eficiente.",
    tech: ["App", "Gestão", "UX"],
    category: "Aplicativo",
    role: "Desenvolvedor",
    github: "https://github.com/NSIX06/App_Restaurant",
    image: "/projetos/app-restaurant.webp",
    imageAlt: "Capa do projeto App Restaurant",
  },
  {
    id: "braintag",
    icon: "brain",
    name: "BrainTag",
    headline:
      "Projeto integrador em C# para organizar e gerenciar informações.",
    summary:
      "Sistema da formação acadêmica com foco em produtividade e estrutura de dados.",
    about:
      "Projeto integrador da formação acadêmica. Sistema em C# para organização e gerenciamento de informações com foco em produtividade e estrutura de dados.",
    tech: ["C#", ".NET"],
    category: "Projeto acadêmico",
    role: "Desenvolvedor",
    status: "Concluído",
    github: "https://github.com/NSIX06/BrainTag",
    image: "/projetos/braintag.webp",
    imageAlt: "Capa do projeto BrainTag",
  },
  {
    id: "devops-py",
    icon: "terminal",
    name: "Devops.py",
    headline: "Scripts e automações em Python para práticas de DevOps.",
    summary: "Automação de tarefas repetitivas e integração entre sistemas.",
    about:
      "Scripts e automações em Python para práticas de DevOps. Automação de tarefas repetitivas e integração entre sistemas.",
    tech: ["Python", "DevOps", "Automação"],
    category: "Automação",
    role: "Desenvolvedor",
    github: "https://github.com/NSIX06/Devops.py",
    image: "/projetos/devops-py.webp",
    imageAlt: "Capa do projeto Devops.py",
  },
  {
    id: "projeto-cinematic",
    icon: "clapper",
    name: "Projeto Cinematic",
    headline: "Sistema de filmes em C#, desenvolvido em colaboração.",
    summary:
      "Fork colaborativo que mostra trabalho em equipe e colaboração via GitHub.",
    about:
      "Fork colaborativo de um sistema de filmes em C#. Demonstra trabalho em equipe e colaboração via GitHub com outros desenvolvedores.",
    tech: ["C#", "Git", "Colaboração"],
    category: "Projeto acadêmico",
    role: "Colaborador",
    github: "https://github.com/NSIX06/Projeto_Cinematic",
    image: "/projetos/projeto-cinematic.webp",
    imageAlt: "Capa do Projeto Cinematic",
  },
  {
    id: "motos",
    icon: "gauge",
    name: "Motos",
    headline: "Interface web com tema de motocicletas.",
    summary: "Foco em layout visual, tipografia e composição com CSS puro.",
    about:
      "Interface web com estilização cuidadosa para o tema de motocicletas. Foco em layout visual, tipografia e composição com CSS puro.",
    tech: ["HTML5", "CSS3"],
    category: "Front-end",
    role: "Desenvolvedor",
    github: "https://github.com/NSIX06/Motos",
    image: "/projetos/motos.webp",
    imageAlt: "Capa do projeto Motos",
  },
];

export const ALL_REPOS_URL = "https://github.com/NSIX06?tab=repositories";
