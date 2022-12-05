import React from 'react'
import axios from "axios"
import { base, base_local } from '../lib/client_fast'
import { FooterBanner, HeroBanner, ProductSQL, StaticFooterBanner, StaticBanner } from '../components';
import { useStateContext } from '../context/StateContext'
import Link from 'next/link';


const Home = ({  productsql, categories_with_banners }) => {


  const { banners, populateBanners } = useStateContext();
  

  // const banner_1 = { 'img_src': "" }
  // const banner_2 = { 'img_src': "" }

  const [banner_1, setBanner_1] = React.useState({})
  const [banner_2, setBanner_2] = React.useState({})


  React.useEffect(() => {
    populateBanners();
    console.log("categories_with_banners", categories_with_banners)
  }, [])

  React.useEffect(() => {

    banner_1 = setBanner_1(banners[0] ? banners[0] : {})
    banner_2 = setBanner_2(banners[1] ? banners[1] : {})

  }, [banners])

  React.useEffect(() => {

    console.log("Banner obtained from the state", banners[0])
    console.log("banner_1", banner_1)
  }, [banner_1, banner_2])



  return (
    <div>

      {
        banner_1 &&
        (
          <StaticBanner banner={banner_1} />
        )
      }



      <div className='products-heading' >
        <h2>Hot Categories...</h2>


        <div className='products-container' >
          {
            categories_with_banners?.map((category) => <>
             {(
              <>
              <Link href={`/category/${category.slugify()}`} >{category.titlefy()}</Link>
              </>
             )}
            </>)
          }
        </div>

      </div>


      <div className='products-heading' >
        <h2>Popular Products 🔥</h2>


        <div className='products-container' >
          {
            productsql?.map((product) => <>
              <ProductSQL product={product} />
            </>)
          }
        </div>

      </div>

      {
        banner_2 &&
        (
          <StaticBanner banner={banner_2} />
        )
      }

    </div>
  )
}

export const getServerSideProps = async () => {


  const res_products = await fetch(`${base_local}/product_fromtopcategories?limit=20`, {
    credentials: 'include'
  })
  const productsql = await res_products.json()

  const categories_with_banners_res = await fetch(`${base_local}/ecommerce/banner_categories?limit=25`)
  const categories_with_banners = await categories_with_banners_res.json()

  return {
    props: { productsql, categories_with_banners }
  }

}

export default Home