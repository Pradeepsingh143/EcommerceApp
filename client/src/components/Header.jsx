import React, {useState} from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaShopware } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import { useCart } from "../context/Product.state";

const Header = () => {
  const {cartItems} = useCart();
  const [isActive, setIsActive] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)
  
  const toggleCart = () => {
    setIsActive(!isActive)
    if (!isActive) {
        const miniCart = document.getElementById("miniCart");
        miniCart.classList.add("overlay")
    }else{
      const miniCart = document.getElementById("miniCart");
        miniCart.classList.remove("overlay")
    }
  }

  return (
    <header className="py-4 bg-primary" title="header">
      <div className="navbar px-4">
        <div className="container relative mx-auto flex items-center justify-between">
          {/* website logo */}
          <div className="logo">
            <Link to={'/'}><FaShopware title="logo" size={"36px"} color={"white"} /></Link>
          </div>

          {/* search input bar */}
          {/* <div className="searchBar hidden sm:flex">
            <input
              type="search"
              placeholder="Search product"
              className="py-1 px-4 rounded focus:outline-double shadow-2xl"
            />
          </div> */}

          <div className="flex gap-8 sm:gap-14 items-center">
            {/* main menu */}
            <nav className="navMainMenu list-none text-sm uppercase text-black font-semibold gap-x-8 hidden sm:flex">
              <Link to={'/'} className="cursor-pointer">
                <h1 className="hover:brightness-50">Home</h1>
              </Link>
              <Link to={'/shop'} className="cursor-pointer">
                <h1 className="hover:brightness-50">Shop</h1>
              </Link>
              <Link to={'/api/auth/login'} className="cursor-pointer">
                <h1 className="hover:brightness-50">Login</h1>
              </Link>
              <Link to={'/api/auth/register'} className="cursor-pointer">
                <h1 className="hover:brightness-50">Register</h1>
              </Link>
            </nav>

            {/* mobile hamburger menu  */}
            <nav className="mobileMainMenu sm:hidden">
              {isMenuActive ? (
                <>
               <div className="mobileMenu absolute bg-black w-full list-none rounded-lg shadow-sm shadow-white top-12 left-0 p-5 text-white z-50">
               <ul className=" flex flex-col gap-4 text-white text-sm">
               <Link to={'/'} className=" cursor-pointer" onClick={()=>setIsMenuActive(!isMenuActive)}>
                Home
              </Link>
              <Link to={'/shop'} className="cursor-pointer" onClick={()=>setIsMenuActive(!isMenuActive)}>
                Shop
              </Link>
              <Link to={'/auth/login'} className="cursor-pointer" onClick={()=>setIsMenuActive(!isMenuActive)}>
                Login
              </Link>
              <Link to={'/auth/register'} className="cursor-pointer" onClick={()=>setIsMenuActive(!isMenuActive)}>
                Register
              </Link>
               </ul>
               </div>
                </>
              ) : ("")}
                <RxHamburgerMenu size={'1.3em'} onClick={()=>setIsMenuActive(!isMenuActive)}/>
            </nav>

            {/* cart icon */}
            <div className="menuIcon relative">
            <button onClick={toggleCart}>
            <h2 className="cursor-pointer">
                <BsFillCartCheckFill size={"24px"} title="hamburger" />
              </h2>
              <p className="bg-white rounded-full text-center text-xs absolute bottom-4 left-3 w-4">
                {cartItems.length}
              </p>
            </button>
            </div>
            <div className="fixed top-0 sm:absolute  sm:top-8 right-0 z-10" id="miniCart">
              {isActive ? <MiniCart toggleCart={toggleCart}/> : ""}
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

