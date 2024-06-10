import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sectalogo from '../assets/logo/logo-full.png'
import { Menu, X } from 'lucide-react'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../services/CartContext';
import Profile from './Profile';
import { getCartByUserId, userAddToCart } from '../services/allApis';


function Navbar({ size }) {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState('');
    const [activeLink, setActiveLink] = useState('');
    const [products, setProduct] = useState(null);
    const [cartCount, setCartCount]= useState(localStorage.getItem('cartCount'))
    

    useEffect(() => {
        // Extract the current pathname from the location object
        const pathname = window.location.pathname

        // Set the current page based on the pathname
        setCurrentPage(getPageName(pathname));

        // Set the active link based on the pathname
        setActiveLink(pathname);
    }, [window.location.pathname]);

    const getPageName = (pathname) => {
        // You can implement your own logic to extract the page name
        // For example, removing leading slashes or converting to title case
        return pathname.replace('/', '');
    };

    const [color, setColor] = useState(false)
    const chnageColor = () => {
        if (window.scrollY >= 120) {     
            setColor(true)
        } else {
            setColor(false)
        }
    }
    

    window.addEventListener('scroll', chnageColor)

    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }

    const toHomePage = () => {
        navigate('/')
    }

    useEffect(()=>{
        getCartCount()
    },[userAddToCart])

    const getCartCount = async () => {
        const response = await getCartByUserId(localStorage.getItem('userid'))
        if(localStorage.getItem('cartCount')){
            localStorage.removeItem('cartCount')
            localStorage.setItem('cartCount',response.data.data.length)
        }else{
            localStorage.setItem('cartCount',response.data.data.length)
        }
        
    }

    return (
        <header className={`${color ? 'fixed  ':''} top-0 bg-[#263b61] bg-opacity-90  duration-300 py-[15px]  md:px-[100px] px-[20px]  z-[20] mx-0 flex w-screen  justify-between   `}>
            <div className='logo  md:w-3/6 flex items-center'>
                <img className='w-[140px] cursor-pointer' onClick={toHomePage} src={sectalogo} alt="logo" />
            </div>
            <nav className='flex justify-end md:w-3/6 w-1/6'>
                <div className={`${color ? 'text-white' : 'text-white'}  hidden w-full items-center justify-end md:flex gap-[70px] `}>
                    <Link to='/' className={`${activeLink === '/' ? 'text-red-500 border-b-[2px] duration-300 border-blue-500' : ''} font-semibold text-lg `}> Home</Link>
                    <Link to='' className={`${activeLink === '' ? 'text-red-500 border-b-[2px] border-blue-500' : ''} font-semibold text-lg `}> About </Link>
                    <Link to='/contactus' className={`${activeLink === '/contactus' ? 'text-red-500 border-b-[2px] border-blue-500' : ''} font-semibold text-lg `}> Contact </Link>
                    <Link to='/cart' className='font-semibold text-lg hover:font-bold relative'><FaShoppingCart className='text-green-500 hover:text-orange-500 text-2xl' /> <span className='absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex justify-center items-center bg-red-500 text-white rounded-full p-1 text-xs'>{cartCount || 0}</span> </Link>
                    <div className="relative">
                    <Profile />
                    </div>
                    
                </div>
                <div className='md:hidden  pt-[40px]'>
                    <button onClick={toggleNavbar}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>{
                isOpen && (
                    <div className=' flex flex-col bg-[#293975] text-white items-center basis-full '>
                        <Link to='/' className='w-full font-bold border-b  border-blue-800  text-lg'>
                            <div className='w-full h-16 items-center flex justify-center'>
                                Home
                            </div>
                        </Link>
                        <Link to='/myachievements' className='w-full border-b border-blue-800  font-bold text-lg'>
                            <div className='w-full h-16 items-center flex justify-center'>
                                About
                            </div>
                        </Link>
                        <Link to='/contactus' className='w-full border-b border-blue-800  font-bold text-lg'>
                            <div className='w-full h-16 items-center flex justify-center'>
                                Contact
                            </div>
                        </Link>
                        <Link to='/classes' className='w-full border-b border-blue-800  font-bold text-lg'>
                            <div className='w-full h-16 items-center flex justify-center'>
                                Cart
                            </div>
                        </Link>
                        <Link to='/login' className='w-full border-b border-blue-800  font-bold text-lg'>
                            <div className='w-full h-16 items-center flex justify-center'>
                                Login
                            </div>
                        </Link>

                    </div>
                )
            }

        </header>
    )
}

export default Navbar