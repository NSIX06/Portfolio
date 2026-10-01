module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    // o mapa da jornada é um widget controlado por teclado (role="application")
    'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel', 'application'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
