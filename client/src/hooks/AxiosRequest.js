import { useState, useEffect } from "react";
import axios from "../api/axios";

function AxiosRequest(url, method, initialData) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", code: "" });

useEffect(() => {
  const message = setTimeout(() => {
    setMessage({message:"", code:""});
  }, 5000);

  return () => {
    clearTimeout(message)
  }
}, [message.message, message.code, url, method])


  const request = async (payload) => {
    try {
      setLoading(true);
      setMessage("");
      const response = await axios({
        method,
        url,
        data: payload,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setMessage({
        message: response?.data?.message,
        code: response?.status,
      });
      return response.data;
    } catch (error) {
      setMessage({
        message: error?.response?.data?.message || error?.message,
        code: error?.response?.status,
      });
      if (!error?.response) {
        setMessage("No Server Response");
      }
    } finally {
      setLoading(false);
    }
  };
  return [loading, message, request];
}

export default AxiosRequest;
