import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { hasFinePointer } from './components/effects/motion'
import MainLayout from './layouts/MainLayout'

// Cursor em mira como cursor principal no computador (carrega à parte, usa gsap).
const TargetCursor = lazy(() => import('./components/effects/TargetCursor'))
const wantsCursor = hasFinePointer()
const CURSOR_TARGETS = [
  '.cursor-target',
  'a[class*="btn"]',
  'a[class*="Btn"]',
  'button[class*="Btn"]',
  '[class*="cardLink"]',
  '[class*="socialLink"]',
  '[class*="iconLink"]',
  '[class*="pill"]',
].join(', ')

export default function App() {
  return (
    <>
      <Helmet>
        <title>Luiz Felipe Bugalho | Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Portfólio de Luiz Felipe Pablos Bugalho (NSIX06) — Desenvolvedor Full Stack baseado em Rondonópolis - MT."
        />
      </Helmet>
      <MainLayout />
      {wantsCursor && (
        <Suspense fallback={null}>
          <TargetCursor targetSelector={CURSOR_TARGETS} />
        </Suspense>
      )}
    </>
  )
}
