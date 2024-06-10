import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ForgotPassword from '../../components/login_component/ForgotPassword'
import {useNavigate} from 'react-router-dom'


const ForgotPasswordPage = () => {
  
  const navigate= useNavigate()
  const [token,setToken] = useState(localStorage.getItem('token'))
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[])
 
    
  return (
    <div>
      <Navbar />
      <div className='mt-50px'><ForgotPassword/>
      </div>
    </div>
  )
}

export default ForgotPasswordPage