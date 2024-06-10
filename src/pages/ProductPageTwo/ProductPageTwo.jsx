import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { productItemsGet, userAddToCart } from '../../services/allApis';
import SyncLoader from "react-spinners/SyncLoader";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../../services/CartContext';
import { toast } from 'sonner';
import Footer from '../../components/Footer';

function ProductPageTwo() {
  const { id } = useParams()
  const [productItems, setProductItems] = useState([])
  const [Loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserId] = useState(localStorage.getItem('userid'))
  const [size, setSize] = useState(null)
  const [addedToCartMap, setAddedToCartMap] = useState({}); // Map to track added to cart state for each product

  useEffect(() => {
    getProductItems()
  }, [])

  const getProductItems = async () => {
    const response = await productItemsGet(id)
    setProductItems(response.data.data)
    setLoading(false)
  }

  const filteredproductItemName = productItems.filter((product) =>
    product.productItemsName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = async (product) => {
    if (!token) {
      return toast.error("Please Login to continue", {
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

    const body = {
      'productid': product.productItemsId,
      'userid': userId,
      'size': size || null
    }

    const response = await userAddToCart(body);
    if (response.status == 200) {
      // Update the addedToCartMap with the product id
      setAddedToCartMap(prevState => ({
        ...prevState,
        [product.productItemsId]: true
      }));
      return toast.success(response.data.message, {
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
    }
    if (response.response.status == 403) {
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
  };

  return (
    <div className=' bg-[#e1e0e0] min-h-screen'>
      <Navbar />
      <div className='w-full flex justify-center'>
        <div className='flex mt-28  justify-end items-center bg-white w-[20%] h-[40px]  border-[2px] border-gray-200 shadow-xl'>
          <input type="text" className='w-full px-[10px] focus:outline-none' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <FaSearch className='mr-[10px]' />
        </div>
      </div>

      <div >
        {
          Loading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <SyncLoader color="#36d7b7" />
            </div>
          ) : (
            <div className='px-[100px] min-h-[70vh] py-[50px] gap-5 grid grid-cols-4'>

              {
                filteredproductItemName.map((product, index) => (
                  < >
                    <div className='w-[300px] rounded-xl hover:scale-105 duration-300 cursor-pointer flex flex-col justify-between bg-white border-[2px] h-[350px]' >
                      <Link to={`/productDetails/${product.productItemsId}`} key={index} className=' h-[80%] flex flex-col'>
                        <img className='w-full h-[250px]  object-contain' src={product.imageUrl} alt="" />
                        <div className='w-full flex  flex-col justify-center items-center text-white font-bold   '>
                          <p className='w-full text-center p-3 bg-gray-500 bg-opacity-80'>{product.productItemsName.toUpperCase()}</p>

                        </div>
                      </Link>

                      <button onClick={() => addToCart(product)} className={`flex justify-center items-center gap-2 w-full rounded-b-xl font-semibold text-[17px] text-white ${addedToCartMap[product.productItemsId] ? 'bg-green-500' : 'bg-sky-600'} h-[50px] duration-300 hover:bg-sky-300 hover:text-white`}>
                        {addedToCartMap[product.productItemsId] ? 'ADDED TO CART' : 'ADD TO CART'} <FaShoppingCart className='text-green-500' />
                      </button>

                    </div>
                  </>

                ))
              }
            </div>

          )
        }
      </div>
      <Footer/>
    </div>
  )
}

export default ProductPageTwo
