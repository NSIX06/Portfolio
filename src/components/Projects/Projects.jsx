import { useCallback, useMemo, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { projects, projectOrigins, projectStatusLabels, allReposUrl } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Modal from '../ui/Modal'
import Icon from '../icons/Icon'
import Marquee from '../motion/Marquee'
import ProjectDetails from './ProjectDetails'
import ui from '../ui/ui.module.css'
import styles from './Projects.module.css'

const ALL = 'todos'

function ProjectLinks({ project, className }) {
  const { links, title } = project
  if (!links.live && !links.github) return null
  return (
    <span className={className}>
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer" aria-label={`Ver site ao vivo: ${title} (abre em nova aba)`}>
          🌐 Site
        </a>
      )}
      {links.github && (
        <a href={links.github} target="_blank" rel="noreferrer" aria-label={`Ver ${title} no GitHub (abre em nova aba)`}>
          <Icon name="github" size={13} /> GitHub
        </a>
      )}
    </span>
  )
}

/** Estudo de caso em destaque: cartão grande que se empilha sobre o anterior na rolagem. */
function FeaturedProject({ project, index, total, onOpen }) {
  const { id, tag, title, summary, tech, emoji, image, status, origin } = project
  return (
    <article id={`projeto-${id}`} className={`${styles.stackCard} cursor-target`} style={{ '--i': index }}>
      <div className={styles.stackText}>
        <p className={styles.stackIndex}>
          {String(index + 1).padStart(2, '0')} <span>/ {String(total).padStart(2, '0')}</span>
        </p>
        <p className={styles.stackTag}>{tag}</p>
        <h3 className={styles.stackTitle}>{title}</h3>
        <p className={styles.stackSummary}>{summary}</p>
        <div className={styles.stackChips}>
          {status && <span className={`${ui.chip} ${ui['chip--green']}`}>{projectStatusLabels[status]}</span>}
          <span className={ui.chip}>{projectOrigins[origin]}</span>
        </div>
        <ul className={styles.techRow} aria-label="Tecnologias">
          {tech.slice(0, 6).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className={styles.stackActions}>
          <button type="button" className={ui.btnPrimary} onClick={() => onOpen(project)}>
            Ver detalhes
          </button>
          <ProjectLinks project={project} className={styles.inlineLinks} />
        </div>
      </div>
      <div className={styles.stackVisual} aria-hidden="true">
        {image ? (
          <img src={image} alt="" loading="lazy" width="320" height="332" />
        ) : (
          <span className={styles.stackEmoji}>{emoji}</span>
        )}
      </div>
    </article>
  )
}

/** Projetos no padrão do Marcus Lorenzet: destaques empilhados + arquivo em tabela. */
export default function Projects() {
  const ref = useReveal()
  const archiveRef = useReveal()
  const [filter, setFilter] = useState(ALL)
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  const featured = projects.filter((p) => p.featured)
  const archive = projects.filter((p) => !p.featured)

  // Filtros só das origens presentes no arquivo.
  const filters = useMemo(() => {
    const present = new Set(archive.map((p) => p.origin))
    return [
      { id: ALL, label: 'Todos', count: archive.length },
      ...Object.entries(projectOrigins)
        .filter(([id]) => present.has(id))
        .map(([id, label]) => ({ id, label, count: archive.filter((p) => p.origin === id).length })),
    ]
  }, [archive])
  const rows = filter === ALL ? archive : archive.filter((p) => p.origin === filter)

  return (
    <section id="projetos" className={`section section--surface ${styles.section}`} aria-labelledby="projects-heading">
      <div className={styles.bigMarquee} aria-hidden="true">
        <Marquee items={['Projetos em destaque', 'Projetos em destaque']} speed={30} separator="✦" />
      </div>

      <div className="container">
        <div className="reveal" ref={ref}>
          <SectionHeader section="projetos" label="estudos de caso" title="Projetos" id="projects-heading" />
        </div>

        <div className={styles.stack}>
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} total={featured.length} onOpen={setSelected} />
          ))}
        </div>

        <div className={`reveal ${styles.archive}`} ref={archiveRef}>
          <div className={styles.archiveHead}>
            <h3 className={styles.archiveTitle}>
              <span aria-hidden="true">[ </span>Arquivo<span aria-hidden="true"> ]</span>
            </h3>
            <div className={styles.filters} role="group" aria-label="Filtrar arquivo por origem">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label} <span className={styles.filterCount}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.table} role="table" aria-label="Arquivo de projetos">
            <div className={styles.headRow} role="row">
              <span role="columnheader">Projeto</span>
              <span role="columnheader">Tipo</span>
              <span role="columnheader">Tecnologias</span>
              <span role="columnheader">Links</span>
            </div>
            {rows.map((p) => (
              <div key={p.id} id={`projeto-${p.id}`} className={`${styles.row} cursor-target`} role="row">
                <span role="cell" className={styles.cellTitle}>
                  <button type="button" className={styles.rowButton} onClick={() => setSelected(p)}>
                    <span aria-hidden="true">{p.emoji}</span> {p.title}
                  </button>
                </span>
                <span role="cell" className={styles.cellMuted}>
                  {projectOrigins[p.origin]}
                </span>
                <span role="cell" className={styles.cellMuted}>
                  {p.tech.slice(0, 3).join(' · ')}
                </span>
                <span role="cell">
                  <ProjectLinks project={p} className={styles.inlineLinks} />
                </span>
              </div>
            ))}
          </div>

          <a href={allReposUrl} target="_blank" rel="noreferrer" className={styles.allRepos}>
            Ver todos os repositórios no GitHub →
          </a>
        </div>
      </div>

      <Modal open={Boolean(selected)} onClose={close} title={selected?.title ?? ''} eyebrow={selected?.tag}>
        {selected && <ProjectDetails project={selected} />}
      </Modal>
    </section>
  )
}
