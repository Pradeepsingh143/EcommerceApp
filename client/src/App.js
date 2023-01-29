import React, {Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader.spinner";
import Router from "./router/router.routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.timeout = 8000;
const ProductProvider = lazy(() => import("./context/Product.state"));

function App() {
  return (
    <ProductProvider>
       <Suspense fallback={<Loader />}>
      <RouterProvider router={Router} />
      </Suspense>
    </ProductProvider>
  );
}

export default App;
