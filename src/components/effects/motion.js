/** Utilitários compartilhados pelos efeitos visuais. */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(hover: none)').matches || navigator.maxTouchPoints > 0) &&
  window.innerWidth <= 1024

/** Observa se o elemento está na tela, para pausar animações fora dela. */
export function watchVisibility(el, onChange) {
  if (!el || !('IntersectionObserver' in window)) {
    onChange(true)
    return () => {}
  }
  const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), { rootMargin: '100px' })
  io.observe(el)
  return () => io.disconnect()
}
