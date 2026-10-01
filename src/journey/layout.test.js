import { describe, it, expect } from 'vitest'
import { buildLayout, pointAt, orbit } from './layout'

const stations = Array.from({ length: 11 }, (_, i) => ({ id: `s${i}` }))

describe('layout da jornada', () => {
  const geo = buildLayout(stations)

  it('posiciona uma estação por item, dentro do mundo', () => {
    expect(geo.points).toHaveLength(11)
    for (const p of geo.points) {
      expect(p.x).toBeGreaterThan(0)
      expect(p.x).toBeLessThan(geo.width)
      expect(p.y).toBeGreaterThan(0)
      expect(p.y).toBeLessThan(geo.height + 60)
    }
  })

  it('distâncias acumuladas crescem ao longo do caminho', () => {
    for (let i = 1; i < geo.lengths.length; i++) expect(geo.lengths[i]).toBeGreaterThan(geo.lengths[i - 1])
    expect(geo.total).toBe(geo.lengths.at(-1))
  })

  it('pointAt devolve as estações nas suas distâncias', () => {
    geo.points.forEach((p, i) => {
      const q = pointAt(geo, geo.lengths[i])
      expect(q.x).toBeCloseTo(p.x)
      expect(q.y).toBeCloseTo(p.y)
    })
  })

  it('uma estação nova entra no mapa sem mexer nas outras', () => {
    const bigger = buildLayout([...stations, { id: 'nova' }])
    expect(bigger.points.slice(0, 11)).toEqual(geo.points)
    expect(bigger.points).toHaveLength(12)
  })

  it('orbit gera um ponto por item', () => {
    expect(orbit({ x: 0, y: 0 }, 5)).toHaveLength(5)
    expect(orbit({ x: 0, y: 0 }, 0)).toHaveLength(0)
  })
})
