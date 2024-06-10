import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductDetailsView from "../../components/productDetails_component/ProductDetails";
import Footer from "../../components/Footer";


const ProductDetailsPage = () => {

   
    const { id } = useParams() // Get the pid (product id) from URL parameter

    
    return (
        <div>
            <Navbar />
            <ProductDetailsView pid={id}  />
            <Footer/>
        </div>
    )
}

export default ProductDetailsPage;
