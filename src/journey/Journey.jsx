import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { journey, projects, certificates, profile, activeAvailability, currentExperience } from '../data'
import { buildLayout, pointAt, pathD, orbit } from './layout'
import Character from './Character'
import StationContent from './StationContent'
import ui from '../components/ui/ui.module.css'
import styles from './Journey.module.css'

const PANEL_W = 440 // largura do painel lateral no desktop (px)
const WIDE = 900 // a partir daqui o painel fica ao lado; abaixo vira folha inferior
const STOP_GAP = 72 // o personagem para no caminho, ao lado da estação, sem cobrir o ícone

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Jornada Profissional Interativa: mapa 2D em SVG, personagem que anda pelo caminho,
 * câmera que o acompanha e um painel com o conteúdo de cada estação.
 * Todo o conteúdo vem de src/data; a ordem das estações vem de data/navigation.js.
 *
 * @param {{onExit: (sectionId?: string) => void}} props
 */
export default function Journey({ onExit }) {
  const geo = useMemo(() => buildLayout(journey), [])
  const projectsIndex = journey.findIndex((s) => s.id === 'projetos')
  const certificatesIndex = journey.findIndex((s) => s.id === 'certificados')

  const [index, setIndex] = useState(0)
  const [moving, setMoving] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [focusItem, setFocusItem] = useState(null)
  const [facing, setFacing] = useState(1)
  const [visited, setVisited] = useState(() => new Set([0]))
  const [size, setSize] = useState({ w: 1200, h: 800 })

  const viewportRef = useRef(null)
  const worldRef = useRef(null)
  const charRef = useRef(null)
  const panelRef = useRef(null)
  const titleRef = useRef(null)
  const anim = useRef({ d: STOP_GAP, target: STOP_GAP, arrival: 0, camX: geo.points[0]?.x ?? 0, camY: geo.points[0]?.y ?? 0, moving: false, last: 0 })
  const state = useRef({})
  state.current = { panelOpen, size }

  const station = journey[index]
  const wide = size.w >= WIDE

  // Tamanho da área do mapa
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Foco inicial no título, para leitor de tela e teclado começarem na jornada
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  /** Leva o personagem até a estação `i` (andando, ou direto com movimento reduzido). */
  const goTo = useCallback(
    (i, item = null) => {
      const next = Math.max(0, Math.min(journey.length - 1, i))
      setFocusItem(item)
      setIndex(next)
      const a = anim.current
      const center = geo.lengths[next]
      // para antes da estação (vindo de trás) ou depois (vindo da frente); a primeira, logo após o início
      const forward = next === 0 ? true : center >= a.d
      a.target = next === 0 ? Math.min(STOP_GAP, geo.total) : center + (forward ? -STOP_GAP : STOP_GAP)
      a.arrival = next
      if (prefersReducedMotion() || Math.abs(a.target - a.d) < 1) {
        a.d = a.target
        setMoving(false)
        setPanelOpen(true)
        setVisited((v) => new Set(v).add(next))
        const c = pointAt(geo, a.d)
        if (geo.points[next].x !== c.x) setFacing(geo.points[next].x > c.x ? 1 : -1)
      } else {
        a.speed = Math.max(520, Math.abs(a.target - a.d) / 1.6) // trajetos longos não passam de ~1,6 s
        a.moving = true
        setMoving(true)
        setPanelOpen(false)
      }
    },
    [geo]
  )

  // Laço de animação: move o personagem e a câmera direto no DOM (sem re-render por quadro)
  useEffect(() => {
    let raf
    const tick = (t) => {
      const a = anim.current
      const dt = Math.min(0.05, (t - (a.last || t)) / 1000)
      a.last = t
      if (a.moving) {
        const step = a.speed * dt
        const diff = a.target - a.d
        if (Math.abs(diff) <= step) {
          a.d = a.target
          a.moving = false
          setMoving(false)
          setPanelOpen(true)
          const reached = a.arrival
          setVisited((v) => new Set(v).add(reached))
          const c = pointAt(geo, a.d)
          const st = geo.points[reached]
          if (st && st.x !== c.x) setFacing(st.x > c.x ? 1 : -1) // vira para a estação
        } else {
          a.d += Math.sign(diff) * step
        }
      }
      const p = pointAt(geo, a.d)
      const dir = a.moving ? Math.sign(a.target - a.d) * p.dir : 0
      if (dir !== 0) setFacing((f) => (f === dir ? f : dir))

      const { panelOpen: open, size: s } = state.current
      const sc = s.w < 640 ? 0.72 : s.w < WIDE ? 0.85 : 1
      // Com o painel aberto, a câmera desloca o personagem para a área livre do mapa
      const offX = open && s.w >= WIDE ? PANEL_W / 2 / sc : 0
      const offY = open && s.w < WIDE ? (s.h * 0.28) / sc : 0
      const tx = p.x + offX
      const ty = p.y + offY
      const k = prefersReducedMotion() ? 1 : 1 - Math.exp(-dt * 6)
      a.camX += (tx - a.camX) * k
      a.camY += (ty - a.camY) * k

      worldRef.current?.setAttribute(
        'transform',
        `translate(${s.w / 2 - a.camX * sc} ${s.h / 2 - a.camY * sc}) scale(${sc})`
      )
      charRef.current?.setAttribute('transform', `translate(${p.x} ${p.y})`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [geo])

  // Teclado: setas/WASD andam, Enter abre o painel, Esc fecha o painel
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const inPanel = panelRef.current?.contains(e.target)
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)
      if (typing) return
      const key = e.key
      if (key === 'Escape') {
        if (state.current.panelOpen) {
          e.preventDefault()
          setPanelOpen(false)
          viewportRef.current?.focus()
        }
        return
      }
      if (inPanel && key.startsWith('Arrow')) return // deixa as setas rolarem o painel
      if (['ArrowRight', 'ArrowDown', 'd', 'D', 's', 'S'].includes(key)) {
        e.preventDefault()
        goTo(index + 1)
      } else if (['ArrowLeft', 'ArrowUp', 'a', 'A', 'w', 'W'].includes(key)) {
        e.preventDefault()
        goTo(index - 1)
      } else if (key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (key === 'End') {
        e.preventDefault()
        goTo(journey.length - 1)
      } else if (key === 'Enter' && e.target === viewportRef.current) {
        e.preventDefault()
        setPanelOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index])

  // Gestos: deslizar o dedo no mapa anda para a próxima/anterior estação
  const touch = useRef(null)
  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    const start = touch.current
    touch.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 48) return
    const forward = Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0
    goTo(index + (forward ? 1 : -1))
  }

  const projectSpots = orbit(geo.points[projectsIndex] ?? { x: 0, y: 0 }, projects.length, 128, -168, 156)
  const currentRole = currentExperience?.roles[0]?.title
  const characterState = moving ? 'walking' : panelOpen ? 'interacting' : 'idle'

  return (
    <div className={styles.journey} aria-labelledby="journey-title">
      {/* Barra superior */}
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <h1 id="journey-title" ref={titleRef} tabIndex={-1} className={styles.title}>
            Jornada Profissional
          </h1>
          <p className={styles.subtitle}>
            {profile.shortName} · {profile.title}
          </p>
        </div>
        <ul className={styles.statusList} aria-label="Disponibilidade">
          {activeAvailability.map((s) => (
            <li key={s.key} className={`${ui.chip} ${ui[`chip--${s.tone}`]}`}>
              <span aria-hidden="true">{s.emoji}</span> {s.label}
            </li>
          ))}
        </ul>
        <button type="button" className={`${ui.btnGhost} ${styles.exitBtn}`} onClick={() => onExit(station.section)}>
          <span aria-hidden="true">☰</span>
          <span className={styles.exitLong}>Navegar pelo portfólio</span>
          <span className={styles.exitShort}>Portfólio</span>
        </button>
      </header>

      {/* Lista de estações: atalho direto e alternativa acessível ao mapa */}
      <nav className={styles.stations} aria-label="Estações da jornada">
        <ol>
          {journey.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`${styles.stationBtn} ${i === index ? styles.stationBtnActive : ''} ${
                  visited.has(i) ? styles.stationBtnVisited : ''
                }`}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => goTo(i)}
              >
                <span className={styles.stationNum}>{String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden="true">{s.icon}</span> {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mapa: área focável que recebe as setas do teclado (o SVG em si é decorativo) */}
      <div
        ref={viewportRef}
        className={styles.viewport}
        tabIndex={0}
        role="application"
        aria-roledescription="mapa"
        aria-label={`Mapa da jornada. Estação atual: ${station.label}. Use as setas para andar e Enter para abrir os detalhes.`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <svg className={styles.svg} width={size.w} height={size.h} aria-hidden="true">
          <defs>
            <pattern id="jr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(225,29,29,.06)" strokeWidth="1" />
            </pattern>
            <radialGradient id="jr-glow">
              <stop offset="0" stopColor="rgba(225,29,29,.35)" />
              <stop offset="1" stopColor="rgba(225,29,29,0)" />
            </radialGradient>
          </defs>
          <g ref={worldRef}>
            <rect x={-2000} y={-2000} width={geo.width + 4000} height={geo.height + 4000} fill="url(#jr-grid)" />

            {/* caminho */}
            <path d={pathD(geo.points)} className={styles.road} />
            <path d={pathD(geo.points)} className={styles.roadLine} />

            {/* marcadores dos projetos em volta da estação Projetos */}
            {projectSpots.map((pt, i) => {
              const p = projects[i]
              return (
                <g
                  key={p.id}
                  className={`${styles.spot} ${p.featured ? styles.spotFeatured : ''}`}
                  transform={`translate(${pt.x} ${pt.y})`}
                  onClick={() => goTo(projectsIndex, p.id)}
                >
                  <title>{p.title}</title>
                  <circle r={p.featured ? 19 : 14} />
                  <text y={p.featured ? 6 : 5} textAnchor="middle" fontSize={p.featured ? 17 : 13}>
                    {p.emoji}
                  </text>
                </g>
              )
            })}

            {/* estações */}
            {journey.map((s, i) => {
              const pt = geo.points[i]
              const active = i === index
              return (
                <g
                  key={s.id}
                  transform={`translate(${pt.x} ${pt.y})`}
                  className={`${styles.station} ${active ? styles.stationActive : ''} ${visited.has(i) ? styles.stationVisited : ''}`}
                  onClick={() => goTo(i)}
                >
                  {active && <circle r="90" fill="url(#jr-glow)" />}
                  <circle className={styles.plate} r="46" />
                  <text y="10" textAnchor="middle" fontSize="28">
                    {s.icon}
                  </text>
                  <text className={styles.stationLabel} y="74" textAnchor="middle">
                    {s.label}
                  </text>
                  {i === certificatesIndex && (
                    <g transform="translate(34 -34)">
                      <circle r="14" className={styles.countBadge} />
                      <text y="4.5" textAnchor="middle" className={styles.countText}>
                        {certificates.length}
                      </text>
                    </g>
                  )}
                  {s.id === 'cargo-atual' && currentRole && (
                    <text className={styles.stationNote} y="94" textAnchor="middle">
                      {currentRole}
                    </text>
                  )}
                </g>
              )
            })}

            {/* personagem + selo de disponibilidade acima dele */}
            <g ref={charRef} className={styles.charWrap}>
              <Character state={characterState} facing={facing} />
              <g transform="translate(46 -62)" className={styles.charTag}>
                <rect x="-30" y="-14" width="60" height="22" rx="11" />
                <text y="2" textAnchor="middle" fontSize="12">
                  {activeAvailability.map((s) => s.emoji).join(' ')}
                </text>
              </g>
            </g>
          </g>
        </svg>

        <p className={styles.hint} aria-hidden="true">
          {wide ? '← → para andar · Enter abre · Esc fecha' : 'Deslize ou use os botões para andar'}
        </p>
      </div>

      {/* Painel da estação */}
      {panelOpen && (
        <aside ref={panelRef} className={styles.panel} aria-labelledby="station-title">
          <div className={styles.panelHead}>
            <div>
              <p className={ui.sectionLabel}>
                Estação {index + 1} de {journey.length}
              </p>
              <h2 id="station-title" className={styles.panelTitle}>
                <span aria-hidden="true">{station.icon}</span> {station.label}
              </h2>
            </div>
            <button type="button" className={ui.dialogClose} onClick={() => setPanelOpen(false)} aria-label="Fechar painel">
              ✕
            </button>
          </div>
          <div className={styles.panelBody}>
            <StationContent
              stationId={station.id}
              focusItem={focusItem}
              onGo={(id) => goTo(journey.findIndex((s) => s.id === id))}
            />
          </div>
        </aside>
      )}

      {/* Controles (teclado, mouse e toque) */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.ctrlBtn}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Estação anterior"
        >
          ← <span className={styles.ctrlText}>Anterior</span>
        </button>
        <div className={styles.progress}>
          <span className={styles.progressLabel}>
            {String(index + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}
          </span>
          <span className={styles.progressName}>{station.label}</span>
          <span className={styles.progressBar} aria-hidden="true">
            <span style={{ width: `${((index + 1) / journey.length) * 100}%` }} />
          </span>
        </div>
        {!panelOpen && !moving ? (
          <button
            type="button"
            className={`${styles.ctrlBtn} ${styles.ctrlOpen}`}
            onClick={() => setPanelOpen(true)}
            aria-label="Abrir detalhes da estação"
          >
            Abrir
          </button>
        ) : null}
        <button
          type="button"
          className={`${styles.ctrlBtn} ${styles.ctrlNext}`}
          onClick={() => goTo(index + 1)}
          disabled={index === journey.length - 1}
          aria-label="Próxima estação"
        >
          <span className={styles.ctrlText}>Próxima</span> →
        </button>
      </div>

      {/* Anúncio para leitores de tela */}
      <p className={styles.srOnly} aria-live="polite">
        {moving ? `Indo para ${station.label}` : `Estação ${index + 1} de ${journey.length}: ${station.label}`}
      </p>
    </div>
  )
}
