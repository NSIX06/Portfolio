import { useReveal } from '../../hooks/useReveal'
import { contact, contactById, availability } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import AvailabilityBadge from '../ui/AvailabilityBadge'
import Icon from '../icons/Icon'
import ui from '../ui/ui.module.css'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useReveal()
  const email = contactById.email
  const linkedin = contactById.linkedin

  return (
    <section id="contato" className="section section--bg" aria-labelledby="contact-heading">
      <div className="container reveal" ref={ref}>
        <SectionHeader index="08" label="contato" title="Bora conversar?" id="contact-heading" />

        <div className={styles.grid}>
          <div>
            <p className={styles.intro}>{contact.intro}</p>

            <ul className={styles.socialList} aria-label="Contatos e redes sociais">
              {contact.links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={styles.socialLink}
                    aria-label={l.external ? `${l.ariaLabel} (abre em nova aba)` : l.ariaLabel}
                  >
                    <span className={styles.socialIcon}>
                      <Icon name={l.icon} />
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.ctaCard} aria-labelledby="contact-cta-title">
            <AvailabilityBadge className={styles.ctaBadges} />
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
          </aside>
        </div>
      </div>
    </section>
  )
}
