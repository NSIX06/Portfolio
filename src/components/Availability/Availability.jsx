import { useReveal } from '../../hooks/useReveal'
import { availability, activeAvailability, currentExperience } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import ui from '../ui/ui.module.css'
import styles from './Availability.module.css'

export default function Availability() {
  const ref = useReveal()
  const role = currentExperience?.roles[0]?.title

  return (
    <section id="disponibilidade" className="section section--surface" aria-labelledby="availability-heading">
      <div className="container reveal" ref={ref}>
        <SectionHeader
          index="07"
          label="contratação"
          title="Disponibilidade"
          id="availability-heading"
          lead={availability.description}
        />

        <div className={styles.grid}>
          <div className={styles.statusCol}>
            {activeAvailability.map((s) => (
              <div key={s.key} className={`${styles.status} ${styles[`status--${s.tone}`]}`}>
                <span className={styles.statusEmoji} aria-hidden="true">
                  {s.emoji}
                </span>
                <div>
                  <p className={styles.statusLabel}>{s.label}</p>
                  <p className={styles.statusMessage}>{s.message}</p>
                </div>
              </div>
            ))}

            {currentExperience && (
              <div className={styles.current}>
                <p className={styles.blockLabel}>Situação atual</p>
                <p className={styles.currentText}>
                  {currentExperience.company}
                  {role ? ` — ${role}` : ''}, desde {currentExperience.start}
                </p>
              </div>
            )}
          </div>

          <div className={styles.infoCol}>
            <p className={styles.blockLabel}>Especialidades</p>
            <ul className={ui.tagList}>
              {availability.specialties.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>

            <p className={styles.blockLabel}>Tipo de oportunidade</p>
            <ul className={ui.tagList}>
              {availability.opportunityTypes.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>

            <p className={styles.blockLabel}>Tecnologias de interesse</p>
            <ul className={ui.tagList}>
              {availability.interests.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>

            <div className={styles.ctas}>
              <a href="#contato" className={ui.btnPrimary}>
                Falar comigo ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
