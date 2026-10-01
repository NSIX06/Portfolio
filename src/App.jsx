import { lazy, Suspense, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import MainLayout from './layouts/MainLayout'
import { JourneyModeProvider } from './journey/JourneyMode'
import { useJourneyMode, loadJourney } from './journey/journeyContext'
import { seo } from './data'
import { isTouchDevice, prefersReducedMotion } from './components/effects/motion'

// O cursor em mira só existe em desktop sem movimento reduzido; carrega à parte (usa gsap).
const TargetCursor = lazy(() => import('./components/effects/TargetCursor'))
const wantsCursor = typeof window !== 'undefined' && !isTouchDevice() && !prefersReducedMotion()

const Journey = lazy(loadJourney)

function JourneyLoader() {
  return (
    <div className="journey-loading" role="status">
      carregando a jornada...
    </div>
  )
}

function Shell() {
  const { isOpen, close } = useJourneyMode()
  const backgroundRef = useRef(null)

  // Com a jornada aberta, o portfólio continua no HTML (SEO), mas fica inerte e sem rolagem.
  useEffect(() => {
    const bg = backgroundRef.current
    if (!bg) return
    bg.inert = isOpen
    if (isOpen) bg.setAttribute('aria-hidden', 'true')
    else bg.removeAttribute('aria-hidden')
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  return (
    <>
      <div ref={backgroundRef}>
        <MainLayout />
      </div>
      {isOpen && (
        <Suspense fallback={<JourneyLoader />}>
          <Journey onExit={close} />
        </Suspense>
      )}
    </>
  )
}

export default function App() {
  return (
    <JourneyModeProvider>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.siteUrl} />
      </Helmet>
      <Shell />
      {wantsCursor && (
        <Suspense fallback={null}>
          <TargetCursor targetSelector='.cursor-target, a[class*="btn"], button[class*="btn"], [class*="filter"], [class*="socialLink"]' />
        </Suspense>
      )}
    </JourneyModeProvider>
  )
}
