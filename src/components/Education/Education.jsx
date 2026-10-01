import { useReveal } from '../../hooks/useReveal'
import { education } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import ui from '../ui/ui.module.css'
import styles from './Education.module.css'

export default function Education() {
  const ref = useReveal()
  return (
    <section id="formacao" className="section section--surface" aria-labelledby="education-heading">
      <div className="container reveal" ref={ref}>
        <SectionHeader index="03" label="formação" title="Formação" id="education-heading" />
        <ol className={styles.timeline}>
          {education.map((e) => (
            <li key={e.id} className={styles.item}>
              <span className={styles.marker} aria-hidden="true">
                🎓
              </span>
              <article className={styles.card}>
                <div className={styles.head}>
                  <h3 className={styles.course}>{e.course}</h3>
                  <span className={`${ui.chip} ${e.status === 'cursando' ? ui['chip--accent'] : ''}`}>{e.statusLabel}</span>
                </div>
                <p className={styles.institution}>
                  {e.institution} · {e.location}
                </p>
                <p className={styles.period}>
                  {e.start} — {e.end ?? 'Atual'}
                </p>
                {e.description && <p className={styles.description}>{e.description}</p>}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
