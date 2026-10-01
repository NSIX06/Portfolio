import { Children, cloneElement, createRef, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, watchVisibility } from './motion'
import './CardSwap.css'

export const Card = forwardRef(function Card({ className = '', ...rest }, ref) {
  return <div ref={ref} {...rest} className={`swap-card ${className}`.trim()} />
})

const makeSlot = (i, distX, distY, total) => ({ x: i * distX, y: -i * distY, z: -i * distX * 1.5, zIndex: total - i })

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

/**
 * Pilha de cartões que se revezam (adaptado do CardSwap do React Bits).
 * Pausa no hover e fora da tela; com movimento reduzido a pilha fica parada.
 */
export default function CardSwap({
  width = 420,
  height = 300,
  cardDistance = 52,
  verticalDistance = 58,
  delay = 4200,
  pauseOnHover = true,
  skewAmount = 5,
  children,
}) {
  const childArr = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(() => childArr.map(() => createRef()), [childArr.length]) // eslint-disable-line react-hooks/exhaustive-deps
  const order = useRef(childArr.map((_, i) => i))
  const container = useRef(null)

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))
    if (prefersReducedMotion() || total < 2) return undefined

    const cfg = { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    let tl = null
    let interval = 0
    let hovering = false
    let visible = true

    const swap = () => {
      const [front, ...rest] = order.current
      const elFront = refs[front].current
      tl = gsap.timeline()
      tl.to(elFront, { y: '+=500', duration: cfg.durDrop, ease: cfg.ease })
      tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current
        const slot = makeSlot(i, cardDistance, verticalDistance, total)
        tl.set(el, { zIndex: slot.zIndex }, 'promote')
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: cfg.durMove, ease: cfg.ease }, `promote+=${i * 0.15}`)
      })
      const back = makeSlot(total - 1, cardDistance, verticalDistance, total)
      tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`)
      tl.call(() => gsap.set(elFront, { zIndex: back.zIndex }), undefined, 'return')
      tl.to(elFront, { x: back.x, y: back.y, z: back.z, duration: cfg.durReturn, ease: cfg.ease }, 'return')
      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    const run = () => {
      clearInterval(interval)
      if (!hovering && visible) interval = window.setInterval(swap, delay)
    }
    const stopWatching = watchVisibility(container.current, (v) => {
      visible = v
      run()
    })

    const node = container.current
    const pause = () => {
      hovering = true
      tl?.pause()
      clearInterval(interval)
    }
    const resume = () => {
      hovering = false
      tl?.play()
      run()
    }
    if (pauseOnHover) {
      node.addEventListener('mouseenter', pause)
      node.addEventListener('mouseleave', resume)
      node.addEventListener('focusin', pause)
      node.addEventListener('focusout', resume)
    }
    return () => {
      clearInterval(interval)
      stopWatching()
      tl?.kill()
      node.removeEventListener('mouseenter', pause)
      node.removeEventListener('mouseleave', resume)
      node.removeEventListener('focusin', pause)
      node.removeEventListener('focusout', resume)
    }
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, refs])

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {childArr.map((child, i) =>
        isValidElement(child) ? cloneElement(child, { key: i, ref: refs[i], style: { width, height, ...(child.props.style ?? {}) } }) : child
      )}
    </div>
  )
}
