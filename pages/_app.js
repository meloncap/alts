import '../styles/globals.css'
import '../public/assets/css/nucleo-icons.css'
import '../public/assets/css/nucleo-svg.css'
import '../public/assets/css/soft-ui-dashboard.css'
import Layout from '../components/general/Layout'
import { AppContextProvider } from '../components/Context'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </>

  )
}

export default MyApp
