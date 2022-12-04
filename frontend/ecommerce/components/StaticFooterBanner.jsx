import React from 'react'
// { product: { image, name, slug, price } })


function StaticFooterBanner({ banner: { img_src} }) {
  return (
    <div>StaticFooterBanner
        {img_src && img_src}
        
    </div>
  )
}

export default StaticFooterBanner