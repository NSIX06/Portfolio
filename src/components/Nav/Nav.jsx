import { useState, useEffect, useRef } from 'react'
import { sections, navSectionFor, sectionNumber, profile, activeAvailability } from '../../data'
import { useJourneyMode, loadJourney } from '../../journey/journeyContext'
import { useActiveSection, useScrollProgress } from '../../hooks/useScrollNav'
import styles from './Nav.module.css'

const NAV_LINKS = sections.filter((s) => s.inNav)
const ALL_IDS = sections.map((s) => s.id)
const DRAWER_LINKS = sections.filter((s) => s.inNav || s.id === 'contato')

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef(null)
  const drawerRef = useRef(null)
  const { open: openJourney } = useJourneyMode()
  const active = navSectionFor(useActiveSection(ALL_IDS))
  const { progress, scrolled } = useScrollProgress()

  // Menu mobile: foco no primeiro link ao abrir, Esc fecha e devolve o foco, sem rolagem do fundo.
  useEffect(() => {
    if (!menuOpen) return undefined
    drawerRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <nav className={styles.nav} aria-label="Navegação principal">
        <a href="#inicio" className={styles.logo} aria-label={`${profile.handle} — voltar ao início`}>
          {profile.handle}
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={active === id ? 'location' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.journeyBtn}
            onClick={openJourney}
            onPointerEnter={loadJourney}
            onFocus={loadJourney}
            aria-label="Explorar jornada interativa"
            title="Explorar jornada interativa"
          >
            <span aria-hidden="true">🗺️</span>
            <span className={styles.journeyText}>Jornada</span>
          </button>
          <a
            href="#contato"
            className={`${styles.contactBtn} ${active === 'contato' ? styles.contactBtnActive : ''}`}
            aria-current={active === 'contato' ? 'location' : undefined}
          >
            {activeAvailability[0] && <span className={styles.liveDot} aria-hidden="true" />}
            Contato
          </a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className={menuOpen ? `${styles.hamburger} ${styles.hamburgerOpen}` : styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Progresso de leitura */}
      <div className={styles.progress} aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      {menuOpen && (
        <div id="menu-mobile" ref={drawerRef} className={styles.drawer}>
          <ol className={styles.drawerList}>
            {DRAWER_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`${styles.drawerLink} ${active === id ? styles.drawerLinkActive : ''}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  <span className={styles.drawerNum}>{sectionNumber(id) || '★'}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className={styles.drawerJourney}
            onClick={() => {
              closeMenu()
              openJourney()
            }}
          >
            🗺️ Explorar a jornada interativa
          </button>
        </div>
      )}
    </header>
  )
}
