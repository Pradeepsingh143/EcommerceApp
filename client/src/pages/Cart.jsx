import React from "react";
import { Link } from "react-router-dom";
import { Button, Paragraph } from "../utils/styledComponents/components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import UseCart from "../hooks/UseCart";

const Cart = () => {
  
  const {cart, removeCartItem, updateItemQty} = UseCart();

  return (
    <>
      <section className="bg-white" title="cart-page">
      {cart.length ? (
          <div className="max-w-screen-xl min-h-screen px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 container">
            <div className="max-w-3xl mx-auto">
              <div className="mt-8">
                <ul className="space-y-4">
                  {cart &&
                    cart.map((item, index) => (
                      <li key={index} className="flex items-center pr-2">
                        <img
                          src={`${item.previewImage.secure_url}`}
                          alt=""
                          className="object-cover w-10 h-10 sm:w-16 sm:h-16 rounded"
                        />

                        <div className="ml-2 sm:ml-4">
                          <h3 className="text-xs sm:text-sm overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[80px] sm:max-w-[160px]">
                            {item.name}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-black/75">
                            <div>
                              <dt className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[120px] sm:max-w-[200px]">
                                <Paragraph
                                  fontSize={"10px"}
                                  className={
                                    "hidden sm:flex overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]"
                                  }
                                >
                                  {item.shortDescription}
                                </Paragraph>
                              </dt>
                            </div>
                          </dl>
                        </div>
                        <div className="flex items-center justify-end flex-1 gap-2">
                          <div className="mr-1 sm:mr-8">
                            <p className="text-[12px] sm:text-[14px]">
                              <sup>$</sup>
                              {item.price * item.qty}
                            </p>
                          </div>
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              id="Line1Qt"
                              className="h-6 w-6 sm:h-8 sm:w-12 rounded border-black] bg-[#fff] p-0 text-center text-xs text-black"
                              onChange={(e) =>
                                updateItemQty(
                                  item._id,
                                  e.target.value === "" ? 1 : e.target.value
                                )
                              }
                            />
                          </form>

                          <button
                            className="text-gray-600 transition hover:text-red-600"
                            onClick={() => removeCartItem(item._id)}
                          >
                            <span className="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="flex justify-end pt-8 mt-8 border-t border-black">
                  <div className="w-screen sm:w-1/3 space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>
                          <sup>$</sup>
                          {cart.reduce(
                            (total, price) => total + price.price * price.qty,
                            0
                          )}
                        </dd>
                      </div>
                    </dl>
                    <div className="flex flex-col gap-2 justify-end">
                      {/* procced to checkout button */}
                      <Link to={"/checkout"}>
                        <Button
                          className="transition hover:opacity-90"
                          bgColor={"var(--primary)"}
                          width={"100%"}
                          height={"2.4em"}
                        >
                          Procced To Checkout
                        </Button>
                      </Link>

                      <Link
                        to={"/shop"}
                        className="text-sm underline transition underline-offset-4 hover:opacity-75 text-center tracking-wider"
                      >
                        Continue shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <div className="text-center h-screen flex flex-col justify-center items-center gap-5">
          <h2 className="text-xl">
            Nothing To preview please add some products in cart
          </h2>
          <Link to={"/shop"}>
            <Button
              color="var(--white)"
              bgColor={"var(--primary)"}
              width={"200px"}
              height={"50px"}
              className={
                "flex justify-center items-center gap-2 hover:opacity-90"
              }
            >
              <span>
                <AiOutlineShoppingCart />
              </span>{" "}
              Continue Shopping{" "}
            </Button>
          </Link>
        </div>
      )}
      </section>
    </>
  );
};

export default Cart;
