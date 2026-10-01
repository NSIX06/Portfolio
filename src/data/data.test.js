import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import portfolioData, {
  projects,
  experiences,
  certificates,
  education,
  sections,
  journey,
  availability,
  availabilityStates,
  contact,
  projectOrigins,
} from './index'

const ids = (list) => list.map((i) => i.id)
const unique = (list) => new Set(list).size === list.length

describe('portfolioData', () => {
  it('expõe todos os blocos da estrutura central', () => {
    for (const key of [
      'profile',
      'education',
      'experiences',
      'projects',
      'certificates',
      'technologies',
      'methodologies',
      'availability',
      'contact',
      'character',
    ]) {
      expect(portfolioData[key], key).toBeTruthy()
    }
  })

  it('não tem ids duplicados', () => {
    expect(unique(ids(projects))).toBe(true)
    expect(unique(ids(experiences))).toBe(true)
    expect(unique(ids(certificates))).toBe(true)
    expect(unique(ids(education))).toBe(true)
    expect(unique(ids(sections))).toBe(true)
    expect(unique(ids(journey))).toBe(true)
  })

  it('projetos têm origem válida e campos mínimos', () => {
    for (const p of projects) {
      expect(Object.keys(projectOrigins), p.id).toContain(p.origin)
      expect(p.title, p.id).toBeTruthy()
      expect(p.summary, p.id).toBeTruthy()
      expect(Array.isArray(p.tech), p.id).toBe(true)
    }
  })

  it('experiências apontam só para projetos existentes', () => {
    const projectIds = new Set(ids(projects))
    for (const e of experiences) for (const id of e.projectIds) expect(projectIds.has(id), `${e.id} → ${id}`).toBe(true)
    for (const p of projects) {
      if (p.experienceId) expect(ids(experiences), p.id).toContain(p.experienceId)
    }
  })

  it('há exatamente uma experiência atual', () => {
    expect(experiences.filter((e) => e.current)).toHaveLength(1)
  })

  it('formação marca a graduação como em andamento, não concluída', () => {
    const ads = education.find((e) => e.id === 'ads-unisenai')
    expect(ads.status).toBe('cursando')
    expect(ads.end).toBeNull()
  })

  it('disponibilidade usa só estados definidos', () => {
    for (const s of availability.active) expect(Object.keys(availabilityStates)).toContain(s)
  })

  it('jornada só aponta para seções existentes', () => {
    const sectionIds = new Set(ids(sections))
    for (const s of journey) expect(sectionIds.has(s.section), s.id).toBe(true)
  })

  it('contato público não inclui telefone', () => {
    expect(contact.links.some((l) => l.href.startsWith('tel:') || /whatsapp|wa\.me/.test(l.href))).toBe(false)
  })
})

describe('componentes', () => {
  it('não têm URLs de perfil fixas fora de src/data', () => {
    const walk = (dir) =>
      readdirSync(dir).flatMap((f) => {
        const p = join(dir, f)
        return statSync(p).isDirectory() ? walk(p) : [p]
      })
    const files = walk(join(__dirname, '..', 'components')).filter((f) => f.endsWith('.jsx'))
    for (const f of files) {
      const src = readFileSync(f, 'utf8')
      expect(src, f).not.toMatch(/github\.com\/NSIX06|linkedin\.com\/in|instagram\.com|Tropical Melhoramento/)
    }
  })
})
