import { useReveal, useRevealAll } from '../../hooks/useReveal'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ScrollExpand from '../effects/ScrollExpand'
import styles from './Projects.module.css'

export default function Projects() {
  const titleRef = useReveal()
  const containerRef = useRevealAll({ stagger: 100 })

  const narrow = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)').matches

  return (
    <>
    {/* Abertura dos projetos: o logo do TMG Caronas cresce até ocupar a tela */}
    <ScrollExpand
      className="projects-intro"
      src="/projetos/tmg-caronas-logo.webp"
      alt="Logo do TMG Caronas"
      title="Projetos"
      scrollHint="Role para abrir"
      useWindowScroll
      startWidth={narrow ? 70 : 42}
      startHeight={narrow ? 40 : 58}
      mediaZoom={1.2}
      scrollDistance={0.9}
      holdDistance={0.2}
      overlayScrim={0.35}
    />
    <section
      id="projetos"
      className="section section--surface"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className="reveal" ref={titleRef}>
          <p className={styles.sectionLabel}>// 04 — trabalhos</p>
          <h2 id="projects-heading" className={styles.sectionTitle}>
            Projetos
          </h2>
        </div>

        <div className={styles.grid} ref={containerRef}>
          {projects.map((p) => (
            <div
              key={p.id}
              className={`reveal ${
                p.featured ? styles.featuredWrapper : ''
              }`}
            >
              <ProjectCard project={p} />
            </div>
          ))}

          <div className={`reveal ${styles.ctaWrapper}`}>
            <div className={styles.ctaCard}>
              <span aria-hidden="true" style={{ fontSize: '2rem' }}>
                📦
              </span>

              <h3 className={styles.ctaTitle}>Mais no GitHub</h3>

              <p className={styles.ctaDesc}>
                Veja todos os repositórios públicos.
              </p>

              <a
                href="https://github.com/NSIX06?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaBtn}
                aria-label="Ver todos os repositórios no GitHub"
              >
                Ver tudo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
