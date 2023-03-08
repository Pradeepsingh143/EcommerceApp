import { useContext } from "react";
import SingleProductContext from "../context/SingleProductProvider";

const UseSingleProduct = () => {
  return useContext(SingleProductContext)
}

export default UseSingleProduct