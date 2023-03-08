import React, { useEffect, useCallback, useState } from "react";
import RelativeProductCard from "../components/RelativeProductCard";
import { useParams } from "react-router-dom";
import {
  Button,
  Heading,
  SubHeading,
} from "../utils/styledComponents/components";
import TabView, { TabViewSkeleton } from "../components/TabView";
import UseSingleProduct from "../hooks/UseSingleProduct";
import UseProduct from "../hooks/UseProduct";
import axios from "../api/axios";
import UseCart from "../hooks/UseCart";
import { TiTick } from "react-icons/ti";
// import PopupMessage from "../components/PopupMessage";

const SingleProduct = () => {
  const { data, setData } = UseSingleProduct();
  const { cart, addCartItem, updateItemQty } = UseCart();
  const { data: AllProductsData } = UseProduct();
  const [loading, setLoading] = useState(false);
  // getting id from params
  const { id } = useParams();
  const isAddedToCart =
    cart && cart.some((product) => product?._id === data?._id);

  const productCartQty =
    cart && cart.filter((product) => product?._id === data?._id)[0];

  const getSingleProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`api/product/get/${id}`);
      setData(response?.data?.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id, setData]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct, id]);

  // filtering relative products by category
  const relativeProduct =
    AllProductsData &&
    AllProductsData?.filter(
      (product) =>
        product?.collectionId._id === data?.collectionId?._id &&
        product?._id !== data?._id
    );

  // adding cart items using add cart items context api function
  function handleAddToCart(id) {
    addCartItem(id);
  }

  return (
    <>
      <section title="product-page">
        {data && (
          <>
            {/* hero section*/}
            {/* # section 1 */}
            <section className="heroSection md:min-h-[500px] bg-primary flex px-4">
              <div className="container flex flex-col sm:flex-row gap-4 sm:gap-10 mx-auto items-center pt-3 pb-8">
                {/* left column */}
                <div className="left w-full sm:w-1/2 flex justify-start">
                  <img
                    src={data.previewImage.secure_url}
                    alt=""
                    className="w-full max-h-[350px] min-h-[350px] md:max-h-[420px] md:min-h-[400px] md:w-3/4 object-cover rounded"
                  />
                </div>
                {/* right cloumn */}
                <div className="right w-full sm:w-1/2">
                  <Heading
                    className="mb-1 text-xl sm:text-2xl md:text-3xl"
                    color={"var(--white)"}
                  >
                    {data.name}
                  </Heading>
                  <SubHeading
                    className="text-lg sm:text-xl"
                    color={"var(--white)"}
                    letterSpacing={"auto"}
                    fontSize={"17px"}
                    lineHeight={"1.5em"}
                  >
                    {data?.shortDescription}
                  </SubHeading>

                  {/* product Price  */}
                  <h4 className="text-white mt-5">
                    <strong>Price: </strong>
                    {data.price}
                  </h4>
                  <h4 className="text-white mb-5">
                    <strong>Category: </strong>
                    {data?.collectionId?.name}
                  </h4>

                  {/* Add to Cart Button */}
                  <div className="flex items-center gap-2">
                    <Button
                      color="var(--black)"
                      bgColor="var(--white)"
                      border="1px solid var(--primary)"
                      width="9em"
                      height="2.4em"
                      borderRadius="5px"
                      className="flex justify-center items-center disabled:opacity-80"
                      onClick={() => handleAddToCart(data._id)}
                      disabled={isAddedToCart}
                    >
                      {isAddedToCart ? (
                        <span className="text-green-700 flex items-center">
                          <TiTick fontSize={"18px"} /> Added To Cart
                        </span>
                      ) : (
                        "Add To Cart"
                      )}
                    </Button>
                    {isAddedToCart && (
                      <form className="flex">
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={productCartQty?.qty}
                          id="Line1Qt"
                          className="h-[3em] w-10 sm:w-12 rounded border-black] bg-[#fff] text-center text-xs text-black"
                          onChange={(e) =>
                            updateItemQty(
                              data._id,
                              e.target.value === "" ? 1 : e.target.value
                            )
                          }
                        />
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* product feature tabs start*/}
            <section className="product-features my-10">
              <div className="container mx-auto px-4">
                <SubHeading className="mb-5"> Product Details </SubHeading>
                <TabView
                  tabs={[
                    {
                      name: "Specification",
                      content: `${data?.description}`,
                    },
                    {
                      name: "Details",
                      content: `${data?.details}`,
                    },
                    {
                      name: "Features",
                      content: `${data?.features}`,
                    },
                  ]}
                />
              </div>
            </section>
            {/* product feature tabs end*/}

            {/* relative products list */}
            <section className="relative-products">
              <div className="container mx-auto px-4 my-10">
                <SubHeading>Relative Products</SubHeading>
                {relativeProduct?.length === 0 ? (
                  <>
                    <h3>No more Products</h3>
                  </>
                ) : (
                  <>
                    <div className="product-list flex flex-col sm:flex-row flex-wrap gap-5 mt-4">
                      {relativeProduct &&
                        relativeProduct.map((data) => (
                          <RelativeProductCard
                            key={data._id}
                            productId={data._id}
                            image={data.previewImage.secure_url}
                            title={data.name}
                            subTitle={data.shortDescription}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
            </section>
            {/* {cart.message && cart.message.message !== "" ? (
              <PopupMessage />
            ) : (
              ""
            )} */}
          </>
        )}
        {loading && (
          <>
            {/* section-1 */}
            <section className="heroSection min-h-[500px] bg-primary flex px-4">
              <div className="container flex flex-col sm:flex-row gap-4 sm:gap-10 mx-auto items-center pt-3 pb-8">
                {/* left column */}
                <div className="left w-full sm:w-1/2 flex justify-start">
                  <div className="flex items-center justify-center w-full min-h-[350px] md:min-h-[420px] bg-gray-300 rounded sm:w-80 dark:bg-gray-700 animate-pulse">
                    <svg
                      className="w-12 h-12 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                </div>
                {/* right cloumn */}
                <div className="right w-full sm:w-1/2 animate-pulse">
                  <p className="w-2/4 h-4 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-8 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <p className="w-full h-2 mt-4 rounded bg-gray-200 dark:bg-gray-700"></p>
                  <div className="flex items-center gap-2 mt-6">
                    <h4 className="text-white">
                      <strong>Price: </strong>
                    </h4>
                    <p className="w-20 h-3 rounded bg-gray-200 dark:bg-gray-700"></p>
                  </div>
                  <div className="flex items-center mt-2 gap-2">
                    <h4 className="text-white">
                      <strong>Category: </strong>
                    </h4>
                    <p className="w-24 h-3 rounded bg-gray-200 dark:bg-gray-700"></p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className="mt-5"
                    color="var(--black)"
                    bgColor="var(--white)"
                    border="1px solid var(--primary)"
                    width="8em"
                    height="2.4em"
                    borderRadius="5px"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </section>

            {/* tabview */}
            <section className="product-features my-10">
              <div className="container mx-auto px-4">
                <SubHeading className="mb-5"> Product Details </SubHeading>
                <TabViewSkeleton
                  tabs={[
                    {
                      name: "Specification",
                      content: "",
                    },
                    {
                      name: "Details",
                      content: "",
                    },
                    {
                      name: "Features",
                      content: "",
                    },
                  ]}
                />
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default SingleProduct;
