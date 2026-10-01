import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#formacao', label: 'Formação' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // As seções carregam sob demanda, então o item ativo é calculado na rolagem
  // (um observer registrado no início não encontraria as seções ainda).
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let current = ''
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <nav className={styles.nav} aria-label="Navegação principal">
        <a href="#sobre" className={styles.logo} aria-label="Voltar ao topo">
          NSIX06
        </a>

        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={
                  active === href.slice(1)
                    ? `${styles.link} ${styles.linkActive}`
                    : styles.link
                }
                aria-current={active === href.slice(1) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={
            menuOpen
              ? `${styles.hamburger} ${styles.hamburgerOpen}`
              : styles.hamburger
          }
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.drawer} role="dialog" aria-label="Menu mobile">
          <ul role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.drawerLink}
                  onClick={() => setMenuOpen(false)}
                >
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
