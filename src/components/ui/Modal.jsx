import { useEffect, useRef } from 'react'
import styles from './ui.module.css'

/**
 * Painel de detalhes acessível, baseado em <dialog> nativo:
 * prende o foco, fecha com Esc, com o botão ou clicando fora, e devolve o foco a quem abriu.
 *
 * @param {{open: boolean, onClose: () => void, title: string, eyebrow?: string, children: React.ReactNode}} props
 */
export default function Modal({ open, onClose, title, eyebrow, children }) {
  const ref = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      openerRef.current = document.activeElement
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      onClose()
      const opener = openerRef.current
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === ref.current) ref.current.close()
  }

  // Clique no fundo fecha; pelo teclado, o Esc nativo do <dialog> faz o mesmo.
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      {open && (
        <div className={styles.dialogInner}>
          <div className={styles.dialogHead}>
            <div>
              {eyebrow && <p className={styles.sectionLabel}>{eyebrow}</p>}
              <h2 id="modal-title" className={styles.dialogTitle}>
                {title}
              </h2>
            </div>
            <button
              type="button"
              className={styles.dialogClose}
              onClick={() => ref.current?.close()}
              aria-label="Fechar detalhes"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  )
}
