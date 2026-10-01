/**
 * Cursos e certificações. Fonte: currículo (set/2026).
 * Campos sem informação ficam null e não aparecem na tela.
 * Para mostrar imagem ou PDF, coloque o arquivo em /public/certificados/
 * e preencha `image` ou `pdf` com o caminho (ex.: '/certificados/python.pdf').
 *
 * @typedef {'concluido'|'em-andamento'} CertificateStatus
 *
 * @typedef {Object} Certificate
 * @property {string} id
 * @property {string} name
 * @property {string} institution
 * @property {string|null} partner    Instituição parceira, quando houver
 * @property {CertificateStatus} status
 * @property {string|null} date
 * @property {string|null} workload   Carga horária, ex.: '5 h'
 * @property {string|null} description
 * @property {string[]} skills
 * @property {string|null} image
 * @property {string|null} pdf
 * @property {string|null} url        Link de verificação
 */

export const certificateStatusLabels = {
  concluido: 'Concluído',
  'em-andamento': 'Em andamento',
}

/** Cria um certificado com os campos opcionais em null. */
const cert = (c) => ({
  partner: null,
  status: 'concluido',
  date: null,
  workload: null,
  description: null,
  skills: [],
  image: null,
  pdf: null,
  url: null,
  ...c,
})

/** @type {Certificate[]} */
export const certificates = [
  cert({
    id: 'recode-programadores-jr-ia',
    name: 'Programadores Jr. com Ferramentas de IA',
    institution: 'Recode',
    partner: 'UFR',
    status: 'em-andamento',
    description:
      'Curso de formação em desenvolvimento com apoio de ferramentas de Inteligência Artificial.',
    skills: [
      'Inteligência Artificial Generativa',
      'Automação de workflows',
      'Engenharia de dados',
      'Desenvolvimento de soluções digitais',
    ],
  }),
  cert({ id: 'recode-cnv', name: 'Comunicação Não Violenta', institution: 'Recode' }),
  cert({ id: 'recode-relacoes', name: 'Relações Interpessoais', institution: 'Recode' }),
  cert({ id: 'cisco-python-1', name: 'Python Essentials 1', institution: 'Cisco Networking Academy', skills: ['Python'] }),
  cert({ id: 'aws-cloud-101', name: 'Introduction to Cloud 101', institution: 'AWS Educate', skills: ['Cloud'] }),
  cert({
    id: 'aws-genai',
    name: 'Introduction to Generative Artificial Intelligence',
    institution: 'AWS Educate',
    skills: ['IA Generativa'],
  }),
  cert({ id: 'fgv-git', name: 'Introdução ao Git e GitHub', institution: 'FGV Online', skills: ['Git', 'GitHub'] }),
  cert({ id: 'udemy-office', name: 'Pacote Office 365 — Microsoft Essencial', institution: 'Udemy' }),
  cert({
    id: 'udemy-poo-csharp',
    name: 'POO com C# (.NET 6 e Visual Studio Code)',
    institution: 'Udemy',
    skills: ['C#', '.NET', 'POO'],
  }),
  cert({
    id: 'udemy-csharp-completo',
    name: 'C# Completo — Programação Orientada a Objetos e Projetos',
    institution: 'Udemy',
    status: 'em-andamento',
    skills: ['C#', 'POO'],
  }),
  cert({
    id: 'udemy-c-cpp',
    name: 'Linguagem C, C++ e Orientação a Objetos',
    institution: 'Udemy',
    status: 'em-andamento',
    skills: ['C', 'C++', 'POO'],
  }),
  cert({ id: 'alura-mobile', name: 'Imersão Mobile', institution: 'Alura' }),
  cert({ id: 'alura-cloud-devops', name: 'Imersão Cloud DevOps', institution: 'Alura', skills: ['Cloud', 'DevOps'] }),
  cert({ id: 'alura-dados-python', name: 'Imersão Dados com Python', institution: 'Alura', skills: ['Python', 'Dados'] }),
  cert({
    id: 'dsa-power-bi',
    name: 'Microsoft Power BI para Business Intelligence e Data Science',
    institution: 'Data Science Academy',
    status: 'em-andamento',
    skills: ['Power BI', 'BI'],
  }),
  cert({ id: 'rocketseat-java', name: 'Java', institution: 'Rocketseat', workload: '4 h', skills: ['Java'] }),
  cert({ id: 'rocketseat-react', name: 'Trilha React', institution: 'Rocketseat', workload: '5 h', skills: ['React'] }),
  cert({ id: 'rocketseat-csharp', name: 'Trilha C#', institution: 'Rocketseat', workload: '6 h', skills: ['C#'] }),
  cert({ id: 'efset-b1', name: 'EF SET English Certificate — B1', institution: 'EF SET', skills: ['Inglês'] }),
]
