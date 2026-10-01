import { useCallback, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { certificates, certificateStatusLabels } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Modal from '../ui/Modal'
import CertificateDetails from './CertificateDetails'
import ui from '../ui/ui.module.css'
import styles from './Certificates.module.css'

const COLLAPSED = 6

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'concluido', label: certificateStatusLabels.concluido },
  { id: 'em-andamento', label: certificateStatusLabels['em-andamento'] },
]

export default function Certificates() {
  const ref = useReveal()
  const [filter, setFilter] = useState('todos')
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const close = useCallback(() => setSelected(null), [])

  const filtered = filter === 'todos' ? certificates : certificates.filter((c) => c.status === filter)
  const visible = expanded ? filtered : filtered.slice(0, COLLAPSED)
  const hidden = filtered.length - visible.length
  const institutions = new Set(certificates.map((c) => c.institution)).size

  return (
    <section id="certificados" className={`section section--bg ${styles.attached}`} aria-labelledby="certificates-heading">
      <div className="container">
        <div className="reveal" ref={ref}>
          <SectionHeader
            label="formação · aprendizado"
            title="Cursos & Certificados"
            id="certificates-heading"
            lead={`${certificates.length} cursos e certificações em ${institutions} instituições. Clique em um item para ver os detalhes.`}
          />
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar certificados por status">
          {FILTERS.map((f) => {
            const count = f.id === 'todos' ? certificates.length : certificates.filter((c) => c.status === f.id).length
            return (
              <button
                key={f.id}
                type="button"
                className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id)
                  setExpanded(false)
                }}
              >
                {f.label} <span className={styles.filterCount}>{count}</span>
              </button>
            )
          })}
        </div>

        <ul className={styles.grid}>
          {visible.map((c) => (
            <li key={c.id}>
              <button type="button" className={styles.card} onClick={() => setSelected(c)}>
                <span className={styles.institution}>{c.partner ? `${c.institution} + ${c.partner}` : c.institution}</span>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.meta}>
                  <span className={`${ui.chip} ${c.status === 'em-andamento' ? ui['chip--yellow'] : ui['chip--green']}`}>
                    {certificateStatusLabels[c.status]}
                  </span>
                  {c.workload && <span className={ui.chip}>{c.workload}</span>}
                  <span className={styles.more} aria-hidden="true">
                    Detalhes →
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {(hidden > 0 || expanded) && filtered.length > COLLAPSED && (
          <div className={styles.moreRow}>
            <button type="button" className={ui.btnGhost} onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? 'Mostrar menos ↑' : `Ver todos os ${filtered.length} certificados ↓`}
            </button>
          </div>
        )}
      </div>

      <Modal open={Boolean(selected)} onClose={close} title={selected?.name ?? ''} eyebrow="Certificado">
        {selected && <CertificateDetails certificate={selected} />}
      </Modal>
    </section>
  )
}
