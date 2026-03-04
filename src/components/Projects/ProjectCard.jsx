import { memo } from 'react'
import styles from './Projects.module.css'

const VARIANT_CLASS = {
  orange: styles['badge--orange'],
  blue:   styles['badge--blue'],
  green:  styles['badge--green'],
  yellow: styles['badge--yellow'],
}

const ProjectCard = memo(function ProjectCard({ project }) {
  const { tag, title, description, tech, techVariant, live, github, emoji, stars, featured } = project

  return (
    <article
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
      aria-label={`Projeto: ${title}`}
    >
      <div className={styles.cardTopBar} aria-hidden="true" />

      {featured && (
        <span className={styles.featuredBadge} aria-label="Projeto em destaque">
          ⭐ Projeto em Destaque
        </span>
      )}

      <div className={featured ? styles.featuredBody : ''}>
        <div>
          {!featured && (
            <div className={styles.cardEmoji} aria-hidden="true">{emoji}</div>
          )}
          <p className={styles.cardTag}>{tag}</p>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{description}</p>

          <ul className={styles.techRow} aria-label="Tecnologias utilizadas">
            {tech.map((t, i) => (
              <li
                key={t}
                className={`${styles.techBadge} ${VARIANT_CLASS[techVariant[i]] || VARIANT_CLASS.orange}`}
              >
                {t}
              </li>
            ))}
          </ul>

          <div className={styles.cardLinks}>
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
                aria-label={`Ver site ao vivo: ${title}`}
              >
                🌐 Ver Site ao Vivo
              </a>
            )}
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={styles.cardLink}
              aria-label={`Ver ${title} no GitHub`}
            >
              🐙 GitHub →
            </a>
            {stars && (
              <span className={styles.stars} aria-label={`${stars} estrelas no GitHub`}>
                ⭐ {stars}
              </span>
            )}
          </div>
        </div>

        {featured && (
          <div className={styles.featuredVisual} aria-hidden="true">
            <span className={`${styles.featuredEmoji} float`}>{emoji}</span>
            <p className={styles.featuredVisualTitle}>{title}</p>
            <p className={styles.featuredVisualSub}>escoladeskatedobob.org.br</p>
            <p className={styles.featuredVisualNote}>
              Transformando vidas através do skate desde 2010
            </p>
          </div>
        )}
      </div>
    </article>
  )
})

export default ProjectCard
