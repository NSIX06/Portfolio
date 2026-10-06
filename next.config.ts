import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  // O site virou uma landing page única: as rotas antigas levam às seções.
  async redirects() {
    return [
      { source: "/about", destination: "/#sobre", permanent: true },
      { source: "/projects", destination: "/#projetos", permanent: true },
    ];
  },
};

export default nextConfig;
