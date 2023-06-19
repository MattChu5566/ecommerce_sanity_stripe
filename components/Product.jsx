import React from 'react'
import Link from 'next/link'

const Product = ({ product: {name, slug, price}, imgUrl }) => {
  return (
    <div className='w-[250px]'>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card transition-transform duration-500 hover:scale-110'>
          <img
            src={(imgUrl[slug.current])[0]}
            className='product-image border-2 border-stone-600 rounded-xl'
            alt='digital piano'
          ></img>
          <p className='product-name'>{name}</p>
          <p className='product-price font-bold'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product