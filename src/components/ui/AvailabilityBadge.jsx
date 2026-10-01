import { activeAvailability } from '../../data'
import styles from './ui.module.css'

/**
 * Selos de disponibilidade vindos de data/availability.js.
 * @param {{showMessage?: boolean, className?: string}} props
 */
export default function AvailabilityBadge({ showMessage = false, className = '' }) {
  if (activeAvailability.length === 0) return null
  return (
    <ul className={`${styles.tagList} ${className}`} aria-label="Disponibilidade profissional">
      {activeAvailability.map((s) => (
        <li key={s.key} className={`${styles.chip} ${styles[`chip--${s.tone}`]}`}>
          <span aria-hidden="true">{s.emoji}</span>
          {showMessage ? `${s.label} · ${s.message}` : s.label}
        </li>
      ))}
    </ul>
  )
}
