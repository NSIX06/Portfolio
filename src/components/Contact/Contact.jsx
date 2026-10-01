import { lazy, Suspense } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { contact, contactById, availability, activeAvailability, currentExperience } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Icon from '../icons/Icon'
import DotField from '../effects/DotField'
import ui from '../ui/ui.module.css'
import styles from './Contact.module.css'

const LetterGlitch = lazy(() => import('../effects/LetterGlitch'))
const GLITCH_COLORS = ['#2a0c0c', '#e11d1d', '#4a3c0c']

/** Contato + disponibilidade numa seção só: quem está pronto para falar encontra tudo aqui. */
export default function Contact() {
  const ref = useReveal()
  const email = contactById.email
  const linkedin = contactById.linkedin
  const role = currentExperience?.roles[0]?.title

  return (
    <section id="contato" className={`section section--surface ${styles.section}`} aria-labelledby="contact-heading">
      <DotField gradientFrom="rgba(225, 29, 29, 0.28)" gradientTo="rgba(255, 209, 0, 0.12)" />
      <div className={`container reveal ${styles.inner}`} ref={ref}>
        <SectionHeader section="contato" label="contato" title="Bora conversar?" id="contact-heading" lead={contact.intro} />

        <div className={styles.grid}>
          {/* Cartão principal: chamada + ações, com fundo LetterGlitch */}
          <aside className={`${styles.ctaCard} cursor-target`} aria-labelledby="contact-cta-title">
            <div className={styles.ctaBg} aria-hidden="true">
              <Suspense fallback={null}>
                <LetterGlitch glitchColors={GLITCH_COLORS} backgroundColor="#120707" glitchSpeed={80} />
              </Suspense>
            </div>
            <div className={styles.ctaContent}>
              <h3 id="contact-cta-title" className={styles.ctaTitle}>
                {availability.headline}
              </h3>
              <p className={styles.ctaText}>{availability.description}</p>
              <div className={styles.ctaBtns}>
                <a href={email.href} className={ui.btnPrimary}>
                  <Icon name="email" size={16} />
                  Enviar e-mail
                </a>
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className={ui.btnGhost}
                  aria-label={`${linkedin.ariaLabel} (abre em nova aba)`}
                >
                  <Icon name="linkedin" size={16} />
                  LinkedIn
                </a>
              </div>
              <ul className={styles.socialRow} aria-label="Outros contatos">
                {contact.links
                  .filter((l) => l.id !== 'linkedin')
                  .map((l) => (
                    <li key={l.id}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className={styles.socialLink}
                        aria-label={l.external ? `${l.ariaLabel} (abre em nova aba)` : l.ariaLabel}
                      >
                        <Icon name={l.icon} size={16} />
                        <span>{l.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* Disponibilidade */}
          <div id="disponibilidade" className={styles.availability} aria-labelledby="availability-heading">
            <h3 id="availability-heading" className={styles.blockTitle}>
              Disponibilidade
            </h3>
            <ul className={styles.statusList}>
              {activeAvailability.map((s) => (
                <li key={s.key} className={`${styles.status} ${styles[`status--${s.tone}`]}`}>
                  <span className={styles.statusEmoji} aria-hidden="true">
                    {s.emoji}
                  </span>
                  <span>
                    <span className={styles.statusLabel}>{s.label}</span>
                    <span className={styles.statusMessage}>{s.message}</span>
                  </span>
                </li>
              ))}
            </ul>
            {currentExperience && (
              <p className={styles.current}>
                <span className={styles.blockLabel}>Situação atual</span>
                {currentExperience.company}
                {role ? ` — ${role}` : ''}, desde {currentExperience.start}
              </p>
            )}

            <p className={styles.blockLabel}>Especialidades</p>
            <ul className={ui.tagList}>
              {availability.specialties.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>
            <p className={styles.blockLabel}>Tipo de oportunidade</p>
            <ul className={ui.tagList}>
              {availability.opportunityTypes.map((s) => (
                <li key={s} className={ui.tag}>
                  {s}
                </li>
              ))}
            </ul>
            <p className={styles.blockLabel}>Tecnologias de interesse</p>
            <ul className={ui.tagList}>
              {availability.interests.map((s) => (
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
