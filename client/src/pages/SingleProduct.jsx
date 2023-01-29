import React from "react";
import RelativeProductCard from "../components/RelativeProductCard";
import { useParams } from "react-router-dom";

import {
  Button,
  Heading,
  SubHeading,
  Paragraph,
} from "../utils/styledComponents/components";
import TabView from "../components/TabView";
import { useProduct, useCart } from "../context/Product.state";
import PopupMessage from "../components/PopupMessage";

const SingleProduct = () => {
  const productData = useProduct(); // use product context
  const cart = useCart(); // use cart context
 
   // getting id from params
  const { id } = useParams();

   // filtering single product using filter method
  const product = productData.filter(
    (productData) => productData.id === Number(id)
  );

   // assign product data to data variable
  const data = product[0];

   // filtering relative products by category
  const relativeProduct = productData.filter(
    (productData) =>
      productData.category === data.category && productData.id !== data.id
  );

  // adding cart items using add cart items context api function
  function addItemToCart(id) {
    try {
      cart.addCartItem(id); // adding items to cart based on the product id
      cart.setPopupIsActive(true);
    } catch (error) {
      cart.setPopupIsActive(true);
      console.log(error);
    }
   }

  return (
    <>
    <section title="product-page">
      {data ? (
        <>
          {/* hero section*/}
          {/* # section 1 */}
          <section className="heroSection min-h-[500px] bg-primary flex px-4">
            <div className="container flex flex-col sm:flex-row gap-4 sm:gap-10 mx-auto items-center pt-3 pb-8">
              {/* left column */}
              <div className="left w-full sm:w-1/2 flex justify-start">
              <img
                    src={data.img_url}
                    alt=""
                    className="w-full object-cover rounded"
                  />
              </div>
              {/* right cloumn */}
              <div className="right w-full sm:w-1/2">
                <Heading
                  className="mb-1 text-2xl sm:text-3xl"
                  color={"var(--white)"}
                >
                  {data.title}
                </Heading>
                <SubHeading
                  className="text-lg sm:text-xl"
                  fontStyle={"italic"}
                  color={"var(--white)"}
                  letterSpacing={"1px"}
                >
                  <mark
                    style={{
                      background: "var(--black)",
                      color: "var(--white)",
                    }}
                  >
                    {data.shortdescription}
                  </mark>
                </SubHeading>
                <Paragraph className="mt-4" color={"var(--white)"}>
                  {data.description}
                </Paragraph>

                {/* product Price  */}
                <h4 className="text-white mt-5">
                  <strong>Price: </strong>
                  {data.price}$
                </h4>
                <h4 className="text-white mb-5">
                  <strong>Category: </strong>
                  {data.category}
                </h4>

                {/* Add to Cart Button */}
                <Button
                  color="var(--black)"
                  bgColor="var(--white)"
                  border="1px solid var(--primary)"
                  width="8em"
                  height="2.4em"
                  borderRadius="5px"
                  onClick={()=>addItemToCart(data.id)}
                >
                  Add To Cart
                </Button>
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
                    content: `${data.specification}`,
                  },
                  {
                    name: "Details",
                    content: `${data.details}`,
                  },
                  {
                    name: "Features",
                    content: `${data.features}`,
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
              {relativeProduct.length === 0 ? (
                <>
                  <h3>No more Products</h3>
                </>
              ) : (
                <>
                  <div className="product-list flex flex-col sm:flex-row flex-wrap gap-5 mt-4">
                    {relativeProduct &&
                      relativeProduct.map((data) => (
                        <RelativeProductCard
                          key={data.id}
                          productId={data.id}
                          image={data.img_url}
                          title={data.title}
                          subTitle={data.shortdescription}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </section>
          {cart.message && cart.message.message !== "" ? <PopupMessage /> : ""}
        </>
      ) : (
        <section>
          <Heading>Page Not Found</Heading>
        </section>
      )}
      </section>
    </>
  );
};

export default SingleProduct;
