'use client'

import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Product } from './index'

import { urlFor } from '../lib/client'

const ProductClient = ({ product, products }) => {
    const { image, name, price, details } = product;

    const [index, setIndex] = useState(0);

    return (
        <div>
          <div className='product-detail-container'>
            <div>
              <div className='image-container'>
                <img src={urlFor(image && image[index]).url()} className='product-detail-image'></img>
              </div>
              <div className='small-image-container'>
                {
                  image?.map((item, i) => (
                    <img src={urlFor(item)}
                      className={i === index ? 'small-image selected-image' : 'small-image'}
                      onMouseEnter={() => setIndex(i)} />
                  ))
                }
              </div>
            </div>
            <div className='product-detail-desc'>
              <h1>{name}</h1>
              <div className='reviews'>
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>
                  (20)
                </p>
              </div>
              <h4>Details: </h4>
              <p>{details}</p>
              <p className='price'>${price}</p>
              <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                  <span className='minus' onClick=''>
                    <AiOutlineMinus />
                  </span>
                  <span className='num' onClick=''>
                    0
                  </span>
                  <span className='plus' onClick=''>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
              <div className='buttons'>
                <button type='button' className='add-to-cart' onClick=''>
                  Add to Cart
                </button>
                <button type='button' className='buy-now' onClick=''>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className='maylike-products-wrapper'>
              <h2>You may also like</h2>
              <div className='marquee'>
                <div className='maylike-products-container track'>
                  {products.map((item) => (
                    <Product key={item._id} product={item}/>
                  ))}
                </div>
              </div>
            </div>
        </div>
      )
}

export default ProductClient