import { client } from '@/lib/client';

export async function fectchProducts(slug) {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
  
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return (
      {product, products}
    )
}