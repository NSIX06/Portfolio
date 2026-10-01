/**
 * Personagem da jornada interativa (Fases 3 e 6).
 * Já definido aqui para que a personalização leia só os dados.
 */
export const character = {
  default: { outfit: 'camiseta', accessories: [], skin: '#c68a5e', hair: '#1a1a1a' },
  outfits: [
    { id: 'camiseta', label: 'Camiseta', color: 'var(--color-accent)' },
    { id: 'camisa', label: 'Camisa', color: '#e8e4dc' },
    { id: 'polo', label: 'Polo', color: 'var(--color-blue)' },
    { id: 'social', label: 'Roupa social', color: '#2b2b2b' },
  ],
  accessories: [
    { id: 'mochila', label: 'Mochila' },
    { id: 'oculos', label: 'Óculos' },
  ],
}
