import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { RiDeleteBin6Line } from "react-icons/ri";
import '../styles.css'
import toast, { Toaster } from 'react-hot-toast';
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Gridview({ post, search }) {
  return (
    <>
            <div className='grid md:grid-cols-4 grid-cols-2 mt-4  gap-3   p-1'>
                {
                    post.filter((item) => {
                        return search.toLowerCase() === ''
                          ? item
                          : item.category_name.toLowerCase().includes(search)
                      }).map((posts,index) => (
                        <Card key={index} className='h-[250px]'>
                            <CardActionArea>
                                <CardMedia
                                
                                    component="img"
                                    className='h-[200px] transition duration-500 hover:scale-75 '
                                    image={ posts.imageUrl}
                                    alt="green iguana"
                                />
                                <CardContent className='py-2 flex justify-between'>
                                    <p  className=' text-lg font-semibold'>
                                        {posts.category_name}
                                    </p>
                                    <div className='flex gap-2'>
                                    <Link to={`/layout/add/update/${posts.category_id}`} className='bg-yellow-600 delete py-1 px-3 text-2xl rounded-lg hover:bg-blue-600 hover:text-white'><FaPen  /></Link>
                                    <button onClick={()=>manageDelete(posts.category_id)} className='bg-yellow-600 delete  py-1 px-3 text-2xl rounded-lg hover:bg-black'><RiDeleteBin6Line /></button>
                                    </div>
                                    
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
               
            </div>
            <Toaster/>
        </>
  )
}

export default Gridview