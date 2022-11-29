import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client_base, base } from '../../lib/client_fast'

import { client, urlFor } from '../../lib/client'
import { Product, ProductSQL } from '../../components'
import { useStateContext } from '../../context/StateContext'


const ProductDetails = ({ product, products }) => {
    const router = useRouter()
    const { img_src, product_name, price, count } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, sessionID, onPurchase, setQty, updateHistorial, getRecommendations, historialRecommendations } = useStateContext();

    console.log("Recommendations received: ")
    console.log(historialRecommendations)
    useEffect(() => {
        // Post the lookup
        const interaction = {
            user_id: sessionID,
            product_id: product.product_id,
            event_type: "view"
        }
        setQty(1);

        axios.post(`${base}/interaction`, interaction).then(function (response) {
            console.log(response);
        })

        console.log("interaction", interaction)
        getRecommendations();
        updateHistorial();

        
    console.log("Products: ")
    console.log(products)

    }, [router.asPath])
    

    // console.log(`${base}/ecommerce/recommendations_detail_product/${product.product_id}?limit=5`)

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={img_src} />
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
                            {count}
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
                        <button type="button" className="buy-now" onClick={() => { onPurchase(product, qty) }}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>Other users also searched for...</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <ProductSQL key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>


            {
                historialRecommendations &&
                    (<div className="maylike-products-wrapper">
                        <h2>Based on your historial...</h2>
                        <div className="marquee">
                            <div className="maylike-products-container track">
                                {historialRecommendations?.map((item) => (
                                    <ProductSQL key={item.id} product={item} />
                                ))}
                            </div>
                        </div>
                    </div>)
            }

        </div>

    )
}

export const getStaticPaths = async () => {


    const res = await fetch(`${base}/product?skip=0&limit=5`)
    const products = await res.json()

    // const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }

}

export const getStaticProps = async ({ params: { slug } }) => {
    // const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    // const productsQuery = '*[_type == "product"]'
    // const product = await client.fetch(query)

    // const products = await client.fetch(productsQuery)

    // const bannerQuery = '*[_type == "banner"]';
    // const bannerData = await client.fetch(bannerQuery)

    // console.log(product)


    const res = await fetch(`${base}/product_slug/${slug}`)



    // Sample Structure
    // let product = {
    //     img_src: "",
    //     product_name: "sofa",
    //     price: 23.1

    // }
    const product = await res.json()

    const resRecommendation = await fetch(`${base}/ecommerce/recommendations_detail_product/${product.product_id}?limit=5`)
    const products = await resRecommendation.json()




    return {
        props: { product, products }
    }

}

export default ProductDetails






