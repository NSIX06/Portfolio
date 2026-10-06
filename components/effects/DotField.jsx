"use client";

import { memo, useEffect, useId, useRef } from 'react'
import { watchVisibility } from './motion'
import './DotField.css'

const TWO_PI = Math.PI * 2

/**
 * Campo de pontos que se deforma com o movimento do mouse (adaptado do DotField do React Bits).
 * Pausa fora da tela.
 */
const DotField = memo(
/**
 * @param {{dotRadius?: number, dotSpacing?: number, cursorRadius?: number, bulgeStrength?: number,
 *   glowRadius?: number, gradientFrom?: string, gradientTo?: string, glowColor?: string, className?: string}} props
 */
function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 420,
  bulgeStrength = 60,
  glowRadius = 180,
  gradientFrom = 'rgba(225, 29, 29, 0.38)',
  gradientTo = 'rgba(255, 209, 0, 0.16)',
  glowColor = 'rgba(225, 29, 29, 0.18)',
  className = '',
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const glowRef = useRef(null)
  const glowId = { current: `dot-glow-${useId().replace(/:/g, '')}` }

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const glow = glowRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !canvas || !ctx) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 }
    let dots = []
    let size = { w: 0, h: 0 }
    let raf = 0
    let visible = true
    let engagement = 0
    let glowOpacity = 0
    let resizeTimer
    let idle = 0

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      size = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const step = dotRadius + dotSpacing
      const cols = Math.floor(rect.width / step)
      const rows = Math.floor(rect.height / step)
      const padX = (rect.width % step) / 2
      const padY = (rect.height % step) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2
          const ay = padY + r * step + step / 2
          dots.push({ ax, ay, sx: ax, sy: ay })
        }
      }
    }

    const draw = () => {
      const { w, h } = size
      ctx.clearRect(0, 0, w, h)
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, gradientFrom)
      grad.addColorStop(1, gradientTo)
      ctx.fillStyle = grad
      const rad = dotRadius / 2
      const crSq = cursorRadius * cursorRadius
      ctx.beginPath()
      for (const d of dots) {
        const dx = mouse.x - d.ax
        const dy = mouse.y - d.ay
        const distSq = dx * dx + dy * dy
        if (distSq < crSq && engagement > 0.01) {
          const t = 1 - Math.sqrt(distSq) / cursorRadius
          const push = t * t * bulgeStrength * engagement
          const angle = Math.atan2(dy, dx)
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15
        } else {
          d.sx += (d.ax - d.sx) * 0.1
          d.sy += (d.ay - d.sy) * 0.1
        }
        ctx.moveTo(d.sx + rad, d.sy)
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI)
      }
      ctx.fill()
    }

    const tick = () => {
      raf = 0
      const dist = Math.hypot(mouse.px - mouse.x, mouse.py - mouse.y)
      mouse.speed += (dist - mouse.speed) * 0.5
      mouse.px = mouse.x
      mouse.py = mouse.y
      engagement += (Math.min(mouse.speed / 5, 1) - engagement) * 0.06
      glowOpacity += (engagement - glowOpacity) * 0.08
      if (glow) {
        glow.setAttribute('cx', String(mouse.x))
        glow.setAttribute('cy', String(mouse.y))
        glow.style.opacity = String(glowOpacity)
      }
      draw()
      // para o laço quando o mouse fica parado e os pontos já voltaram ao lugar
      idle = mouse.speed < 0.01 && engagement < 0.002 ? idle + 1 : 0
      if (visible && idle < 90) raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      idle = 0
      start()
    }
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        draw()
      }, 100)
    }

    build()
    draw()
    const stopWatching = watchVisibility(wrap, (v) => {
      visible = v
      if (v) start()
    })
    window.addEventListener('resize', onResize)
    // Os pontos só reagem ao mouse: fica ligado também com 'reduzir movimento'.
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      stopWatching()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [dotRadius, dotSpacing, cursorRadius, bulgeStrength, gradientFrom, gradientTo])

  return (
    <div ref={wrapRef} className={`dot-field ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} />
      <svg>
        <defs>
          <radialGradient id={glowId.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowId.current})`} style={{ opacity: 0 }} />
      </svg>
    </div>
  )
})

export default DotField
