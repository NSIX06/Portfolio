import type { NextConfig } from "next";

/**
 * Política de segurança de conteúdo. O site é estático e não carrega nada de fora:
 * scripts, estilos, imagens e fontes vêm do próprio domínio. 'unsafe-inline' em scripts é
 * necessário para os scripts inline do Next (hidratação) e o de boot do tema/paleta; uma CSP
 * "estrita" com nonce exigiria renderização dinâmica e perderia o HTML estático em cache.
 * vercel.live só é usado pela barra de comentários dos previews da Vercel.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    // 70 para a foto do topo (menor sem perda visível); 75 é o padrão do Next.
    qualities: [70, 75],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Embute o CSS no HTML: some a cadeia de 4 arquivos CSS que bloqueavam a renderização.
    inlineCss: true,
    // Importa só os ícones/funções usados destas bibliotecas.
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  // O site virou uma landing page única: as rotas antigas levam às seções.
  async redirects() {
    return [
      { source: "/about", destination: "/#sobre", permanent: true },
      { source: "/projects", destination: "/#projetos", permanent: true },
    ];
  },
};

export default nextConfig;
