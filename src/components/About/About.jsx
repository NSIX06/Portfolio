import { useState, useEffect, useRef } from 'react'
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

/** Conta de 0 até o valor quando o número aparece na tela. */
function CountUp({ value, prefix = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setShown(value)
      return undefined
    }
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const k = Math.min((t - start) / 1200, 1)
        setShown(Math.round(value * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])
  return (
    <span ref={ref}>
      {prefix}
      {shown}
    </span>
  )
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
    { label: 'Repositórios no GitHub', num: loading ? null : <CountUp value={repos ?? 0} />, loading },
    { label: 'Estrelas no GitHub', num: loading ? null : <CountUp value={stars ?? 0} prefix="★ " />, loading },
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
            {STATS.map((s, i) => (
              <div key={s.label} className="stagger" style={{ '--i': i }}>
                <StatCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}