import { useReveal } from '../../hooks/useReveal'
import { experiences, projects } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import ui from '../ui/ui.module.css'
import styles from './Experience.module.css'

const projectTitle = Object.fromEntries(projects.map((p) => [p.id, p.title]))

function ExperienceCard({ experience }) {
  const ref = useReveal()
  const { company, companyNote, roles, start, end, current, location, description, technologies, tools, projectIds, accent } =
    experience

  return (
    <article className={`${styles.card} ${current ? styles.cardCurrent : ''} reveal`} ref={ref}>
      <div className={styles.cardBar} style={{ background: accent }} aria-hidden="true" />
      <div className={styles.cardHead}>
        <div>
          {current && <p className={`${ui.chip} ${ui['chip--accent']} ${styles.currentChip}`}>⭐ Cargo atual</p>}
          <h3 className={styles.company}>{company}</h3>
          <p className={styles.role}>{roles.map((r) => r.title).join(' · ')}</p>
          {location && <p className={styles.location}>{location}</p>}
        </div>
        <span className={styles.period}>
          {start} — {end ?? 'Atual'}
        </span>
      </div>

      {companyNote && <p className={styles.companyNote}>{companyNote}</p>}
      <p className={styles.description}>{description}</p>

      {roles.map((role) => (
        <div key={role.title} className={styles.roleBlock}>
          {roles.length > 1 && <h4 className={styles.roleTitle}>{role.title}</h4>}
          <ul className={styles.bullets}>
            {role.activities.map((a) => (
              <li key={a} className={styles.bullet}>
                <span className={styles.bulletDot} style={{ background: accent }} aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tools.length > 0 && (
        <div className={styles.tools}>
          <p className={styles.toolsLabel}>🛠️ Sistemas utilizados</p>
          <div className={styles.toolsGrid}>
            {tools.map((t) => (
              <div key={t.name} className={styles.toolCard}>
                <strong className={styles.toolName}>{t.name}</strong>
                <p className={styles.toolDesc}>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projectIds.length > 0 && (
        <div className={styles.footerRow}>
          <p className={styles.toolsLabel}>Projetos desenvolvidos</p>
          <ul className={ui.tagList}>
            {projectIds.map((id) => (
              <li key={id}>
                <a href={`#projeto-${id}`} className={`${ui.tag} ${styles.projectLink}`}>
                  {projectTitle[id] ?? id} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {technologies.length > 0 && (
        <div className={styles.footerRow}>
          <p className={styles.toolsLabel}>Tecnologias</p>
          <ul className={ui.tagList}>
            {technologies.map((t) => (
              <li key={t} className={ui.tag}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export default function Experience() {
  return (
    <section id="experiencia" className="section section--bg" aria-labelledby="exp-heading">
      <div className="container">
        <SectionHeader section="experiencia" label="carreira" title="Experiência" id="exp-heading" />
        <div className={styles.list}>
          {experiences.map((e) => (
            <ExperienceCard key={e.id} experience={e} />
          ))}
        </div>
      </div>
    </section>
  )
}
