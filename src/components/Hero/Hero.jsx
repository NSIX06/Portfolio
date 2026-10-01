import { profile, projects, certificates, currentExperience, contactById } from '../../data'
import Icon from '../icons/Icon'
import DotField from '../effects/DotField'
import TextType from '../effects/TextType'
import SplitReveal from '../motion/SplitReveal'
import Marquee from '../motion/Marquee'
import { useJourneyMode, loadJourney } from '../../journey/journeyContext'
import AvailabilityBadge from '../ui/AvailabilityBadge'
import ui from '../ui/ui.module.css'
import styles from './Hero.module.css'

/** Números reais, calculados dos dados (nada fixo no texto). */
function heroFacts() {
  const launched = projects.filter((p) => p.status === 'producao').length
  const done = certificates.filter((c) => c.status === 'concluido').length
  const role = currentExperience?.roles[0]?.title
  return [
    `${launched} sistemas lançados`,
    `${projects.length} projetos`,
    `${done} certificados`,
    `${profile.languages.length} idiomas`,
    profile.location,
    ...(role ? [`Atualmente: ${role}`] : []),
  ]
}

/** Hero no padrão do Marcus Lorenzet: saudação, proposta e faixa de números. */
export default function Hero() {
  const github = contactById.github
  const { open } = useJourneyMode()
  const firstName = profile.shortName.split(' ')[0]

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-name">
      <DotField />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <p className={`${styles.tag} hero-enter-1`}>
          <span aria-hidden="true">[ </span>
          <TextType
            as="span"
            text={profile.roles}
            typingSpeed={60}
            deletingSpeed={30}
            pauseDuration={2200}
            initialDelay={600}
            cursorCharacter="_"
            srText={profile.roles.join(', ')}
          />
          <span aria-hidden="true"> ]</span>
        </p>

        <SplitReveal as="h1" id="hero-name" className={styles.greeting} text={profile.greeting} accent={[firstName]} />
        <SplitReveal className={styles.statement} text={profile.statement} delay={250} step={22} />

        <AvailabilityBadge className={`${styles.availability} hero-enter-4`} />

        <div className={`${styles.actions} hero-enter-4`}>
          <a href="#projetos" className={ui.btnPrimary}>
            Ver projetos ↓
          </a>
          <a href="#contato" className={ui.btnGhost}>
            Falar comigo
          </a>
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

        <button
          type="button"
          className={`${styles.journeyLink} hero-enter-5`}
          onClick={open}
          onPointerEnter={loadJourney}
          onFocus={loadJourney}
        >
          <span aria-hidden="true">🗺️</span> Prefere explorar? <strong>Abra a jornada interativa →</strong>
        </button>
      </div>

      <div className={`${styles.facts} hero-enter-6`}>
        <Marquee items={heroFacts()} speed={38} label="Em números" />
      </div>

      <p className={`${styles.scrollHint} hero-enter-6`} aria-hidden="true">
        Scroll
      </p>
    </section>
  )
}
