import { createContext, useState, useEffect, useCallback } from "react";
import UseProduct from "../hooks/UseProduct";
const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { data: productData } = UseProduct();
  const [cart, setCart] = useState([]);

  const getCartItems = useCallback(async () => {
    const cartArr = localStorage.getItem("cart");
    if (cartArr === null) {
      setCart([]);
    } else {
      const parsedCart = await JSON.parse(cartArr);
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const updateItemQty = useCallback(async (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          return { ...item, qty: qty || item.qty + 1 };
        }
        return item;
      })
    );

    const cartArr = JSON.parse(localStorage.getItem("cart"));
    const updatedCartArr = cartArr.map((item) => {
      if (item._id === id) {
        return { ...item, qty: qty || item.qty + 1 };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCartArr));
  }, []);

  const addCartItem = useCallback(
    async (productId) => {
      const cartArr = JSON.parse(localStorage.getItem("cart")) || [];
      const isExistingItem = cart && cart.some((item) => item._id === productId);

      if (!isExistingItem) {
        const productToAdd = productData.find(
          (product) => product._id === productId
        );
        const itemToAdd = { ...productToAdd, qty: 1 };

        setCart((prevCart) => [...prevCart, itemToAdd]);

        cartArr.push(itemToAdd);
        localStorage.setItem("cart", JSON.stringify(cartArr));
      } else {
        updateItemQty(productId);
      }
    },
    [cart, productData, updateItemQty]
  );

  const removeCartItem = useCallback(
    async (productId) => {
      const filteredCart = cart && cart.filter((item) => item._id !== productId);
      setCart(filteredCart);

      const cartArr = JSON.parse(localStorage.getItem("cart"));
      const updatedCartArr = cartArr.filter((item) => item._id !== productId);

      if (updatedCartArr.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCartArr));
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, removeCartItem, updateItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
