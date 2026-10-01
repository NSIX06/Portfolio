import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile, sections, contact } from '../../data'
import Icon from '../icons/Icon'
import PulseHeart from '../effects/PulseHeart'
import { prefersReducedMotion } from '../effects/motion'
import styles from './Footer.module.css'

const ShapeWaves = lazy(() => import('../effects/ShapeWaves'))

/** Faixa animada com o handle recortado. Só carrega perto da tela e se houver WebGPU.
 *  O texto vazado fica sempre por baixo; a animação só aparece quando está desenhando
 *  (data-ready), então sem suporte ou com erro a faixa nunca fica vazia. */
function WavesBand() {
  const ref = useRef(null)
  const [near, setNear] = useState(false)
  const [failed, setFailed] = useState(() => typeof navigator === 'undefined' || !('gpu' in navigator))

  useEffect(() => {
    if (failed || !ref.current || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin: '400px',
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [failed])

  const showCanvas = near && !failed

  return (
    <div ref={ref} className={styles.band} aria-hidden="true">
      <span className={styles.bandText}>{profile.handle}</span>
      {showCanvas && (
        <div className={styles.wavesLayer}>
          <Suspense fallback={null}>
            <ShapeWaves
              text={profile.handle}
              fontFamily="Syne, sans-serif"
              fontWeight={800}
              textSize={0.62}
              shapes="mixed"
              cellSize={9}
              dotSize={0.7}
              color="#5a1414"
              hoverColor="#ffd100"
              backgroundColor="#0a0a0a"
              speed={0.6}
              brightness={0.4}
              fade={0.3}
              glow={0.35}
              intro={!prefersReducedMotion()}
              onError={() => setFailed(true)}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
}

const navLinks = [...sections.filter((s) => s.inNav), sections.find((s) => s.id === 'contato')]
const socials = contact.links.filter((l) => l.external)

/** Rodapé em colunas (padrão Marcus Lorenzet): navegação, redes e e-mail. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.cols}`}>
        <nav aria-label="Rodapé">
          <p className={styles.colLabel}>[ navegação ]</p>
          <ul className={styles.colList}>
            {navLinks.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={styles.colLabel}>[ redes ]</p>
          <ul className={styles.colList}>
            {socials.map((l) => (
              <li key={l.id}>
                <a href={l.href} target="_blank" rel="noreferrer" aria-label={`${l.ariaLabel} (abre em nova aba)`}>
                  <Icon name={l.icon} size={14} /> {l.id === 'linkedin' ? 'LinkedIn' : l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.colLabel}>[ e-mail ]</p>
          <a href={`mailto:${contact.email}`} className={styles.mail}>
            {contact.email}
          </a>
        </div>
      </div>

      <WavesBand />

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
