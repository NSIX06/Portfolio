import { profile } from '../../data'
import PulseHeart from '../effects/PulseHeart'
import styles from './Footer.module.css'

/** Rodapé enxuto: links e redes ficam no menu e na seção de Contato, logo acima. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bottom}`}>
        <span className={styles.logo}>{profile.handle}</span>
        <PulseHeart />
        <p className={styles.copy}>
          © {year} <span className={styles.copyAccent}>{profile.fullName}</span>
        </p>
      </div>
    </footer>
  )
}
