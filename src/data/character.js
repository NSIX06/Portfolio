/**
 * Personagem da jornada interativa (Fases 3 e 6).
 * Já definido aqui para que a personalização leia só os dados.
 */
export const character = {
  default: { outfit: 'polo', accessories: ['oculos'], skin: '#d9a47e', hair: '#3b2a1e' },
  outfits: [
    { id: 'camiseta', label: 'Camiseta', color: 'var(--color-accent)' },
    { id: 'camisa', label: 'Camisa', color: '#e8e4dc' },
    { id: 'polo', label: 'Polo', color: '#2b4466' },
    { id: 'social', label: 'Roupa social', color: '#2b2b2b' },
  ],
  accessories: [
    { id: 'mochila', label: 'Mochila' },
    { id: 'oculos', label: 'Óculos' },
  ],
}
