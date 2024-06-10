
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import GiftCoverHome from '../../components/Home components/GiftCoverHome'


const Home=()=> {
  const headingStyles={ fontSize: '60px', color: 'black'}
  return (
    <div className=' absolute'>
        <Navbar/>
        {/*<ProductDetailsView  id={1}/>*/}
        <GiftCoverHome />     
      <Footer/>
    </div>
  )
}

export default Home