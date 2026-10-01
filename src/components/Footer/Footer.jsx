import { contact, profile, sections } from '../../data'
import Icon from '../icons/Icon'
import PulseHeart from '../effects/PulseHeart'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>{profile.handle}</span>
          <p className={styles.tagline}>
            {profile.title} · {profile.location}
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className={styles.footerLinks}>
            {sections
              .filter((s) => s.inNav)
              .map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
          </ul>
        </nav>

        <ul className={styles.socialIcons} aria-label="Contatos">
          {contact.links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className={styles.iconLink}
                aria-label={l.ariaLabel}
                title={l.label}
              >
                <Icon name={l.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <PulseHeart />
        <p className={styles.copy}>
          © {year} <span className={styles.copyAccent}>{profile.fullName}</span> — {profile.handle}
        </p>
      </div>
    </footer>
  )
}
