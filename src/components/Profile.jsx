import React, { useState, useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [isLogin, setIsLogin] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        localStorage.removeItem('rzp_device_id');
        localStorage.removeItem('rzp_checkout_anon_id');
        localStorage.removeItem('rzp_checkout_user_id');
        toast.success('Logged out', {
            style: {
                border: '1px solid #263b61',
                //backgroundColor:'#263b61',
                padding: '16px',
                color: '#263b61',
            },
            iconTheme: {
                primary: '#263b61',
                secondary: '#FFFAEE',
            },
        });
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    }

    return (
        <>
            <div
                onClick={toggleDropdown}
                className={`${isDropdownOpen ? 'text-red-500 border-b-[2px] border-blue-500' : ''} font-semibold text-lg`}
            >
                <CgProfile />
            </div>

            {
                isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-md">
                        {/* Dropdown content goes here */}
                        {
                            token ? (
                                <>
                                    <div>
                                        <Link to="/orderhistory" className="block px-4 py-2 w-[100px] text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                    </div>
                                    <div onClick={handleLogout} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</div>
                                </>     

                            ) : (
                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                            )
                        }

                        {/* Add more dropdown items as needed */}
                    </div>
                )
            }
        </>

    )
}

export default Profile