import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Login from '../../components/login_component/Login'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  
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
      <div className='mt-50px'><Login />
      </div>
    </div>
  )
}

export default LoginPage