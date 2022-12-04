import React from 'react'
import axios from "axios"
import { client } from '../lib/client';
import { client_base, base } from '../lib/client_fast'
import { FooterBanner, HeroBanner, ProductSQL, StaticFooterBanner } from '../components';
import { useStateContext } from '../context/StateContext'
import Link from 'next/link';

const Home = ({ bannerData, productsql }) => {


  const { banners, populateBanners } = useStateContext();

  // const banner_1 = { 'img_src': "" }
  // const banner_2 = { 'img_src': "" }

  const [banner_1, setBanner_1] = React.useState({})
  const [banner_2, setBanner_2] = React.useState({})

  React.useEffect(() => {
    populateBanners();
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

      {/* <HeroBanner HeroBanner={bannerData.length && bannerData[0]} /> */}

      {/* {
        // banner_1 &&  <StaticFooterBanner img_src={banner_1.img_src}  />
        banner_1  && <StaticFooterBanner banner={banner_1} />
      } */}
      {/* <p>{banner_1.img_src}</p> */}
      {
        banner_1 &&
        (
          <>
            <Link href={`/category/${banner_1.slug}`}>
              <a >
                <img className="static-banner" src={banner_1.img_src} alt={banner_1.description} />
              </a>
            </Link>
          </>
        )
      }


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
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const res_products = await fetch(`${base}/product_fromtopcategories?limit=20`)
  const productsql = await res_products.json()



  return {
    props: { bannerData, productsql }
  }

}

export default Home