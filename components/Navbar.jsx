'use client'

import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './index'
import { useStateContext } from '@/context/StateContext'

const Navbar = ({ imgUrl }) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container flex justify-between items-center bg-white h-14 border-b border-slate-300'>
      <p className='logo ml-5 hover:scale-110 hover:duration-300'>
        <Link href='/'>
          Home
        </Link>
      </p>

      <button type='button' className='cart-icon relative right-5 hover:scale-110 hover:duration-300 m-1' onClick={()=>setShowCart(!showCart)}>
        <AiOutlineShopping size={28}></AiOutlineShopping>
        <span className='cart-item-qty absolute top-0 -right-2 w-5 h-5 bg-red-600 rounded-full text-sm'>{totalQuantities}</span>
      </button>

      {showCart && <Cart imgUrl={imgUrl} />}
    </div>
  )
}

export default Navbar