import { memo } from 'react'
import { projectStatusLabels, projectOrigins } from '../../data'
import Icon from '../icons/Icon'
import ui from '../ui/ui.module.css'
import styles from './Projects.module.css'

/** Card de projeto. O título é um botão que cobre o card (abre os detalhes); os links ficam acima dele. */
const ProjectCard = memo(function ProjectCard({ project, onOpen }) {
  const { id, tag, title, summary, tech, links, emoji, featured, status, highlights, origin } = project

  return (
    <article id={`projeto-${id}`} className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      <div className={styles.cardTopBar} aria-hidden="true" />

      <div className={styles.cardMeta}>
        {featured && <span className={styles.featuredBadge}>⭐ Destaque</span>}
        {status && <span className={`${ui.chip} ${ui['chip--green']}`}>{projectStatusLabels[status]}</span>}
        <span className={ui.chip}>{projectOrigins[origin]}</span>
      </div>

      <div className={featured ? styles.featuredBody : styles.body}>
        <div className={styles.bodyMain}>
          {!featured && (
            <div className={styles.cardEmoji} aria-hidden="true">
              {emoji}
            </div>
          )}
          <p className={styles.cardTag}>{tag}</p>
          <h3 className={styles.cardTitle}>
            <button type="button" className={styles.stretched} onClick={() => onOpen(project)}>
              {title}
            </button>
          </h3>
          <p className={styles.cardDesc}>{summary}</p>

          <ul className={styles.techRow} aria-label="Tecnologias">
            {tech.map((t) => (
              <li key={t} className={styles.techBadge}>
                {t}
              </li>
            ))}
          </ul>

          <div className={styles.cardLinks}>
            <span className={styles.cardLinkHint} aria-hidden="true">
              Ver detalhes →
            </span>
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
                aria-label={`Ver site ao vivo: ${title} (abre em nova aba)`}
              >
                🌐 Site
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
                aria-label={`Ver ${title} no GitHub (abre em nova aba)`}
              >
                <Icon name="github" size={13} /> GitHub
              </a>
            )}
          </div>
        </div>

        {featured && (
          <div className={styles.featuredVisual} aria-hidden="true">
            <span className={`${styles.featuredEmoji} float`}>{emoji}</span>
            <p className={styles.featuredVisualTitle}>{title}</p>
            {highlights?.[0] && <p className={styles.featuredVisualNote}>{highlights[0]}</p>}
          </div>
        )}
      </div>
    </article>
  )
})

export default ProjectCard
