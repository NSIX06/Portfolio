import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './motion'
import './PulseHeart.css'

const OUT = 0.4
const HEART =
  'M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074-.576.433-.864.65-1.034.65s-.458-.217-1.034-.65C9.56 3.012 7.219 2.349 4.537 3.994 1.018 6.153.222 13.274 8.34 19.284 9.886 20.427 10.659 21 12 21s2.114-.572 3.66-1.717c8.118-6.008 7.322-13.13 3.803-15.289Z'

const back = (k, c) => {
  const u = k - 1
  return 1 + (c + 1) * u ** 3 + c * u ** 2
}
const swellOf = (t, c) => (t <= 0 ? 0 : t < OUT ? 1 - (1 - t / OUT) ** 3 : 1 - back((t - OUT) / (1 - OUT), c))
const STORAGE_KEY = 'nsix06-curtiu'

const readLiked = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}
const saveLiked = (v) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
  } catch {
    /* sem armazenamento: a curtida vale só nesta visita */
  }
}

/**
 * Botão de curtida com "pulso" (adaptado do PulseHeart do React Bits).
 * Sem contador público: não há backend, então a curtida fica só no navegador do visitante.
 */
export default function PulseHeart({
  label = 'Curtir o portfólio',
  likedLabel = 'Obrigado!',
  size = 36,
  likedColor = '#e11d1d',
  idleColor = '#8c8c8c',
  pillColor = '#161616',
  textColor = '#f0ede8',
  duration = 560,
  dotSize = 0.3,
  overshoot = 1.7,
  beat = 3,
}) {
  const [liked, setLiked] = useState(false)
  const [shown, setShown] = useState(false)
  const rootRef = useRef(null)
  const pillRef = useRef(null)
  const glyphRef = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const v = readLiked()
    setLiked(v)
    setShown(v)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  useLayoutEffect(() => {
    if (!raf.current) setShown(liked)
  }, [liked])

  const run = (next) => {
    const glyph = glyphRef.current
    const pill = pillRef.current
    if (!glyph || !pill) return
    let swapped = false
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      const s = swellOf(t, overshoot)
      glyph.setAttribute('transform', `translate(12 12) scale(${1 - (1 - dotSize) * s}) translate(-12 -12)`)
      pill.style.transform = `scale(${1 - (beat / 100) * s})`
      if (!swapped && t >= OUT) {
        swapped = true
        setShown(next)
      }
      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
        return
      }
      raf.current = 0
      glyph.removeAttribute('transform')
      pill.style.transform = ''
    }
    raf.current = requestAnimationFrame(tick)
  }

  const onClick = (e) => {
    if (raf.current) return
    const next = !liked
    setLiked(next)
    saveLiked(next)
    if (e.detail !== 0 && !prefersReducedMotion()) run(next)
    else setShown(next)
  }

  return (
    <button
      ref={rootRef}
      type="button"
      aria-pressed={liked}
      data-liked={String(shown)}
      className="pulse-heart cursor-target"
      style={{
        '--ph-size': `${size}px`,
        '--ph-pill': pillColor,
        '--ph-idle': idleColor,
        '--ph-liked': likedColor,
        '--ph-text': textColor,
        '--ph-stroke': `${(1.5 * size) / 24}px`,
      }}
      onClick={onClick}
    >
      <span ref={pillRef} className="pulse-heart__pill">
        <span className="pulse-heart__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g ref={glyphRef}>
              <path d={HEART} vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </span>
        <span className="pulse-heart__label">{shown ? likedLabel : label}</span>
      </span>
    </button>
  )
}
