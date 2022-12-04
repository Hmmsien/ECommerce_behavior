import React from 'react'

import { useStateContext } from '../../context/StateContext';
import { client_base, base } from '../../lib/client_fast'

const CategoriesGallery = ({ products })  => {


    return (
        <div>CategoriesGallery</div>
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
    }) )
    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params: { slug } }) => {
    const PRODUCTS_TO_FETCH = 20;


    const res = await fetch(`${base}/product_category_from_slug/${slug}?limit=${PRODUCTS_TO_FETCH}`)
    const products = await res.json()
    return {
        props: {products}
    }

}

export default CategoriesGallery