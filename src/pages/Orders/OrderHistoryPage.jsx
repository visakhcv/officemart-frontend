import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import {useNavigate} from 'react-router-dom'
import OrderHistory from '../../components/order_component/OrderHistory'

const OrderHistoryPage = () => {
  
  return (
    <div>
      <Navbar />
      <div className='mt-50px px-[25px]'><OrderHistory/>
      </div>
    </div>
  )
}

export default OrderHistoryPage