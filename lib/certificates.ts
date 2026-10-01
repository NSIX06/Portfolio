/** Cursos e certificados do currículo (out/2026). */
export type Certificate = {
  name: string;
  institution: string;
  partner?: string;
  workload?: string;
  inProgress?: boolean;
};

export const CERTIFICATES: Certificate[] = [
  {
    name: "Programadores Jr. com Ferramentas de IA",
    institution: "Recode",
    partner: "UFR",
    inProgress: true,
  },
  {
    name: "Comunicação Não Violenta",
    institution: "Recode",
  },
  {
    name: "Relações Interpessoais",
    institution: "Recode",
  },
  {
    name: "Python Essentials 1",
    institution: "Cisco Networking Academy",
  },
  {
    name: "Introduction to Cloud 101",
    institution: "AWS Educate",
  },
  {
    name: "Introduction to Generative Artificial Intelligence",
    institution: "AWS Educate",
  },
  {
    name: "Introdução ao Git e GitHub",
    institution: "FGV Online",
  },
  {
    name: "Pacote Office 365 — Microsoft Essencial",
    institution: "Udemy",
  },
  {
    name: "POO com C# (.NET 6 e Visual Studio Code)",
    institution: "Udemy",
  },
  {
    name: "C# Completo — Programação Orientada a Objetos e Projetos",
    institution: "Udemy",
    inProgress: true,
  },
  {
    name: "Linguagem C, C++ e Orientação a Objetos",
    institution: "Udemy",
    inProgress: true,
  },
  {
    name: "Imersão Mobile",
    institution: "Alura",
  },
  {
    name: "Imersão Cloud DevOps",
    institution: "Alura",
  },
  {
    name: "Imersão Dados com Python",
    institution: "Alura",
  },
  {
    name: "Microsoft Power BI para Business Intelligence e Data Science",
    institution: "Data Science Academy",
    inProgress: true,
  },
  {
    name: "Java",
    institution: "Rocketseat",
    workload: "4 h",
  },
  {
    name: "Trilha React",
    institution: "Rocketseat",
    workload: "5 h",
  },
  {
    name: "Trilha C#",
    institution: "Rocketseat",
    workload: "6 h",
  },
  {
    name: "EF SET English Certificate — B1",
    institution: "EF SET",
  },
];
