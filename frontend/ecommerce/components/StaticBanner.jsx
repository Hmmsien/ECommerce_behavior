import React from 'react'
// { product: { image, name, slug, price } })
import Link from 'next/link'

function StaticBanner({ banner }) {
  return (
    <div>
    <Link href={`/category/${banner.slug}`}>
      <a >
        <img className="static-banner" src={banner.img_src} alt={banner.description} />
      </a>
    </Link>
  </div>
  )
}

export default StaticBanner