import { createElement, Fragment, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../effects/motion'
import styles from './SplitReveal.module.css'

/**
 * Texto que sobe palavra por palavra ao entrar na tela (movimento tipográfico
 * no estilo do Alejandro HA). O texto continua real e selecionável; com
 * movimento reduzido aparece direto.
 * `accent` destaca palavras (comparação exata, sem pontuação).
 */
export default function SplitReveal({ as = 'p', text, className = '', accent = [], delay = 0, step = 38, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add(styles.in)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.in)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const words = text.split(' ')
  return createElement(
    as,
    { ref, className: `${styles.split} ${className}`, ...props },
    words.map((w, i) => {
      const bare = w.replace(/[.,!?:;—]/g, '')
      return (
        <Fragment key={i}>
          <span className={styles.mask}>
            <span
              className={`${styles.word} ${accent.includes(bare) ? styles.accent : ''}`}
              style={{ transitionDelay: `${delay + i * step}ms` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      )
    }),
  )
}
