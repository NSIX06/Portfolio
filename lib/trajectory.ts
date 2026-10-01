/**
 * Trajetória do Felipe — fonte única para os polaroids e a linha do tempo.
 * Dados do currículo (out/2026). `icon` é um nome do Iconify resolvido no servidor.
 */
export type Milestone = {
  id: string;
  year: string;
  badge: string;
  title: string;
  place: string;
  text: string;
  tags: string[];
  icon: string;
  link?: { href: string; label: string };
};

export const MILESTONES: Milestone[] = [
  {
    id: "senac",
    year: "2022",
    badge: "Formação",
    title: "Técnico em Informática",
    place: "SENAC · Santos, SP",
    text: "Base em hardware, redes, sistemas operacionais e suporte, concluída em 2024.",
    tags: ["Hardware", "Redes", "Suporte técnico"],
    icon: "ph:desktop-tower-duotone",
  },
  {
    id: "autonomo",
    year: "2022",
    badge: "Carreira",
    title: "Profissional Autônomo",
    place: "Rondonópolis - MT · Remoto",
    text: "Começo como técnico em informática e, depois, desenvolvedor web freelancer: sistemas sob medida, APIs, integrações e automação.",
    tags: ["Full Stack", "APIs", "Automação", "Suporte"],
    icon: "ph:code-duotone",
  },
  {
    id: "unisenai",
    year: "2024",
    badge: "Graduação",
    title: "Análise e Desenvolvimento de Sistemas",
    place: "UniSENAI MT",
    text: "Graduação em andamento, com projetos de extensão e integradores ao longo do curso.",
    tags: ["Engenharia de software", "Bancos de dados", "Projetos"],
    icon: "ph:graduation-cap-duotone",
  },
  {
    id: "tmg",
    year: "2024",
    badge: "Carreira",
    title: "Auxiliar Administrativo — PCM",
    place: "TMG — Tropical Melhoramento & Genética",
    text: "Usuário-chave do TOTVS Protheus no Planejamento e Controle de Manutenção, criando ferramentas internas para a operação (nov/2024 – 2026).",
    tags: ["Protheus", "GLPI", "Astrein", "Power Automate"],
    icon: "ph:gear-six-duotone",
  },
  {
    id: "escolinha",
    year: "2025",
    badge: "Projeto",
    title: "Escolinha de Skate do Bob",
    place: "Projeto de extensão · FATEC/UniSENAI",
    text: "Site institucional da ONG que atende mais de 200 alunos por mês com aulas gratuitas de skate. Publicado e em uso.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "ph:hand-heart-duotone",
    link: { href: "https://www.escoladeskatedobob.org.br/", label: "Ver site" },
  },
  {
    id: "caronas",
    year: "2026",
    badge: "Lançamento",
    title: "TMG Caronas em produção",
    place: "TMG · setembro de 2026",
    text: "Sistema corporativo de caronas entre colaboradores, selecionado como um dos quatro pilotos do programa TMG IA.",
    tags: [".NET 10", "SQL Server", "Entra ID", "SignalR"],
    icon: "ph:car-profile-duotone",
  },
  {
    id: "agora",
    year: "Hoje",
    badge: "Agora",
    title: "Desenvolvedor Web Freelancer",
    place: "Recode + UFR · Programadores Jr. com Ferramentas de IA",
    text: "Desenvolvendo sistemas sob medida e estudando IA aplicada ao desenvolvimento. Aberto a contratação e a projetos.",
    tags: ["Freelance", "IA", "Disponível"],
    icon: "ph:rocket-launch-duotone",
  },
];
