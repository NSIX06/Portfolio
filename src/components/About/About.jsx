import { useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { profile, contactById } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Icon from '../icons/Icon'
import ui from '../ui/ui.module.css'
import styles from './About.module.css'

/** Busca repositórios e estrelas públicas. Em erro, os cartões simplesmente não aparecem. */
function useGitHubStats(username) {
  const [state, setState] = useState({ repos: null, stars: null, loading: true, error: false })

  useEffect(() => {
    const controller = new AbortController()
    async function fetchStats() {
      try {
        const opts = { signal: controller.signal }
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, opts),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, opts),
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API indisponível')
        const user = await profileRes.json()
        const repos = await reposRes.json()
        const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
        setState({ repos: user.public_repos, stars, loading: false, error: false })
      } catch (err) {
        if (err.name !== 'AbortError') setState({ repos: null, stars: null, loading: false, error: true })
      }
    }
    fetchStats()
    return () => controller.abort()
  }, [username])

  return state
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
  const { repos, stars, loading, error } = useGitHubStats(profile.stats.github)
  const linkedin = contactById.linkedin

  const stats = [
    ...(error
      ? []
      : [
          { label: 'Repositórios no GitHub', num: repos, loading },
          { label: 'Estrelas no GitHub', num: `★ ${stars ?? ''}`, loading },
        ]),
    ...profile.highlights.map((h) => ({ label: h.label, num: h.value, loading: false })),
  ]

  return (
    <section id="sobre" className="section section--surface" aria-labelledby="about-heading">
      <div className="container reveal" ref={ref}>
        <SectionHeader section="sobre" label="quem sou" title="Sobre mim" id="about-heading" />

        <div className={styles.grid}>
          <div className={styles.textCol}>
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)} className={styles.p}>
                {p}
              </p>
            ))}

            <p className={styles.subLabel}>Idiomas</p>
            <ul className={ui.tagList}>
              {profile.languages.map((l) => (
                <li key={l.language} className={ui.tag} title={l.note}>
                  {l.language} · {l.level}
                </li>
              ))}
            </ul>

            <a
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
              className={`${ui.btnGhost} ${styles.linkedinBtn}`}
              aria-label={`${linkedin.ariaLabel} (abre em nova aba)`}
            >
              <Icon name="linkedin" size={16} />
              LinkedIn
            </a>
          </div>

          <div>
            <div className={styles.statsGrid} aria-label="Números">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <p className={styles.subLabel}>Competências comportamentais</p>
            <ul className={ui.tagList}>
              {profile.softSkills.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
