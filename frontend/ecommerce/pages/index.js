import React from 'react'

const Home = () => {
  return (
    <>
      Hero Banner
      
      <div className='products-heading' >
        <h2>Best Selling Products</h2>
        <p>Speakers of many vairations</p>

        <div className='products-container' >
          {
            ['Product 1', 'Product 2'].map(
              (product) => [product]
            )
          }
        </div>
      </div>

      Footer
    </>
  )
}

export default Home