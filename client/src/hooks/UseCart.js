import { useContext } from "react";
import CartContext from "../context/CartProvider";

const UseCart = () => {
  return useContext(CartContext);
};

export default UseCart;
