import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGetAllProduct = async () => {
    setLoading(true);
      try {
        const response = await axios.get("/api/product/get");
          setData(response.data?.products); 
          setLoading(false)  
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ data, setData, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
