import { useReveal } from '../../hooks/useReveal'
import { skillCategories } from '../../data/skills'
import styles from './Skills.module.css'

function SkillPill({ name, dotColor }) {
  return (
    <li className={styles.pill}>
      <span className={`${styles.dot} ${styles[`dot--${dotColor}`]}`} aria-hidden="true" />
      {name}
    </li>
  )
}

function SkillCategory({ label, skills, dotColor }) {
  return (
    <div className={styles.category}>
      <p className={styles.catLabel}>{label}</p>
      <ul className={styles.pillsRow} aria-label={label}>
        {skills.map((s) => (
          <SkillPill key={s} name={s} dotColor={dotColor} />
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="section section--bg" aria-labelledby="skills-heading">
      <div className="container reveal" ref={ref}>
        <p className={styles.sectionLabel}>// 02 — stack</p>
        <h2 id="skills-heading" className={styles.sectionTitle}>Habilidades</h2>

        <div className={styles.categories}>
          {skillCategories.map((cat) => (
            <SkillCategory key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
