import React from 'react'
import axios from "axios"
import { client } from '../lib/client';
import { client_base, base } from '../lib/client_fast'
import { Product, FooterBanner, HeroBanner, ProductSQL } from '../components';


const Home = ({ products, bannerData, productsql }) => {

  console.log("productsql", productsql)
  // console.log("requests", `${base}/product`)
  // axios.get(`${base}/product`).then((res) => {
  //   console.log(res.data)
  // })



  return (
    <div>

      <HeroBanner HeroBanner={bannerData.length && bannerData[0]} />
      {console.log("bannerdata", bannerData, "products", products)}

      <div className='products-heading' >
        <h2>Check them out!</h2>


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
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const res = await fetch(`${base}/product?skip=0&limit=5`)
  const productsql = await res.json()

  return {
    props: { products, bannerData, productsql }
  }

}

export default Home