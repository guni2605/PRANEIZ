import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Product from "./pages/Product";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ContextProvider } from "./store/ContextStore";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  return (
    <ContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/collection/product/:productId" element={<Product />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
