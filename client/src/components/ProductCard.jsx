import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import img from "../images/demoimg.jpg";
import { useCart } from "../context/Product.state";
import PopupMessage from "./PopupMessage";

const ProductCard = ({ productId, title, category, price, image }) => {
  const cart = useCart(); // use cart context

  async function addItemToCart(id) {
    try {
      await cart.addCartItem(id); // adding items to cart based on the product id
      cart.setPopupIsActive(true);
    } catch (error) {
      console.log(error.message);
      cart.setPopupIsActive(true);
    }
  }
  

  return (
    <div className="productCard border-2 flex flex-col w-full sm:w-[230px] rounded-md" title="product-card">
      <div className="productImg relative">
        <Link to={`/productPage/${productId}/`}>
          <img
            src={image || img}
            alt=""
            className="w-full object-cover rounded-t-md hover:opacity-90"
          />
        </Link>
        <BsFillCartPlusFill
          className="absolute -bottom-8 right-3 cursor-pointer hover:text-primary text-base sm:text-2xl"
          onClick={() => addItemToCart(productId)}
        />
      </div>
      <div className="productDetails bg-[#fff] p-3">
        <h4 className="text-sm">{category || "category"}</h4>
        <h3 className="font-semibold text-xl">
          <Link to={`/productPage/${productId}/`}>
            <h3 className="text-sm leading-6">{title || "Product title"}</h3>
          </Link>
        </h3>
        <h4 className="text-sm">
          <strong className="font-medium">Price:</strong> ${price || 20}
        </h4>
      </div>
      {cart.message && cart.message.message !== "" ? <PopupMessage /> : ""}
    </div>
  );
};

export default ProductCard;
