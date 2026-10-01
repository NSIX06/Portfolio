/**
 * Formação acadêmica, da mais recente para a mais antiga.
 * @typedef {Object} Education
 * @property {string} id
 * @property {string} course
 * @property {string} institution
 * @property {string} location
 * @property {string} start          Ano de início
 * @property {string|null} end       Ano de término; null = em andamento
 * @property {'cursando'|'concluido'} status
 * @property {string} statusLabel
 * @property {string} [description]
 */

/** @type {Education[]} */
export const education = [
  {
    id: 'ads-unisenai',
    course: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    institution: 'UniSENAI MT',
    location: 'Mato Grosso',
    start: '2024',
    end: null,
    status: 'cursando',
    statusLabel: 'Graduando',
  },
  {
    id: 'tecnico-senac',
    course: 'Técnico em Informática',
    institution: 'SENAC',
    location: 'Santos, SP',
    start: '2022',
    end: '2024',
    status: 'concluido',
    statusLabel: 'Concluído',
  },
]
