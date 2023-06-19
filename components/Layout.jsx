import React from 'react'
import { Navbar, Footer } from './index'

const Layout = ( {children} ) => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default Layout