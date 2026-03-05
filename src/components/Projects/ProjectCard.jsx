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
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ marginRight: '.3rem', verticalAlign: 'middle' }}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
  GitHub →
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
