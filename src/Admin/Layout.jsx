import React, { useState } from 'react'
import { MdSportsBasketball } from "react-icons/md";
import { IoShirtSharp } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './styles.css'
import logo from '../assets/logo/logo-full.png'

function Layout() {
  const [view,setView]= useState(true)
  const [selectedOption, setSelectedOption] = useState(null);

    const options=[{id:0,name:"Main Category",icon:<MdSportsBasketball />,link:"/admin/layout/add"},
  ]

  return (
    <>
    {
      view ? (<div className='h-screen w-screen '>
      <div className='h-full   flex md:flex-row sm:flex-col md:overflow-hidden flex-col'>
      <div className='bg-black  flex flex-col md:h-screen justify-evenly md:justify-start  md:w-[20%]'>
          <div className='flex mb-3 px-8 pt-[10px] md:pt-[20px] justify-center md:justify-start items-center gap-3'>
            <img className='' src={logo} alt="" />
          </div>
          <div className='ps-2  md:mt-3 flex md:flex-col justify-center'>
          {options?.map((option) => (
            <Link to={option.link} key={option.name}>
              <div
                id="sidebar-link"
                className={`flex p-2 cursor-pointer md:w-[90%] mb-3 rounded-full hover:bg-[#FFFBE1] ${
                  selectedOption === option.name || (!selectedOption && option.id === 0) ? 'bg-yellow-500' : ''
                }`}
                onClick={() => setSelectedOption(option.name)}
              >
                <h5 className="px-2 flex items-center gap-2 text-sm font-semibold md:text-lg">
                  <span> {option.icon} </span> {option.name}
                </h5>
              </div>
            </Link>
          ))}
          
          </div>
          <div className='flex items-end px-3 w-full justify-center  pb-4 h-full  text-white'>
            
            <button className='flex gap-2 md:w-[90%] justify-center text-yellow-500 cursor-pointer rounded-full hover:bg-gray-600 md:p-2 '> <RiLogoutCircleRLine  className=' text-2xl'/>Logout</button> 
            
          </div>
        
        </div>
        <div  className="md:w-[80%] overflow-y-scroll overflow-x-hidden bg-[#ebe9e9] ">
          <Outlet />
        </div>
    </div>
  </div>) : (<div className='w-full h-screen bg-gray-800'>
                <div className='bg-black w-full flex justify-center'>
                  <img src={logo} className='p-2 w-[200px]' alt="" />
                </div>
                <div className='w-full flex justify-center mt-[180px] items-center '>
                  <div className='bg-slate-100 gap-4 flex flex-col justify-center items-center border-8 border-yellow-500  w-[40%] h-[200px]'>
                      <p  className=' text-2xl font-bold'>Please login to continue this page</p>
                      <button className='flex gap-2 md:w-[90%] justify-center items-center text-2xl text-yellow-500 cursor-pointer rounded-full hover:bg-black md:p-2  font-semibold'> <RiLogoutCircleRLine  className=' '/>Back to Login</button>
                  </div>
                </div>
  </div>)
    }
    </>
  )
}

export default Layout