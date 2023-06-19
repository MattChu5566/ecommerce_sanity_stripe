import React from 'react'

const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image}}) => {
  return (
    <div className="footer-banner-container bg-slate-300 flex flex-wrap gap-20 justify-between p-10">
      <div className="left space-y-3">
        <p>{discount}</p>
        <h3 className='text-7xl text-white font-bold -ml-1'>{largeText1}</h3>
        <h3 className='text-5xl font-semibold'>{largeText2}</h3>
        <p className='text-white'>{saleTime}</p>
      </div>
      <div className="right space-y-3 my-auto">
        <p>{smallText}</p>
        <h3 className='text-5xl font-semibold !mb-3'>{midText}</h3>
      </div>
    </div>
  )
}

export default FooterBanner