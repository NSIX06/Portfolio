# Portfólio — Felipe Bugalho

Portfólio de Luiz Felipe Pablos Bugalho (NSIX06), desenvolvedor Full Stack em Rondonópolis - MT.
Publicado em https://felipebugalho.vercel.app.

Baseado no template **rbp-portfolio** do React Bits Pro (https://github.com/DavidHDev/rbp-portfolio),
livre para uso pessoal e comercial. O template em si não pode ser revendido nem redistribuído.

## Tecnologias

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- motion, Lenis, OGL (shader WebGL), Matter.js (stack com física)
- Fontes Geist e Fraunces empacotadas no projeto (sem Google Fonts no build)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
npm run typecheck
```

## Onde editar o conteúdo

| O quê | Arquivo |
|-------|---------|
| Nome, e-mail, redes | `lib/profile.ts` |
| SEO (título, descrição, URL) | `lib/metadata.ts` |
| Hero | `components/hero/hero.tsx` |
| Projetos | `components/projects/projects.tsx` (capas em `public/projetos/`) |
| Sobre | `app/about/page.tsx` |
| Experiência, formação, o que faço, stack | `components/about/*.tsx` |
| Cartão de contato (com o PulseHeart) | `components/contact/contact-card.tsx` |
| Retrato (P&B e colorido no hover) | `public/felipe.webp`, `public/felipe_cor.webp` |
