import { useEffect, useRef, useState } from 'react'
import { services, projects } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import { prefersReducedMotion } from '../effects/motion'
import styles from './Services.module.css'

const projectTitle = (id) => projects.find((p) => p.id === id)?.title

/** Liga o modo "rolagem conduz a lista" só em telas largas e sem movimento reduzido. */
function useScrollDriven() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const update = () => setOn(mq.matches && !prefersReducedMotion())
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return on
}

/**
 * "O que faço": a seção fica presa na tela e cada serviço acende conforme a rolagem
 * (transição de serviços do Alejandro HA). Fora do modo de rolagem vira uma lista comum.
 * Todo o conteúdo fica no HTML, para leitores de tela e buscadores.
 */
export default function Services() {
  const sectionRef = useRef(null)
  const scrollDriven = useScrollDriven()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!scrollDriven) return undefined
    const el = sectionRef.current
    let raf = 0
    const read = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 0.999) : 0
      setActive(Math.floor(p * services.length))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrollDriven])

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className={`${styles.section} ${scrollDriven ? styles.driven : ''}`}
      style={scrollDriven ? { '--count': services.length } : undefined}
      aria-labelledby="services-heading"
    >
      <div className={styles.stage}>
        <div className="container">
          <SectionHeader section="servicos" label="o que faço" title="Da análise de requisitos à entrega." id="services-heading" />

          <ol className={styles.list}>
            {services.map((s, i) => {
              const isActive = !scrollDriven || i === active
              const title = s.projectId && projectTitle(s.projectId)
              return (
                <li key={s.id} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                  <h3 className={styles.name}>
                    <span className={styles.num} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.name}
                  </h3>
                  <div className={styles.detail}>
                    <p className={styles.desc}>{s.description}</p>
                    <ul className={styles.tech} aria-label="Tecnologias">
                      {s.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {title && (
                      <a href={`#projeto-${s.projectId}`} className={styles.projectLink} tabIndex={isActive ? 0 : -1}>
                        Ver projeto: {title} →
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {scrollDriven && (
            <div className={styles.progress} aria-hidden="true">
              {services.map((s, i) => (
                <span key={s.id} className={i === active ? styles.dotOn : styles.dot} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
