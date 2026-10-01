import { useState } from 'react'
import {
  profile,
  education,
  experiences,
  currentExperience,
  projects,
  certificates,
  certificateStatusLabels,
  technologies,
  methodologies,
  methodologiesIntro,
  availability,
  activeAvailability,
  contact,
} from '../data'
import ProjectDetails from '../components/Projects/ProjectDetails'
import CertificateDetails from '../components/Certificates/CertificateDetails'
import AvailabilityBadge from '../components/ui/AvailabilityBadge'
import Icon from '../components/icons/Icon'
import ui from '../components/ui/ui.module.css'
import styles from './Journey.module.css'

const Label = ({ children }) => <p className={ui.detailLabel}>{children}</p>

const Tags = ({ items }) => (
  <ul className={ui.tagList}>
    {items.map((t) => (
      <li key={t} className={ui.tag}>
        {t}
      </li>
    ))}
  </ul>
)

function ExperienceBlock({ e }) {
  return (
    <article className={styles.block}>
      <div className={styles.blockHead}>
        <h4 className={styles.blockTitle}>{e.company}</h4>
        <span className={ui.chip}>
          {e.start} — {e.end ?? 'Atual'}
        </span>
      </div>
      {e.roles.map((r) => (
        <div key={r.title}>
          <p className={styles.blockSub}>{r.title}</p>
          <ul className={ui.detailList}>
            {r.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  )
}

/** Lista que vira detalhe dentro do próprio painel (projetos e certificados). */
function ListWithDetail({ items, initialId, renderItem, renderDetail, backLabel }) {
  const [openId, setOpenId] = useState(initialId ?? null)
  const open = items.find((i) => i.id === openId)
  if (open) {
    return (
      <div>
        <button type="button" className={styles.back} onClick={() => setOpenId(null)}>
          ← {backLabel}
        </button>
        <h4 className={styles.detailTitle}>{open.title ?? open.name}</h4>
        {renderDetail(open)}
      </div>
    )
  }
  return (
    <ul className={styles.itemList}>
      {items.map((i) => (
        <li key={i.id}>
          <button type="button" className={styles.item} onClick={() => setOpenId(i.id)}>
            {renderItem(i)}
          </button>
        </li>
      ))}
    </ul>
  )
}

/**
 * Conteúdo de cada estação, lido de src/data.
 * @param {{stationId: string, focusItem?: string|null, onGo: (stationId: string) => void}} props
 */
export default function StationContent({ stationId, focusItem, onGo }) {
  switch (stationId) {
    case 'inicio':
      return (
        <>
          <p className={ui.detailText}>
            Olá! Eu sou o {profile.shortName}, {profile.title.toLowerCase()}. Esta é a minha trajetória profissional em formato de
            mapa: siga o caminho para conhecer formação, habilidades, projetos, experiências e como falar comigo.
          </p>
          <Label>Como navegar</Label>
          <ul className={ui.detailList}>
            <li>Setas do teclado ou os botões Anterior / Próxima para andar</li>
            <li>Clique em uma estação do mapa ou da lista para ir direto até ela</li>
            <li>Esc fecha este painel; o botão no topo volta ao portfólio tradicional</li>
          </ul>
          <AvailabilityBadge className={styles.spaced} />
        </>
      )

    case 'sobre':
      return (
        <>
          {profile.about.map((p) => (
            <p key={p.slice(0, 20)} className={`${ui.detailText} ${styles.para}`}>
              {p}
            </p>
          ))}
          <Label>Idiomas</Label>
          <Tags items={profile.languages.map((l) => `${l.language} · ${l.level}`)} />
          <Label>Competências comportamentais</Label>
          <Tags items={profile.softSkills} />
        </>
      )

    case 'formacao':
      return education.map((e) => (
        <article key={e.id} className={styles.block}>
          <div className={styles.blockHead}>
            <h4 className={styles.blockTitle}>{e.course}</h4>
            <span className={`${ui.chip} ${e.status === 'cursando' ? ui['chip--accent'] : ''}`}>{e.statusLabel}</span>
          </div>
          <p className={styles.blockSub}>
            {e.institution} · {e.start} — {e.end ?? 'Atual'}
          </p>
        </article>
      ))

    case 'habilidades':
      return technologies.map((c) => (
        <div key={c.id}>
          <Label>
            {c.icon} {c.label}
          </Label>
          <Tags items={c.items} />
        </div>
      ))

    case 'metodologias':
      return (
        <>
          <p className={ui.detailText}>{methodologiesIntro}</p>
          {methodologies.map((m) => (
            <article key={m.id} className={styles.block}>
              <div className={styles.blockHead}>
                <h4 className={styles.blockTitle}>{m.name}</h4>
                <span className={ui.chip}>{m.level}</span>
              </div>
              <p className={`${ui.detailText} ${styles.para}`}>{m.description}</p>
              <Tags items={m.practices} />
            </article>
          ))}
        </>
      )

    case 'projetos':
      return (
        <ListWithDetail
          key={focusItem ?? 'lista'}
          items={projects}
          initialId={focusItem}
          backLabel="Todos os projetos"
          renderItem={(p) => (
            <>
              <span className={styles.itemIcon} aria-hidden="true">
                {p.emoji}
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemTitle}>
                  {p.title} {p.featured && <span className={styles.star}>★ destaque</span>}
                </span>
                <span className={styles.itemMeta}>{p.tag}</span>
              </span>
            </>
          )}
          renderDetail={(p) => <ProjectDetails project={p} />}
        />
      )

    case 'certificados':
      return (
        <ListWithDetail
          items={certificates}
          backLabel="Todos os certificados"
          renderItem={(c) => (
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>{c.name}</span>
              <span className={styles.itemMeta}>
                {c.partner ? `${c.institution} + ${c.partner}` : c.institution} · {certificateStatusLabels[c.status]}
              </span>
            </span>
          )}
          renderDetail={(c) => <CertificateDetails certificate={c} />}
        />
      )

    case 'experiencia':
      return experiences.map((e) => <ExperienceBlock key={e.id} e={e} />)

    case 'cargo-atual':
      return currentExperience ? (
        <>
          <p className={`${ui.chip} ${ui['chip--accent']}`}>⭐ Experiência atual</p>
          <ExperienceBlock e={currentExperience} />
          <p className={ui.detailText}>{currentExperience.description}</p>
        </>
      ) : (
        <p className={ui.detailText}>Sem experiência atual cadastrada.</p>
      )

    case 'disponibilidade':
      return (
        <>
          {activeAvailability.map((s) => (
            <p key={s.key} className={styles.statusLine}>
              <span aria-hidden="true">{s.emoji}</span> <strong>{s.label}</strong> — {s.message}
            </p>
          ))}
          <Label>Especialidades</Label>
          <Tags items={availability.specialties} />
          <Label>Tipo de oportunidade</Label>
          <Tags items={availability.opportunityTypes} />
          <Label>Tecnologias de interesse</Label>
          <Tags items={availability.interests} />
          <div className={ui.detailLinks}>
            <button type="button" className={ui.btnPrimary} onClick={() => onGo('contato')}>
              Ir para o contato →
            </button>
          </div>
        </>
      )

    case 'contato':
      return (
        <>
          <p className={styles.finalMessage}>{availability.headline}</p>
          <p className={ui.detailText}>{contact.intro}</p>
          <ul className={styles.contactList}>
            {contact.links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={styles.contactLink}
                >
                  <Icon name={l.icon} /> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )

    default:
      return null
  }
}
