import { useState, useEffect, useRef } from 'react'
import { sections, profile } from '../../data'
import styles from './Nav.module.css'

const NAV_LINKS = sections.filter((s) => s.inNav)

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca o link da seção que ocupa o meio da tela.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Menu mobile: Esc fecha e devolve o foco ao botão; foco vai para o primeiro link ao abrir.
  useEffect(() => {
    if (!menuOpen) return
    drawerRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // A seção Metodologias fica dentro de Habilidades, e Disponibilidade junto de Contato.
  const navActive = active === 'metodologias' ? 'habilidades' : active === 'disponibilidade' ? 'contato' : active

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
                className={navActive === id ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={navActive === id ? 'location' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

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

      {menuOpen && (
        <div id="menu-mobile" ref={drawerRef} className={styles.drawer}>
          <ul>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
