import React from 'react'

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';


const Home = ({ products, bannerData }) => {
  return (
    <div>

      

      <HeroBanner HeroBanner={bannerData.length && bannerData[0]} />
      {console.log("bannerdata", bannerData, "products", products)}

      <div className='products-heading' >
        <h2>Best Selling Products</h2>
        <p>Speakers of many vairations</p>

        <div className='products-container' >
          {
            // ['Product 1', 'Product 2'].map(
            //   (product) => [product]
            // )


            products?.map((product) => product.name)

          }
        </div>
      </div>

      <FooterBanner />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);


  return {
    props: { products, bannerData }
  }

}

export default Home