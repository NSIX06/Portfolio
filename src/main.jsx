import { lazy, Suspense } from 'react'
import Nav from '../components/Nav/Nav'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'

const About      = lazy(() => import('../components/About/About'))
const Experience = lazy(() => import('../components/Experience/Experience'))
const Skills     = lazy(() => import('../components/Skills/Skills'))
const Projects   = lazy(() => import('../components/Projects/Projects'))
const Contact    = lazy(() => import('../components/Contact/Contact'))

const SectionLoader = () => (
  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '.75rem', letterSpacing: '.2em' }}>
      carregando...
    </span>
  </div>
)

export default function MainLayout() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
