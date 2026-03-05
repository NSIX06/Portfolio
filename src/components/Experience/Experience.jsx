import { useReveal } from '../../hooks/useReveal'
import styles from './Experience.module.css'

const EXPERIENCES = [
  {
    company: 'TMG — Tropical e Melhoramento Genético',
    role: 'Suporte & Operações',
    period: 'Novembro 2024 — Hoje',
    description: 'Empresa de pesquisa e desenvolvimento de sementes de soja, milho e algodão, focada em melhoramento genético, biotecnologia e produtividade sustentável.',
    bullets: [
      'Suporte administrativo em rotinas operacionais e documentais.',
      'Colaboração na organização e gestão de informações e arquivos.',
      'Participação ativa na otimização de processos internos.',
    ],
    tools: [
      {
        name: 'TOTVS Protheus (SIGAMNT)',
        desc: 'Usuário-chave no módulo de Manutenção de Ativos — planos de manutenção preventiva e preditiva, gestão de Ordens de Serviço (OS), controle de peças e materiais e relatórios gerenciais.',
        emoji: '⚙️',
      },
      {
        name: 'GLPI',
        desc: 'Administração e operação com foco em catálogo de serviços, controle de chamados de suporte técnico, fluxo de protocolo de Notas Fiscais e gestão de solicitações de cadastro.',
        emoji: '🎫',
      },
      {
        name: 'Astrein (SSA-CAD)',
        desc: 'Cadastro e padronização de peças e ferramentas da oficina, garantindo qualidade e integridade das informações para manutenção e almoxarifado.',
        emoji: '🔧',
      },
    ],
    accent: '#ff5c00',
  },
  {
    company: 'Técnico em Informática Autônomo',
    role: 'Freelancer',
    period: 'Agosto 2022 — Hoje',
    description: 'Manutenção e suporte técnico em computadores e redes, com foco em desempenho e segurança dos sistemas.',
    bullets: [
      'Instalação, configuração e manutenção de hardware e software.',
      'Suporte técnico a usuários — computadores, redes e periféricos.',
      'Diagnóstico e resolução de falhas em sistemas operacionais.',
      'Administração básica de redes locais (LAN) e internet.',
      'Backup, recuperação de dados e instalação de antivírus.',
      'Documentação de procedimentos, tickets e relatórios.',
    ],
    tools: [],
    accent: '#ffd100',
  },
]

function ToolCard({ emoji, name, desc }) {
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolHeader}>
        <span className={styles.toolEmoji} aria-hidden="true">{emoji}</span>
        <strong className={styles.toolName}>{name}</strong>
      </div>
      <p className={styles.toolDesc}>{desc}</p>
    </div>
  )
}

function ExperienceCard({ company, role, period, description, bullets, tools, accent }) {
  const ref = useReveal()
  return (
    <article className={`${styles.card} reveal`} ref={ref}>
      <div className={styles.cardBar} style={{ background: accent }} />
      <div className={styles.cardHead}>
        <div>
          <h3 className={styles.company}>{company}</h3>
          <p className={styles.role}>{role}</p>
        </div>
        <span className={styles.period}>{period}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <ul className={styles.bullets}>
        {bullets.map((b) => (
          <li key={b} className={styles.bullet}>
            <span className={styles.bulletDot} style={{ background: accent }} aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      {tools.length > 0 && (
        <div className={styles.tools}>
          <p className={styles.toolsLabel}>🛠️ Ferramentas utilizadas</p>
          <div className={styles.toolsGrid}>
            {tools.map((t) => (
              <ToolCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default function Experience() {
  return (
    <section id="experiencia" className="section section--bg" aria-labelledby="exp-heading">
      <div className="container">
        <p className={styles.sectionLabel}>// 02 — carreira</p>
        <h2 id="exp-heading" className={styles.sectionTitle}>Experiência</h2>
        <div className={styles.list}>
          {EXPERIENCES.map((e) => (
            <ExperienceCard key={e.company} {...e} />
          ))}
        </div>
      </div>
    </section>
  )
}
