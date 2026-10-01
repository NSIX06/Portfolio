/**
 * Habilidades & Conhecimentos (categorias da primeira versão do portfólio) e metodologias.
 * `icon` é um nome do Iconify resolvido no servidor; itens sem logo usam o ponto colorido.
 * Níveis descritos no grau real de experiência (conhecimento, não domínio avançado).
 */
export type SkillColor = "red" | "yellow" | "blue" | "green";

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  color: SkillColor;
  items: { name: string; icon?: string }[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Front-end",
    icon: "ph:browser-duotone",
    color: "red",
    items: [
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Vue.js", icon: "logos:vue" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Bootstrap", icon: "logos:bootstrap" },
    ],
  },
  {
    id: "backend",
    label: "Back-end & Linguagens",
    icon: "ph:wrench-duotone",
    color: "blue",
    items: [
      { name: "C#", icon: "logos:c-sharp" },
      { name: ".NET", icon: "logos:dotnet" },
      { name: "ASP.NET Core", icon: "logos:dotnet" },
      { name: "Python", icon: "logos:python" },
      { name: "FastAPI", icon: "logos:fastapi-icon" },
      { name: "Django", icon: "logos:django-icon" },
      { name: "PHP", icon: "logos:php" },
      { name: "Laravel", icon: "logos:laravel" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Prisma", icon: "logos:prisma" },
      { name: "C / C++", icon: "logos:c-plusplus" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "ph:device-mobile-duotone",
    color: "yellow",
    items: [
      { name: "Flutter", icon: "logos:flutter" },
      { name: "Dart", icon: "logos:dart" },
      { name: "React Native", icon: "logos:react" },
    ],
  },
  {
    id: "database",
    label: "Bancos de Dados & BI",
    icon: "ph:database-duotone",
    color: "green",
    items: [
      { name: "SQL Server" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MySQL", icon: "logos:mysql-icon" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Modelagem de dados" },
      { name: "Power BI", icon: "logos:microsoft-power-bi" },
    ],
  },
  {
    id: "integration",
    label: "Integrações, Automação & Cloud",
    icon: "ph:plugs-connected-duotone",
    color: "blue",
    items: [
      { name: "APIs REST" },
      { name: "Integração de sistemas" },
      { name: "Integração com ERPs" },
      { name: "Power Automate" },
      { name: "Microsoft Teams", icon: "logos:microsoft-teams" },
      { name: "Azure", icon: "logos:microsoft-azure" },
    ],
  },
  {
    id: "corporate",
    label: "Sistemas Corporativos",
    icon: "ph:buildings-duotone",
    color: "yellow",
    items: [
      { name: "TOTVS Protheus (SIGAMNT)" },
      { name: "GLPI" },
      { name: "Astrein (SSA-CAD)" },
      { name: "Microsoft 365", icon: "logos:microsoft-icon" },
    ],
  },
  {
    id: "tools",
    label: "Desenvolvimento & Ferramentas",
    icon: "ph:toolbox-duotone",
    color: "red",
    items: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "GitHub", icon: "logos:github-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Figma", icon: "logos:figma" },
      { name: "Postman", icon: "logos:postman-icon" },
      { name: "Arquitetura Full Stack" },
      { name: "UX/UI" },
    ],
  },
  {
    id: "infra",
    label: "Infraestrutura & Suporte",
    icon: "ph:hard-drives-duotone",
    color: "green",
    items: [
      { name: "Redes" },
      { name: "Servidores" },
      { name: "Suporte técnico" },
      { name: "Montagem e manutenção de computadores" },
      { name: "Linux", icon: "logos:linux-tux" },
      { name: "Windows Server", icon: "logos:microsoft-windows-icon" },
    ],
  },
];

export type Methodology = {
  id: string;
  name: string;
  level: string;
  description: string;
  practices: string[];
  icon: string;
};

export const METHODOLOGIES_INTRO = "Familiaridade com metodologias ágeis, incluindo Scrum e Kanban.";

export const METHODOLOGIES: Methodology[] = [
  {
    id: "scrum",
    name: "Scrum",
    level: "Conhecimento",
    description:
      "Organização do trabalho em ciclos curtos, com objetivo, backlog priorizado e revisão ao fim de cada ciclo.",
    practices: ["Sprints", "Backlog", "Critérios de aceitação", "Revisão e retrospectiva"],
    icon: "ph:arrows-clockwise-duotone",
  },
  {
    id: "kanban",
    name: "Kanban",
    level: "Conhecimento",
    description:
      "Visualização do fluxo de tarefas em colunas, do backlog ao concluído, para acompanhar prioridades e gargalos.",
    practices: ["Quadro de tarefas", "Fluxo contínuo", "Priorização", "Status visível"],
    icon: "ph:kanban-duotone",
  },
];
