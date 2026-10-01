/**
 * Disponibilidade profissional.
 * Para mudar o status, edite `active` (pode ter mais de um estado ao mesmo tempo).
 *
 * @typedef {'hiring'|'projects'|'unavailable'} AvailabilityState
 */

/** Definição de cada estado possível. */
export const availabilityStates = {
  hiring: {
    emoji: '🟢',
    label: 'Disponível para contratação',
    message: 'Disponível para novas oportunidades',
    tone: 'green',
  },
  projects: {
    emoji: '🟡',
    label: 'Disponível para projetos',
    message: 'Aberto a projetos freelance',
    tone: 'yellow',
  },
  unavailable: {
    emoji: '🔴',
    label: 'Indisponível',
    message: 'Atualmente trabalhando',
    tone: 'red',
  },
}

export const availability = {
  /** @type {AvailabilityState[]} */
  active: ['hiring', 'projects'],
  headline: 'Vamos construir algo juntos.',
  description:
    'Aberto a oportunidades de emprego e a projetos freelance. Baseado em Rondonópolis - MT, com atendimento remoto.',
  specialties: ['Desenvolvimento Web', 'Full Stack', 'Sistemas Corporativos', 'Automação de Processos', 'Integração de Sistemas'],
  opportunityTypes: ['Contratação', 'Freelance', 'Projetos sob medida'],
  interests: [
    'Full Stack',
    '.NET',
    'React',
    'Next.js',
    'Python',
    'APIs',
    'SQL',
    'Cloud',
    'Automação',
    'Inteligência Artificial',
  ],
}

/** Estados ativos já resolvidos, na ordem definida em `active`. */
export const activeAvailability = availability.active.map((key) => ({ key, ...availabilityStates[key] }))
