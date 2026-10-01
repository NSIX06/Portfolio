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
    if (!enabled || !cursorRef.current) return undefined
    const cursor = cursorRef.current
    const corners = Array.from(cursor.querySelectorAll('.target-cursor-corner'))
    const strength = { v: 0 }
    let targetCorners = null
    let activeTarget = null
    let leaveHandler = null
    let spin

    document.documentElement.classList.add('has-target-cursor')
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2, opacity: 0 })

    const startSpin = () => {
      spin?.kill()
      if (still) return
      spin = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }
    startSpin()

    const ticker = () => {
      if (!targetCorners || strength.v === 0) return
      const cx = gsap.getProperty(cursor, 'x')
      const cy = gsap.getProperty(cursor, 'y')
      corners.forEach((corner, i) => {
        const curX = gsap.getProperty(corner, 'x')
        const curY = gsap.getProperty(corner, 'y')
        const tx = targetCorners[i].x - cx
        const ty = targetCorners[i].y - cy
        gsap.to(corner, {
          x: curX + (tx - curX) * strength.v,
          y: curY + (ty - curY) * strength.v,
          duration: strength.v >= 0.99 ? 0.2 : 0.05,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      })
    }

    const onMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.1, ease: 'power3.out' })
    }
    const onDown = () => {
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 })
      gsap.to(cursor, { scale: 0.9, duration: 0.2 })
    }
    const onUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
      gsap.to(cursor, { scale: 1, duration: 0.2 })
    }
    const onLeaveWindow = () => gsap.to(cursor, { opacity: 0, duration: 0.2 })

    const release = () => {
      gsap.ticker.remove(ticker)
      targetCorners = null
      strength.v = 0
      gsap.to(corners, { borderColor: color, duration: 0.15 })
      gsap.to(dotRef.current, { backgroundColor: color, duration: 0.15 })
      const home = [
        { x: -CORNER * 1.5, y: -CORNER * 1.5 },
        { x: CORNER * 0.5, y: -CORNER * 1.5 },
        { x: CORNER * 0.5, y: CORNER * 0.5 },
        { x: -CORNER * 1.5, y: CORNER * 0.5 },
      ]
      corners.forEach((c, i) => gsap.to(c, { ...home[i], duration: 0.3, ease: 'power3.out', overwrite: true }))
      if (activeTarget && leaveHandler) activeTarget.removeEventListener('mouseleave', leaveHandler)
      activeTarget = null
      leaveHandler = null
      startSpin()
    }

    const onOver = (e) => {
      const target = e.target.closest?.(targetSelector)
      if (!target || target === activeTarget) return
      if (activeTarget) release()
      activeTarget = target
      spin?.kill()
      gsap.set(cursor, { rotation: 0 })
      gsap.to(corners, { borderColor: colorOnTarget, duration: 0.15 })
      gsap.to(dotRef.current, { backgroundColor: colorOnTarget, duration: 0.15 })
      const r = target.getBoundingClientRect()
      targetCorners = [
        { x: r.left - BORDER, y: r.top - BORDER },
        { x: r.right + BORDER - CORNER, y: r.top - BORDER },
        { x: r.right + BORDER - CORNER, y: r.bottom + BORDER - CORNER },
        { x: r.left - BORDER, y: r.bottom + BORDER - CORNER },
      ]
      gsap.ticker.add(ticker)
      gsap.to(strength, { v: 1, duration: hoverDuration, ease: 'power2.out' })
      leaveHandler = release
      target.addEventListener('mouseleave', leaveHandler)
    }

    const onScroll = () => {
      if (activeTarget) release()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      gsap.ticker.remove(ticker)
      spin?.kill()
      if (activeTarget && leaveHandler) activeTarget.removeEventListener('mouseleave', leaveHandler)
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
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: color }} />
      <div className="target-cursor-corner corner-tl" style={{ borderColor: color }} />
      <div className="target-cursor-corner corner-tr" style={{ borderColor: color }} />
      <div className="target-cursor-corner corner-br" style={{ borderColor: color }} />
      <div className="target-cursor-corner corner-bl" style={{ borderColor: color }} />
    </div>,
    document.body
  )
}
