'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '@/context/StateContext';
import { runFireworks } from '@/lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }, [])

    return (
        <div className='success-wrapper min-h-[70vh]'>
            <div className='sucess w-[500px] max-w-[90vw] h-[400px] mx-auto mt-10 p-10 bg-slate-300 rounded-2xl flex flex-col justify-center items-center text-center'>
                <p className='icon text-green-600 text-4xl'>
                    <BsBagCheckFill />
                </p>
                <h2 className='font-bold text-slate-700'>Thank you for your order!</h2>
                <p className='email-msg'>Check your email inbox for the receipt.</p>
                <p className="description my-10">
                    If you have any questions, please email
                    <a className="email ml-1 text-red-600" href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" className="btn w-56 bg-red-600 text-white px-5 py-3 rounded-2xl uppercase hover:scale-110 duration-300 transition-transform">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success