import '../styles/globals.css'
import Layout from './../components/layout/Layout';


function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  return <Layout>
    <Component {...pageProps} />

  </Layout>
}

export default MyApp
