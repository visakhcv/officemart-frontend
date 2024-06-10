import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { IoArrowBackCircle } from "react-icons/io5";
import logo from '../../assets/logo/logo-full.png';
import OtpInput from 'react-otp-input';
import { SyncLoader, FadeLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { userResetPassword, userResetPasswordOtp, userResetPasswordVerify } from '../../services/allApis';


function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [userid, setUserId] = useState(0);
    const [otpLoading, setOtpLoading] = useState(false)
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState('');
    const [showResetSection, setShowResetSection] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            const response = await userResetPassword(formData)
            //const response = await userRegister(formData);
            if (response.status == 200) {
                setEmailSuccess(true);
                setLoading(false);
                setShowOTP(true);
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
            } else if (response.response.status == 403 || response.response.status == 500 || response.response.status == 404) {
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

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const response = await userResetPasswordOtp({ 'otp': otp })
        
        //const response = await userRegisterOtp({ "otp": otp });
        if (response.status == 201) {
            // Once OTP is verified, navigate to password reset section
            setUserId(response.data.userId)
            setShowOTP(false);
            setEmailSuccess(true);
            setShowResetSection(true);

            return toast.success(response.data.message, {
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
         else if (response.response.status == 403 || response.response.status === 404 || response.response.status == 402 || response.response.status == 500) {
            console.log(response.response.data.message);
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

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length === 0) {
            // if Password validation succeeded, proceed with password reset

            const response = await userResetPasswordVerify({ 'userid': userid, 'password': formData.password })
            if (response.status == 200) {
                toast.success("Password reset successful!", {
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
                    navigate('/login');
                }, 1000);
            }

        } else {
            setErrors(errors);
        }
    };
    const handleResendOtp = async () => {
        setOtpLoading(true)
        const response = await resendOtp({ 'email': formData.email })
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
            <div className="container flex flex-col md:flex-row justify-center items-center h-screen pt-10 px-0">
                <div className="w-full md:w-1/2 h-[600px] p-8 flex flex-col justify-center items-center bg-[#263b61] bg-opacity-90">
                    <div className='logo w-1/2 md:w-3/6 flex items-center h-[80px]'>
                        <img className='cursor-pointer' src={logo} alt="logo" />
                    </div>
                    <h1 className="text-3xl font-semibold mb-10 mt-20 text-center text-white">Welcome Back!</h1>
                    <p className="mt-2 mb-4 text-center text-white">To keep connected with us please login with your personal info</p>
                    <div className="flex justify-center mt-10">
                        <button onClick={() => navigate('/login')} className='w-[140px] text-white rounded-2xl border-2 border-opacity-75 border-white h-[47px] duration-300 hover:bg-green-500 hover:text-white'>SIGN IN</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-[600px] flex flex-col justify-center p-8 bg-white rounded shadow-md ">
                    {loading ? (
                        <div className=' flex justify-center'> <SyncLoader color="#36d7b7" /> </div>
                    ) : (
                        <>
                            <div className='flex relative mb-20 justify-center items-center'>
                                <h1 className="text-3xl font-bold  text-center">{showOTP ? "Verify OTP" : showResetSection ? "Create New Password" : "Reset Password"}</h1>
                            </div>
                            <form onSubmit={showOTP ? handleVerifyOTP : handleEmailSubmit} className='flex flex-col'>
                                {(!showOTP && !showResetSection) && (
                                    <div className="mb-6 relative flex flex-col items-center">
                                        <AiOutlineMail className="absolute top-3 left-3 text-gray-500" />
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Your Registered Email" />
                                        {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                                        <button className="mt-10 w-[140px] bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-300" type="submit">Next</button>
                                    </div>
                                )}
                                {/*OTP Section*/}
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
                                        <button className="mt-10 w-[70%] bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-300" type="submit" onClick={handleVerifyOTP}>Verify</button>
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
                            </form>
                            {/* Password Reset Section */}
                            {showResetSection && (
                                <div className="mb-6 relative">
                                    <form onSubmit={handlePasswordReset} className='flex flex-col'>

                                        <div className="mb-6 relative">
                                            <AiOutlineLock className="absolute top-3 left-3 text-gray-500" />
                                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter New Password" />
                                            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
                                        </div>
                                        <div className="mb-6 relative">
                                            <AiOutlineLock className="absolute top-3 left-3 text-gray-500" />
                                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Confirm New Password" />
                                            {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                        <div className="flex justify-center">
                                            <button type="submit" className="w-[30%] rounded-2xl mt-5 font-semibold bg-[#263b61] bg-opacity-90 text-white h-[47px] duration-300 hover:bg-green-500 hover:text-white">RESET PASSWORD</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
