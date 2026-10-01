/* DecryptReveal — canvas-ui (registry @canvas-ui/decrypt-reveal-react), adaptado para JSX.
 * Mostra o conteúdo como texto cifrado em ASCII que se decifra em volta do cursor.
 * Depende de HTML-in-canvas (drawElementImage), ainda experimental nos navegadores:
 * sem suporte, os filhos aparecem normalmente e o motor WebGL nem é baixado. */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

function supportsHtmlInCanvas() {
  if (typeof document === 'undefined') return false
  const probe = document.createElement('canvas')
  const ctx = probe.getContext('2d')
  return Boolean(ctx && typeof ctx.drawElementImage === 'function' && typeof probe.requestPaint === 'function')
}

const fill = { position: 'relative', width: '100%', height: '100%', overflow: 'auto' }

export default function DecryptReveal({ children, className, style, ...options }) {
  const sourceRef = useRef(null)
  const contentRef = useRef(null)
  const outputRef = useRef(null)
  const instanceRef = useRef(null)
  const [initialOptions] = useState(options)
  const [failed, setFailed] = useState(false)

  const supported = useSyncExternalStore(emptySubscribe, supportsHtmlInCanvas, () => false)
  const native = supported && !failed

  useEffect(() => {
    if (!native) return undefined
    let cancelled = false
    import('./decryptRevealEngine').then(({ createDecryptReveal }) => {
      const source = sourceRef.current
      const content = contentRef.current
      const output = outputRef.current
      if (cancelled || !source || !content || !output) return
      instanceRef.current = createDecryptReveal({ source, content, output }, initialOptions)
      if (!instanceRef.current) setFailed(true)
    })
    return () => {
      cancelled = true
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [initialOptions, native])

  useEffect(() => {
    instanceRef.current?.setOptions(options)
  })

  if (!native) {
    return (
      <div className={className} style={{ position: 'relative', ...style }}>
        <div ref={contentRef} style={fill}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <canvas
        ref={sourceRef}
        // eslint-disable-next-line react/no-unknown-property -- atributo experimental do HTML-in-canvas
        layoutsubtree="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <div ref={contentRef} style={fill}>
          {children}
        </div>
      </canvas>
      <canvas
        ref={outputRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  )
}
