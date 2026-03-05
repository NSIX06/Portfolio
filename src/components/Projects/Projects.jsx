import { useRevealAll } from '../../hooks/useReveal'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

export default function Projects() {
  const containerRef = useRevealAll({ stagger: 100 })

  return (
    <section id="projetos" className="section section--surface" aria-labelledby="projects-heading">
      <div className="container">
        <div className="reveal">
          <p className={styles.sectionLabel}>// 04 — trabalhos</p>
          <h2 id="projects-heading" className={styles.sectionTitle}>Projetos</h2>
        </div>

        <div className={styles.grid} ref={containerRef}>
          {projects.map((p) => (
            <div key={p.id} className={`reveal ${p.featured ? styles.featuredWrapper : ''}`}>
              <ProjectCard project={p} />
            </div>
          ))}

          {/* CTA card */}
          <div className={`reveal ${styles.ctaWrapper}`}>
            <div className={styles.ctaCard}>
              <span aria-hidden="true" style={{ fontSize: '2rem' }}>📦</span>
              <h3 className={styles.ctaTitle}>+45 repositórios</h3>
              <p className={styles.ctaDesc}>Veja todos os projetos no GitHub.</p>
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
  )
}
