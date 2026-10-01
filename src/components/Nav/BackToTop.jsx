import { useScrollProgress } from '../../hooks/useScrollNav'
import { prefersReducedMotion } from '../effects/motion'
import styles from './BackToTop.module.css'

/** Botão "voltar ao topo" que aparece depois da primeira tela. */
export default function BackToTop() {
  const { pastHero } = useScrollProgress()

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
      <span className={styles.arrow} aria-hidden="true">
        ↑
      </span>
    </button>
  )
}
