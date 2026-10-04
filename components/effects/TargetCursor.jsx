"use client";

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { prefersReducedMotion, hasFinePointer } from './motion'
import './TargetCursor.css'

const CORNER = 12
const BORDER = 3

/**
 * Cursor em mira que gira e "abraça" os elementos com a classe `.cursor-target`
 * (adaptado do TargetCursor do React Bits). Só existe com mouse; com movimento reduzido não gira.
 * O cursor do sistema só é escondido enquanto o efeito está ativo.
 */
export default function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2.4,
  hoverDuration = 0.2,
  color = '#f0ede8',
  colorOnTarget = '#e11d1d',
}) {
  // Liga sempre que houver mouse; com movimento reduzido a mira só não gira.
  const [enabled] = useState(() => hasFinePointer())
  const [still] = useState(() => prefersReducedMotion())
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!enabled || !cursorRef.current || !dotRef.current) return undefined
    const cursor = cursorRef.current
    const dot = dotRef.current
    const corners = Array.from(cursor.querySelectorAll('.target-cursor-corner'))
    const HOME = [
      { x: -CORNER * 1.5, y: -CORNER * 1.5 },
      { x: CORNER * 0.5, y: -CORNER * 1.5 },
      { x: CORNER * 0.5, y: CORNER * 0.5 },
      { x: -CORNER * 1.5, y: CORNER * 0.5 },
    ]
    let activeTarget = null
    let spin
    // Cores vêm do tema (variáveis --cursor / --cursor-target no CSS): mudam junto com o tema.
    const themeColors = () => {
      const cs = getComputedStyle(document.documentElement)
      return {
        base: cs.getPropertyValue('--cursor').trim() || color,
        target: cs.getPropertyValue('--cursor-target').trim() || colorOnTarget,
      }
    }
    const paint = (duration = 0.2) => {
      const { base, target } = themeColors()
      const c = activeTarget ? target : base
      gsap.to(corners, { borderColor: c, duration })
      gsap.to(dot, { backgroundColor: c, duration })
    }
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    document.documentElement.classList.add('has-target-cursor')
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50, x: mouse.x, y: mouse.y, opacity: 0 })

    // Ponto acompanha o mouse quase na hora; a mira vem atrás com atraso suave (fluidez da referência).
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' })

    const startSpin = () => {
      spin?.kill()
      if (still) return
      spin = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }
    startSpin()

    // A cada quadro, os cantos deslizam (interpolação) até o alvo — ou de volta para casa.
    const ticker = () => {
      const cx = gsap.getProperty(cursor, 'x')
      const cy = gsap.getProperty(cursor, 'y')
      let goal = HOME
      if (activeTarget) {
        const r = activeTarget.getBoundingClientRect()
        goal = [
          { x: r.left - BORDER - cx, y: r.top - BORDER - cy },
          { x: r.right + BORDER - CORNER - cx, y: r.top - BORDER - cy },
          { x: r.right + BORDER - CORNER - cx, y: r.bottom + BORDER - CORNER - cy },
          { x: r.left - BORDER - cx, y: r.bottom + BORDER - CORNER - cy },
        ]
      }
      corners.forEach((c, i) => {
        const x = gsap.getProperty(c, 'x')
        const y = gsap.getProperty(c, 'y')
        gsap.set(c, { x: x + (goal[i].x - x) * 0.22, y: y + (goal[i].y - y) * 0.22 })
      })
    }
    gsap.ticker.add(ticker)

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2, overwrite: 'auto' })
    }
    const onDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.25 })
      gsap.to(cursor, { scale: 0.88, duration: 0.25 })
    }
    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 })
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }
    const onLeaveWindow = () => gsap.to([cursor, dot], { opacity: 0, duration: 0.2 })

    const setTarget = (target) => {
      if (target === activeTarget) return
      activeTarget = target
      paint()
      if (target) {
        spin?.kill()
        gsap.to(cursor, { rotation: 0, duration: 0.3, ease: 'power3.out' })
      } else {
        startSpin()
      }
    }

    const onOver = (e) => setTarget(e.target.closest?.(targetSelector) ?? null)
    // Ao rolar, o elemento sob o mouse muda sem "mouseover": confere de novo.
    const onScroll = () => {
      const el = document.elementFromPoint(mouse.x, mouse.y)
      setTarget(el?.closest?.(targetSelector) ?? null)
    }

    paint(0)
    const themeObserver = new MutationObserver(() => paint(0.35))
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      gsap.ticker.remove(ticker)
      spin?.kill()
      themeObserver.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.classList.remove('has-target-cursor')
    }
  }, [enabled, still, targetSelector, spinDuration, hoverDuration, color, colorOnTarget])

  if (!enabled) return null

  return createPortal(
    <>
      <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
        <div className="target-cursor-corner corner-tl" style={{ borderColor: 'var(--cursor)' }} />
        <div className="target-cursor-corner corner-tr" style={{ borderColor: 'var(--cursor)' }} />
        <div className="target-cursor-corner corner-br" style={{ borderColor: 'var(--cursor)' }} />
        <div className="target-cursor-corner corner-bl" style={{ borderColor: 'var(--cursor)' }} />
      </div>
      <div ref={dotRef} className="target-cursor-dot-solo" aria-hidden="true" style={{ backgroundColor: 'var(--cursor)' }} />
    </>,
    document.body
  )
}
