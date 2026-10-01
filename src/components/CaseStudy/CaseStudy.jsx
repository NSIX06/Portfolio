import { lazy, Suspense } from 'react'
import { caronasCase } from '../../data'
import { useReveal } from '../../hooks/useReveal'
import ScrollExpand from '../effects/ScrollExpand'
import Card from '../effects/SwapCard'
import ui from '../ui/ui.module.css'
import styles from './CaseStudy.module.css'

// Efeitos em canvas são pesados para o carregamento inicial: entram sob demanda.
const TechText = lazy(() => import('../effects/TechText'))
const LetterGlitch = lazy(() => import('../effects/LetterGlitch'))
const CardSwap = lazy(() => import('../effects/CardSwap'))

const BRAND_NAVY = '#012b5b'

/** Estudo de caso do TMG Caronas, lido de data/caseStudies.js. */
export default function CaseStudy() {
  const c = caronasCase
  const narrow = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)').matches
  const factsRef = useReveal()
  const capsRef = useReveal()
  const archRef = useReveal()
  const stackRef = useReveal()

  return (
    <section id={c.id} className={styles.section} aria-labelledby="case-heading">
      {/* Abertura: o logo cresce até ocupar a tela conforme a rolagem */}
      <ScrollExpand
        src="/projetos/tmg-caronas-capa.webp"
        alt="Logo do TMG Caronas"
        title="Estudo de caso"
        scrollHint="Role para abrir"
        mediaFit="contain"
        mediaBackground={BRAND_NAVY}
        startWidth={46}
        startHeight={54}
        mediaZoom={1.15}
        endScale={narrow ? 0.62 : 0.72}
        endShiftX={narrow ? 0 : 24}
        endShiftY={narrow ? -20 : 0}
        overlayScrim={narrow ? 0.85 : 0.45}
        scrollDistance={0.9}
        holdDistance={0.3}
      >
        <div className={`container ${styles.intro}`}>
          <p className={ui.sectionLabel}>{`// ${c.eyebrow}`}</p>
          <h2 id="case-heading" className={styles.introTitle}>
            {c.title}
          </h2>
          <p className={styles.introHeadline}>{c.headline}</p>
          <ul className={styles.badges}>
            {c.badges.map((b) => (
              <li key={b} className={styles.badge}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </ScrollExpand>

      <div className={styles.body}>
        <div className="container">
          {/* Visão geral */}
          <div className={`${styles.overview} reveal`} ref={factsRef}>
            <p className={styles.summary}>{c.summary}</p>
            <dl className={styles.facts}>
              {c.facts.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Capacidades */}
          <div className={`${styles.caps} reveal`} ref={capsRef}>
            <div className={styles.capsText}>
              <p className={ui.sectionLabel}>{'// o que o sistema faz'}</p>
              <h3 className={styles.blockTitle}>Principais capacidades</h3>
              <ul className={styles.capsList}>
                {c.capabilities.map((cap) => (
                  <li key={cap.title}>
                    <span aria-hidden="true">{cap.icon}</span>
                    <span>
                      <strong>{cap.title}</strong> — {cap.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.capsStage} aria-hidden="true">
              <Suspense fallback={null}>
              <CardSwap width={340} height={220} cardDistance={34} verticalDistance={40} delay={4200}>
                {c.capabilities.map((cap) => (
                  <Card key={cap.title} className={styles.swapCard}>
                    <span className={styles.swapIcon}>{cap.icon}</span>
                    <span className={styles.swapTitle}>{cap.title}</span>
                    <span className={styles.swapText}>{cap.text}</span>
                    <span className={styles.swapFoot}>TMG Caronas</span>
                  </Card>
                ))}
              </CardSwap>
              </Suspense>
            </div>
          </div>
        </div>

        {/* Arquitetura */}
        <div className={`${styles.arch} reveal`} ref={archRef}>
          <div className={styles.archBg}>
            <Suspense fallback={null}>
              <LetterGlitch />
            </Suspense>
          </div>
          <div className={`container ${styles.archInner}`}>
            <h3 className={styles.srOnly}>Arquitetura</h3>
            <div className={styles.techTitle}>
              <Suspense fallback={<p className={styles.techFallback}>Arquitetura</p>}>
                <TechText text="Arquitetura" fontSize={112} fontFamily="Syne, sans-serif" />
              </Suspense>
            </div>
            <p className={styles.archLead}>
              Solução em quatro camadas com dependências em um só sentido: a Web conhece a Application, a
              Infrastructure implementa os contratos da Application e a Shared não depende de ninguém.
            </p>

            <ol className={styles.layers}>
              {c.layers.map((l, i) => (
                <li key={l.id} className={`${styles.layer} ${styles[`layer--${l.id}`]}`}>
                  <div className={styles.layerHead}>
                    <span className={styles.layerNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.layerName}>{l.name}</span>
                    <span className={styles.layerRole}>{l.role}</span>
                  </div>
                  <ul className={styles.layerItems}>
                    {l.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className={styles.flowLabel}>Fluxo de uma requisição</p>
            <ol className={styles.flow}>
              {c.dataFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="container">
          {/* Stack, segurança e números */}
          <div className={`${styles.stackWrap} reveal`} ref={stackRef}>
            <div>
              <p className={ui.sectionLabel}>{'// stack'}</p>
              <h3 className={styles.blockTitle}>Tecnologias</h3>
              <div className={styles.stack}>
                {c.stack.map((s) => (
                  <div key={s.group} className={styles.stackGroup}>
                    <p className={styles.stackLabel}>{s.group}</p>
                    <ul className={ui.tagList}>
                      {s.items.map((it) => (
                        <li key={it} className={ui.tag}>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className={ui.sectionLabel}>{'// segurança'}</p>
              <h3 className={styles.blockTitle}>Segurança por padrão</h3>
              <ul className={ui.detailList}>
                {c.security.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className={styles.stats}>
                {c.practices.map((p) => (
                  <li key={p.label} className={styles.stat}>
                    <span className={styles.statValue}>{p.value}</span>
                    <span className={styles.statLabel}>{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a href={`#projeto-${c.projectId}`} className={ui.btnGhost}>
              Ver nos projetos →
            </a>
            <a href="#contato" className={ui.btnPrimary}>
              Quero um sistema assim
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
