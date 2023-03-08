import React from "react";
import {
  Button,
  Heading,
  SubHeading,
  Paragraph,
} from "../utils/styledComponents/components";
import ProdcuctCard, { ProductCardSkeleton } from "../components/ProductCard";
import UseProduct from "../hooks/UseProduct";

const Home = () => {
  const { data, loading } = UseProduct();

  return (
    <>
      {/* homepage page */}
      <main className="homePage" title="home-page">
        {/* hero section*/}
        {/* # section 1 */}
        <section className="heroSection bg-primary">
          <div className="container px-4 sm:px-2 pt-12 pb-4 min-h-[90vh] flex flex-col gap-8 sm:flex-row mx-auto sm:items-center">
            {/* left cloumn */}
            <div className="left w-full sm:w-1/2">
              <Heading
                className="mb-1 text-2xl sm:text-4xl"
                color={"var(--white)"}
              >
                Lorem ipsum dolor
              </Heading>
              <SubHeading
                fontStyle={"italic"}
                color={"var(--white)"}
                letterSpacing={"1px"}
                className={"text-lg sm:text-xl"}
              >
                <mark
                  style={{ background: "var(--black)", color: "var(--white)" }}
                >
                  Lorem ipsum dolor sit, amet consectetur.
                </mark>
              </SubHeading>
              <Paragraph
                className="mt-4 text-sm sm:text-base"
                color={"var(--white)"}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                obcaecati voluptas aut sint, culpa beatae ratione id maxime
                debitis officiis.
              </Paragraph>
              <div className="buttons flex gap-5 mt-6">
                <Button
                  color="var(--black)"
                  bgColor="var(--white)"
                  border="1px solid var(--white)"
                  height="2.4em"
                  borderRadius="5px"
                  hoverBgColor="var(--primary)"
                  hoverColor="var(--white)"
                  hoverBorder="1px solid var(--white)"
                  className="w-24 sm:w-32 text-sm sm:text-base"
                >
                  Shop Now
                </Button>
                <Button
                  color="var(--white)"
                  bgColor="var(--black)"
                  border="1px solid var(--primary)"
                  width="8em"
                  height="2.4em"
                  borderRadius="5px"
                  className="w-24 sm:w-32 text-sm sm:text-base"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            {/* right column */}
            <div className="right w-full sm:w-1/2 flex justify-end">
              <div className="images grid grid-cols-2 gap-2 w-full sm:w-4/5">
                <img
                  src="https://res.cloudinary.com/dyjzsykk7/image/upload/v1672392619/cupcakes_gqd30z.jpg"
                  alt="cupcake"
                  className="h-40 w-full object-cover rounded"
                />
                <img
                  src="https://res.cloudinary.com/dyjzsykk7/image/upload/v1672392619/donuts_m44po9.jpg"
                  alt="donuts"
                  className="h-40 w-full object-cover rounded"
                />
                <div className="col-span-2">
                  <img
                    src="https://res.cloudinary.com/dyjzsykk7/image/upload/v1672392619/pastry_jdffw1.jpg"
                    alt="pastry"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        {/* # Section-2 */}
        <section className="aboutSection bg-white">
          {/* section container */}
          {/* About summary section */}
          <div className="container w-full md:w-8/12 mx-auto text-black">
            {/* sub heading div */}
            <div className="aboutSummary flex flex-col text-center py-12 px-4 md:py-10 md:px-8 bg-[#fff] md:shadow-xl hover:md:shadow-2xl md:rounded-2xl relative md:bottom-12 gap-3">
              <SubHeading className="capitalize">Sub Heading</SubHeading>
              <Paragraph>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corrupti at cum corporis praesentium delectus doloremque maiores
                similique. Non, quod perferendis voluptates dolorum quos,
                recusandae fugiat a deserunt in optio sapiente?
              </Paragraph>
            </div>
          </div>

          {/* About us container */}
          <div className="container flex flex-col md:flex-row mx-auto px-4 gap-6 md:gap-16 mt-5 md:mt-14 items-center">
            <div className="left-col w-full md:w-1/2">
              <img
                src="https://res.cloudinary.com/dyjzsykk7/image/upload/v1672392620/hotcake_bszeod.jpg"
                alt="cheif making hotcakes"
                loading="lazy"
                className="w-full md:h-[380px] object-cover"
              />
            </div>
            <div className="right-col  w-full md:w-1/2">
              <Heading
                className="mb-3 md:mb-5"
                fontSize={"18px"}
                fontStyle={"italic"}
                fontWeight={"500"}
                textDecoration={"underline"}
                opacity={".7"}
              >
                About Us
              </Heading>
              <SubHeading
                fontWeight={"600"}
                letterSpacing={"1px"}
                className={"text-xl sm:text-2xl"}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </SubHeading>
              <Paragraph className="mt-4 md:mt-7 text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                tempora deserunt laborum sint aliquam magni molestiae maxime,
                praesentium totam in, ullam unde odio quasi autem amet eius
                numquam suscipit laudantium.
              </Paragraph>
              <Button
                className="mt-6 w-24 sm:w-32 text-sm sm:text-base"
                height={"2.4em"}
                width={"140px"}
                bgColor={"var(--black)"}
              >
                Contact
              </Button>
            </div>
          </div>
        </section>

        {/* product section 
        # section-3 */}
        <section className="productSection bg-white">
          <div className="container mx-auto flex flex-col justify-center pt-16 pb-8 px-4">
            <Heading className="capitalize text-2xl sm:text-3xl">
              our products
            </Heading>
            <div className="product mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4">
              {loading ? (
                <ProductCardSkeleton />
              ) : (
                data &&
                data
                  .filter((_data, index) => index < 4)
                  .map((data, index) => (
                    <ProdcuctCard
                      key={index}
                      title={data.name}
                      category={data.collectionId?.name}
                      price={data.price}
                      image={data.previewImage.secure_url}
                      productId={data?._id}
                      loading={loading}
                    />
                  ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
