import profileImg from '../../assets/images/profile.png'
import { profile, currentExperience, contactById } from '../../data'
import Icon from '../icons/Icon'
import { useJourneyMode, loadJourney } from '../../journey/journeyContext'
import AvailabilityBadge from '../ui/AvailabilityBadge'
import ui from '../ui/ui.module.css'
import styles from './Hero.module.css'

export default function Hero() {
  const [first, ...rest] = profile.fullName.split(' ')
  const last = rest.pop()
  const middle = rest.map((n, i) => (i === 0 ? n : `${n[0]}.`)).join(' ')
  const github = contactById.github
  const currentRole = currentExperience?.roles[0]?.title
  const { open } = useJourneyMode()

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <div className={styles.textCol}>
          <p className={`${styles.tag} hero-enter-1`}>• {profile.roles.join(' · ')}</p>

          <h1 id="hero-name" className={`${styles.name} hero-enter-2`}>
            {first} <br />
            {middle} <br />
            <span className={styles.nameAccent}>{last}</span>
          </h1>

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
            <button
              type="button"
              className={ui.btnPrimary}
              onClick={open}
              onPointerEnter={loadJourney}
              onFocus={loadJourney}
            >
              🗺️ Explorar jornada
            </button>
            <a href="#projetos" className={ui.btnGhost}>
              Ver projetos ↓
            </a>
            <a href="#contato" className={ui.btnGhost}>
              Entrar em contato
            </a>
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className={ui.btnGhost}
              aria-label={`${github.ariaLabel} (abre em nova aba)`}
            >
              <Icon name="github" size={16} />
              GitHub
            </a>
          </div>

          <ul className={`${styles.badges} hero-enter-5`} aria-label="Localização">
            <li className={styles.badge}>📍 {profile.location}</li>
            <li className={styles.badge}>🎓 Graduando em ADS — UniSENAI MT</li>
          </ul>
        </div>

        <div className={`${styles.photoCol} hero-enter-3`}>
          <div className={styles.photoFrame}>
            <img
              src={profileImg}
              alt={`Foto de ${profile.fullName}`}
              className={styles.photoImg}
              width="280"
              height="320"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <p className={`${styles.scrollHint} hero-enter-6`} aria-hidden="true">
        Scroll para explorar
      </p>
    </section>
  )
}
