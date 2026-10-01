import { Helmet } from 'react-helmet-async'
import MainLayout from './layouts/MainLayout'
import { seo } from './data'

export default function App() {
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.siteUrl} />
      </Helmet>
      <MainLayout />
    </>
  )
}
