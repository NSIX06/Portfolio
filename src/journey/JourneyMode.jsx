import { useCallback, useEffect, useMemo, useState } from 'react'
import { JourneyModeContext } from './journeyContext'

const PARAM = 'modo'
const VALUE = 'jornada'

const readMode = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get(PARAM) === VALUE

/**
 * Controla os dois modos do portfólio pela URL: `?modo=jornada` abre o mapa.
 * O link pode ser compartilhado e o botão Voltar do navegador fecha a jornada.
 */
export function JourneyModeProvider({ children }) {
  const [isOpen, setIsOpen] = useState(readMode)

  useEffect(() => {
    const onPop = () => setIsOpen(readMode())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const open = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM, VALUE)
    url.hash = ''
    window.history.pushState({}, '', url)
    setIsOpen(true)
  }, [])

  /** Fecha a jornada e leva o visitante à seção correspondente no portfólio tradicional. */
  const close = useCallback((sectionId) => {
    const url = new URL(window.location.href)
    url.searchParams.delete(PARAM)
    url.hash = sectionId ? `#${sectionId}` : ''
    window.history.pushState({}, '', url)
    setIsOpen(false)
    if (sectionId) {
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView())
    }
  }, [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <JourneyModeContext.Provider value={value}>{children}</JourneyModeContext.Provider>
}
