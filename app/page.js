import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { fetchImgUrl } from '@/lib/fetchImgUrl';

const Home = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query, { cache: 'no-store' });

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery, { cache: 'no-store' });

  const imgUrl = await fetchImgUrl();

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} products={products}/>

      <div className="products-heading text-center mt-10 mb-5">
        <h2 className='font-mono text-3xl font-bold'>Best Seller Products</h2>
      </div>
      <div className="products-container flex flex-wrap justify-center gap-4 mb-40 w-2/3 mx-auto ">
        {products?.map((product) => <Product key={product._id} product={product} imgUrl={imgUrl}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
};

export default Home;