import { lazy, Suspense } from 'react'
import profileImg from '../../assets/images/profile.png'
import { profile, currentExperience, contactById, activeAvailability } from '../../data'
import Icon from '../icons/Icon'
import DotField from '../effects/DotField'
import ProfileCard from '../effects/ProfileCard'
import { useJourneyMode, loadJourney } from '../../journey/journeyContext'
import AvailabilityBadge from '../ui/AvailabilityBadge'
import ui from '../ui/ui.module.css'
import styles from './Hero.module.css'

const TechText = lazy(() => import('../effects/TechText'))

/** Uma linha do nome: texto comum até o TechText carregar (e para leitores de tela). */
function NameLine({ text, accent = false, sweep = false }) {
  const plain = <span className={`${styles.nameLine} ${accent ? styles.nameAccent : ''}`}>{text}</span>
  return (
    <span className={styles.nameRow} aria-hidden="true">
      <Suspense fallback={plain}>
        <TechText
          text={text}
          fontFamily="Syne, sans-serif"
          fontSize={200}
          letterSpacing={-0.03}
          color={accent ? '#e11d1d' : '#f0ede8'}
          accentColor={accent ? '#ffd100' : '#e11d1d'}
          sweep={sweep}
          specks={10}
          align="left"
          className={styles.techLine}
        />
      </Suspense>
    </span>
  )
}

export default function Hero() {
  const [first, ...rest] = profile.fullName.split(' ')
  const last = rest.pop()
  const middle = rest.map((n, i) => (i === 0 ? n : `${n[0]}.`)).join(' ')

  const github = contactById.github
  const currentRole = currentExperience?.roles[0]?.title
  const { open } = useJourneyMode()

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-name">
      <DotField />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <div className={styles.textCol}>
          <p className={`${styles.tag} hero-enter-1`}>• {profile.roles.join(' · ')}</p>

          <h1 id="hero-name" className={`${styles.name} hero-enter-2`}>
            <span className={styles.srOnly}>{profile.fullName}</span>
            <NameLine text={first} />
            <NameLine text={middle} />
            <NameLine text={last} accent sweep />
          </h1>
          <p className={`${styles.dragHint} hero-enter-3`} aria-hidden="true">
            ↖ passe o mouse ou arraste as letras
          </p>

          <p className={`${styles.sub} hero-enter-3`}>{profile.tagline}</p>

          {currentExperience && (
            <p className={`${styles.current} hero-enter-3`}>
              <span className={styles.currentLabel}>Atualmente</span>
              {currentExperience.company}
              {currentRole ? ` — ${currentRole}` : ''}
            </p>
          )}

          <AvailabilityBadge className={`${styles.availability} hero-enter-4`} />

          <div className={`${styles.ctas} hero-enter-4`}>
            <a href="#projetos" className={ui.btnPrimary}>
              Ver projetos ↓
            </a>
            <a href="#contato" className={ui.btnGhost}>
              Falar comigo
            </a>
          </div>

          <div className={`${styles.secondary} hero-enter-5`}>
            <button
              type="button"
              className={styles.journeyLink}
              onClick={open}
              onPointerEnter={loadJourney}
              onFocus={loadJourney}
            >
              <span aria-hidden="true">🗺️</span> Prefere explorar? <strong>Abra a jornada interativa →</strong>
            </button>
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className={styles.iconLink}
              aria-label={`${github.ariaLabel} (abre em nova aba)`}
            >
              <Icon name="github" size={18} />
            </a>
          </div>

          <ul className={`${styles.badges} hero-enter-5`} aria-label="Localização">
            <li className={styles.badge}>📍 {profile.location}</li>
            <li className={styles.badge}>🎓 Graduando em ADS — UniSENAI MT</li>
          </ul>
        </div>

        <div className={`${styles.photoCol} hero-enter-3`}>
          <ProfileCard
            avatarUrl={profileImg}
            name={profile.shortName}
            title={profile.title}
            handle={profile.handle}
            status={activeAvailability[0]?.label ?? profile.location}
          />
        </div>
      </div>

      <p className={`${styles.scrollHint} hero-enter-6`} aria-hidden="true">
        Scroll para explorar
      </p>
    </section>
  )
}
