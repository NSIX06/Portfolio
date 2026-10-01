import { character as characterData } from '../data'
import styles from './Journey.module.css'

const outfitColor = Object.fromEntries(characterData.outfits.map((o) => [o.id, o.color]))

/**
 * Personagem em SVG, desenhado em camadas para permitir troca de roupa e acessórios.
 * Origem (0,0) = ponto entre os pés. Estados: parado, andando, interagindo (via classe).
 *
 * @param {{state: 'idle'|'walking'|'interacting', facing: 1|-1, look?: typeof characterData.default}} props
 */
export default function Character({ state, facing, look = characterData.default }) {
  const { outfit, accessories = [], skin, hair } = look
  const shirt = outfitColor[outfit] ?? 'var(--color-accent)'
  const has = (a) => accessories.includes(a)

  return (
    <g className={`${styles.character} ${styles[`character--${state}`]}`}>
      <ellipse className={styles.charShadow} cx="0" cy="0" rx="18" ry="6" />
      <g transform={`scale(${facing} 1)`}>
        <g className={styles.charBody}>
          {/* pernas */}
          <rect className={styles.legL} x="-9" y="-26" width="7" height="24" rx="3" fill="#2a3240" />
          <rect className={styles.legR} x="2" y="-26" width="7" height="24" rx="3" fill="#2a3240" />
          <rect x="-11" y="-5" width="10" height="5" rx="2" fill="#111" />
          <rect x="1" y="-5" width="10" height="5" rx="2" fill="#111" />

          {/* mochila (atrás do corpo) */}
          {has('mochila') && <rect x="-19" y="-52" width="12" height="24" rx="4" fill="#3d4a2f" />}

          {/* tronco */}
          <rect x="-14" y="-54" width="28" height="31" rx="8" fill={shirt} />
          {outfit === 'polo' && <path d="M-6 -54 L0 -46 L6 -54 Z" fill="#fff" opacity=".85" />}
          {outfit === 'camisa' && (
            <g fill="#999">
              <circle cx="0" cy="-46" r="1.2" />
              <circle cx="0" cy="-39" r="1.2" />
              <circle cx="0" cy="-32" r="1.2" />
            </g>
          )}
          {outfit === 'social' && (
            <g>
              <path d="M-5 -54 L0 -47 L5 -54 Z" fill="#f0ede8" />
              <path d="M-2 -48 L2 -48 L3 -34 L0 -30 L-3 -34 Z" fill="var(--color-accent)" />
            </g>
          )}
          {/* braços */}
          <rect className={styles.armL} x="-19" y="-52" width="7" height="22" rx="3.5" fill={shirt} />
          <rect className={styles.armR} x="12" y="-52" width="7" height="22" rx="3.5" fill={shirt} />
          <circle cx="-15.5" cy="-29" r="3.6" fill={skin} />
          <circle cx="15.5" cy="-29" r="3.6" fill={skin} />

          {/* cabeça */}
          <rect x="-4" y="-59" width="8" height="6" fill={skin} />
          <circle cx="0" cy="-70" r="14" fill={skin} />
          <path d="M-14.5 -71 C-15 -86 15 -88 14.5 -71 C12 -77 -2 -80 -14.5 -71 Z" fill={hair} />
          {/* barba curta */}
          <path d="M-11 -66 C-9 -55 9 -55 11 -66 C8 -60 -8 -60 -11 -66 Z" fill={hair} opacity=".55" />
          <circle cx="5" cy="-70" r="1.7" fill="#1a1a1a" />
          <circle cx="-5" cy="-70" r="1.7" fill="#1a1a1a" />
          {has('oculos') && (
            <g fill="none" stroke="#1a1a1a" strokeWidth="1.4">
              <circle cx="-5" cy="-70" r="4.2" />
              <circle cx="5" cy="-70" r="4.2" />
              <path d="M-0.8 -70 H0.8" />
            </g>
          )}
        </g>
      </g>
    </g>
  )
}
