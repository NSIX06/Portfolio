import { useEffect, useRef } from 'react'
import { prefersReducedMotion, watchVisibility } from './motion'

const FALLBACK = { r: 255, g: 255, b: 255 }
const DEFAULT_COLORS = ['#3a1010', '#e11d1d', '#5c4a10']
const FONT_SIZE = 16
const CHAR_W = 10
const CHAR_H = 20

const hexToRgb = (hex) => {
  const full = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => r + r + g + g + b + b)
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null
}
const mix = (a, b, f) => ({ r: Math.round(a.r + (b.r - a.r) * f), g: Math.round(a.g + (b.g - a.g) * f), b: Math.round(a.b + (b.b - a.b) * f) })
const css = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`

/**
 * Fundo de caracteres que mudam aos poucos (adaptado do LetterGlitch do React Bits).
 * Pausa fora da tela; com movimento reduzido desenha uma vez, parado.
 */
export default function LetterGlitch({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 60,
  outerVignette = true,
  centerVignette = false,
  smooth = true,
  backgroundColor = '#0a0a0a',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined
    const chars = Array.from(characters)
    const rgbs = glitchColors.map((c) => hexToRgb(c) || FALLBACK)
    const randChar = () => chars[Math.floor(Math.random() * chars.length)]
    const randRgb = () => rgbs[Math.floor(Math.random() * rgbs.length)]
    const reduced = prefersReducedMotion()
    let letters = []
    let cols = 0
    let raf = 0
    let last = 0
    let visible = true
    let resizeTimer

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${FONT_SIZE}px monospace`
      ctx.textBaseline = 'top'
      letters.forEach((l, i) => {
        ctx.fillStyle = css(l.rgb)
        ctx.fillText(l.char, (i % cols) * CHAR_W, Math.floor(i / cols) * CHAR_H)
      })
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(rect.width / CHAR_W)
      const rows = Math.ceil(rect.height / CHAR_H)
      letters = Array.from({ length: cols * rows }, () => {
        const rgb = randRgb()
        return { char: randChar(), rgb, from: rgb, to: randRgb(), progress: 1 }
      })
      draw()
    }

    const update = () => {
      const n = Math.max(1, Math.floor(letters.length * 0.05))
      for (let i = 0; i < n; i++) {
        const l = letters[Math.floor(Math.random() * letters.length)]
        if (!l) continue
        l.char = randChar()
        l.from = l.rgb
        l.to = randRgb()
        if (smooth) l.progress = 0
        else {
          l.rgb = l.to
          l.progress = 1
        }
      }
    }

    const animate = (now) => {
      raf = 0
      if (now - last >= glitchSpeed) {
        update()
        last = now
      }
      if (smooth) {
        for (const l of letters) {
          if (l.progress < 1) {
            l.progress = Math.min(1, l.progress + 0.05)
            l.rgb = mix(l.from, l.to, l.progress)
          }
        }
      }
      draw()
      if (visible) raf = requestAnimationFrame(animate)
    }

    resize()
    const stopWatching = reduced
      ? () => {}
      : watchVisibility(canvas, (v) => {
          visible = v
          if (v && !raf) raf = requestAnimationFrame(animate)
        })
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 100)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      stopWatching()
      window.removeEventListener('resize', onResize)
    }
  }, [glitchSpeed, smooth, characters, glitchColors])

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {outerVignette && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(10,10,10,0) 55%, rgba(10,10,10,1) 100%)' }} />
      )}
      {centerVignette && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 60%)' }} />
      )}
    </div>
  )
}
