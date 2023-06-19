import React from 'react'
import { urlFor } from '@/lib/client'
import { fectchProducts } from '@/lib/fetchProduct'

const page = async ({ params: {index, slug} }) => {
    const {product} = await fectchProducts(slug);
    return (
        <div className='h-[75vh]'>
            <img src={urlFor(product.image[index]).url()} className='block m-auto max-h-[75vh]' />
        </div>        
    )
}

export default page