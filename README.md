# Portfólio — Luiz Felipe Pablos Bugalho (NSIX06)

Portfólio profissional em **React 18 + Vite**, com CSS Modules e deploy na **Vercel**: [felipebugalho.vercel.app](https://felipebugalho.vercel.app/).

O site tem dois modos, com o mesmo conteúdo:

- **Navegar pelo portfólio** (padrão): seções tradicionais, indexáveis pelo Google.
- **Explorar jornada** (`?modo=jornada`): mapa 2D em que um personagem percorre a trajetória profissional, estação por estação.

Fases concluídas: 1 (dados), 2 (portfólio tradicional), 3 (MVP da jornada), 4 (teclado, toque, mobile, movimento reduzido) e 5 (cargo atual e disponibilidade no mapa).

## Executar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
npm run lint      # ESLint + regras de acessibilidade (jsx-a11y)
npm test          # Vitest: valida a integridade dos dados
```

Deploy: cada push na `main` é publicado pela Vercel. Os branches geram um preview automático.

## Arquitetura

```
src/
├── data/                 ← TODO o conteúdo profissional
│   ├── index.js          portfolioData + exportações nomeadas
│   ├── profile.js        nome, título, resumo, idiomas, competências
│   ├── education.js      formação
│   ├── experiences.js    experiências (a com current: true é o "cargo atual")
│   ├── projects.js       projetos + origens (filtros) + status
│   ├── certificates.js   cursos e certificados
│   ├── technologies.js   habilidades por categoria
│   ├── methodologies.js  Scrum e Kanban
│   ├── availability.js   status de disponibilidade e área de contratação
│   ├── contact.js        e-mail e redes (sem JSX)
│   ├── navigation.js     seções do menu e ordem da jornada
│   ├── character.js      personagem da jornada (Fases 3 e 6)
│   └── seo.js            title, description, Open Graph
├── components/
│   ├── ui/               SectionHeader, Modal (<dialog>), AvailabilityBadge, estilos compartilhados
│   ├── icons/Icon.jsx    ícones SVG (GitHub, LinkedIn, Instagram, e-mail)
│   └── <Seção>/          Hero, About, Experience, Education, Skills (+ Metodologias),
│                         Projects, Certificates, Availability, Contact, Nav, Footer
├── journey/              Jornada interativa (carregada sob demanda, ~8 kB gzip)
│   ├── Journey.jsx       mapa SVG, câmera, controles, painel
│   ├── layout.js         posições das estações e caminho (calculados dos dados)
│   ├── Character.jsx     personagem em camadas (roupa e acessórios por props)
│   ├── StationContent.jsx conteúdo de cada estação, lido de src/data
│   └── JourneyMode.jsx   alterna os modos pela URL (?modo=jornada)
├── hooks/useReveal.js    animação de entrada; respeita prefers-reduced-motion
├── layouts/MainLayout.jsx
└── styles/               tokens, globais e animações
```

Nenhum texto profissional fica dentro dos componentes. Um teste garante que as URLs de perfil só existem em `src/data/`.

## Como atualizar o conteúdo

| Quero… | Arquivo | O que fazer |
| --- | --- | --- |
| Adicionar um projeto | `data/projects.js` | Acrescentar um objeto. Use `origin: 'freelancer'` ou `'curso'` para cair no filtro certo; o filtro aparece sozinho quando há projetos daquela origem. `featured: true` deixa o card em destaque. |
| Adicionar um certificado | `data/certificates.js` | `cert({ id, name, institution, ... })`. Para imagem ou PDF, coloque o arquivo em `public/certificados/` e preencha `image` ou `pdf` com o caminho. |
| Atualizar uma experiência | `data/experiences.js` | Editar `roles`, `start`, `end` (`null` = atual) e `projectIds`. |
| Mudar o cargo atual | `data/experiences.js` | Marcar `current: true` na experiência atual (só uma). |
| Mudar a disponibilidade | `data/availability.js` | Editar `active`: `'hiring'`, `'projects'` e/ou `'unavailable'`. |
| Atualizar habilidades | `data/technologies.js` | Editar `items` da categoria. |
| Atualizar contato | `data/contact.js` | Editar `links` e `email`. |
| Atualizar SEO | `data/seo.js` **e** `index.html` | O `index.html` repete os valores para crawlers que não executam JavaScript. |

Depois de editar, rode `npm test`: ele aponta ids duplicados, projetos inexistentes ligados a experiências e status inválidos.

## Decisões técnicas

- **Sem lazy loading nas seções**: as âncoras do menu e o link ativo passam a funcionar desde o primeiro carregamento. O custo é de +13 kB gzip. A jornada interativa será a parte carregada sob demanda.
- **Modal em `<dialog>` nativo**: prende o foco, fecha com Esc ou clicando fora e devolve o foco ao card que abriu.
- **Acessibilidade**: skip link, foco visível, `prefers-reduced-motion`, cor secundária com contraste AA e ESLint `jsx-a11y`.
- **SEO**: canonical, Open Graph com imagem (`public/og-image.png`), JSON-LD `Person`, `robots.txt` e `sitemap.xml`.

## Estrutura e navegação

- Ordem da página (definida em `data/navigation.js`): Início → Sobre → TMG Caronas → Projetos → Experiência → Habilidades (+ Metodologias) → Formação (+ Certificados) → Contato (+ Disponibilidade). Reordenar o array reordena menu, índice lateral e a numeração "// 01".
- Menu fixo com barra de progresso de leitura, link ativo, botão "Jornada" e botão "Contato" em destaque; no celular, menu em tela cheia.
- Índice lateral de seções (telas largas) e botão "voltar ao topo" com o progresso em volta.
- Listas longas recolhidas: projetos mostram os destaques + 3, certificados mostram 6, com botão para ver todos.

## Estudo de caso e efeitos visuais

- **TMG Caronas** (`components/CaseStudy`): abertura com o logo crescendo no scroll (ScrollExpand), capacidades em pilha animada (CardSwap), arquitetura em camadas com fundo LetterGlitch e título TechText, stack, segurança e números. Conteúdo em `data/caseStudies.js`; segredos, configurações e débitos internos do repositório da empresa ficam de fora.
- **Hero**: nome em TechText (letras interativas, com texto real para leitores de tela), fundo DotField e cartão ProfileCard com inclinação 3D.
- **Contato**: fundo DotField e cartão de chamada com LetterGlitch.
- **Cursor em mira** (TargetCursor) em botões, links e cards, apenas em desktop.
- **Rodapé**: botão de curtida PulseHeart (salvo só no navegador do visitante, sem contador público).
- Todos os efeitos são adaptações do React Bits, pausam fora da tela e respeitam `prefers-reduced-motion`. Os que usam canvas ou gsap são carregados sob demanda.

## Jornada interativa

- **Mapa**: SVG no DOM, sem engine de jogo nem Canvas. As estações seguem a ordem de `journey` em `data/navigation.js` e são posicionadas em serpentina por `journey/layout.js`; uma estação nova entra no mapa sozinha. Cada projeto de `data/projects.js` vira um marcador em volta da estação Projetos (os em destaque ficam com borda dourada).
- **Personagem**: anda sobre o caminho (não é mundo aberto) e para ao lado da estação. Estados: parado, andando e interagindo. Roupa e acessórios vêm de `data/character.js`.
- **Câmera**: segue o personagem com suavização e desloca o mapa para não ficar atrás do painel.
- **Controles**: setas ou WASD, Home/End, Enter abre e Esc fecha o painel; botões Anterior/Próxima; deslizar o dedo no celular; lista de estações para ir direto.
- **Acessibilidade**: o portfólio de fundo fica `inert`, há anúncio da estação atual para leitores de tela, e com `prefers-reduced-motion` o personagem e a câmera saltam direto, sem animação.
- **Sair**: "Navegar pelo portfólio" volta à seção equivalente à estação atual; o botão Voltar do navegador também funciona.

## Próximas fases

6. Personalização do personagem (roupas e acessórios — os dados e o desenho já aceitam)
7. Microanimações e refinamento visual
8. Auditoria de performance e SEO
9. Validação final

MIT © 2026 Luiz Felipe Pablos Bugalho
