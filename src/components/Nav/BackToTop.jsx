import { useScrollProgress } from '../../hooks/useScrollNav'
import { prefersReducedMotion } from '../effects/motion'
import styles from './BackToTop.module.css'

/** Botão "voltar ao topo" que aparece depois da primeira tela, com o progresso de leitura em volta. */
export default function BackToTop() {
  const { progress, pastHero } = useScrollProgress()
  const r = 20
  const c = 2 * Math.PI * r

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${pastHero ? styles.visible : ''} cursor-target`}
      onClick={goTop}
      aria-label="Voltar ao topo"
      tabIndex={pastHero ? 0 : -1}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={r} className={styles.track} />
        <circle
          cx="24"
          cy="24"
          r={r}
          className={styles.bar}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span className={styles.arrow} aria-hidden="true">
        ↑
      </span>
    </button>
  )
}
