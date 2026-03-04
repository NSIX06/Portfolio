import { useEffect, useRef } from 'react'

/**
 * useReveal — IntersectionObserver hook para animar elementos ao entrar na viewport.
 * @param {Object} options
 * @param {number}  options.threshold  - Percentual visível para disparar (default: 0.12)
 * @param {string}  options.rootMargin - Margem do observer (default: '0px')
 * @param {boolean} options.once       - Animar apenas uma vez (default: true)
 * @returns {React.RefObject} ref — attache ao elemento-alvo
 */
export function useReveal({
  threshold = 0.12,
  rootMargin = '0px',
  once = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('visible')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}

/**
 * useRevealAll — aplica reveal a todos os filhos .reveal dentro de um container.
 * Útil para listas de cards.
 */
export function useRevealAll({ threshold = 0.1, stagger = 80 } = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, i * stagger)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold, stagger])

  return containerRef
}
