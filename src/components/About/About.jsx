import { useReveal } from '../../hooks/useReveal'
import styles from './About.module.css'

const STATS = [
  { num: '51',   label: 'Repositórios no GitHub' },
  { num: '+200', label: 'Alunos impactados pela ONG' },
  { num: 'Full', label: 'Stack Developer' },
  { num: 'MT',   label: 'Rondonópolis — Brasil' },
]

function StatCard({ num, label }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statNum}>{num}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

export default function About() {
  const ref = useReveal()

  return (
    <section className="section section--surface" aria-labelledby="about-heading">
      <div className="container reveal" ref={ref}>
        <p className={styles.sectionLabel}>// 01 — quem sou</p>
        <h2 id="about-heading" className={styles.sectionTitle}>Sobre mim</h2>

        <div className={styles.grid}>
          <div className={styles.textCol}>
            <p className={styles.p}>
              Oi! Sou{' '}
              <strong className={styles.highlight}>Luiz Felipe Pablos Bugalho</strong>, aka{' '}
              <strong className={styles.accentText}>NSIX06</strong> — técnico de TI,
              desenvolvedor web freelance baseado em Rondonópolis, MT.
            </p>
            <p className={styles.p}>
              Trabalho com{' '}
              <strong className={styles.highlight}>HTML, CSS, PHP, MySQL e SQL Server</strong> e
              estou sempre aprendendo como{' '}
              <strong className={styles.highlight}>Node.js, Vue, JavaScript e React</strong>.
              Gosto de construir tanto o front quanto o back-end.
            </p>
            <p className={styles.p}>
              Já entreguei projetos com impacto social real, como o site da{' '}
              <strong className={styles.highlight}>Escolinha de Skate do Bob</strong> — uma ONG
              que atende mais de 200 alunos por mês com aulas gratuitas de skate.
            </p>
            <p className={styles.quote}>"Patience is a virtue" 🤓</p>
            <a
              href="https://www.linkedin.com/in/felipe-bugalho-089083269/"
              target="_blank"
              rel="noreferrer"
              className={styles.linkedinBtn}
              aria-label="Ver perfil no LinkedIn"
            >
              💼 LinkedIn
            </a>
          </div>

          <div className={styles.statsGrid} aria-label="Estatísticas">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
