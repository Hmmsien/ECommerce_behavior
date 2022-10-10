import '../styles/globals.css'

import { Layout } from '../components';

import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
