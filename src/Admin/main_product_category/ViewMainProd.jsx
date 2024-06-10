import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import '../styles.css'
import Listview from './Listview';
import Gridview from './Gridview';
import { productCategoryGet } from '../../services/allApis';

function ViewMainProd() {
    const [posts, setPosts] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [view,setView] = useState(true)

    useEffect(() =>{
        getMainCategory()
    },[])

    const getMainCategory = async () =>{
        const response = await productCategoryGet()
        setPosts(response.data.data)
    }

  return (
    <>
      <div className='flex w-full justify-end mt-[-72px]  gap-2 pr-1 md:pr-8'>
        <div className="relative flex items-center h-12 md:w-[30%] w-[50%] rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search category name.." />
        </div>
        <div className=' flex text-4xl justify-center items-center gap-1'>
        <FaList onClick={()=>setView(true)} id='list-grid' className='md:p-2 p-1  md:rounded-lg cursor-pointer'/>
        <IoGridSharp onClick={()=>setView(false)} id='list-grid' className='md:p-2 p-1 md:rounded-lg cursor-pointer'/>
        </div>
      </div>
      {
        view? (<Listview post={posts} search={searchItem}  />) : ( <Gridview post={posts} search={searchItem}  /> )
      }
      
    </>
  )
}

export default ViewMainProd