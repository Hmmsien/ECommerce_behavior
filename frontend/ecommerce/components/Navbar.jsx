import React from 'react'
import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai'

function Navbar() {
  return (
    <div className='navbar-container' >
      <p className='="logo' >
        <Link href="/" >JSM Headphones</Link>
      </p>
      <button type="button" className='cart-icon' onclick="" >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          1
        </span>
      </button>
    </div>
  )
}

export default Navbar