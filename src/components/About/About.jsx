import { useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './About.module.css'

function useGitHubStats(username) {
  const [repos, setRepos] = useState(null)
  const [stars, setStars] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        const profile = await profileRes.json()
        setRepos(profile.public_repos)

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        const reposList = await reposRes.json()
        const totalStars = reposList.reduce((acc, r) => acc + r.stargazers_count, 0)
        setStars(totalStars)
      } catch (err) {
        console.error('GitHub API error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [username])

  return { repos, stars, loading }
}

function StatCard({ num, label, loading }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statNum}>
        {loading ? <span className={styles.skeleton} aria-hidden="true" /> : num}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

export default function About() {
  const ref = useReveal()
  const { repos, stars, loading } = useGitHubStats('NSIX06')

  const STATS = [
    { label: 'Repositórios no GitHub', num: loading ? null : repos, loading },
    { label: 'Estrelas no GitHub', num: loading ? null : `★ ${stars}`, loading },
    { label: 'Stack Developer', num: 'Full', loading: false },
    { label: 'Rondonópolis — Brasil', num: 'MT', loading: false },
  ]

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
              <strong className={styles.accentText}>NSIX06</strong> — técnico de TI e 
              desenvolvedor Full Stack.
            </p>
            <p className={styles.p}>
              Trabalho com{' '}
              <strong className={styles.highlight}>HTML, CSS, PHP, MySQL e SQL Server</strong> e
              estou sempre aprendendo com{' '}
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