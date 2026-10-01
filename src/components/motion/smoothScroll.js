/* Rolagem suave (Lenis), no espírito do portfólio do Alejandro HA.
 * Só liga em desktop sem movimento reduzido; em toque ou com reduced-motion fica a rolagem nativa.
 * Âncoras internas passam por aqui e respeitam o scroll-margin-top de cada seção. */
import Lenis from 'lenis'
import { isTouchDevice, prefersReducedMotion } from '../effects/motion'

let lenis = null

/** Posição de rolagem de um elemento, descontando o scroll-margin-top dele. */
function targetY(el) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  return el.getBoundingClientRect().top + window.scrollY - margin
}

function onAnchorClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = e.target.closest?.('a[href^="#"]')
  if (!a || a.classList.contains('skip-link')) return
  const id = decodeURIComponent(a.getAttribute('href').slice(1))
  const el = id && document.getElementById(id)
  if (!el) return
  e.preventDefault()
  lenis.scrollTo(targetY(el), { duration: 1.1 })
  history.pushState(null, '', `#${id}`)
}

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined' || prefersReducedMotion() || isTouchDevice()) return () => {}
  document.documentElement.style.scrollBehavior = 'auto'
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  let raf = 0
  const loop = (t) => {
    lenis.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  document.addEventListener('click', onAnchorClick)
  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onAnchorClick)
    lenis.destroy()
    lenis = null
    document.documentElement.style.scrollBehavior = ''
  }
}

/** Pausa/retoma a rolagem suave (ex.: com a jornada aberta). */
export function setSmoothScrollPaused(paused) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}

/** Rola até o topo, suave quando possível. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
