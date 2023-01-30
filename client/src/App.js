import React, { lazy } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router.routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.timeout = 8000;
const ProductProvider = lazy(() => import("./context/Product.state"));

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={Router} />
    </ProductProvider>
  );
}

export default App;
