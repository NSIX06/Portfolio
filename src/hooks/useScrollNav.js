import { useEffect, useState } from 'react'

/**
 * Id da seção que ocupa o meio da tela (scroll-spy). Observa os ids recebidos;
 * como todas as seções estão no HTML desde o início, um único observer basta.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    key.split('|').forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [key])

  return active
}

/** Progresso de leitura da página (0 a 1) e se já passou da primeira tela. */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, pastHero: false, scrolled: false })

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setState({
        progress: max > 0 ? Math.min(1, y / max) : 0,
        pastHero: y > window.innerHeight * 0.9,
        scrolled: y > 40,
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return state
}
