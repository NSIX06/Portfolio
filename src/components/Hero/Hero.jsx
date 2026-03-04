import { useState, useRef } from 'react'
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
  const [photo, setPhoto]   = useState(profileImg)
  const [drag, setDrag]     = useState(false)
  const fileRef             = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setPhoto(url)
  }

  return (
    <section id="sobre" className={styles.hero} aria-label="Apresentação">
      {/* Grid background */}
      <div className={styles.gridBg} aria-hidden="true" />
      {/* Glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        {/* ── TEXT ── */}
        <div className={styles.textCol}>
          <p className={`${styles.tag} hero-enter-1`}>
            • IT Technician · Web Developer · Freelancer
          </p>

          <h1 className={`${styles.name} hero-enter-2`}>
            Luiz<br />
            Felipe P.<br />
            <span className={styles.nameAccent}>Bugalho</span>
          </h1>

          <p className={`${styles.sub} hero-enter-3`}>
            Desenvolvedor fullstack apaixonado por tecnologia. HTML, CSS, JS,
            PHP, C#, Python e muito mais. Transformando ideias em código desde
            Rondonópolis&nbsp;—&nbsp;MT.
          </p>

          <div className={`${styles.ctas} hero-enter-4`}>
            <a
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

        {/* ── PHOTO ── */}
        <div className={`${styles.photoCol} hero-enter-3`}>
          <div
            className={`${styles.photoFrame} ${drag ? styles.photoFrameDrag : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Clique para trocar a foto de perfil"
            onClick={() => fileRef.current.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }}
          >
            {photo ? (
              <>
                <img
                  src={photo}
                  alt="Foto de perfil de Luiz Felipe Bugalho"
                  className={styles.photoImg}
                  loading="eager"
                />
                <button
                  className={styles.photoRemove}
                  onClick={(e) => { e.stopPropagation(); setPhoto(null) }}
                  aria-label="Remover foto de perfil"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className={styles.photoPlaceholder}>
                <span aria-hidden="true" style={{ fontSize: '3rem' }}>📷</span>
                <p className={styles.placeholderTitle}>Adicione sua foto</p>
                <p className={styles.placeholderSub}>Clique ou arraste aqui</p>
                <span className={styles.uploadBtn}>Escolher arquivo</span>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            aria-hidden="true"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <p className={styles.photoHint}>
            {photo ? 'Clique na foto para trocar' : 'PNG, JPG ou WEBP'}
          </p>
        </div>
      </div>

      <p className={`${styles.scrollHint} hero-enter-6`} aria-hidden="true">
        Scroll para explorar
      </p>
    </section>
  )
}
