import styles from './ui.module.css'

/**
 * Cabeçalho padrão de seção: rótulo "// 01 — ...", título e texto opcional.
 * @param {{index: string, label: string, title: string, id: string, lead?: string}} props
 */
export default function SectionHeader({ index, label, title, id, lead }) {
  return (
    <div className={styles.header}>
      <p className={styles.sectionLabel}>
        {`// ${index} — ${label}`}
      </p>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </div>
  )
}
