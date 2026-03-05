import { socials } from '../../data/socials.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>NSIX06</span>
          <p className={styles.tagline}>
            Transformando ideias em código desde 2022
          </p>
        </div>

        <nav aria-label="Links sociais no rodapé">
          <ul className={styles.socialIcons}>
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconLink}
                  aria-label={s.ariaLabel}
                  title={s.label}
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {year}{' '}
          <span className={styles.copyAccent}>Luiz Felipe Pablos Bugalho</span> — NSIX06
        </p>
      </div>
    </footer>
  )
}
