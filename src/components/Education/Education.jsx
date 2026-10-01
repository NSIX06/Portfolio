import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { education } from '../../data/education'
import { certificates } from '../../data/certificates'
import styles from './Education.module.css'

const COLLAPSED = 8

export default function Education() {
  const ref = useReveal()
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? certificates : certificates.slice(0, COLLAPSED)

  return (
    <section id="formacao" className="section section--bg" aria-labelledby="edu-heading">
      <div className="container reveal" ref={ref}>
        <p className={styles.sectionLabel}>// 05 — formação</p>
        <h2 id="edu-heading" className={styles.sectionTitle}>Formação</h2>

        <div className={styles.eduGrid}>
          {education.map((e) => (
            <article key={e.id} className={styles.card}>
              <div className={styles.cardBar} aria-hidden="true" />
              <span className={`${styles.status} ${e.status === 'cursando' ? styles.statusNow : ''}`}>
                {e.statusLabel}
              </span>
              <h3 className={styles.course}>{e.course}</h3>
              <p className={styles.institution}>
                {e.institution} · {e.location}
              </p>
              <p className={styles.period}>
                {e.start} — {e.end ?? 'Hoje'}
              </p>
            </article>
          ))}
        </div>

        <p className={styles.subTitle}>📜 Cursos e certificados</p>
        <ul className={styles.certGrid}>
          {visible.map((c) => (
            <li key={c.id} className={styles.cert}>
              <p className={styles.certName}>{c.name}</p>
              <p className={styles.certMeta}>
                {c.institution}
                {c.partner ? ` + ${c.partner}` : ''}
                {c.workload ? ` · ${c.workload}` : ''}
              </p>
              {c.status === 'em-andamento' && <span className={styles.certNow}>Em andamento</span>}
            </li>
          ))}
        </ul>
        {certificates.length > COLLAPSED && (
          <button type="button" className={styles.moreBtn} onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            {showAll ? 'Mostrar menos ↑' : `Ver todos os ${certificates.length} certificados ↓`}
          </button>
        )}
      </div>
    </section>
  )
}
