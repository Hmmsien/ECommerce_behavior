import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { base } from '../../lib/client_fast'
import { ProductSQL } from '../../components'
import { useStateContext } from '../../context/StateContext'
import Link from 'next/link'


const RECOMMENDATIONS = 20;

const ProductDetails = ({ product, products, sameCategoryProducts }) => {
    const router = useRouter()
    const { img_src, product_name, price, count } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, sessionID, onPurchase, setQty, updateHistorial, getRecommendations, historialRecommendations } = useStateContext();

    useEffect(() => {
        const interaction = {
            user_id: sessionID,
            product_id: product.product_id,
            event_type: "view",

        }
        setQty(1);
        // populateBanners();
        axios.post(`${base}/interaction`, interaction).then(function (response) {
            // console.log(response);
            getRecommendations(RECOMMENDATIONS);
            updateHistorial();
        })

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
                    <h1>{product_name.titlefy()}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div>
                        <p>
                            {count}
                        </p>
                    </div>
                    <h3>Category: <Link href={`/category/${product.category_code.slugify()}`} >
                        <a>{product.category_code.titlefy('-')}</a></Link></h3>

                    <h3>Brand:  <span>{product.brand.titlefy()}</span> </h3>
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
                <h2>Similar Products</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {sameCategoryProducts.map((item) => (
                            <ProductSQL key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
            {
                products &&
                (<div className="maylike-products-wrapper">
                    <h2>Other users also searched for...</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {products.map((item) => (
                                <ProductSQL key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>)
            }


            {
                historialRecommendations && historialRecommendations.length > 0 &&
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

    const SEEK_STATIC = 100
    // const SEEK_STATIC = 10
    const res = await fetch(`${base}/product?skip=0&limit=${SEEK_STATIC}`)
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


    const res = await fetch(`${base}/product_slug/${slug}`)
    const product = await res.json()

    const resRecommendation = await fetch(`${base}/ecommerce/recommendations_detail_product/${product.product_id}?limit=${RECOMMENDATIONS}`)
    const products = await resRecommendation.json()

    const resSameCategory = await fetch(`${base}/product_category/${product.category_code}?limit=${RECOMMENDATIONS}`)
    const sameCategoryProducts = await resSameCategory.json()

    console.log("sameCategoryProducts", sameCategoryProducts)

    return {
        props: { product, products, sameCategoryProducts }
    }

}

export default ProductDetails






