import profileImg from '../../assets/images/profile.png'
import styles from './Hero.module.css'

const BADGES = [
  '🌐 Web Dev',
  '🗄️ SQL Server · MySQL',
  '🔌 Redes',
  '💻 Freelancer',
  '📍 Rondonópolis - MT',
]

export default function Hero() {
  return (
    <section id="sobre" className={styles.hero} aria-label="Apresentação">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <div className={styles.textCol}>
          
          <p className={`${styles.tag} hero-enter-1`}>
            • TÉCNICO EM INFORMÁTICA · DESENVOLVEDOR FULL STACK · Freelancer
          </p>

          <h1 className={`${styles.name} hero-enter-2`}>
            Luiz <br />
            Felipe P. <br />
            <span className={styles.nameAccent}>Bugalho</span>
          </h1>

          <p className={`${styles.sub} hero-enter-3`}>
            Desenvolvedor fullstack apaixonado por tecnologia. HTML, CSS, JS,
            PHP, C#, Python e muito mais. Transformando ideias em código desde
            2022.
          </p>

         <div className={`${styles.ctas} hero-enter-4`}>
  <a
    href="https://github.com/NSIX06"
    target="_blank"
    rel="noreferrer"
    className={styles.btnPrimary}
    aria-label="Ver GitHub de Luiz Felipe Bugalho"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '.4rem' }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
    GitHub
  </a>

  <a href="#projetos" className={styles.btnGhost}>
    Ver Projetos ↓
  </a>
</div>

          <ul
            className={`${styles.badges} hero-enter-5`}
            aria-label="Áreas de atuação"
          >
            {BADGES.map((b) => (
              <li key={b} className={styles.badge}>
                {b}
              </li>
            ))}
          </ul>

        </div>

        <div className={`${styles.photoCol} hero-enter-3`}>
          <div className={styles.photoFrame}>
            <img
              src={profileImg}
              alt="Foto de perfil de Luiz Felipe Bugalho"
              className={styles.photoImg}
              loading="eager"
            />
          </div>
        </div>
      </div>

      <p
        className={`${styles.scrollHint} hero-enter-6`}
        aria-hidden="true"
      >
        Scroll para explorar
      </p>

    </section>
  )
}
