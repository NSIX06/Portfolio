import { useEffect } from 'react'
import Nav from '../components/Nav/Nav'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Experience from '../components/Experience/Experience'
import Education from '../components/Education/Education'
import Skills from '../components/Skills/Skills'
import Projects from '../components/Projects/Projects'
import Certificates from '../components/Certificates/Certificates'
import Availability from '../components/Availability/Availability'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

/**
 * Portfólio tradicional. As seções são carregadas juntas (sem lazy) para que
 * âncoras, menu e indexação funcionem desde o primeiro carregamento.
 * A jornada interativa (Fase 3) será a parte carregada sob demanda.
 */
export default function MainLayout() {
  // O conteúdo é renderizado no cliente: o navegador não acha a âncora da URL no
  // carregamento inicial, então rolamos até ela depois da primeira renderização.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
        <Availability />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
