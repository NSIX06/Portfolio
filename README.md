# 🚀 Portfólio — Luiz Felipe Pablos Bugalho (NSIX06)

Portfólio profissional desenvolvido com **React + Vite**, seguindo arquitetura escalável, CSS Modules, lazy loading e boas práticas modernas. Pronto para deploy na **Vercel**.

---

## 🏗️ Arquitetura do Projeto
```
src/
├── assets/
│   ├── images/          # Foto de perfil (travada)
│   └── icons/
│
├── components/
│   ├── Nav/
│   │   ├── Nav.jsx              # Navegação com active section + menu mobile
│   │   └── Nav.module.css
│   ├── Hero/
│   │   ├── Hero.jsx             # Seção inicial com foto travada
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.jsx            # Sobre mim + stats ao vivo via API GitHub
│   │   └── About.module.css
│   ├── Experience/
│   │   ├── Experience.jsx       # Experiências: TMG, TOTVS, GLPI, Astrein, Autônomo
│   │   └── Experience.module.css
│   ├── Skills/
│   │   ├── Skills.jsx           # Habilidades por categoria
│   │   └── Skills.module.css
│   ├── Projects/
│   │   ├── Projects.jsx         # Grid de projetos
│   │   ├── ProjectCard.jsx      # Card reutilizável (React.memo)
│   │   └── Projects.module.css
│   ├── Contact/
│   │   ├── Contact.jsx          # Redes sociais + CTA
│   │   └── Contact.module.css
│   └── Footer/
│       ├── Footer.jsx
│       └── Footer.module.css
│
├── data/
│   ├── projects.js      # Lista de projetos
│   ├── skills.js        # Categorias e habilidades
│   └── socials.js       # Links sociais
│
├── hooks/
│   └── useReveal.js     # Hook IntersectionObserver para animações
│
├── layouts/
│   └── MainLayout.jsx   # Layout base com Suspense + lazy loading
│
├── styles/
│   ├── globals.css      # Reset e utilitários globais
│   ├── variables.css    # CSS Custom Properties (design tokens)
│   └── animations.css   # Keyframes e classes de animação
│
├── App.jsx              # SEO + layout
└── main.jsx             # Bootstrap React + HelmetProvider
```

---

## 📋 Seções do Portfólio

| # | Seção | Descrição |
|---|-------|-----------|
| 01 | **Hero** | Apresentação com foto travada |
| 02 | **Sobre** | Bio + stats ao vivo do GitHub |
| 03 | **Experiência** | TMG, TOTVS Protheus, GLPI, Astrein, Autônomo |
| 04 | **Skills** | Stack técnica categorizada |
| 05 | **Projetos** | Cards com projetos do GitHub |
| 06 | **Contato** | Redes sociais e CTA |

---

## 🧠 Decisões de Arquitetura

- **`data/`** — dados desacoplados dos componentes
- **`hooks/`** — `useReveal` e `useRevealAll` com IntersectionObserver
- **`layouts/`** — `MainLayout` gerencia composição e Suspense boundaries
- **CSS Modules** — zero conflito de classes entre componentes
- **Lazy Loading** — seções abaixo do fold carregadas sob demanda
- **React.memo** — `ProjectCard` memorizado para evitar re-renders
- **API GitHub ao vivo** — repositórios e estrelas sempre atualizados

---

## ⚙️ Como rodar localmente
```bash
npm install
npm run dev
```

## 🚀 Deploy na Vercel
```bash
git add .
git commit -m "update"
git push
```

A Vercel detecta o Vite automaticamente e deploya. ✅

---

## 🎨 Design Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#0a0a0a` | Fundo principal |
| `--color-surface` | `#111111` | Seções alternadas |
| `--color-accent` | `#ff5c00` | Cor primária |
| `--color-accent2` | `#ffd100` | Destaque |
| `--font-sans` | Syne | Títulos e corpo |
| `--font-mono` | Space Mono | Labels e badges |

---

MIT © 2025 Luiz Felipe Pablos Bugalho
