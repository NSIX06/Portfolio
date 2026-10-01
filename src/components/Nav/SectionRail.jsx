import { sections, navSectionFor } from '../../data/navigation'
import { useActiveSection, useScrollProgress } from '../../hooks/useScrollNav'
import styles from './SectionRail.module.css'

const RAIL = sections.filter((s) => s.inRail)
const ALL_IDS = sections.map((s) => s.id)

/**
 * Índice lateral (desktop largo): um ponto por seção, com o nome ao passar o mouse
 * ou focar. Mostra onde o visitante está e permite pular direto para qualquer parte.
 */
export default function SectionRail() {
  const active = useActiveSection(ALL_IDS)
  const { pastHero } = useScrollProgress()
  // Seções internas (ex.: Disponibilidade) acendem o ponto da seção-mãe se ela não tiver o próprio.
  const current = RAIL.some((s) => s.id === active) ? active : navSectionFor(active)

  return (
    <nav className={`${styles.rail} ${pastHero ? styles.visible : ''}`} aria-label="Índice da página">
      <ol>
        {RAIL.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`${styles.item} ${current === s.id ? styles.active : ''}`}
              aria-current={current === s.id ? 'location' : undefined}
            >
              <span className={styles.label}>{s.label}</span>
              <span className={styles.dot} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
