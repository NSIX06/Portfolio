/**
 * Ponto único de acesso ao conteúdo do portfólio.
 * Componentes importam daqui; nenhum texto profissional deve ficar fixo em componente.
 * Um futuro CMS ou painel só precisa devolver este mesmo formato.
 */
import { profile } from './profile'
import { education } from './education'
import { experiences, currentExperience } from './experiences'
import { projects, projectOrigins, projectStatusLabels, allReposUrl } from './projects'
import { certificates, certificateStatusLabels } from './certificates'
import { technologies } from './technologies'
import { methodologies, methodologiesIntro } from './methodologies'
import { availability, availabilityStates, activeAvailability } from './availability'
import { contact, contactById } from './contact'
import { character } from './character'
import { sections, journey } from './navigation'
import { seo } from './seo'

// Exportações nomeadas para os componentes (import { projects } from '../../data').
export {
  profile,
  education,
  experiences,
  currentExperience,
  projects,
  projectOrigins,
  projectStatusLabels,
  allReposUrl,
  certificates,
  certificateStatusLabels,
  technologies,
  methodologies,
  methodologiesIntro,
  availability,
  availabilityStates,
  activeAvailability,
  contact,
  contactById,
  character,
  sections,
  journey,
  seo,
}

export const portfolioData = {
  profile,
  education,
  experiences,
  currentExperience,
  projects,
  projectOrigins,
  projectStatusLabels,
  allReposUrl,
  certificates,
  certificateStatusLabels,
  technologies,
  methodologies,
  methodologiesIntro,
  availability,
  availabilityStates,
  activeAvailability,
  contact,
  contactById,
  character,
  sections,
  journey,
  seo,
}

export default portfolioData
