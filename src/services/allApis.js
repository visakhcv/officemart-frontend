import { BASE_URL } from "./base_url";
import { commonrequest } from "./commonrqst";



//product category 

 export const productCategoryGet = async ()=>{
    return commonrequest("GET",`${BASE_URL}/productcategory/getAll`)  //get all
 }


//sub category
export const subProductCategoryGet = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/subproductcategory/getAll/${params}`)  //get all
}

//product items
export const productItemsGet = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/productitems/getAll/${params}`)  //get all
}
export const productItemGetById = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/productitems/get/${params}`) 
}
export const featuredProductItemGet = async ()=>{
   return commonrequest("GET",`${BASE_URL}/productitems/featured`) 
}




//user login
export const userLogin = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/login`,body)  
}
//reset password
export const userResetPassword = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/resetpassword`,body)  
}
export const userResetPasswordOtp = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/verify/resetpassword`,body) 
}
export const userResetPasswordVerify = async (body)=>{
   console.log(body);
   return commonrequest("PUT",`${BASE_URL}/user/confirm/resetpassword`,body) 
}


// user register
export const userRegister = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/register`,body) 
}

//user register otp
export const userRegisterOtp = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/verify/otp`,body)  
}

//resend otp
export const resendOtp = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/user/resend/otp`,body)  
}




//add to cart
export const userAddToCart = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/cart/add`,body) 
}
export const getCartByUserId = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/cart/get/${params}`)  
}
export const incrementCount = async (params1,params2)=>{
   return commonrequest("PUT",`${BASE_URL}/cart/increment/product/${params1}/${params2}`)  
}
export const decrementCount = async (params1,params2)=>{
   return commonrequest("PUT",`${BASE_URL}/cart/decrement/product/${params1}/${params2}`)  
}
export const DeleteCartByProductId = async (params1,params2)=>{
   return commonrequest("DELETE",`${BASE_URL}/cart/delete/product/${params1}/${params2}`)  
}


//razorpay
export const orderUrl = async (body)=>{ 
   return commonrequest("POST",`${BASE_URL}/api/payment/orders`,body) 
}

export const verifyUrl = async (body)=>{
   return commonrequest("POST",`${BASE_URL}/api/payment/verify`,body) 
}


// user delivery address
export const AddDeliveryAddress = async (params,body)=>{
   return commonrequest("POST",`${BASE_URL}/user/add/deliveryaddress/${params}`,body) 
}

export const getDeliveryAddress = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/user/get/deliveryaddress/${params}`) 
}


//order
export const addOrderHistory = async (params,body)=>{
   console.log(body);
   return commonrequest("POST",`${BASE_URL}/order/add/${params}`,body) 
}

export const getOrderHistory = async (params)=>{
   return commonrequest("GET",`${BASE_URL}/order/get/${params}`) 
}

