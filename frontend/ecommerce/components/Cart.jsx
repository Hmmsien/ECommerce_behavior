import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline, tiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove, onPurchaseAll } = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef} >
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)} >
          <AiOutlineLeft />
          <span className='heading' >Your Cart</span>
          <span className='cart-num-items' >({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>

            <Link href="/">
              <button type='button' onClick={() => setShowCart(false)} className="btn" >
                Continue Shopping
              </button>
            </Link>

          </div>
        )}

        {console.log("Showing Cart items")}
        {console.log(cartItems)}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item.id} >
              <img src={item?.img_src} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  {item.product_name}
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => {
                        toggleCartItemQuantity(item.id, 'dec')
                      }}><AiOutlineMinus /></span>
                      <span className="num">{
                        item.quantity
                      }</span>
                      <span className="plus" onClick={() => {
                        toggleCartItemQuantity(item.id, 'inc')
                      }}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button type="button" className='remove-item' onClick={() => onRemove(item)} >
                    <TiDeleteOutline />
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn' onClick={() => onPurchaseAll(cartItems)} >
                Purchase All
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart