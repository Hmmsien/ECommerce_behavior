import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div className='layout' >
      <head>
        <title>JS Mastery Store</title>
      </head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout