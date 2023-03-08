import React from "react";
import { Link } from "react-router-dom";
import UseCart from "../hooks/UseCart";

const MiniCart = ({ toggleCart }) => {
  const { cart, updateItemQty, removeCartItem } = UseCart();

  return (
    <>
      <div
        className="w-screen min-h-screen z-50 no-scrollbar sm:min-h-fit border-black bg-yellow-50 p-8 pt-4 sm:max-w-sm sm:rounded-b-xl sm:border-2 sm:shadow-[0_4px_0_0] sm:shadow-black"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          className="relative block ml-auto -mr-4 transition text-black/75 hover:scale-110"
          onClick={toggleCart}
        >
          <span className="sr-only">Close cart</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-6 min-h-[88vh] sm:min-h-fit overflow-y-scroll no-scrollbar space-y-6 flex flex-col justify-between">
          <ul className="space-y-4 h-[62vh] sm:h-auto no-scrollbar overflow-y-scroll">
            {!(cart.length === 0) ? (
              <>
                {cart &&
                  cart.map((item, index) => (
                    <li className="flex items-center" key={index}>
                      <Link
                        to={`/productpage/${item._id}`}
                        onClick={toggleCart}
                      >
                        <img
                          src={item.previewImage.secure_url}
                          alt="productImg"
                          className="object-cover min-w-[48px] max-h-14 border border-black rounded"
                        />
                      </Link>

                      <div className="ml-4">
                        <h3 className="text-sm">
                          <Link
                            to={`/productpage/${item._id}`}
                            onClick={toggleCart}
                          >
                            {item.name}
                          </Link>
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-black/75">
                          <div>
                            <dt className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[120px] sm:max-w-[145px]">
                              {item?.shortDescription}
                            </dt>
                          </div>
                        </dl>
                      </div>

                      <div className="flex items-center justify-end flex-1 gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            defaultValue={item.qty}
                            id="Line1Qty"
                            className="h-8 w-10 sm:w-12 sm:h-8 rounded border-2 border-black bg-yellow-100/50 p-0 text-center text-xs text-black"
                            onChange={(e) =>
                              updateItemQty(
                                item._id,
                                e.target.value === "" ? 1 : e.target.value
                              )
                            }
                          />
                        </form>

                        <button
                          className="transition hover:text-red-600"
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
              </>
            ) : (
              <>
                <h3>Cart is empty please add products to cart</h3>
              </>
            )}
          </ul>

          <div className="space-y-4 text-center">
            <Link
              to={"/cart"}
              onClick={toggleCart}
              className="block rounded-full border-2 border-black px-5 py-3 text-sm shadow-[0_4px_0_0] shadow-black transition hover:ring-1 hover:ring-black"
            >
              View my cart ({cart.length})
            </Link>

            <Link
              to={"/checkout"}
              onClick={toggleCart}
              className="block px-5 py-3 text-sm text-white transition rounded-full bg-primary hover:ring-1 hover:ring-primary"
            >
              Checkout
            </Link>

            <Link
              to={"/shop"}
              onClick={toggleCart}
              className="inline-block text-sm underline transition underline-offset-4 hover:opacity-75"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniCart;
