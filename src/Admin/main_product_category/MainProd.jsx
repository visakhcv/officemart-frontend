import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { Link, Outlet } from 'react-router-dom'
import '../styles.css'
import { RiAdminFill } from "react-icons/ri";

function MainProd() {

    const [selectedOption, setSelectedOption] = useState(null);

    const adminbuttons = [
        {id:0, link: '/admin/layout/add', button: 'Add Category', icon: <IoMdAdd /> },
        {id:1, link: 'view', button: 'View Category', icon: <BsEyeFill /> },
    ]

  return (
    <>
        <div className='px-[32px] py-2  bg-white flex justify-between shadow-xl'>
            <div className=' flex justify-between w-full cursor-pointer '>
            <p className=' text-[18px] font-bold mt-1 md:mt-0 '>Main Category</p>
                <div className=' flex gap-2 items-center'>
                <RiAdminFill  className='text-4xl p-1  bg-yellow-300 rounded-full'/>
                <p className=' font-bold'>Admin</p>
                </div>
            </div>
                
            </div>
            <div className='flex gap-2  p-3'>
            {
                    adminbuttons?.map((posts,index) => (
                        <div key={index} className=" rounded-2xl" id='top-button' > <Link to={posts.link} key={posts.id}>
                            <button onClick={() => setSelectedOption(posts.id)} className={`w-full rounded-2xl p-2 md:text-lg  font-bold flex justify-center items-center gap-2  h-full  cursor-pointer ${selectedOption === posts.id ? 'bg-[#FFFBE1] border-2 border-yellow-300' : ''}`}
                            >
                               
                                {posts.icon}
                                <div className=' md:flex hidden'>
                                {posts.button}
                                </div> 
                                </button>
                        </Link></div>
                    ))
                }

            </div>
            <div className='h-full p-3'>
                <Outlet />
            </div>
        </>
  )
}

export default MainProd