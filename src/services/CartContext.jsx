import React, { createContext, useContext, useState } from 'react';
import { Toaster, toast } from 'sonner'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false)

  const login = (userData) => {

    localStorage.setItem('userDetails',userData)
    setIsLogin(true)
  };

  const logout = () => {
    // Implement your logout logic, e.g., clearing user data
    setUser(null);
    setIsLogin(false);
  };
  

  const addToCart = (product) => {
        let isPresent = false
        cart.forEach((existing)=>{
            if(existing.productItemsId === product.productItemsId)
            isPresent = true
            
        })
        if(isPresent){
            return toast.error("Product already in cart")
        }
        toast.success("added to cart")
        setCart((prevCart) => [...prevCart, product]);
        const cartList = JSON.stringify(cart);
        localStorage.setItem('cartItems',cart)
        setCartCount((prevCount) => prevCount + 1);
        
        
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart,cart, login,logout,user,isLogin }}>
      {children}
      <Toaster position="top-center" richColors={true} />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};