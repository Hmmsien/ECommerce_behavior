import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

function ProductSQL({ product: { img_src, product_name, slug, price } }) {
  return (
    <div>
      <Link href={`/products/${slug}`}>
        <div className="product-card" >
          <img src={img_src}
            width={250}
            height={250} />
          <p className="product-name">{product_name.titlefy()}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductSQL