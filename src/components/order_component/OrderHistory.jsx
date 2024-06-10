import React, { useEffect, useState } from 'react';
import img1 from '../../assets/FeatureCardImages/featurecard1.jpg';
import { getOrderHistory } from '../../services/allApis';

function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState([])

  useEffect(() =>{
    getAllOrderHistory()
  },[])

  const getAllOrderHistory= async()=>{
    const response = await getOrderHistory(localStorage.getItem('userid'))
    setOrderData(response.data.data);
  }
  

  // Function to group orders by date
  const groupOrdersByDate = () => {
    const groupedOrders = {};
    orderData.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
      if (!groupedOrders[date]) {
        groupedOrders[date] = [];
      }
      groupedOrders[date].push(order);
    });
    return groupedOrders;
  };


  const handleOrderClick = (orderId) => {
    setSelectedOrder(orderId);
  };

  const goBack = () => {
    setSelectedOrder(null);
    navigate('/order-history');
  };

  const getOrderDetails = (orderId) => {
    const order = orderData.find(order => order.id === orderId);
    if (order) {
      return (
        <div className="flex">
          <div className="w-1/2 pl-8">
          <button onClick={() => goBack()} className="bg-[#263b61] mt-3 bg-opacity-90 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-2 ml-auto">Back</button>
            <h2 className="text-xl font-bold mt-8 mb-2">Shipping Address</h2>
            <div className="mb-4">
              <p>{order.address.flatno},</p>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
            </div>
            <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Transaction ID</h2>
            <p>{order.razorOrderId}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className=" w-full mb-4 flex ">
              <div className='w-[30%] font-medium'>
              <p >Item(s) Price </p>
              <p>Quantity </p>
              <p>Shipping</p>
              <hr className='mt-2 mb-2' />
              <p>Grand Total </p>
              </div>
              <div className='w-[15%]'>
                <p>₹{order.product.price}</p>
                <p>{order.quantity}</p>
                <p> ₹0.00</p>
                <hr className='mt-2 mb-2'/>
                <p className=' font-semibold'>₹{order.product.price * order.quantity}</p>
              </div>
              
            </div>
          </div>
          <div className="w-1/2 px-8 mb-5">
            <img src={order.product.imageUrl} alt={order.product.productItemsName} className="object-contain h-64 w-full" />
            <div className='flex flex-col gap-3'>
              <h2 className="text-xl font-bold mb-2">Product Details</h2>
              <p className='text-xl font-semibold '>{order.product.productItemsName.toUpperCase()}</p>
              <p className='text-large'>{order.product.productItemsDescription}</p>
              <p className='text-large font-semibold'>Price: ₹{order.product.price}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>No order details found.</p>;
    }
  };

  return (
    <div className="container mx-auto pt-20">
      {selectedOrder === null ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Order History</h1>
          {/* Grouped Orders Display */}


          {Object.entries(groupOrdersByDate()).map(([date, orders]) => (
            <div className=' border rounded-lg mb-4 p-3' key={date}>
              <h2 className="text-xl text-gray-700 font-semibold mb-2 pl-2">{date} </h2>
              <div className=' grid  grid-cols-2 gap-3'>
              {orders.map(order => (
                <div key={order.id} className="border shadow-md transition-transform hover:shadow-xl  mb-4 cursor-pointer rounded-md" onClick={() => handleOrderClick(order.id)}>
                  <div className="bg-gray-200 p-4 mb-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div >
                        <span className="font-semibold">Order Placed On:</span> {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div>
                      <span className="font-semibold">Time :</span> {order.createdAt.split('T')[1].split('.')[0]}
                      </div>
                      <div>
                        <span className="font-semibold">Total:</span> ₹{order.product.price * order.quantity}
                      </div>
                      <div>
                        <span className="font-semibold">Order ID : </span> {order.id}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center drop-shadow-md">
                    <div className="p-2 flex justify-center items-center">
                      <img src={order.product.imageUrl} alt={order.product.productItemsName} className=" object-contain px-[20px] h-32 w-full" />
                    </div>
                    <div className="w-3/4 ml-4">                  
                      <div className="mt-2">
                        <h3 className="text-lg font-semibold mb-2">{order.product.productItemsName.toUpperCase()}</h3>
                        <h3 className="text-lg font-semibold mb-2">₹{order.product.price}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>
          <div className="border p-4 mb-4">
            {getOrderDetails(selectedOrder)}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
