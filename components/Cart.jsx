'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';

const Cart = ({ imgUrl }) => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if (response.statusText === 'Error on connection to STRIPE' ) {
      alert(response.statusText);
      return;
    } else if (response.status !== 200) {
      alert(response.status + ' ' + response.statusText);
      return;
    }
    
    const stripeData = await response.json();
    toast.loading('Redirecting...');
    window.location.href = stripeData.url;
  }

  return (
    <div className={`cart-wrapper fixed right-0 top-0 bg-white/70 h-screen w-screen`} ref={cartRef}>
      <div className='cart-container right-0 absolute bg-white h-[100vh] w-[95vw] max-w-[600px] border-l border-slate-300'>
        <div className='flex items-center relative'>
          <button 
            type='button'
            className='cart-heading flex items-center my-5 ml-5 font-bold peer hover:text-orange-600'
            onClick={()=>setShowCart(false)}
          >
            <AiOutlineLeft />
          </button>
          <div className='tooltip invisible peer-hover:visible bg-black text-white rounded-lg p-1 ml-3 font-normal text-sm absolute left-7'>hide</div>       
          <span className='heading ml-5'>Your Cart</span>
          <span className='cart-num-items ml-3 text-red-600'>{`(${totalQuantities} items)`}</span>
        </div>
        
        {cartItems.length < 1 && (
          <div className='empty-cart w-fit mx-auto flex flex-col items-center'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={()=>setShowCart(false)}
                className='btn bg-black text-white rounded-xl p-3 mt-10 transition-transform duration-300 hover:scale-110'
              >
                Back to Home Page
              </button>
            </Link>
          </div>
        )}

        <div className='product-container h-[65vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full'>
          {cartItems.length > 0 && cartItems.map((item) => (
            <div className='product flex flex-wrap justify-center mt-10 mx-[5%] gap-10' key={item._id}>
              <Link href={`/product/${item.slug.current}`}>
                <img src={(imgUrl[item.slug.current])[0]} className='cart-product-image h-48 w-48' onClick={()=>setShowCart(false)} />
              </Link>
              
              <div className='item-desc my-5 grow flex flex-col gap-5 justify-evenly max-w-sm'>
                <div className='font-bold flex justify-between gap-5'>
                  <h5 className='max-w-[60%] break-words'>{item.name}</h5>
                  <h4 className='max-w-[40%] break-words'>${item.price}</h4>
                </div>

                <div className='flex justify-between'>
                  <div>
                    <p className='quantity-desc flex'>
                      {
                        cartItems.filter((cartItem) => cartItem._id === item._id)[0].quantity > 1 ? 
                        <button type='button' className='minus w-8 h-8 border-2 border-black rounded-md hover:scale-110 ' onClick={()=>toggleCartItemQuantity(item._id, 'dec')}>
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
                      <button className='num w-8 h-8'>
                       {item.quantity}
                      </button>
                      <button type='button' className='plus w-8 h-8 border-2 border-black rounded-md hover:scale-110' onClick={()=>toggleCartItemQuantity(item._id, 'inc')}>
                        <div className='m-auto w-fit'>
                          <AiOutlinePlus />
                        </div>
                      </button>
                    </p>
                  </div>

                  <button type='button' className='remove-item text-red-600 text-2xl' onClick={()=>onRemove(item._id)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>  
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className='cart-bottom bottom-10 absolute w-full'>
            <div className='total flex justify-between my-10 font-bold w-[250px] mx-auto'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container w-fit h-fit m-auto'>
              <button type='button' className='btn btn bg-black text-white rounded-xl p-3 m-auto transition-transform duration-300 hover:scale-110' onClick={()=>handleCheckout()}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart