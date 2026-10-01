import { useCallback, useMemo, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { projects, projectOrigins, allReposUrl } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Modal from '../ui/Modal'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import styles from './Projects.module.css'

const ALL = 'todos'
const COLLAPSED_REGULAR = 3 // cards comuns visíveis antes de "Ver mais" (destaques sempre aparecem)

export default function Projects() {
  const ref = useReveal()
  const [filter, setFilter] = useState(ALL)
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const close = useCallback(() => setSelected(null), [])

  // Só mostra filtros de origens que têm projetos: adicionar um projeto "freelancer" cria o filtro sozinho.
  const filters = useMemo(() => {
    const present = new Set(projects.map((p) => p.origin))
    return [
      { id: ALL, label: 'Todos', count: projects.length },
      ...Object.entries(projectOrigins)
        .filter(([id]) => present.has(id))
        .map(([id, label]) => ({ id, label, count: projects.filter((p) => p.origin === id).length })),
    ]
  }, [])

  const filtered = filter === ALL ? projects : projects.filter((p) => p.origin === filter)
  const featured = filtered.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)
  const hiddenCount = expanded ? 0 : Math.max(0, regular.length - COLLAPSED_REGULAR)
  const visible = [...featured, ...(expanded ? regular : regular.slice(0, COLLAPSED_REGULAR))]

  return (
    <section id="projetos" className="section section--surface" aria-labelledby="projects-heading">
      <div className="container">
        <div className="reveal" ref={ref}>
          <SectionHeader
            section="projetos"
            label="trabalhos"
            title="Projetos"
            id="projects-heading"
            lead="Sistemas corporativos desenvolvidos na TMG, projetos acadêmicos e pessoais. Clique em um projeto para ver os detalhes."
          />
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar projetos por origem">
          {filters.map((f) => (
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
              {f.label} <span className={styles.filterCount}>{f.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.map((p) => (
            <div key={p.id} className={p.featured ? styles.featuredWrapper : undefined}>
              <ProjectCard project={p} onOpen={setSelected} />
            </div>
          ))}

          {hiddenCount > 0 && (
            <div className={styles.ctaWrapper}>
              <button type="button" className={`${styles.ctaCard} ${styles.moreCard}`} onClick={() => setExpanded(true)}>
                <span className={styles.moreCount}>+{hiddenCount}</span>
                <span className={styles.ctaTitle}>Ver mais projetos</span>
                <span className={styles.ctaDesc}>Acadêmicos e pessoais</span>
              </button>
            </div>
          )}

          <div className={styles.ctaWrapper}>
            <div className={styles.ctaCard}>
              <span aria-hidden="true" style={{ fontSize: '2rem' }}>
                📦
              </span>
              <h3 className={styles.ctaTitle}>Mais no GitHub</h3>
              <p className={styles.ctaDesc}>Veja todos os repositórios públicos.</p>
              <a
                href={allReposUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.ctaBtn}
                aria-label="Ver todos os repositórios no GitHub (abre em nova aba)"
              >
                Ver tudo →
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal open={Boolean(selected)} onClose={close} title={selected?.title ?? ''} eyebrow={selected?.tag}>
        {selected && <ProjectDetails project={selected} />}
      </Modal>
    </section>
  )
}
