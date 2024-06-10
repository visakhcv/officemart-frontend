import React, { useState } from 'react'
import '../styles.css'
import Table from 'react-bootstrap/Table';
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Listview({ post, search }) {
  return (
    <>

            <div className='mt-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr className=' text-center text-xl'>
                            <th>Id</th>
                            <th>Category image</th>
                            <th>Category name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            post.filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.category_name.toLowerCase().includes(search)
                            }).map((posts, index) => (
                                <tr key={index} className='text-center align-middle'>
                                    <td >{posts.category_id}</td>
                                    <td className=' flex justify-center'><img style={{ objectFit: 'contain' }} className=' w-[150px] h-[150px]' src={posts.imageUrl} alt="" /></td>
                                    <td className='font-semibold text-lg'>{posts.category_name}</td>

                                    <td className='' >
                                        <div className='flex justify-center'>
                                        <Link to={`/layout/add/update/${posts.category_id}`} className='bg-yellow-600 delete mr-3 py-1 px-3 text-2xl rounded-lg hover:bg-blue-600 hover:text-white'><FaPen  /></Link><button onClick={()=>manageDelete(posts.category_id)} className='bg-yellow-600 delete py-1 px-3 text-2xl rounded-lg hover:bg-black'><RiDeleteBin6Line /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Toaster />
            </div>
        </ >
  )
}

export default Listview