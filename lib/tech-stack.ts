/**
 * Tech Stack (referência: antonio-bastos.com). Em vez de "anos de experiência" e nível
 * de proficiência (que não estão no currículo), cada item lista ONDE foi usado — projetos,
 * experiências e cursos reais — e o indicador de pontos mostra quantos contextos são.
 */
export type StackContextKind = "producao" | "profissional" | "projeto" | "academico" | "curso";

export type StackItem = {
  id: string;
  name: string;
  area: string;
  icon: string;
  overview: string;
  used: { label: string; kind: StackContextKind }[];
};

export const CONTEXT_LABEL: Record<StackContextKind, string> = {
  producao: "Em produção",
  profissional: "Profissional",
  projeto: "Projetos",
  academico: "Acadêmico",
  curso: "Estudos",
};

/** O selo do cartão é o contexto mais forte em que a tecnologia aparece. */
export const CONTEXT_RANK: StackContextKind[] = ["producao", "profissional", "projeto", "academico", "curso"];

export const LANGUAGES: StackItem[] = [
  {
    id: "csharp",
    name: "C#",
    area: "Ecossistema .NET",
    icon: "logos:c-sharp",
    overview:
      "Linguagem orientada a objetos da Microsoft, base do ecossistema .NET para aplicações web, APIs e sistemas corporativos.",
    used: [
      { label: "TMG Caronas (.NET 10)", kind: "producao" },
      { label: "BrainTag — projeto integrador", kind: "academico" },
      { label: "Projeto Cinematic", kind: "academico" },
      { label: "Udemy e Rocketseat (POO com C#, Trilha C#)", kind: "curso" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    area: "Tipagem estática",
    icon: "logos:typescript-icon",
    overview:
      "Superset do JavaScript com tipagem estática, usado para dar segurança e escala a aplicações front-end e full stack.",
    used: [{ label: "Este portfólio (Next.js)", kind: "projeto" }],
  },
  {
    id: "javascript",
    name: "JavaScript",
    area: "Web & full stack",
    icon: "logos:javascript",
    overview: "A linguagem da web: interatividade no navegador e, com Node.js, também no servidor.",
    used: [
      { label: "Site da Escolinha de Skate do Bob", kind: "producao" },
      { label: "Primeira versão do portfólio", kind: "projeto" },
    ],
  },
  {
    id: "html-css",
    name: "HTML/CSS",
    area: "Marcação & layout",
    icon: "logos:html-5",
    overview: "Estrutura e estilo de qualquer página web: semântica, layout responsivo e composição visual.",
    used: [
      { label: "Site da Escolinha de Skate do Bob", kind: "producao" },
      { label: "Motos — interface com CSS puro", kind: "projeto" },
      { label: "UniSENAI — ADS", kind: "academico" },
    ],
  },
  {
    id: "python",
    name: "Python",
    area: "Automação & dados",
    icon: "logos:python",
    overview: "Linguagem versátil para automação, APIs (FastAPI) e análise de dados.",
    used: [
      { label: "Devops.py — scripts de automação", kind: "projeto" },
      { label: "Python Essentials 1 (Cisco)", kind: "curso" },
      { label: "Imersão Dados com Python (Alura)", kind: "curso" },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    area: "Consultas relacionais",
    icon: "ph:database-duotone",
    overview: "Linguagem de consulta para bancos relacionais: modelagem, consultas e relatórios.",
    used: [
      { label: "TMG Caronas (SQL Server + Dapper)", kind: "producao" },
    ],
  },
  {
    id: "dart",
    name: "Dart",
    area: "Mobile multiplataforma",
    icon: "logos:dart",
    overview: "Linguagem do Flutter, usada para apps móveis multiplataforma com uma única base de código.",
    used: [{ label: "Imersão Mobile (Alura)", kind: "curso" }],
  },
  {
    id: "java",
    name: "Java",
    area: "POO & enterprise",
    icon: "logos:java",
    overview: "Linguagem orientada a objetos muito usada em sistemas corporativos e Android.",
    used: [{ label: "Java (Rocketseat)", kind: "curso" }],
  },
  {
    id: "c-cpp",
    name: "C / C++",
    area: "Sistemas & algoritmos",
    icon: "logos:c-plusplus",
    overview: "Linguagens de baixo nível para entender memória, desempenho e estruturas de dados.",
    used: [{ label: "Linguagem C, C++ e OO (Udemy, em andamento)", kind: "curso" }],
  },
];

export const TECHNOLOGIES: StackItem[] = [
  {
    id: "dotnet",
    name: ".NET / ASP.NET Core",
    area: "Back-end corporativo",
    icon: "logos:dotnet",
    overview: "Plataforma da Microsoft para APIs e aplicações web, com MVC, injeção de dependência e SignalR.",
    used: [
      { label: "TMG Caronas (ASP.NET Core MVC + SignalR)", kind: "producao" },
      { label: "BrainTag", kind: "academico" },
    ],
  },
  {
    id: "sqlserver",
    name: "SQL Server",
    area: "Banco relacional",
    icon: "ph:database-duotone",
    overview: "Banco de dados relacional da Microsoft, padrão em ambientes corporativos.",
    used: [{ label: "TMG Caronas", kind: "producao" }],
  },
  {
    id: "microsoft",
    name: "Entra ID, Azure & Teams",
    area: "Ecossistema Microsoft",
    icon: "logos:microsoft-azure",
    overview: "Login corporativo (Entra ID), armazenamento em nuvem (Azure Blob) e notificações no Microsoft Teams.",
    used: [
      { label: "TMG Caronas", kind: "producao" },
      { label: "Power Automate e Teams no PCM da TMG", kind: "profissional" },
    ],
  },
  {
    id: "protheus",
    name: "TOTVS Protheus",
    area: "ERP corporativo",
    icon: "ph:buildings-duotone",
    overview: "ERP da TOTVS; no módulo SIGAMNT, gestão de manutenção de ativos, ordens de serviço e materiais.",
    used: [
      { label: "Usuário-chave do SIGAMNT no PCM da TMG", kind: "profissional" },
      { label: "GLPI e Astrein (SSA-CAD) no PCM", kind: "profissional" },
    ],
  },
  {
    id: "react",
    name: "React",
    area: "Arquitetura front-end",
    icon: "logos:react",
    overview: "Biblioteca de componentes para interfaces web reativas.",
    used: [
      { label: "Este portfólio", kind: "projeto" },
      { label: "Trilha React (Rocketseat)", kind: "curso" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    area: "Framework full stack",
    icon: "logos:nextjs-icon",
    overview: "Framework React com rotas, renderização no servidor e otimização de imagens e fontes.",
    used: [{ label: "Este portfólio (App Router)", kind: "projeto" }],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    area: "Design systems",
    icon: "logos:tailwindcss-icon",
    overview: "CSS utilitário para construir interfaces consistentes direto no markup.",
    used: [{ label: "Este portfólio", kind: "projeto" }],
  },
  {
    id: "git",
    name: "Git & GitHub",
    area: "Versionamento",
    icon: "logos:github-icon",
    overview: "Controle de versão e colaboração: branches, pull requests e deploy contínuo.",
    used: [
      { label: "Projeto Cinematic — colaboração via GitHub", kind: "academico" },
      { label: "Repositórios pessoais (NSIX06)", kind: "projeto" },
      { label: "Introdução ao Git e GitHub (FGV)", kind: "curso" },
    ],
  },
  {
    id: "supabase",
    name: "Supabase & PostgreSQL",
    area: "BaaS & banco",
    icon: "logos:supabase-icon",
    overview: "PostgreSQL gerenciado com autenticação, storage e APIs automáticas.",
    used: [{ label: "Projetos full stack", kind: "projeto" }],
  },
  {
    id: "flutter",
    name: "Flutter",
    area: "Mobile",
    icon: "logos:flutter",
    overview: "Framework do Google para apps iOS e Android a partir de uma única base em Dart.",
    used: [{ label: "Imersão Mobile (Alura)", kind: "curso" }],
  },
  {
    id: "powerbi",
    name: "Power BI",
    area: "Business Intelligence",
    icon: "logos:microsoft-power-bi",
    overview: "Ferramenta da Microsoft para dashboards e análise de dados.",
    used: [{ label: "Power BI para BI e Data Science (DSA, em andamento)", kind: "curso" }],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    area: "Nuvem",
    icon: "ph:cloud-duotone",
    overview: "Fundamentos de nuvem, containers e automação de entrega.",
    used: [
      { label: "Introduction to Cloud 101 (AWS Educate)", kind: "curso" },
      { label: "Imersão Cloud DevOps (Alura)", kind: "curso" },
    ],
  },
];
