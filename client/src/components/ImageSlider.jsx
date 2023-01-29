import React, { useState, useEffect } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

const ImageSlider = ({ slides, interval }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); //   Initialize state for slider index
  const [showPagination, setShowPagination] = useState(false); // Initialize state for pagination visibility

  useEffect(() => {
    // Set up an interval to automatically change the image every `interval` milliseconds
    const autoPlay = setInterval(() => {
      setCurrentSlideIndex((currentSlideIndex + 1) % slides.length);
    }, interval || 2000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(autoPlay);
    };
  }, [currentSlideIndex, interval, slides.length]);

  const slideStyle = {
    backgroundImage: `url(${slides[currentSlideIndex].url})`,
  };

  const slideDots = {
    display: "flex",
    position: "absolute",
    left: "50%",
    bottom: "0",
    transform: "translate(-50%, -50%)",
  };

  return (
    // slider styles``
    <div
      className="slider h-full w-full relative"
      onMouseEnter={()=>setShowPagination(true)}
      onMouseLeave={()=>setShowPagination(false)}
    >
      {/* slide style */}
      <div
        className="slide w-full bg-cover bg-center h-full transition-all duration-200"
        style={slideStyle}
        title={slides[currentSlideIndex].title}
      >
        {showPagination ? (
          <>
           <BiLeftArrow
              color="var(--white)"
              size={"24px"}
              className="absolute top-2/4 left-4 cursor-pointer"
              onClick={() =>
                setCurrentSlideIndex(
                  currentSlideIndex === 0
                    ? slides.length - 1
                    : currentSlideIndex - 1
                )
              }
            />
            <BiRightArrow
              color="var(--white)"
              size={"24px"}
              className="absolute top-2/4 right-4 cursor-pointer"
              onClick={() =>
                setCurrentSlideIndex((currentSlideIndex + 1) % slides.length)
              }
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div style={slideDots}>
        {slides.map((_slide, index) => (
          <div key={index}>
            <li 
            style={{ backgroundColor : `${currentSlideIndex === index ? 'var(--primary)' : 'var(--white)'}`, padding: `${currentSlideIndex === index ? '4px 16px' : '4px'}`}}
            className="cursor-pointer inline-flex mx-3 rounded-full transition-all duration-500"
            onClick={() => setCurrentSlideIndex(index)}
            ></li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
