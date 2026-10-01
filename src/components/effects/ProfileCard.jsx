import { memo, useEffect, useMemo, useRef } from 'react'
import { prefersReducedMotion } from './motion'
import './ProfileCard.css'

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v, p = 3) => parseFloat(v.toFixed(p))
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

/**
 * Cartão de perfil com inclinação 3D e brilho holográfico (adaptado do ProfileCard do React Bits).
 * Sem inclinação com movimento reduzido ou em telas de toque.
 */
function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status,
  contactText = 'Contato',
  contactHref = '#contato',
  innerGradient = 'linear-gradient(145deg, rgba(225, 29, 29, 0.32) 0%, rgba(255, 209, 0, 0.14) 100%)',
  glowColor = 'rgba(225, 29, 29, 0.55)',
  enableTilt = true,
  className = '',
}) {
  const wrapRef = useRef(null)
  const shellRef = useRef(null)

  const engine = useMemo(() => {
    let raf = 0
    let running = false
    let last = 0
    let cx = 0
    let cy = 0
    let tx = 0
    let ty = 0
    let initialUntil = 0

    const apply = (x, y) => {
      const shell = shellRef.current
      const wrap = wrapRef.current
      if (!shell || !wrap) return
      const px = clamp((100 / (shell.clientWidth || 1)) * x)
      const py = clamp((100 / (shell.clientHeight || 1)) * y)
      const props = {
        '--pointer-x': `${px}%`,
        '--pointer-y': `${py}%`,
        '--background-x': `${adjust(px, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(py, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(py - 50, px - 50) / 50, 0, 1)}`,
        '--rotate-x': `${round(-((px - 50) / 5))}deg`,
        '--rotate-y': `${round((py - 50) / 4)}deg`,
      }
      for (const [k, v] of Object.entries(props)) wrap.style.setProperty(k, v)
    }

    const step = (ts) => {
      if (!running) return
      if (!last) last = ts
      const dt = (ts - last) / 1000
      last = ts
      const tau = ts < initialUntil ? 0.6 : 0.14
      const k = 1 - Math.exp(-dt / tau)
      cx += (tx - cx) * k
      cy += (ty - cy) * k
      apply(cx, cy)
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(step)
      else {
        running = false
        last = 0
      }
    }
    const start = () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(step)
    }
    return {
      setImmediate(x, y) {
        cx = x
        cy = y
        apply(x, y)
      },
      setTarget(x, y) {
        tx = x
        ty = y
        start()
      },
      toCenter() {
        const s = shellRef.current
        if (s) this.setTarget(s.clientWidth / 2, s.clientHeight / 2)
      },
      beginInitial(ms) {
        initialUntil = performance.now() + ms
        start()
      },
      cancel() {
        cancelAnimationFrame(raf)
        running = false
      },
    }
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined
    const touch = window.matchMedia?.('(hover: none)').matches
    if (!enableTilt || prefersReducedMotion() || touch) {
      engine.setImmediate(shell.clientWidth / 2, shell.clientHeight / 2)
      return undefined
    }
    const offset = (e) => {
      const r = shell.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const onEnter = (e) => {
      shell.classList.add('active')
      engine.setTarget(...offset(e))
    }
    const onMove = (e) => engine.setTarget(...offset(e))
    const onLeave = () => {
      engine.toCenter()
      shell.classList.remove('active')
    }
    shell.addEventListener('pointerenter', onEnter)
    shell.addEventListener('pointermove', onMove)
    shell.addEventListener('pointerleave', onLeave)
    engine.setImmediate(shell.clientWidth - 70, 60)
    engine.toCenter()
    engine.beginInitial(1200)
    return () => {
      shell.removeEventListener('pointerenter', onEnter)
      shell.removeEventListener('pointermove', onMove)
      shell.removeEventListener('pointerleave', onLeave)
      engine.cancel()
    }
  }, [engine, enableTilt])

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={{ '--inner-gradient': innerGradient, '--behind-glow-color': glowColor }}
    >
      <div className="pc-behind" aria-hidden="true" />
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card" aria-label={`Cartão de ${name}`}>
          <div className="pc-inside">
            <div className="pc-shine" aria-hidden="true" />
            <div className="pc-glare" aria-hidden="true" />
            <div className="pc-content pc-details">
              <p className="pc-name">{name}</p>
              <p className="pc-title">{title}</p>
            </div>
            <img className="pc-avatar" src={avatarUrl} alt={`Foto de ${name}`} width="320" height="400" />
            <div className="pc-user-info">
              <div className="pc-user-details">
                <img className="pc-mini-avatar" src={avatarUrl} alt="" width="40" height="40" />
                <div className="pc-user-text">
                  <span className="pc-handle">@{handle}</span>
                  <span className="pc-status">{status}</span>
                </div>
              </div>
              <a className="pc-contact-btn cursor-target" href={contactHref}>
                {contactText}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(ProfileCard)
