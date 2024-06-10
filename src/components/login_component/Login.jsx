import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import logo from '../../assets/logo/logo-full.png';
import { userLogin } from '../../services/allApis';
import {toast} from 'sonner';
import { useCart } from '../../services/CartContext';

function Login() {
    const navigate = useNavigate();
    const {login} = useCart()

    useEffect(()=>{
        if(localStorage.getItem('token')){
          navigate('/')
        }
      },[])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

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

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length === 0) {

            console.log("Form submitted:", formData);

            setFormData({
                email: '',
                password: ''
            });
            setErrors({});
            const response = await userLogin(formData)
            if(response.status == 200){
                localStorage.setItem('token',response.data.data.tokens.accessToken)
                localStorage.setItem('userName',response.data.data.user.userName)
                localStorage.setItem('email',response.data.data.user.email)
                localStorage.setItem('phonenumber',response.data.data.user.phonenumber)
                localStorage.setItem('userid',response.data.data.user.id)
                toast.success(response.data.message, {
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
                    navigate('/')
                }, 1000);  
            }
            if(response.response.status == 404 || response.response.status == 403 || response.response.status == 401 || response.response.status == 500){
                return toast.error(response.response.data.message, {
                    style: {
                      border: '1px solid red',
                    //backgroundColor:'#263b61',
                      padding: '16px',
                      color: '#263b61',
                    },
                    iconTheme: {
                      primary: 'red',
                      secondary: '#FFFAEE',
                    },
                  });
            }

            // Redirect to home page
            // navigate('/');
        } else {
            // Update the errors state with the validation errors
            setErrors(errors);
        }
    };

    return (
        <div className='bg-gray-200'>
            <div className="container flex flex-col md:flex-row m-0 p-0 justify-center items-center h-screen ">
                <div className="w-full md:w-1/2 p-8 h-full flex flex-col justify-center items-center bg-[#263b61] bg-opacity-90">
                    <div className='logo w-1/2 md:w-3/6 flex items-center h-[80px]'>
                        <img className='cursor-pointer' src={logo} alt="logo" />
                    </div>
                    <h1 className="text-3xl font-semibold mb-10 mt-20 text-center text-white">Welcome!</h1>
                    <p className="mt-2 mb-4 text-center text-white">Enter your personal details to start journey with us</p>
                    <div className="flex justify-center mt-10">
                        <button onClick={() => navigate('/signup')} className='w-[140px] text-white rounded-2xl border-2 border-opacity-75 border-white h-[47px] duration-300 hover:bg-green-500 hover:text-white'>SIGN UP</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 h-full flex flex-col justify-center bg-white rounded shadow-md ">
                    <h1 className="text-3xl font-bold mb-20 text-center">Sign In to OfficeMart</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col">                 
                        <div className="mb-6 relative flex items-center">
                            <AiOutlineMail className="absolute top-3 left-3 text-gray-500" />
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className=" w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Your Email" />
                            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-6 relative">
                            <AiOutlineLock className="absolute top-3 left-3 text-gray-500" />
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Your Password" />
                            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-[140px] rounded-2xl mt-10 font-semibold bg-[#263b61] bg-opacity-90 text-white h-[47px] duration-300 hover:bg-green-500 hover:text-white">LOGIN</button>
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
