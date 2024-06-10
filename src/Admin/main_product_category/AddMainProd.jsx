import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { MoonLoader } from 'react-spinners'
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';

function AddMainProd() {
    const [image, setimage] = useState("")
    const [category_name, setCategory_name] = useState("")

    const [buttonclick, setbuttonclick] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    const onUpload = async (e) => {
        try {
            setimage(e.target.files[0])
        } catch (err) {

        }
    }
    // state for preview
    const [preview, setpreview] = useState('')

    // create useffect
    useEffect(() => {
        if (image) {
            // update preview
            setpreview(URL.createObjectURL(image))
        }
    }, [image])
  return (
    <>
            <div className='w-full'>
                {
                    loading ? (
                        <div className='w-full md:h-[60vh] flex justify-center items-center '>
                            <MoonLoader color="hsla(46, 100%, 50%, 1)" loading={loading} />
                        </div>

                    ) : (
                        <Form className=' flex flex-col justify-center'>


                            <div className='flex justify-center items-start flex-col gap-2 md:px-[80px] md:flex-row w-full mt-1 '>
                                <div className=' cursor-pointer flex flex-col bg-white w-full  rounded-lg md:w-3/6 justify-center items-center hover:shadow-lg transition duration-300 ease-in-out p-2'>
                                    <p className='text-xl font-semibold border-b-2 border-yellow-400 w-full p-2'>File upload</p>



                                    <Form.Control className=' hidden' type="file" label="image" accept='.jpeg, .png, .jpg' id="upload" name="img" onChange={onUpload} />
                                    <Form.Label htmlFor="upload"> <div className='md:w-[430px] w-[300px] cursor-pointer flex justify-center items-center border-2 m-4 border-dashed md:h-[250px] h-[150px] '>
                                        {
                                            image ? (<img className='md:w-[30rem] md:h-[14.8rem] object-contain  cursor-pointer' src={preview} alt="" />) : (<p className='text-gray-400 text-justify'>Click to browse your files</p>)
                                        }

                                    </div> </Form.Label>
                                </div>
                                <div className='md:w-4/6 w-full bg-white rounded-lg p-2 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 ease-in-out  md:ms-4'>
                                    <p className='text-xl font-semibold border-b-2 border-yellow-400 w-full p-2'>Main category</p>
                                    <div className=' cursor-pointer flex flex-col items-center justify-center md:h-[305px] h-[150px]  gap-2 md:w-[80%]'>

                                        <div className='w-full'>
                                            <InputLabel  > <span className='font-bold text-lg '>Main Category Name</span> <span className=' text-red-500'>&#42; </span> </InputLabel>
                                            <Input onChange={e => setCategory_name(e.target.value)} value={category_name} className=' w-full ps-2 mt-1' type="name" required />
                                        </div>

                                    </div>

                                </div>

                                <Toaster />
                            </div>
                            <div className='w-full mt-6 flex justify-center'>
                                {
                                    !buttonclick ? (
                                        <div className='px-4 py-2 flex w-[150px] mb-3 justify-end items-center hover:bg-[#ceb942] cursor-pointer bg-[#FDD90C] rounded '>

                                            <button type='submit' className=' w-full h-full text-black  font-bold'>Submit</button>
                                        </div>
                                    ) : (
                                        <div className=' w-1/6 h-11 flex justify-center items-center'>
                                            <Button className='w-full h-full' variant="primary" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </Button>
                                        </div>
                                    )
                                }
                            </div>

                        </Form>

                    )
                }

            </div>
        </>
  )
}

export default AddMainProd