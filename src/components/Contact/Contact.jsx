import { useReveal } from '../../hooks/useReveal'
import { socials } from '../../data/socials'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contato" className="section section--bg" aria-labelledby="contact-heading">
      <div className="container reveal" ref={ref}>
        <p className={styles.sectionLabel}>// 04 — contato</p>
        <h2 id="contact-heading" className={styles.sectionTitle}>Bora conversar?</h2>

        <div className={styles.grid}>
          {/* Social links */}
          <div>
            <p className={styles.intro}>
              Aberto a freelas, oportunidades, colaborações e projetos com propósito.
              Se quiser trocar uma ideia, é só chamar!
            </p>

            <nav aria-label="Redes sociais e contatos">
              <ul className={styles.socialList}>
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                      aria-label={s.ariaLabel}
                    >
                      <span className={styles.socialIcon} aria-hidden="true">{s.icon}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.escoladeskatedobob.org.br/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                    aria-label="Ver site do projeto Escolinha de Skate do Bob"
                  >
                    <span className={styles.socialIcon} aria-hidden="true">🛹</span>
                    Projeto — Escolinha de Skate do Bob
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* CTA card */}
          <aside className={styles.ctaCard} aria-label="Trabalhe comigo">
            <h3 className={styles.ctaTitle}>Trabalhe comigo</h3>
            <p className={styles.ctaText}>
              Técnico de TI e desenvolvedor freelance disponível para projetos web,
              sistemas, banco de dados e redes. Baseado em Rondonópolis&nbsp;-&nbsp;MT,
              atendo remotamente também.
            </p>
            <div className={styles.ctaBtns}>
              <a
                href="https://github.com/NSIX06"
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
                aria-label="Ver GitHub"
              >
                🐙 GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/felipe-bugalho-089083269/"
                target="_blank"
                rel="noreferrer"
                className={styles.btnGhost}
                aria-label="Ver LinkedIn"
              >
                💼 LinkedIn
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
