import '../styles/globals.css'
import { QuioscoProvider } from '../context/QuioscoProvider'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
      <Footer/>
    </QuioscoProvider>
  )
}

export default MyApp
