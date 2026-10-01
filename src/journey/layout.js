/**
 * Geometria da jornada: posiciona as estações em serpentina a partir da ordem de
 * data/navigation.js e calcula o caminho entre elas. Nenhuma posição é fixa:
 * acrescentar uma estação nos dados a encaixa no mapa automaticamente.
 */

export const LAYOUT = {
  cols: 4,
  dx: 340, // distância horizontal entre estações
  dy: 300, // distância vertical entre fileiras
  pad: 190, // margem do mundo
}

/**
 * @param {{id: string}[]} stations
 * @returns {{points: {x: number, y: number}[], lengths: number[], total: number, width: number, height: number}}
 */
export function buildLayout(stations, layout = LAYOUT) {
  const { cols, dx, dy, pad } = layout
  const points = stations.map((_, i) => {
    const row = Math.floor(i / cols)
    const colInRow = i % cols
    const col = row % 2 === 0 ? colInRow : cols - 1 - colInRow
    // pequeno desnível alternado para o caminho não parecer uma grade rígida
    const wobble = colInRow === 0 || colInRow === cols - 1 ? 0 : (i % 2 === 0 ? -28 : 28)
    return { x: pad + col * dx, y: pad + row * dy + wobble }
  })

  const lengths = [0]
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    lengths.push(lengths[i - 1] + Math.hypot(b.x - a.x, b.y - a.y))
  }

  const rows = Math.ceil(stations.length / cols)
  return {
    points,
    lengths,
    total: lengths[lengths.length - 1] ?? 0,
    width: pad * 2 + (cols - 1) * dx,
    height: pad * 2 + Math.max(0, rows - 1) * dy,
  }
}

/** Ponto do caminho a uma distância `d` do início, e a direção horizontal do trecho. */
export function pointAt(geo, d) {
  const { points, lengths } = geo
  if (points.length === 0) return { x: 0, y: 0, dir: 1 }
  if (d <= 0) return { ...points[0], dir: 1 }
  for (let i = 1; i < points.length; i++) {
    if (d <= lengths[i]) {
      const a = points[i - 1]
      const b = points[i]
      const t = (d - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1)
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, dir: b.x >= a.x ? 1 : -1 }
    }
  }
  return { ...points[points.length - 1], dir: 1 }
}

/** `d` do SVG do caminho, com cantos arredondados. */
export function pathD(points, radius = 60) {
  if (points.length < 2) return ''
  let d = `M${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const l1 = Math.hypot(p1.x - p0.x, p1.y - p0.y)
    const l2 = Math.hypot(p2.x - p1.x, p2.y - p1.y)
    const r = Math.min(radius, l1 / 2, l2 / 2)
    const a = { x: p1.x - ((p1.x - p0.x) / l1) * r, y: p1.y - ((p1.y - p0.y) / l1) * r }
    const b = { x: p1.x + ((p2.x - p1.x) / l2) * r, y: p1.y + ((p2.y - p1.y) / l2) * r }
    d += ` L${a.x} ${a.y} Q${p1.x} ${p1.y} ${b.x} ${b.y}`
  }
  const last = points[points.length - 1]
  return `${d} L${last.x} ${last.y}`
}

/** Posições de itens em volta de uma estação (ex.: um marcador por projeto). */
export function orbit(center, count, radius = 92, startDeg = -150, spanDeg = 120) {
  if (count === 0) return []
  const step = count === 1 ? 0 : spanDeg / (count - 1)
  return Array.from({ length: count }, (_, i) => {
    const a = ((startDeg + step * i) * Math.PI) / 180
    return { x: center.x + Math.cos(a) * radius, y: center.y + Math.sin(a) * radius }
  })
}
