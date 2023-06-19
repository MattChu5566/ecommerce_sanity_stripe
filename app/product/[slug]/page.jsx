import React from 'react';

import { ProductClient } from '../../../components/index'

import { fectchProducts } from '@/lib/fetchProduct';
import { fetchImgUrl } from '@/lib/fetchImgUrl';

const ProductDetails = async ({ params: {slug} }) => {
  const {product, products} = await fectchProducts(slug);
  const imgUrl = await fetchImgUrl();

  return (
    <div>
      <ProductClient product={product} products={products} imgUrl={imgUrl}/>
    </div>
    
  )
}

export default ProductDetails