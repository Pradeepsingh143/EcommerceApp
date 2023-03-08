import React, { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { useCart } from "../context/Product.state";
// import PopupMessage from "./PopupMessage";

export const ProductCardSkeleton = () => {
  return (
    <>
      <div
        className="productCard border-2 flex flex-col w-full sm:w-[230px] rounded-md animate-pulse"
        title="product-card"
      >
        <div className="productImg relative">
          <div className="flex justify-center items-center w-full min-h-[130px] sm:min-h-[150px] md:min-h-[200px] mx-auto overflow-hidden bg-gray-100 rounded-lg animate-pulse dark:bg-gray-800">
            <svg
              class="w-16 h-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <p className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700 absolute -bottom-10 right-3 cursor-pointer hover:text-primary text-base sm:text-2xl" />
        </div>

        <div className="productDetails bg-[#fff] min-h-[80px] md:min-h-[90px] max-h-[90px] p-3 flex flex-col gap-4 justify-center">
          <p class="w-14 h-1 md:w-20 md:h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <p class="w-24 h-1 md:w-36 md:h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <p class="w-20 h-1 md:w-28 md:h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ productId, title, category, price, image }) => {
  // const cart = useCart(); // use cart context

  // async function addItemToCart(id) {
  //   try {
  //     await cart.addCartItem(id); // adding items to cart based on the product id
  //     cart.setPopupIsActive(true);
  //   } catch (error) {
  //     console.log(error.message);
  //     cart.setPopupIsActive(true);
  //   }
  // }
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div
        className="productCard border-2 flex flex-col w-full sm:w-[230px] rounded-md"
        title="product-card"
      >
        <div className="productImg relative">
          <Link to={`/productPage/${productId}/`}>
            {!isLoaded && (
              <div className="flex justify-center items-center w-full min-h-[200px] mx-auto overflow-hidden bg-gray-100 rounded-lg animate-pulse dark:bg-gray-800">
                <svg
                  class="w-16 h-16 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            )}
            <img
              onLoad={() => setIsLoaded(true)}
              style={{ display: isLoaded ? "block" : "none" }}
              src={image}
              alt=""
              className="w-full max-h-[130px] sm:max-h-[150px] md:max-h-[200px] object-cover rounded-t-md hover:opacity-90"
            />
          </Link>
          <BsFillCartPlusFill
            className="absolute -bottom-8 right-3 cursor-pointer hover:text-primary text-base sm:text-2xl"
            // onClick={() => addItemToCart(productId)}
          />
        </div>
        <div className="productDetails bg-[#fff]  min-h-[80px] md:min-h-[90px] md:max-h-[90px] p-3">
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
        {/* {cart.message && cart.message.message !== "" ? <PopupMessage /> : ""} */}
      </div>
    </>
  );
};

export default ProductCard;
