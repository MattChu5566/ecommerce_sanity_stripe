import React from 'react';

import { ProductClient } from '../../../components/index'

import { client } from '../../../lib/client';

const ProductDetails = async ({ params: {slug} }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return (
    <ProductClient product={product} products={products}/>
  )
}

export default ProductDetails