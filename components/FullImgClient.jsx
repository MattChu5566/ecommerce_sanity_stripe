"use client"

import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'

const FullImgClient = async ({children}) => {
  const router = useRouter();

  const closeImg = (e) => {
    if (e.target.tagName === 'IMG') return;
    router.back();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  return (
    <div className='bg-black/50 absolute top-0 w-full h-screen text-9xl z-[10000] flex' onClick={(e)=>closeImg(e)}>
      {children}
    </div>
  )
}

export default FullImgClient