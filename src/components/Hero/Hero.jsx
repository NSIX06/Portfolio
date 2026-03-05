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
            • IT Technician · Web Developer · Freelancer
          </p>
          <h1 className={`${styles.name} hero-enter-2`}>
            Luiz<br />
            Felipe<br />
            <span className={styles.nameAccent}>Bugalho</span>
          </h1>
          <p className={`${styles.sub} hero-enter-3`}>
            Desenvolvedor fullstack apaixonado por tecnologia. HTML, CSS, JS,
            PHP, C#, Python e muito mais. Transformando ideias em código desde
            Rondonópolis&nbsp;—&nbsp;MT.
          </p>
          <div className={`${styles.ctas} hero-enter-4`}>
            
              href="https://github.com/NSIX06"
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
              aria-label="Ver GitHub de Luiz Felipe Bugalho"
            >
              🐙 GitHub
            </a>
            <a href="#projetos" className={styles.btnGhost}>
              Ver Projetos ↓
            </a>
          </div>
          <ul className={`${styles.badges} hero-enter-5`} aria-label="Áreas de atuação">
            {BADGES.map((b) => (
              <li key={b} className={styles.badge}>{b}</li>
            ))}
          </ul>
        </div>

        {/* FOTO TRAVADA */}
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

      <p className={`${styles.scrollHint} hero-enter-6`} aria-hidden="true">
        Scroll para explorar
      </p>
    </section>
  )
}
