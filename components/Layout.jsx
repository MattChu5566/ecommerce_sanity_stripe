import React from 'react'
import { Navbar, Footer } from './index'
import { fetchImgUrl } from '@/lib/fetchImgUrl'

const Layout = async ( {children} ) => {
  const imgUrl = await fetchImgUrl();

  return (
    <div>
      <header className='sticky top-0 z-50'>
        <Navbar imgUrl={imgUrl}></Navbar>
      </header>
      <main>{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default Layout