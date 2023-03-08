import {useContext} from "react";
import ProductContext from "../context/ProductProvider";

const UseProduct = ()=>{
    return useContext(ProductContext);
}

export default UseProduct