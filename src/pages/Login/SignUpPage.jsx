import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import SignUp from '../../components/login_component/Signup'
import {useNavigate} from 'react-router-dom'

const SignUpPage=()=> {
  const navigate= useNavigate()
  const [token,setToken] = useState(localStorage.getItem('token'))
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[])
  const headingStyles={ fontSize: '60px', color: 'black'}
  return (
    <div>
        <Navbar/>
        <SignUp/>
    </div>
  )
}

export default SignUpPage