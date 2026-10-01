/** Guarda o getBoundingClientRect de um elemento, atualizado em scroll/resize,
 *  para não forçar layout a cada pointermove. */
export function createRectCache(el) {
  const cache = { current: el.getBoundingClientRect() }
  let raf = 0
  const update = () => {
    raf = 0
    cache.current = el.getBoundingClientRect()
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
  ro?.observe(el)
  window.addEventListener('scroll', schedule, { passive: true, capture: true })
  window.addEventListener('resize', schedule, { passive: true })
  return {
    get current() {
      return cache.current
    },
    destroy() {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('scroll', schedule, { capture: true })
      window.removeEventListener('resize', schedule)
    },
  }
}
