'use client'

import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { useStateContext } from '../context/StateContext'

import { Product } from './index'

import Link from 'next/link';

const ProductClient = ({ product, products, imgUrl }) => {
    const { image, name, price, details, slug } = product;

    const [index, setIndex] = useState(0);

    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
      onAdd(product, qty);
      setShowCart(true);
    }

    return (
        <div>
          <div className='product-detail-container mt-10 mx-[50px] flex flex-wrap justify-evenly gap-10 min-h-screen'>
            
            <div className='min-w-min'>
              <div className='image-container w-64 h-64 mb-10 p-5 border-black rounded-xl mx-auto flex items-center'>
                {image && 
                  <Link href={ '/product/' + slug.current + '/img/' + index}>
                    <img src={(imgUrl[slug.current])[index]} className='product-detail-image'></img>
                  </Link>
                }               
              </div>
              <div className='small-image-container flex flex-wrap gap-3 max-w-[324px] w-[95vw] mx-5'>
                {
                  image?.map((item, i) => (
                    <img 
                      key={item._key}
                      src={(imgUrl[slug.current])[i]}
                      className={(i === index ? 'small-image selected-image' : 'small-image') + ' h-[100px] w-[100px] hover:border-2 border-black rounded-xl'}
                      onMouseEnter={() => setIndex(i)} />
                  ))
                }
              </div>
            </div>

            <div className='product-detail-desc w-1/2 min-w-[250px]'>
              <h1 className='text-2xl font-bold'>{name}</h1>
              <div className='reviews flex items-center my-3'>
                <div className='flex text-red-600 w-fit'>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <div className='w-fit'>
                  (20)
                </div>
              </div>
              <h4 className='font-bold'>Details: </h4>
              <p className='text-justify'>{details}</p>
              <p className='price my-5 text-red-600 text-2xl font-bold'>${price}</p>
              <div className='quantity flex items-center gap-3'>
                <h3 className='font-bold '>Quantity:</h3>
                <p className='quantity-desc flex'>
                {
                  qty > 1 ? 
                  <button type='button' className='minus w-8 h-8 border-2 border-black rounded-md hover:scale-110 ' onClick={decQty}>
                    <div className='m-auto w-fit'>
                      <AiOutlineMinus />
                    </div>
                  </button>
                  :
                  <button type='button' className='minus w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-md'>
                    <div className='m-auto w-fit'>
                      <AiOutlineMinus />
                    </div>
                  </button>
                }
                  <button className='num w-8 h-8 text-center'>
                    {qty}
                  </button>
                  <button type='button' className='plus w-8 h-8 border-2 border-black rounded-md' onClick={incQty}>
                    <div className='m-auto w-fit'>
                      <AiOutlinePlus />
                    </div>
                  </button>
                </p>
              </div>
              <div className='buttons mt-5 flex flex-wrap gap-5'>
                <button type='button' className='add-to-cart border border-black w-40 p-1 hover:scale-110 transition-transform duration-300' onClick={()=>onAdd(product, qty)}>
                  Add to Cart
                </button>
                <button type='button' className='buy-now w-40 p-1 bg-black text-white hover:scale-110 transition-transform duration-300' onClick={()=>handleBuyNow()}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          
          <div className='maylike-products-wrapper mt-52'>
              <h2 className='w-fit m-auto text-xl font-bold mb-10'>You may also like</h2>
              <div className='marquee relative h-60 overflow-hidden'>
                <div
                  className={`maylike-products-container track flex gap-3 absolute ease-linear w-[600px] mt-5 left-[100vw] animate-[marquee_15s_linear_infinite] hover:pause`}>
                  {products.map((item) => (
                    <Product key={item._id} product={item} imgUrl={imgUrl}/>
                  ))}
                </div>
              </div>
            </div>
        </div>
      )
}

export default ProductClient