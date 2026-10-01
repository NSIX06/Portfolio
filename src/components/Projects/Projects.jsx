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
    {/* Abertura dos projetos: o logo do projeto em destaque cresce até ocupar a tela */}
    <ScrollExpand
      className="projects-intro"
      src="/projetos/tmg-caronas-logo.webp"
      alt="Logo do TMG Caronas"
      title="Projetos"
      scrollHint="Role para abrir"
      mediaFit="contain"
      mediaBackground="#012b5b"
      startWidth={narrow ? 70 : 40}
      startHeight={narrow ? 42 : 52}
      mediaZoom={1.1}
      endScale={narrow ? 0.55 : 0.62}
      endShiftY={narrow ? -18 : -12}
      overlayScrim={0.7}
      scrollDistance={0.8}
      holdDistance={0.2}
    >
      <div className={`container ${styles.introOverlay}`}>
        <p className={styles.sectionLabel}>// em destaque</p>
        <p className={styles.introTitle}>TMG Caronas</p>
        <p className={styles.introText}>
          Sistema corporativo de caronas entre colaboradores, em produção na TMG desde setembro de 2026.
        </p>
        <a href="#projetos" className={styles.ctaBtn}>
          Ver projetos ↓
        </a>
      </div>
    </ScrollExpand>
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
