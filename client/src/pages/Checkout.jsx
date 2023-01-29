import React from "react";
import { Button} from "../utils/styledComponents/components";
import { FaShopware } from "react-icons/fa";
import { useCart } from "../context/Product.state";
import { Link } from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {CgPaypal} from "react-icons/cg"


const Checkout = () => {
  const cart = useCart();

  return (
    <>
      <section className="bg-white" title="checkout-page">
        <h1 className="sr-only">Checkout</h1>

        <div className="container grid grid-cols-1 mx-auto md:grid-cols-2">
          <div className="py-8 md:py-16">
            <div className="px-4 space-y-8">
              <div className="flex items-center">
                <FaShopware fontSize={"32px"} color={"var(--primary)"} />

                <h2 className="ml-4 font-medium text-gray-900">
                  Checkout Page
                </h2>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  <sup>$</sup>
                  {cart.cartItems.reduce(
                    (total, price) => total + (price.price * price.qty),
                    0
                  )}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  For the purchase of
                </p>
              </div>
             

              {cart.cartItems.length !== 0 ? (
                <div>
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-100">
                      {cart &&
                        cart.cartItems.map((item, index) => (
                          <li key={index} className="flex items-center pr-2">
                              <img
                                src={item.img_url}
                                alt=""
                                className="object-cover w-16 h-16 rounded"
                              />

                              <div className="ml-4">
                                <h3 className="text-sm text-gray-900">
                                  {item.title}
                                </h3>

                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                  <div>
                                    <dt className="inline">price:</dt>
                                    <dd className="inline">{item.price}</dd>
                                  </div>
                                  <div>
                                    <dt className="inline">qty:</dt>
                                    <dd className="inline">{item.qty}</dd>
                                  </div>
                                </dl>
                              </div>
                            </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-5">
                  <h2 className="text-sm">
                    Nothing To preview please add some products in cart
                  </h2>
                  <Link to={"/shop"}>
                    <Button
                      color="var(--white)"
                      bgColor={"var(--primary)"}
                      width={"170px"}
                      height={"40px"}
                      size={"14px"}
                      className={
                        "flex justify-center items-center gap-2 hover:opacity-90"
                      }
                    >
                      <span>
                        <AiOutlineShoppingCart fontSize={"14px"}/>
                      </span>{" "}
                      Continue Shopping{" "}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="py-8 md:py-16">
            <div className="px-4">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    placeholder="Enter your first name"
                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm p-2"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your last name"
                    id="LastName"
                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm p-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    placeholder="Enter your email address"
                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm p-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Phone"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="Phone"
                    placeholder="Enter your phone name"
                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm p-2"
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Card Details
                  </legend>

                  <div className="mt-1 -space-y-px bg-white rounded-md shadow-sm flex flex-col gap-1">
                    <div>
                      <label htmlFor="CardNumber" className="sr-only">
                        {" "}
                        Card Number{" "}
                      </label>

                      <input
                        type="text"
                        id="CardNumber"
                        placeholder="Card Number"
                        className="relative w-full mt-1 border-gray-200 rounded-t-md focus:z-10 sm:text-sm p-2"
                      />
                    </div>

                    <div className="flex gap-2 -space-x-px">
                      <div className="flex-1">
                        <label htmlFor="CardExpiry" className="sr-only">
                          {" "}
                          Card Expiry{" "}
                        </label>

                        <input
                          type="text"
                          id="CardExpiry"
                          placeholder="Expiry Date"
                          className="relative w-full border-gray-200 rounded-bl-md focus:z-10 sm:text-sm p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <label htmlFor="CardCVC" className="sr-only">
                          {" "}
                          Card CVC{" "}
                        </label>

                        <input
                          type="text"
                          id="CardCVC"
                          placeholder="CVC"
                          className="relative w-full border-gray-200 rounded-br-md focus:z-10 sm:text-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-1 -space-y-px bg-white rounded-md shadow-sm flex flex-col gap-2">
                    <div>
                      <label htmlFor="Country" className="sr-only">
                        Country
                      </label>

                      <select
                        id="Country"
                        className="relative w-full border-gray-200 rounded-t-md focus:z-10 sm:text-sm p-2"
                      >
                        <option>India</option>
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="PostalCode">
                        {" "}
                        ZIP/Post Code{" "}
                      </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        className="relative w-full border-gray-200 rounded-b-md focus:z-10 sm:text-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="Address">
                        {" "}
                        Address{" "}
                      </label>

                      <input
                        type="text"
                        id="Address"
                        placeholder="Enter your address"
                        className="relative w-full border-gray-200 rounded-b-md focus:z-10 sm:text-sm p-2"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <Button bgColor={"var(--black)"} height={"2.4em"} width={"100%"} className={"flex justify-center items-center gap-2 hover:opacity-95"}>
                    <CgPaypal/> Pay Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
