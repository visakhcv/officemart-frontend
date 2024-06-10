
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import CartProductCard from '../../components/cart_component/CartProductCard'
import tshirt from '../../assets/tshirt.jpg'
import './CartPage.css'
import CartLeft from '../../components/cart_component/CartAccount'
import CartDelivery from '../../components/cart_component/CartDelivery'
import CartPayment from '../../components/cart_component/CartPayment'
import { useCart } from '../../services/CartContext'
import cartempty from '../../assets/cartempty.png'
import { addOrderHistory, decrementCount, getCartByUserId, incrementCount } from '../../services/allApis'

const CartPage = () => {

    const [cart, setCart] = useState([])
    const [cartCount, setCartCount] = useState(0)
    // const {isLogin} = useCart()
    const [userId, setUserId] = useState(localStorage.getItem('userid'))
    const [isLogin, setIsLogin] = useState(false)
    const [deliverystatus, setDeliveryStatus] = useState(null)

    const totalItemsPrice = cart.reduce((total, product) => total + product.total, 0);
    const gst = (totalItemsPrice * 0.05); // Assuming 5% GST, you can adjust the percentage as needed
    const totalPrice = totalItemsPrice + gst;


    const cartItemsSend = async () =>{
        console.log(cart);
        const response = await addOrderHistory(userId,cart)
        console.log(response.data);
    }

    useEffect(() => {
        getCartItemsbyUserId()
    }, [])

    const getCartItemsbyUserId = async () => {
        const response = await getCartByUserId(userId)
        setCart(response.data.data);

    }

    const handleIncrement = async (id) => {
        const response = await incrementCount(userId, id)
        window.location.reload();
    }

    const handleDecrement = async (id) => {
        const response = await decrementCount(userId, id)
        window.location.reload();
    }

    useEffect(() => {

    }, [handleIncrement])

    const handleChildValue = (value) => {
        setDeliveryStatus(value);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        }
    }, [])

    return (
        <div className='bg-[#E9ECEE] min-h-screen h-full'>
            <Navbar />
            <div className='w-full  flex pt-[100px]  justify-center items-center'>
                <div className='w-[90%]  min-h-[80vh]  flex gap-6 '>
                    <div className='w-[60%] flex mb-[50px] gap-5 flex-col  h-full'>
                        <CartLeft loginstatus={isLogin} />
                        {<CartDelivery loginstatus={isLogin} deliverystatus={handleChildValue} />}
                        {<CartPayment totalprice={totalPrice} cartItemsSend={cartItemsSend} deliverystatus={deliverystatus} loginstatus={isLogin} />}
                    </div>
                    <div className='w-[40%] bg-white h-[600px] p-[20px]'>
                        {
                            cart.length === 0 && (
                                <div className=' h-full flex items-center'>
                                    <img src={cartempty} alt="" />
                                </div>
                            )
                        }
                        {
                            cart.length > 0 && (
                                <>
                                    <div className=' container h-[50vh]'>
                                        <CartProductCard products={cart} userid={userId} handleIncrement={handleIncrement} handleDecrement={handleDecrement} totalItemsPrice={totalItemsPrice} />
                                    </div>
                                    <div className='mt-[20px]'>
                                        <p className=' font-semibold'>  Bill Details  </p>
                                        <div className='flex mt-2 items-center justify-between text-gray-500  font-semibold text-sm'>
                                            <p>Items Total</p>
                                            <p>{totalItemsPrice} rs</p>
                                        </div>
                                        <div class=" border-b  border-gray-300 mt-[15px]"></div>
                                        <div className='flex mt-3 items-center justify-between text-gray-500  font-semibold text-sm'>
                                            <p>GST</p>
                                            <p>{gst} rs</p>
                                        </div>
                                        <div class=" border-b-2  border-black mt-[15px]"></div>
                                        <div className='flex mt-3 items-center justify-between   font-bold text-sm'>
                                            <p>TO PAY</p>
                                            <p>{totalPrice} rs</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartPage