import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client_base, base } from '../../lib/client_fast'

import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }) => {

    const { img_src, product_name, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd } = useStateContext();

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        {/* <img src={urlFor(image && image[index])} /> */}
                    </div>
                </div>
                <div className='product-details-desc' >
                    <h1>{product_name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    {/* <p>{details}</p> */}
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => { onAdd(product, qty) }}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={() => { }}>Buy Now</button>
                    </div>
                </div>
            </div>


        </div>

    )
}


export const getStaticProps = async () => {
    // const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    // const productsQuery = '*[_type == "product"]'
    // const product = await client.fetch(query)

    // const products = await client.fetch(productsQuery)

    // const bannerQuery = '*[_type == "banner"]';
    // const bannerData = await client.fetch(bannerQuery)

    // console.log(product)

    const product = {
        img_src: "",
        product_name: "sample",
        price: 23.1

    }

    const products = [product]

    return {
        props: { product, products }
    }

}

export default ProductDetails






