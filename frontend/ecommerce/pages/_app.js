import '../styles/globals.css'

import { Layout } from '../components';
import { Toaster } from 'react-hot-toast'
import { StateContext } from '../context/StateContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
