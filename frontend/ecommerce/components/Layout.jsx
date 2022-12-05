import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  String.prototype.slugify = function (separator = "-") {

    return this
      .toString()
      .normalize('NFD')                   // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, separator)   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, separator)   // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, separator);
  };

  String.prototype.titlefy = function (separator = "-") {
    return this
      .toString()
      .normalize('NFD')                   // split an accented letter in the base letter and the acent
      .replace(/\s+/g, ': ')
      .replace(/[\u0300-\u036f]/g, ' ')   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, ' ')   // remove all chars not letters, numbers and spaces (to be replaced)
      

  };

  return (
    <div className='layout' >
      <head>
        <title>Ecommerce Behavior Demo</title>
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