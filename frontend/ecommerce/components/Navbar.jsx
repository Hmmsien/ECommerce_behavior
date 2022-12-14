import React from 'react'
import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';


function Navbar() {

  const { showCart, setShowCart, totalQuantities, sessionID } = useStateContext();
  const [AIModel, setAIModel] = React.useState('Change Recommendation Model');



  return (
    <div className='navbar-container' >
      <p className='="logo' >

        <Link href="/" >Ecommerce </Link>
        <Link className="nav-link" href="/graphics" >| Graphics </Link>

        <Link className="nav-link" href="/about" >| About </Link>
        <Link className="nav-link" href="/mfaq" >| Faq </Link>
        <Link className="nav-link" href="/contact-us" >| Contact Us </Link>

      </p>
      <p>Session ID: <span>{sessionID}</span></p>

      <button type="button" className='cart-icon' onClick={() => setShowCart(true)} >

        <AiOutlineShopping />

        <span className="cart-item-qty">
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}

    </div>
  )
}

export default Navbar
