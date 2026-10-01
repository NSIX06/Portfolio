import { useReveal } from '../../hooks/useReveal'
import { technologies, methodologies, methodologiesIntro } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import ui from '../ui/ui.module.css'
import styles from './Skills.module.css'

function SkillCategory({ category }) {
  const headingId = `skills-${category.id}`
  return (
    <div className={styles.category}>
      <h3 id={headingId} className={styles.catLabel}>
        <span aria-hidden="true">{category.icon}</span> {category.label}
      </h3>
      <ul className={styles.pillsRow} aria-labelledby={headingId}>
        {category.items.map((s) => (
          <li key={s} className={styles.pill}>
            <span className={`${styles.dot} ${styles[`dot--${category.color}`]}`} aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()
  const methodsRef = useReveal()

  return (
    <section id="habilidades" className="section section--bg" aria-labelledby="skills-heading">
      <div className="container">
        <div className="reveal" ref={ref}>
          <SectionHeader index="04" label="stack" title="Habilidades & Conhecimentos" id="skills-heading" />
          <div className={styles.categories}>
            {technologies.map((cat) => (
              <SkillCategory key={cat.id} category={cat} />
            ))}
          </div>
        </div>

        <div id="metodologias" className={`${styles.methods} reveal`} ref={methodsRef} aria-labelledby="methods-heading">
          <h3 id="methods-heading" className={styles.methodsTitle}>
            Metodologias
          </h3>
          <p className={styles.methodsIntro}>{methodologiesIntro}</p>
          <div className={styles.methodsGrid}>
            {methodologies.map((m) => (
              <article key={m.id} className={styles.methodCard}>
                <div className={styles.methodHead}>
                  <h4 className={styles.methodName}>{m.name}</h4>
                  <span className={ui.chip}>{m.level}</span>
                </div>
                <p className={styles.methodDesc}>{m.description}</p>
                <ul className={ui.tagList}>
                  {m.practices.map((p) => (
                    <li key={p} className={ui.tag}>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
