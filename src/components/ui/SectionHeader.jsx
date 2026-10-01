import { sectionNumber } from '../../data/navigation'
import styles from './ui.module.css'

/**
 * Cabeçalho padrão de seção: rótulo "[ 01 · ... ]" (padrão Marcus Lorenzet), título e texto opcional.
 * O número vem da ordem em data/navigation.js (passe `section`), ou de `index`.
 * @param {{section?: string, index?: string, label: string, title: string, id: string, lead?: string}} props
 */
export default function SectionHeader({ section, index, label, title, id, lead }) {
  const num = index ?? (section ? sectionNumber(section) : '')
  return (
    <div className={styles.header}>
      <p className={styles.sectionLabel}>
        <span aria-hidden="true">[ </span>
        {num ? `${num} · ${label}` : label}
        <span aria-hidden="true"> ]</span>
      </p>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </div>
  )
}
