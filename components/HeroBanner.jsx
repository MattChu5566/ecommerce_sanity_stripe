import React from 'react'
import { ProductCarousel } from './index'
import { urlFor } from '@/lib/client';

const HeroBanner = ({ heroBanner }) => {
  const bannerImgUrl = {};

  heroBanner.image.forEach((img, index) => {
    bannerImgUrl[index] = urlFor(img).url();
  })

  return (
    <div className="hero-banner-container bg-slate-300 min-h-screen p-3 flex flex-wrap gap-10 justify-evenly">
      <div className='basis-2/6 my-auto min-w-[250px]'>
        <h3 className='text-5xl font-semibold'>{heroBanner.midText}</h3>
        <h1 className='text-7xl text-white font-bold -ml-1'>{heroBanner.largeText1}</h1>
        <div className="desc mt-5 text-justify">
          <p>{heroBanner.desc}</p>
        </div>
      </div>

      <div className=' basis-3/6 flex justify-center items-center min-w-[250px]'>
        <ProductCarousel bannerImgUrl={bannerImgUrl}/>
      </div>
    </div>
  )
}

export default HeroBanner