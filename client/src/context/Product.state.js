import ProductContext from "./product.context";
import CartContext from "./cart.context";
import { useContext, useState, useEffect } from "react";

export function useProduct() {
  return useContext(ProductContext);
}

export function useCart() {
  return useContext(CartContext);
}

const ProductProvider = ({ children }) => {
  const product = [
    {
      id: 101,
      qty: 1,
      title: "Demo Product",
      price: 15,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/free-photo/indian-chicken-biryani-served-terracotta-bowl-with-yogurt-white-background-selective-focus_466689-72554.jpg?w=826&t=st=1671979983~exp=1671980583~hmac=b2dd5971082045ada3f1f674978e7c5017af0f7aa43377983abc6846df2d4ae2",
      category: "food",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (1)",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (2)",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (3)",
    },
    {
      id: 102,
      qty: 1,
      title: "Demo Product",
      price: 45,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/premium-photo/paneer-pyaza-is-popular-punjabi-vegetarian-recipe-using-cubes-cottage-cheese-with-lots-onion-gravy_466689-30475.jpg?w=826",
      category: "food",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (1)",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (2)",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (3)",
    },
    {
      id: 103,
      qty: 1,
      title: "Demo Product",
      price: 50,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/premium-photo/north-indian-mini-meal-parcel-platter-combo-thali-with-paneer-butter-masala-roti-dal-rice_466689-87332.jpg?w=826",
      category: "food",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      id: 104,
      qty: 1,
      title: "Demo Product",
      price: 30,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/premium-photo/restaurant-style-dal-tadka-tempered-with-ghee-spices-this-recipe-makes-great-meal-with-boiled-rice_466689-76424.jpg?w=826",
      category: "food",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      id: 105,
      qty: 1,
      title: "Demo Product",
      price: 100,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/free-photo/indian-chicken-biryani-served-terracotta-bowl-with-yogurt-white-background-selective-focus_466689-72554.jpg?w=826&t=st=1671979983~exp=1671980583~hmac=b2dd5971082045ada3f1f674978e7c5017af0f7aa43377983abc6846df2d4ae2",
      category: "clothes",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (1)",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (2)",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (3)",
    },
    {
      id: 106,
      qty: 1,
      title: "Demo Product",
      price: 130,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/premium-photo/restaurant-style-dal-tadka-tempered-with-ghee-spices-this-recipe-makes-great-meal-with-boiled-rice_466689-76424.jpg?w=826",
      category: "food",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      id: 107,
      qty: 1,
      title: "Demo Product",
      price: 120,
      shortdescription: "This is product subheading",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo sequi neque quae in repellat suscipit? Adipisci aperiam aut inventore labore pariatur nihil dolores, in cum saepe obcaecati voluptatum quod modi repellat, sint laudantium doloribus omnis ducimus aspernatur animi itaque libero? Nihil adipisci corrupti pariatur aut accusamus dicta sit hic.",
      img_url:
        "https://img.freepik.com/free-photo/indian-chicken-biryani-served-terracotta-bowl-with-yogurt-white-background-selective-focus_466689-72554.jpg?w=826&t=st=1671979983~exp=1671980583~hmac=b2dd5971082045ada3f1f674978e7c5017af0f7aa43377983abc6846df2d4ae2",
      category: "clothes",
      specification:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (1)",
      details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (2)",
      features: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. (3)",
    },
  ];

  // cart items state
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState({
    success: false,
    message: "",
    error: false,
  });
  const [popupIsActive, setPopupIsActive] = useState(false);

  async function getCartItems() {
    let cart;
    const cartArr = localStorage.getItem("cart");
    if (cartArr == null) {
      cart = [];
    } else {
      cart = await JSON.parse(cartArr);
      setCartItems(cart);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  // add to cart function for adding items in cart
  async function addCartItem(id) {
    let cart;
    const existingItem = cartItems.some((data) => data.id === id); // check item in cartItems state is exist or not
    const cartArr = localStorage.getItem("cart"); // fetch localStorage cart


    if (!existingItem) {
      // getting item to update our cartItems state
      const item = product.filter((data) => data.id === id)[0];

      //set item in cartItems state
      setCartItems([...cartItems, item]);

      if (cartArr == null) {
        cart = [];
      } else {
        cart = await JSON.parse(cartArr);
      }

      // asign new object if item not exist in cartItems
      const cartObj = new Object(item);

      // push obj in cart variable initialized above
      cart.push(cartObj);

      //set local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      //send success message
      setMessage({
        success: true,
        message: "Item Added Successfully",
        error: false,
      });
      return cartItems;
    } else {

      await updateItemQty(id); // passed updateItemQty function
      setMessage({
        success: true,
        message: `Item Added Successfully`,
        error: false,
      });
    }
  }

  // update item quantity if item already exist in cart
  async function updateItemQty(id, qty) {
    let cart;
    const cartArr = localStorage.getItem("cart"); // fetch localStorage cart
    cart = await JSON.parse(cartArr);

       //if item already exist in cartItem state
       setCartItems((prevArray) => {
        // map cartItem array
        return prevArray.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              qty: qty || item.qty + 1,
            };
          }
          return item;
        });
      });

      // changle local storage item qty
    cartItems.map((item, index) => {
      if (item.id === id) {
        cart.splice(index, 1, { ...item, qty: qty || item.qty + 1});
        //set local storage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

  }

  // remove cart item function for removing items from cart
  async function removeCartItem(id) {
    const removedItems = cartItems.filter((item) => item.id !== id);
    const cartIndex = cartItems.findIndex((item) => item.id === id);
    console.log(cartIndex);
    console.log(removedItems);
    setCartItems(removedItems);
    const cart = localStorage.getItem("cart");
    const cartArr = JSON.parse(cart);
    cartArr.splice(cartIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    if (cartArr.length === 0) {
      localStorage.clear();
    }
    setMessage({
      success: true,
      message: "Item Added Successfully",
      error: false,
    });
    return cartItems;
  }

  return (
    <ProductContext.Provider value={product}>
      <CartContext.Provider
        value={{
          cartItems,
          updateItemQty,
          addCartItem,
          removeCartItem,
          message,
          popupIsActive,
          setPopupIsActive,
        }}
      >
        {children}
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
