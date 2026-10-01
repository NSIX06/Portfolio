import { projectStatusLabels, projectOrigins, experiences } from '../../data'
import Icon from '../icons/Icon'
import ui from '../ui/ui.module.css'

const experienceName = Object.fromEntries(experiences.map((e) => [e.id, e.company]))

/** Conteúdo completo de um projeto. Usado no modal da seção e, na Fase 3, no painel da jornada. */
export default function ProjectDetails({ project, showCaseStudyLink = true }) {
  const { description, summary, objective, highlights = [], tech, links, status, date, origin, experienceId } = project

  return (
    <>
      <ul className={ui.tagList}>
        <li className={ui.chip}>{projectOrigins[origin]}</li>
        {status && <li className={`${ui.chip} ${ui['chip--green']}`}>{projectStatusLabels[status]}</li>}
        {date && <li className={ui.chip}>{date}</li>}
        {experienceId && <li className={ui.chip}>{experienceName[experienceId]}</li>}
      </ul>

      <p className={ui.detailLabel}>Sobre o projeto</p>
      <p className={ui.detailText}>{description ?? summary}</p>

      {objective && (
        <>
          <p className={ui.detailLabel}>Objetivo</p>
          <p className={ui.detailText}>{objective}</p>
        </>
      )}

      {highlights.length > 0 && (
        <>
          <p className={ui.detailLabel}>Destaques</p>
          <ul className={ui.detailList}>
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}

      <p className={ui.detailLabel}>Tecnologias</p>
      <ul className={ui.tagList}>
        {tech.map((t) => (
          <li key={t} className={ui.tag}>
            {t}
          </li>
        ))}
      </ul>

      {project.image && <img src={project.image} alt={`Logo do ${project.title}`} className={ui.detailImage} loading="lazy" />}

      {(links.live || links.github || (showCaseStudyLink && links.caseStudy)) && (
        <div className={ui.detailLinks}>
          {showCaseStudyLink && links.caseStudy && (
            <a href={links.caseStudy} className={ui.btnPrimary}>
              Ver estudo de caso ↓
            </a>
          )}
          {links.live && (
            <a href={links.live} target="_blank" rel="noreferrer" className={links.caseStudy ? ui.btnGhost : ui.btnPrimary}>
              🌐 Ver site ao vivo
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className={ui.btnGhost}>
              <Icon name="github" size={16} /> GitHub
            </a>
          )}
        </div>
      )}
    </>
  )
}
