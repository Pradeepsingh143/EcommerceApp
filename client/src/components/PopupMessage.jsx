import React, { useEffect } from "react";
import { useCart } from "../context/Product.state";



const PopupMessage = () => {
  const { message, popupIsActive, setPopupIsActive } = useCart();

  useEffect(() => {
    const time = setTimeout(() => {
      setPopupIsActive(false);
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  }, [popupIsActive, message]);

  const popupStyle = {
    backgroundColor: `${message.error === true ? "var(--black)" : "var(--primary)"}`,
    color: "black",
  };

  return (
    <>
      {popupIsActive ? (
        <div className="popupMessage">
          <div
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-lg px-5 py-3 brightness-125"
            style={popupStyle}
          >
            <h4>{message.message}</h4>
            <button
              className="ml-3 rounded bg-white/20 p-1 hover:bg-white/10"
              onClick={() => setPopupIsActive(false)}
            >
              x
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PopupMessage;
