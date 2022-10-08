import React from 'react'
import Link from 'next/link'

import {urlFor} from '../lib/client'

const HeroBanner = ({HeroBanner}) => {
    return (
        <div className='hero-banner-container' >
            <div>
                <p className="beats-solo">
                    {HeroBanner.smallText}
                </p>
                <h3>{HeroBanner.midText}</h3>
                <h1>{HeroBanner.largeText1}</h1>
                <img src={urlFor(HeroBanner.image)} alt="headphones" className='hero-banner-image' />

                <div>
                    <Link href={`/product/${HeroBanner.product}`}>
                        <button type='button'>
                            {HeroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{HeroBanner.desc}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeroBanner