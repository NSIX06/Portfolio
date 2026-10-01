import styles from './Marquee.module.css'

/**
 * Faixa de texto em loop (como as do portfólio do Marcus Lorenzet).
 * A primeira cópia é lida por leitores de tela; as repetições ficam ocultas.
 * Com movimento reduzido a faixa fica parada.
 */
export default function Marquee({ items, speed = 40, reverse = false, className = '', separator = '✦', label }) {
  const group = (hidden) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span>{item}</span>
          <span className={styles.sep} aria-hidden="true">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`}
      style={{ '--marquee-duration': `${speed}s` }}
      aria-label={label}
      role={label ? 'region' : undefined}
    >
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
