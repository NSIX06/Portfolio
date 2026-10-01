import { useCallback, useEffect, useRef } from 'react'
import { prefersReducedMotion } from './motion'
import './ScrollExpand.css'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * Mídia que cresce até ocupar a tela conforme a rolagem, com título que sai e
 * conteúdo que entra (adaptado do ScrollExpand do React Bits, usando a rolagem da página).
 * Com movimento reduzido mostra direto o estado final, sem trecho fixo.
 */
export default function ScrollExpand({
  src,
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 44,
  startHeight = 56,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.2,
  endScale = 1,
  endShiftX = 0,
  endShiftY = 0,
  scrollDistance = 1,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.6,
  mediaFit = 'cover',
  mediaBackground = '#000',
  children,
  className = '',
}) {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)
  const reduced = useRef(typeof window !== 'undefined' && prefersReducedMotion())

  const cfg = useRef({})
  cfg.current = { startWidth, startHeight, startRadius, endRadius, mediaZoom, endScale, endShiftX, endShiftY, scrollDistance, holdDistance, smoothing, overlayScrim }

  const apply = useCallback((p) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    const c = cfg.current
    const e = smoothstep(0, 1, p)
    const w = c.startWidth + (100 - c.startWidth) * e
    const h = c.startHeight + (100 - c.startHeight) * e
    const ix = Math.max(0, (100 - w) / 2)
    const iy = Math.max(0, (100 - h) / 2)
    const r = c.startRadius + (c.endRadius - c.startRadius) * e
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`
    // Depois de aberta, a mídia pode encolher e se deslocar para dar lugar ao texto
    const settle = smoothstep(0.55, 1, p)
    const sc = (c.mediaZoom + (1 - c.mediaZoom) * e) * (1 + (c.endScale - 1) * settle)
    media.style.transform = `translate3d(${c.endShiftX * settle}%, ${c.endShiftY * settle}%, 0) scale(${sc})`
    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * smoothstep(0.55, 1, p)}`
    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`
    }
    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }
    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p)
      overlayRef.current.style.opacity = `${inn}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`
      overlayRef.current.style.pointerEvents = inn > 0.5 ? 'auto' : 'none'
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return undefined
    if (reduced.current) {
      apply(1)
      return undefined
    }
    let raf = 0
    let current = 0
    let target = 0
    let stageH = 0

    const measure = () => {
      const c = cfg.current
      stageH = window.innerHeight
      stage.style.height = `${stageH}px`
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`
      stage.style.setProperty('--se-title-size', `${clamp(window.innerWidth * 0.075, 34, 96)}px`)
    }
    const read = () => clamp(-track.getBoundingClientRect().top / (stageH * Math.max(0.01, cfg.current.scrollDistance)), 0, 1)
    const tick = () => {
      const k = 1 - Math.exp(-1 / (60 * cfg.current.smoothing))
      current += (target - current) * k
      if (Math.abs(target - current) < 0.0004) current = target
      apply(current)
      raf = current !== target ? requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      target = read()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      measure()
      target = read()
      current = target
      apply(current)
    }
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [apply])

  return (
    <div className={`scroll-expand ${reduced.current ? 'scroll-expand--static' : ''} ${className}`.trim()}>
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame" style={{ background: mediaBackground }}>
            <img
              ref={mediaRef}
              className="scroll-expand__media"
              style={{ objectFit: mediaFit }}
              src={src}
              alt={alt}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children && (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            )}
          </div>
          {title && (
            <div ref={titleRef} className="scroll-expand__title" aria-hidden="true">
              {title}
            </div>
          )}
          {scrollHint && (
            <div ref={hintRef} className="scroll-expand__hint" aria-hidden="true">
              {scrollHint}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
