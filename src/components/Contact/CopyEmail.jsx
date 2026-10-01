import { useEffect, useRef, useState } from 'react'
import Icon from '../icons/Icon'
import styles from './Contact.module.css'

/** E-mail em destaque com botão de copiar (como no rodapé do Marcus Lorenzet). */
export default function CopyEmail({ email, href }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = href
    }
  }

  return (
    <div className={styles.emailRow}>
      <a href={href} className={styles.emailBig}>
        <Icon name="email" size={20} />
        {email}
      </a>
      <button type="button" className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} onClick={copy}>
        {copied ? '✓ Copiado' : 'Copiar e-mail'}
      </button>
      <span className={styles.srOnly} role="status">
        {copied ? 'E-mail copiado para a área de transferência' : ''}
      </span>
    </div>
  )
}
