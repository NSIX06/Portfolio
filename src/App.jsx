import { Helmet } from 'react-helmet-async'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <>
      <Helmet>
        <title>Luiz Felipe Pablos Bugalho | Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Portfólio de Luiz Felipe Pablos Bugalho (NSIX06) — Desenvolvedor Full Stack baseado em Rondonópolis - MT."
        />
      </Helmet>
      <MainLayout />
    </>
  )
}
