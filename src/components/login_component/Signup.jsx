import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import logo from '../../assets/logo/logo-full.png';
import OtpInput from 'react-otp-input';
import { resendOtp, userRegister, userRegisterOtp } from '../../services/allApis';
import { SyncLoader,FadeLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [email,setEmail]= useState("")
    const [otpLoading, setOtpLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showOTP, setShowOTP] = useState(false); //false
    const [hideForm, setHideForm] = useState(false); //false
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }else if (formData.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = "Phone number must be 10 digits";
        }

        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length === 0) {
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword:'',
                phoneNumber:'',
            });
            setErrors({});
            setLoading(true);
            console.log(formData);
            const response = await userRegister(formData);
            
            if (response.status == 200) {
                setEmail(response.data.email)
                setEmailSuccess(true);
                setLoading(false);
                setShowOTP(true);
                setHideForm(true);
                toast.success(response.data.message, {
                    style: {
                        border: '1px solid #263b61',
                        padding: '16px',
                        color: '#263b61',
                    },
                    iconTheme: {
                        primary: '#263b61',
                        secondary: '#FFFAEE',
                    },
                });
            } else if (response.response.status == 403 || response.response.status == 500) {
                setLoading(false);
                toast.error(response.response.data.message, {
                    style: {
                        border: '1px solid red',
                        padding: '16px',
                        color: '#263b61',
                    },
                    iconTheme: {
                        primary: 'red',
                        secondary: '#FFFAEE',
                    },
                });
            }
        } else {
            setErrors(errors);
        }
    };

    const handleVerifyOTP = async () => {
        // If OTP is successfully verified, navigate to home page
        
        const response = await userRegisterOtp({ "otp": otp });
      
        if (response.status === 201) {
            toast.success(response.data.message, {
                style: {
                    border: '1px solid #263b61',
                    padding: '16px',
                    color: '#263b61',
                },
                iconTheme: {
                    primary: '#263b61',
                    secondary: '#FFFAEE',
                },
            });
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        } else if (response.response.status === 403 || response.response.status === 404 || response.response.status === 402 || response.response.status === 500) {
            return toast.error(response.response.data.message, {
                style: {
                    border: '1px solid red',
                    padding: '16px',
                    color: '#263b61',
                },
                iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE',
                },
            });
        }
    };

    const handleBackButton = () => {
        setTimeout(() => {
            setShowOTP(false);
            setHideForm(false);
        }, 1000);
    }

    const handleForwardButton = () => {
        setTimeout(() => {
            setShowOTP(true);
            setHideForm(true);
        }, 1000);
    }

    const handleResendOtp=async()=>{
        setOtpLoading(true)
        const response = await resendOtp({'email':email})
        setOtpLoading(false)
        if (response.status == 200) {
            toast.success(response.data.message, {
                style: {
                    border: '1px solid #263b61',
                    padding: '16px',
                    color: '#263b61',
                },
                iconTheme: {
                    primary: '#263b61',
                    secondary: '#FFFAEE',
                },
            });
        }
    }

    return (
        <div className='bg-gray-200'>
            <div className="container mx-auto p-0 flex flex-col md:flex-row justify-center items-center h-screen ">
                <div className="w-full md:w-1/2 h-full p-8 flex flex-col justify-center items-center bg-[#263b61] bg-opacity-90">
                    <div className='logo w-1/2 md:w-3/6 flex items-center h-[80px]'>
                        <img className='cursor-pointer' src={logo} alt="logo" />
                    </div>
                    <h1 className="text-3xl font-semibold mb-10 mt-20 text-center text-white">Welcome Back!</h1>
                    <p className="mt-2 mb-4 text-center text-white">To keep connected with us please login with your personal info</p>
                    <div className="flex justify-center mt-10">
                        <button onClick={() => navigate('/login')} className='w-[140px] text-white rounded-2xl border-2 border-opacity-75 border-white h-[47px] duration-300 hover:bg-green-500 hover:text-white'>SIGN IN</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 pt-10 bg-white rounded shadow-md ">
                    {loading ? (
                        <div className=' flex justify-center'> <SyncLoader color="#36d7b7" /> </div>
                    ) : (
                        <>
                            <div className='flex relative mb-20 justify-center items-center'>
                                <h1 className="text-3xl font-bold  text-center">{showOTP ? "Verify OTP" : "Create an account"}</h1>
                                {showOTP && (<IoArrowBackCircle onClick={handleBackButton} className='text-4xl absolute left-0 cursor-pointer' />)}
                                {emailSuccess && (<IoArrowForwardCircle onClick={handleForwardButton} className={` ${showOTP == true ? 'left-12' : 'left-0'} text-4xl absolute  cursor-pointer`} />)}
                            </div>
                            <form onSubmit={handleSubmit} className={hideForm ? 'hidden' : 'flex flex-col'}>
                                <div className="mb-6 relative">
                                    <AiOutlineUser className="absolute top-3 left-3 text-gray-500" />
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10 w-full  py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Your Name" />
                                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <AiOutlineUser className="absolute top-3 left-3 text-gray-500" />
                                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="pl-10 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Your Phone Number" />
                                    {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <AiOutlineMail className="absolute top-3 left-3 text-gray-500" />
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Your Email" />
                                    {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <AiOutlineLock className="absolute top-3 left-3 text-gray-500" />
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 w-full  py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Create Password" />
                                    {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <AiOutlineLock className="absolute top-3 left-3 text-gray-500" />
                                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="pl-10 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Confirm Password" />
                                    {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
                                </div>                               
                                <div className="flex justify-center">
                                    <button type="submit" className="w-[140px] rounded-2xl mt-5 font-semibold bg-[#263b61] bg-opacity-90 text-white h-[47px] duration-300 hover:bg-green-500 hover:text-white">{showOTP ? "VERIFY OTP" : "SIGN UP"}</button>
                                </div>
                            </form>
                            {showOTP && (
                                <div className="mb-6 relative flex flex-col items-center">
                                    <label className='text-black font-semibold mb-5' htmlFor="otp">Please check your registered email and enter the received OTP:</label>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                        inputType={'numeric'}
                                        renderInput={({ ...restProps }) => (
                                            <input type="number" inputMode="numeric" {...restProps} />
                                        )}
                                        containerStyle="mt-2"
                                        inputStyle={{
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            margin: '0 5px',
                                            textAlign: 'center',
                                            outline: 'none',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    />
                                    <button className="mt-10 w-[70%] bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-300" onClick={handleVerifyOTP}>Verify</button>
                                    <div className='flex flex-col h-[50px] justify-center items-center gap-3'>
                                    <p className="mt-2 text-[17px] text-center text-blue-500">
                                        <div onClick={handleResendOtp} className=' cursor-pointer  ' >Resend OTP</div>
                                    </p>
                                    {
                                        otpLoading === true && (
                                            <FadeLoader className='text-[17px]' color="#36d7b7" />
                                        )
                                    }
                                    </div>
                                    

                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default SignUp;
