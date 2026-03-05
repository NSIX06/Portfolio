import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
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
