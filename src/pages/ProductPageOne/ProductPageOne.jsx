
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { subProductCategoryGet } from '../../services/allApis';
import Footer from '../../components/Footer';

function ProductPageOne() {
  
  const { id } = useParams()
  const [subProductCategory, setSubProductCategory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getSubProductCategory()
  },[])

  const getSubProductCategory = async ()=>{
    const response = await subProductCategoryGet(id)
    setSubProductCategory(response.data.data)
  }

  const filteredCategories = subProductCategory.filter((product) =>
  product.subProductCategoryName.toLowerCase().includes(searchQuery.toLowerCase())
);
  
  return (
    <div className=' bg-[#e1e0e0] min-h-screen'>
    <Navbar/>
    <div className='w-full flex justify-center'> 
    <div className='flex mt-28  justify-end items-center bg-white w-[20%] h-[40px]  border-[2px] border-gray-200 shadow-xl'>
      <input type="text" className='w-full px-[10px] focus:outline-none'  value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} />
      <FaSearch className='mr-[10px]'/>
    </div>
    </div>
    
    <div className='px-[100px] min-h-[70vh] py-[50px] gap-5 grid grid-cols-4'>
      {
        filteredCategories.map((product,index)=>(
          <Link to={`/productpagetwo/${product.subProductCategoryId}`} key={index} >
          <div style={{backgroundImage:`url(${product.imageUrl})`,backgroundSize:'contain',backgroundRepeat:'no-repeat', backgroundPosition:'center'}} className='w-[300px]  rounded-xl hover:scale-105 duration-300 cursor-pointer bg-white border-[2px] border-gray-200 shadow-xl h-[220px] relative'>
            <div className='w-full flex rounded-b-xl justify-center items-center text-white font-bold  absolute bottom-0 h-[40px] bg-gray-500 bg-opacity-80'>
              <p >{product.subProductCategoryName}</p>
            </div>
          </div>
          </Link>
          
        ))
      }
    </div>
    <Footer />
    </div>
  )
}

export default ProductPageOne