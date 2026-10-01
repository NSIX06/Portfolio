import { useReveal } from '../../hooks/useReveal'
import { contact, contactById, availability, activeAvailability, profile } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import Icon from '../icons/Icon'
import DotField from '../effects/DotField'
import ProfileCard from '../effects/ProfileCard'
import ScrollExpand from '../effects/ScrollExpand'
import DecryptReveal from '../effects/DecryptReveal'
import profileImg from '../../assets/images/profile.png'
import ui from '../ui/ui.module.css'
import styles from './Contact.module.css'

const DOT_COLORS = { gradientFrom: 'rgba(225, 29, 29, 0.75)', gradientTo: 'rgba(255, 209, 0, 0.4)', glowColor: '#3a0c0c' }

/** Contato: o DotField se abre até ocupar a tela (ScrollExpand) e revela a chamada,
 *  cifrada em ASCII com o DecryptReveal onde o navegador suporta. Abaixo, cartão de
 *  perfil e disponibilidade. */
export default function Contact() {
  const ref = useReveal()
  const email = contactById.email
  const linkedin = contactById.linkedin

  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-heading">
      <ScrollExpand
        media={<DotField {...DOT_COLORS} dotRadius={2.2} dotSpacing={16} sparkle />}
        mediaBackground="#0a0a0a"
        title="Contato"
        scrollHint="Role para abrir"
        startWidth={46}
        startHeight={52}
        startRadius={24}
        mediaZoom={1}
        overlayScrim={0.25}
        scrollDistance={0.7}
        holdDistance={0.25}
      >
        <div className={`container ${styles.opened}`}>
          <SectionHeader section="contato" label="contato" title="Contato" id="contact-heading" />
          <DecryptReveal
            className={styles.decrypt}
            background="#0a0a0a"
            color="#e11d1d"
            radius={260}
            cell={9}
            passthrough={0.1}
            scramble={0.08}
          >
            <div className={`${styles.cta} cursor-target`}>
              <h3 className={styles.ctaTitle}>{availability.headline}</h3>
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
                  .filter((l) => l.id !== 'linkedin' && l.id !== 'email')
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
          </DecryptReveal>
        </div>
      </ScrollExpand>

      <div className={`container reveal ${styles.inner}`} ref={ref}>
        <div className={styles.grid}>
          {/* Cartão de perfil: fecha a página com o rosto de quem atende */}
          <div className={styles.profileCol}>
            <ProfileCard
              avatarUrl={profileImg}
              name={profile.shortName}
              title={profile.title}
              handle={profile.handle}
              status={profile.location}
            />
          </div>

          {/* Disponibilidade, ao lado do cartão */}
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
          </div>
        </div>
      </div>
    </section>
  )
}
