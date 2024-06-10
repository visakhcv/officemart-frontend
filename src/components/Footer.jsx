import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo-full.png'
import { Link } from 'react-router-dom'
import { productCategoryGet } from '../services/allApis'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";


function Footer() {

    const [products, setProducts] = useState([])
    

    useEffect(() => {
        getProducts()
        
    }, [])

    const getProducts = async () => {
        const response = await productCategoryGet()
        setProducts(response.data.data)
    }

    return (
        <div className='w-full h-[250px] flex justify-center  bg-[#263b61]'>
            <div className='flex  gap-2 mt-14 px-[100px] '>
                <div className='w-[30%] '>
                    <img className='w-[70%]' src={logo} alt="" />
                </div>
                <div className='w-[20%] text-white '>
                    <p className='font-semibold text-xl'> Products</p>
                    <div className='mt-4 flex flex-col gap-1'>
                        {
                        products.map((item, index) => (
                            <Link to={`/productpageone/${item.productCategory_id}`} key={index}>
                                {item.productCategory_name}
                            </Link>
                        ))
                        }
                    </div>
                </div>
                <div className='w-[20%] ps-6 text-white'>
                    <p className='font-semibold text-xl'> Links</p>
                    <div className='mt-4 flex flex-col gap-1'>
                        <Link to='/'>Home</Link>
                        <Link>About</Link>
                        <Link to='/contactus'>Contact</Link>
                        <Link to='/cart'>Cart</Link>
                    </div>
                </div>
                <div className='w-[20%] text-white'>
                        <p className='font-semibold text-xl'>Get in Touch</p>
                        <div className=' flex gap-3 mt-4'>
                        <CiFacebook className='  text-3xl hover:text-blue-500 cursor-pointer'/>
                        <FaInstagram className=' text-3xl hover:text-pink-500 cursor-pointer'/>
                        <FaWhatsapp className=' text-3xl hover:text-green-500 cursor-pointer'/>
                        <BiLogoGmail  className=' text-3xl hover:text-red-500 cursor-pointer'/>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Footer