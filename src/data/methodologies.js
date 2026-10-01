/**
 * Metodologias. Descrições no nível real de experiência: conhecimento, não domínio avançado.
 * @typedef {Object} Methodology
 * @property {string} id
 * @property {string} name
 * @property {string} level
 * @property {string} description
 * @property {string[]} practices
 */

export const methodologiesIntro = 'Familiaridade com metodologias ágeis, incluindo Scrum e Kanban.'

/** @type {Methodology[]} */
export const methodologies = [
  {
    id: 'scrum',
    name: 'Scrum',
    level: 'Conhecimento',
    description: 'Organização do trabalho em ciclos curtos, com objetivo, backlog priorizado e revisão ao fim de cada ciclo.',
    practices: ['Sprints', 'Backlog', 'Critérios de aceitação', 'Revisão e retrospectiva'],
  },
  {
    id: 'kanban',
    name: 'Kanban',
    level: 'Conhecimento',
    description: 'Visualização do fluxo de tarefas em colunas, do backlog ao concluído, para acompanhar prioridades e gargalos.',
    practices: ['Quadro de tarefas', 'Fluxo contínuo', 'Priorização', 'Status visível'],
  },
]
