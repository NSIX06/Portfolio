import { forwardRef } from 'react'

/** Cartão usado dentro do CardSwap (fica em arquivo próprio para não puxar o gsap). */
const SwapCard = forwardRef(function SwapCard({ className = '', ...rest }, ref) {
  return <div ref={ref} {...rest} className={`swap-card ${className}`.trim()} />
})

export default SwapCard
