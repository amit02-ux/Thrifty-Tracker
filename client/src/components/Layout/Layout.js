import React from 'react'
import Header from './Header'
import Footers from './Footers';

const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <div className='content'>{children}</div>

 
    </>
  )
}

export default Layout