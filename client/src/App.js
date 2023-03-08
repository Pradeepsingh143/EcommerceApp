import React from "react";
import Router from "./router/router.routes";
import { AuthProvider } from "./context/AuthProvider";
import { ProductProvider } from "./context/ProductProvider";
import { SingleProductProvider } from "./context/SingleProductProvider";
import { CartProvider } from "./context/CartProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <SingleProductProvider>
              <Routes>
                <Route path="/*" element={<Router />} />
              </Routes>
            </SingleProductProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
