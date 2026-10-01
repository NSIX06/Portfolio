import { certificateStatusLabels } from '../../data'
import ui from '../ui/ui.module.css'
import styles from './Certificates.module.css'

/** Detalhes de um certificado. Campos vazios não aparecem. */
export default function CertificateDetails({ certificate }) {
  const { institution, partner, status, date, workload, description, skills, image, pdf, url, name } = certificate

  return (
    <>
      <ul className={ui.tagList}>
        <li className={ui.chip}>{partner ? `${institution} + ${partner}` : institution}</li>
        <li className={`${ui.chip} ${status === 'em-andamento' ? ui['chip--yellow'] : ui['chip--green']}`}>
          {certificateStatusLabels[status]}
        </li>
        {date && <li className={ui.chip}>{date}</li>}
        {workload && <li className={ui.chip}>{workload}</li>}
      </ul>

      {image && <img src={image} alt={`Certificado: ${name}`} className={styles.certImage} loading="lazy" />}

      {description && (
        <>
          <p className={ui.detailLabel}>Sobre o curso</p>
          <p className={ui.detailText}>{description}</p>
        </>
      )}

      {skills.length > 0 && (
        <>
          <p className={ui.detailLabel}>Competências</p>
          <ul className={ui.tagList}>
            {skills.map((s) => (
              <li key={s} className={ui.tag}>
                {s}
              </li>
            ))}
          </ul>
        </>
      )}

      {(pdf || url) && (
        <div className={ui.detailLinks}>
          {pdf && (
            <a href={pdf} target="_blank" rel="noreferrer" className={ui.btnPrimary}>
              📄 Abrir PDF
            </a>
          )}
          {url && (
            <a href={url} target="_blank" rel="noreferrer" className={ui.btnGhost}>
              Verificar certificado ↗
            </a>
          )}
        </div>
      )}

      {!image && !pdf && !url && <p className={styles.noFile}>Imagem e PDF do certificado serão adicionados em breve.</p>}
    </>
  )
}
