# 🚀 Portfólio — Luiz Felipe Bugalho (NSIX06)

Portfólio profissional desenvolvido com **React + Vite**, seguindo arquitetura escalável, CSS Modules, lazy loading e boas práticas modernas. Pronto para deploy na **Vercel**.

---

## 🏗️ Arquitetura do Projeto

```
src/
├── assets/
│   ├── images/          # Imagens estáticas (foto de perfil, etc.)
│   └── icons/           # Ícones SVG (se necessário)
│
├── components/          # Componentes isolados e reutilizáveis
│   ├── Nav/
│   │   ├── Nav.jsx              # Navegação com active section + menu mobile
│   │   └── Nav.module.css
│   ├── Hero/
│   │   ├── Hero.jsx             # Seção inicial com upload de foto
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.jsx            # Sobre mim + cards de estatísticas
│   │   └── About.module.css
│   ├── Skills/
│   │   ├── Skills.jsx           # Habilidades organizadas por categoria
│   │   └── Skills.module.css
│   ├── Projects/
│   │   ├── Projects.jsx         # Seção de projetos com grid
│   │   ├── ProjectCard.jsx      # Card reutilizável (React.memo)
│   │   └── Projects.module.css
│   ├── Contact/
│   │   ├── Contact.jsx          # Redes sociais + CTA
│   │   └── Contact.module.css
│   └── Footer/
│       ├── Footer.jsx
│       └── Footer.module.css
│
├── data/                # Dados separados da lógica de UI
│   ├── projects.js      # Lista de projetos
│   ├── skills.js        # Categorias e habilidades
│   └── socials.js       # Links sociais
│
├── hooks/
│   └── useReveal.js     # Hook IntersectionObserver para animações de entrada
│
├── layouts/
│   └── MainLayout.jsx   # Layout base com Suspense + lazy loading
│
├── styles/
│   ├── globals.css      # Reset, base e utilitários globais
│   ├── variables.css    # CSS Custom Properties (design tokens)
│   └── animations.css   # Keyframes e classes de animação
│
├── App.jsx              # Ponto de entrada limpo (apenas SEO + layout)
└── main.jsx             # Bootstrap React + HelmetProvider
```

---

## 🧠 Decisões de Arquitetura

### Separação de concerns
- **`data/`** — os dados são desacoplados dos componentes. Para adicionar um projeto, basta editar `projects.js`.
- **`hooks/`** — lógica reutilizável isolada. `useReveal` e `useRevealAll` evitam duplicação.
- **`layouts/`** — `MainLayout` gerencia a composição das seções e o Suspense boundary.

### CSS Modules
Cada componente tem seu próprio `.module.css`, eliminando conflitos de classe e facilitando manutenção.

### Lazy Loading
As seções abaixo do fold (`About`, `Skills`, `Projects`, `Contact`) são carregadas via `React.lazy` + `Suspense`, reduzindo o bundle inicial.

### React.memo
`ProjectCard` é memorizado para evitar re-renders desnecessários quando o estado pai mudar.

### useReveal Hook
Usa `IntersectionObserver` nativo para adicionar a classe `.visible` quando o elemento entra na viewport, acionando as animações CSS definidas em `animations.css`.

---

## ⚙️ Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Build para produção
npm run build

# 4. Preview do build
npm run preview
```

---

## 🚀 Deploy na Vercel

### Opção 1 — Via GitHub (recomendado)
1. Faça push do projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **"Add New Project"** e selecione o repositório
4. A Vercel detecta o Vite automaticamente — clique em **Deploy**
5. ✅ Pronto! URL gerada automaticamente

### Opção 2 — Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🎨 Design Tokens

Todas as cores, fontes e espaçamentos estão centralizados em `styles/variables.css`:

| Token              | Valor       | Uso                        |
|--------------------|-------------|----------------------------|
| `--color-bg`       | `#0a0a0a`   | Fundo principal            |
| `--color-surface`  | `#111111`   | Seções alternadas          |
| `--color-accent`   | `#ff5c00`   | Laranja — cor primária     |
| `--color-accent2`  | `#ffd100`   | Amarelo — destaque         |
| `--font-sans`      | Syne        | Títulos e corpo            |
| `--font-mono`      | Space Mono  | Labels, badges, código     |

---

## 📦 Dependências

| Pacote               | Versão  | Finalidade                  |
|----------------------|---------|-----------------------------|
| react                | ^18.2   | Biblioteca UI               |
| react-dom            | ^18.2   | Renderização DOM            |
| react-helmet-async   | ^1.3    | SEO meta tags               |
| vite                 | ^5.0    | Build tool                  |
| @vitejs/plugin-react | ^4.2    | Suporte JSX + Fast Refresh  |

---

## ♿ Acessibilidade

- `skip-link` para pular para o conteúdo principal
- `aria-label` em todos os links e botões interativos
- `aria-labelledby` para conectar headings às seções
- `alt` descritivo em todas as imagens
- Foco visível com `outline` colorido (`:focus-visible`)
- Contraste de cores adequado (texto claro em fundo escuro)

---

## 📄 Licença

MIT © 2025 Luiz Felipe Pablos Bugalho
