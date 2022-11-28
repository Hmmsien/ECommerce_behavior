import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { base } from '../lib/client_fast'

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [sessionID, setSessionID] = useState(uuidv4);

    let foundProduct;
    let index;

    const resetCart = () => {

        setCartItems([]);
        
        setTotalPrice(0);
        setQty(1);
        setTotalQuantities(0);
        setShowCart(false);
    }

    const onPurchase = (product) => {

        const interaction = {
            user_id: sessionID,
            product_id: product.product_id,
            event_type: "purchase"
        }

        axios.post(`${base}/interaction`, interaction).then(function (response) {
            console.log(response);
        })

        toast.success(`${qty} ${product.product_name} Purchased!`)
    }

    const onPurchaseAll = (cartItems) => {
        const purchasedItemNames = []
        cartItems.forEach(product => {
            console.log(`Attempting to purhcase ${product.product_id}`)
            purchasedItemNames.push(product.product_name)
            const interaction = {
                user_id: sessionID,
                product_id: product.product_id,
                event_type: "purchase"
            }


            axios.post(`${base}/interaction`, interaction).then(function (response) {
                console.log(response);
            })
            resetCart();

        });

        
        toast.success(`Purchased: ${purchasedItemNames.join(', ')}`)

    }

    function getPurchasedItemsNames(){

    }

    const onAdd = (product, quantity) => {


        const interaction = {
            user_id: sessionID,
            product_id: product.product_id,
            event_type: "cart"
        }

        axios.post(`${base}/interaction`, interaction).then(function (response) {
            console.log(response);
        })

        const checkProductInCart = cartItems.find((item) => item.id === product.id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct.id === product.id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            })

            console.log("New cart items:")
            console.log(updatedCartItems)

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.product_name} added to the cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item.id === product.id);
        const newCartItems = cartItems.filter((item) => item.id !== product.id)

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }


    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item.id === id)
        index = cartItems.findIndex((product) => product.id === id)
        const newCartItems = cartItems.filter((item) => item.id !== id)
        let addedCartItems = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]

        if (value === 'inc') {
            let addedCartItems = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]
            setCartItems(addedCartItems)
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
            // cartItems[index] = foundProduct;
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                let addedCartItems = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]
                setCartItems(addedCartItems)
                setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }

    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);



    }

    const decQty = () => {
        if (qty - 1 < 1) return 1;

        setQty((prevQty) => prevQty + -1);
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setQty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            sessionID,
            onPurchase,
            onPurchaseAll

        }} >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);






