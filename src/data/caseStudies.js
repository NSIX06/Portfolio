/**
 * Estudo de caso do TMG Caronas. Fonte: README de arquitetura do projeto.
 * Ficam de fora, de propósito: segredos, chaves de configuração, URLs internas
 * e débitos técnicos ou de segurança do repositório da empresa.
 */
export const caronasCase = {
  id: 'caso-tmg-caronas',
  projectId: 'tmg-caronas',
  title: 'TMG Caronas',
  eyebrow: 'Estudo de caso · Sistema corporativo',
  headline: 'Caronas corporativas entre colaboradores das bases da TMG.',
  summary:
    'Permite ofertar e solicitar caronas, gerenciar participações, avaliar viagens, acompanhar indicadores gerenciais e administrar acessos, tudo integrado ao Microsoft Entra ID e ao ecossistema corporativo.',
  badges: ['Em produção desde set/2026', 'Piloto do programa TMG IA', '.NET 10 · ASP.NET Core MVC', 'PWA instalável'],

  facts: [
    {
      label: 'Objetivo',
      value: 'Organizar caronas entre colaboradores, reduzindo custos e emissões e integrando as bases.',
    },
    {
      label: 'Público',
      value: 'Colaboradores da TMG e administradores responsáveis por operação, suporte e governança.',
    },
    {
      label: 'Arquitetura',
      value: 'Monolito web em camadas, renderização server-side (Razor), tempo real via SignalR e PWA.',
    },
  ],

  /** Principais capacidades (exibidas no CardSwap). */
  capabilities: [
    { icon: '🚗', title: 'Caronas', text: 'Oferta, solicitação, calendário, caronas ativas, histórico e recomendações inteligentes.' },
    { icon: '📋', title: 'Demandas', text: 'Registro de necessidades de carona e candidatura de motoristas.' },
    { icon: '⭐', title: 'Avaliações', text: 'Reputação de motoristas e passageiros após cada viagem.' },
    { icon: '📊', title: 'Dashboard', text: 'Painel pessoal e central executiva com KPIs, gráficos e relatórios exportáveis.' },
    { icon: '🔐', title: 'Gestão de acessos', text: 'Usuários, perfis, módulos e permissões granulares por módulo + ação.' },
    { icon: '🔔', title: 'Notificações', text: 'Avisos in-app, em tempo real por SignalR e via Microsoft Teams.' },
    { icon: '❓', title: 'Central de Ajuda', text: 'Guias, FAQs, comunicados, tutoriais e contatos administráveis.' },
  ],

  /** Camadas da solução, de cima para baixo. */
  layers: [
    {
      id: 'web',
      name: 'TMG.IA.Web',
      role: 'Apresentação',
      items: ['Controllers MVC e Razor Views', 'Políticas de autorização', 'Middlewares de segurança e logging', 'Hub SignalR', 'Motor de relatórios'],
    },
    {
      id: 'application',
      name: 'TMG.IA.Application',
      role: 'Regras de aplicação',
      items: ['Contratos de serviços e repositórios', 'Serviços de aplicação', 'Lógica de caronas (score de similaridade)'],
    },
    {
      id: 'infrastructure',
      name: 'TMG.IA.Infrastructure',
      role: 'Implementações concretas',
      items: ['Repositórios Dapper', 'Fábrica de conexão SQL', 'Azure Blob Storage', 'Scripts SQL versionados'],
    },
    {
      id: 'shared',
      name: 'TMG.IA.Shared',
      role: 'Tipos compartilhados',
      items: ['Options tipadas', 'Modelos de domínio', 'Sem dependências'],
    },
  ],

  dataFlow: ['Controller', 'Serviço', 'Repositório Dapper', 'SQL Server', 'ViewModel', 'Razor View'],

  stack: [
    { group: 'Back-end', items: ['C# · .NET 10', 'ASP.NET Core MVC', 'Dapper', 'SignalR', 'Hosted Services'] },
    { group: 'Front-end', items: ['Razor (SSR)', 'Bootstrap 4 + AdminLTE 3', 'Chart.js', 'DataTables', 'PWA + Service Worker'] },
    { group: 'Dados', items: ['SQL Server / Azure SQL', 'Scripts versionados aplicados na inicialização'] },
    { group: 'Integrações', items: ['Microsoft Entra ID (OIDC)', 'Azure Blob Storage', 'Microsoft Teams', 'Power Automate'] },
    { group: 'Relatórios', items: ['QuestPDF', 'ClosedXML', 'PDF · Excel · CSV · DOCX · JSON · XML'] },
    { group: 'Qualidade', items: ['xUnit', 'Injeção de dependência', 'Repository e Options pattern'] },
  ],

  security: [
    'Autenticação 100% delegada ao Microsoft Entra ID, sem senhas armazenadas',
    'Autorização dinâmica por módulo + ação, com perfis e exceções por usuário',
    'Toda requisição exige usuário autenticado e ativo por padrão',
    'Cabeçalhos de segurança e Content-Security-Policy',
    'HTTPS obrigatório com HSTS',
    'Sanitização do HTML editável da Central de Ajuda',
  ],

  practices: [
    { value: '4', label: 'camadas com dependências em um só sentido' },
    { value: '6', label: 'formatos de exportação de relatórios' },
    { value: '100%', label: 'do login via Microsoft Entra ID' },
    { value: 'V001→', label: 'scripts SQL versionados e idempotentes' },
  ],
}
