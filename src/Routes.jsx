import React from "react";
import { Oval } from "react-loader-spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainProd from "./Admin/main_product_category/MainProd";
import AddMainProd from "./Admin/main_product_category/AddMainProd";
import ViewMainProd from "./Admin/main_product_category/ViewMainProd";
import { CartProvider } from "./services/CartContext";

const HomePage = React.lazy(() => import('./pages/HomePage/Home'))
const ProductPageOne = React.lazy(() => import('./pages/ProductPageOne/ProductPageOne'))
const ProductPageTwo = React.lazy(() => import('./pages/ProductPageTwo/ProductPageTwo'))
const ContactPage = React.lazy(() => import('./pages/contactus/ContactPage'))
const CartPage = React.lazy(() => import('./pages/Cart/CartPage'))
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetails/ProductDetailsPage'))
const LoginPage = React.lazy(() => import('./pages/Login/LoginPage'))
const SignUpPage = React.lazy(() => import('./pages/Login/SignUpPage'))
const ForgotPasswordPage = React.lazy(() => import('./pages/Login/ForgotPasswordPage'))
const OrderHistoryPage = React.lazy(() => import('./pages/Orders/OrderHistoryPage'))
const Layout = React.lazy(() => import('./Admin/Layout'))

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><Oval
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    /></div>}>
      <CartProvider >
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/productpageone/:id" element={<ProductPageOne />} />
          <Route path="/productpagetwo/:id" element={<ProductPageTwo />} />
          <Route path="/productDetails/:id" element={<ProductDetailsPage />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="admin/layout" element={<Layout />}>
            <Route path="/admin/layout/add" element={<MainProd />}>
              <Route path="/admin/layout/add" element={<AddMainProd />} />
              <Route path="view" element={<ViewMainProd />} />
            </Route>
          </Route>

        </Routes>
      </Router>
      </CartProvider>
    </React.Suspense>
  );
};
export default ProjectRoutes;