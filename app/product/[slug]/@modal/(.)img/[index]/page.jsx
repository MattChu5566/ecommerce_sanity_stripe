import React from 'react'
import { FullImgClient } from '@/components'
import { fectchProducts } from '@/lib/fetchProduct'
import { urlFor } from '@/lib/client'

const page = async ({ params: {slug, index}}) => {
  const {product} = await fectchProducts(slug);
  return (
    <>
      <FullImgClient>
        <img src={urlFor(product.image[index]).url()} className='block m-auto' />
      </FullImgClient>
    </>
  )
}

export default page