# Portfólio — Luiz Felipe Pablos Bugalho (NSIX06)

Portfólio profissional em **React 18 + Vite**, com CSS Modules e deploy na **Vercel**: [felipebugalho.vercel.app](https://felipebugalho.vercel.app/).

Em evolução para uma **Jornada Profissional Interativa** em 2D. O plano está dividido em fases com prioridade P0–P3. As Fases 1 e 2 (dados centralizados e portfólio tradicional) estão concluídas.

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

## Próximas fases

3. MVP da jornada 2D (mapa SVG, personagem, câmera, estações lidas de `data/navigation.js`)
4. Teclado, toque, mobile e alternância "Explorar jornada / Navegar pelo portfólio"
5. Cargo atual e disponibilidade no mapa
6–9. Personalização do personagem, microanimações, performance e validação final

MIT © 2026 Luiz Felipe Pablos Bugalho
