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
              <strong className={styles.accentText}>NSIX06</strong> — desenvolvedor Full Stack e
              técnico em informática, graduando em{' '}
              <strong className={styles.highlight}>Análise e Desenvolvimento de Sistemas</strong> na UniSENAI MT.
            </p>
            <p className={styles.p}>
              Minha experiência combina desenvolvimento de software com conhecimento de processos
              corporativos: fui usuário-chave do{' '}
              <strong className={styles.highlight}>TOTVS Protheus</strong> no Planejamento e Controle de
              Manutenção (PCM) da TMG, onde também criei ferramentas internas. Isso me ajuda a transformar
              necessidades operacionais em ferramentas digitais mais eficientes.
            </p>
            <p className={styles.p}>
              Já entreguei projetos em produção, como o{' '}
              <strong className={styles.highlight}>TMG Caronas</strong>, sistema corporativo de caronas
              entre colaboradores, e o site da{' '}
              <strong className={styles.highlight}>Escolinha de Skate do Bob</strong> — uma ONG que atende
              mais de 200 alunos por mês com aulas gratuitas de skate.
            </p>
            <p className={styles.p}>
              Busco constantemente aprimorar meus conhecimentos em desenvolvimento web, backend, bancos de
              dados, cloud, automação e Inteligência Artificial.
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