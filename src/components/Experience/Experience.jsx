import { useReveal } from '../../hooks/useReveal'
import styles from './Experience.module.css'

const EXPERIENCES = [
  {
    company: 'Profissional Autônomo',
    role: 'Desenvolvedor Web Freelancer · Técnico em Informática',
    period: 'Agosto 2022 — Hoje',
    description: 'Desenvolvimento de sistemas sob medida e suporte técnico em informática, em Rondonópolis - MT e remoto.',
    bullets: [
      'Desenvolvimento de aplicações Full Stack e sistemas sob medida.',
      'Criação de APIs e integrações entre sistemas.',
      'Interfaces responsivas e integração com bancos de dados.',
      'Automação de processos.',
      'Instalação, configuração e manutenção de computadores, notebooks, sistemas operacionais, softwares e periféricos.',
      'Diagnóstico e solução de falhas de hardware, software, redes locais e conexões de internet.',
      'Montagem, formatação, backup e recuperação de dados, com documentação dos atendimentos.',
    ],
    tools: [],
    accent: '#ffd100',
  },
  {
    company: 'TMG — Tropical Melhoramento & Genética',
    role: 'Auxiliar Administrativo — PCM',
    period: 'Novembro 2024 — 2026',
    description: 'Empresa de pesquisa e desenvolvimento de sementes de soja, milho e algodão, focada em melhoramento genético e biotecnologia. Atuação no Planejamento e Controle de Manutenção (PCM), conciliando atividades administrativas com o desenvolvimento de ferramentas internas.',
    bullets: [
      'Suporte às rotinas administrativas, operacionais e documentais do PCM.',
      'Desenvolvimento de ferramentas internas, como o TMG Caronas e a conferência automatizada de produtos com a base do Protheus.',
      'Tecnologias: .NET, SQL Server, Microsoft Entra ID, Power Automate e Microsoft Teams.',
    ],
    tools: [
      {
        name: 'TOTVS Protheus (SIGAMNT)',
        desc: 'Usuário-chave no módulo de Manutenção de Ativos — planos preventivos e preditivos, ordens de serviço, peças, materiais e relatórios.',
        emoji: '⚙️',
      },
      {
        name: 'GLPI',
        desc: 'Catálogo de serviços, chamados de suporte, protocolo de notas fiscais e solicitações de cadastro.',
        emoji: '🎫',
      },
      {
        name: 'Astrein (SSA-CAD)',
        desc: 'Cadastro e padronização de peças e ferramentas (também no Protheus), garantindo a integridade dos dados de manutenção e almoxarifado.',
        emoji: '🔧',
      },
    ],
    accent: '#ff5c00',
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
