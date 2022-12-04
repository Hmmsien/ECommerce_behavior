import React from 'react'

import { useStateContext } from '../../context/StateContext';
import { client_base, base } from '../../lib/client_fast'

import { ProductSQL } from '../../components';

const CategoriesGallery = ({ products, categoryBanner }) => {

    React.useEffect(() => {
        console.log("categoryBanner", categoryBanner);
        console.log("products", products);
    }, [])
    return (
        <>
            <div className='products-heading' >
                <h1>{categoryBanner.category_code.titlefy()}</h1>
            </div>

            <div className='products-container' >
                {
                    products?.map((product) => <>
                        <ProductSQL product={product.Product} />
                    </>)
                }
            </div>

        </>
    )
}

export const getStaticPaths = async () => {
    const PATHS_TO_CREATE = 5;
    const res = await fetch(`${base}/product_category/?limit=${PATHS_TO_CREATE}`)
    const res_categories = await res.json()
    const paths = res_categories.map((res_category) => ({
        params: {
            slug: res_category.slug
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params: { slug } }) => {
    const PRODUCTS_TO_FETCH = 200;


    const res = await fetch(`${base}/product_category_from_slug/${slug}?limit=${PRODUCTS_TO_FETCH}`)
    const products = await res.json()

    const categoryBanner = products[0]["Banner"] ? products[0]["Banner"] : undefined;

    return {
        props: { products, categoryBanner }
    }

}

export default CategoriesGallery