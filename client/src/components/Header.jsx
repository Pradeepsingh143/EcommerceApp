import React, { useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaShopware } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import UseLogout from "../hooks/UseLogout";
import UseAuth from "../hooks/UseAuth";


const Header = () => {
  const {auth} = UseAuth();
  const logout = UseLogout();
  const [isActive, setIsActive] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleCart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      const miniCart = document.getElementById("miniCart");
      miniCart.classList.add("overlay");
    } else {
      const miniCart = document.getElementById("miniCart");
      miniCart.classList.remove("overlay");
    }
  };

  const toggleDropdown = () =>{
    setDropdown(!dropdown);
  }

  return (
    <header className="py-4 bg-primary" title="header">
      <div className="navbar px-4">
        <div className="container relative mx-auto flex items-center justify-between">
          {/* website logo */}
          <div className="logo">
            <Link to={"/"}>
              <FaShopware title="logo" size={"36px"} color={"white"} />
            </Link>
          </div>

          <div className="flex gap-8 sm:gap-16 items-center">
            {/* main menu */}
            <nav className="navMainMenu list-none text-sm uppercase text-black font-semibold gap-x-4 hidden sm:flex">
              <Link to={"/"} className="cursor-pointer">
                <button className="hover:brightness-50 p-2 px-4">Home</button>
              </Link>
              <Link to={"/shop"} className="cursor-pointer">
                <button className="hover:brightness-50 p-2 px-4">Shop</button>
              </Link>
              <Link to={"/login"} className="cursor-pointer">
                <button className="hover:brightness-50 p-2 px-4">Login</button>
              </Link>
              <Link to={"/register"} className="cursor-pointer">
                <button className="hover:brightness-50 p-2 px-4">Register</button>
              </Link>
            </nav>

            {/* mobile hamburger menu  */}
            <nav className="mobileMainMenu sm:hidden">
              {isMenuActive ? (
                <>
                  <div className="mobileMenu absolute bg-black w-full list-none rounded-lg shadow-sm shadow-white top-12 left-0 p-5 text-white z-50">
                    <ul className=" flex flex-col gap-4 text-white text-sm">
                      <Link
                        to={"/"}
                        className=" cursor-pointer"
                        onClick={() => setIsMenuActive(!isMenuActive)}
                      >
                        Home
                      </Link>
                      <Link
                        to={"/shop"}
                        className="cursor-pointer"
                        onClick={() => setIsMenuActive(!isMenuActive)}
                      >
                        Shop
                      </Link>
                      <Link
                        to={"/login"}
                        className="cursor-pointer"
                        onClick={() => setIsMenuActive(!isMenuActive)}
                      >
                        Login
                      </Link>
                      <Link
                        to={"/register"}
                        className="cursor-pointer"
                        onClick={() => setIsMenuActive(!isMenuActive)}
                      >
                        Register
                      </Link>
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
              <RxHamburgerMenu
                size={"1.3em"}
                onClick={() => setIsMenuActive(!isMenuActive)}
              />
            </nav>

            <div className="flex items-center gap-5">
              {/* cart icon */}
              <div className="cartIcon relative">
                <button onClick={toggleCart}>
                  <h2 className="cursor-pointer">
                    <BsFillCartCheckFill size={"24px"} title="hamburger" />
                  </h2>
                  <p className="bg-white rounded-full text-center text-xs absolute bottom-4 left-3 w-4">
                    {/* {cartItems.length} */}
                  </p>
                </button>
              </div>

              {/* <!-- Profile dropdown --> */}
              <div class="hidden sm:block relative ml-3">
                <div>
                  <button
                    type="button"
                    class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span class="sr-only">Open user menu</span>
                    <FaUserCircle fontSize={"28px"} color={"var(--black)"} />
                  </button>
                </div>

                {/* <!--
                Dropdown menu, show/hide based on menu state.
              --> */}
              {dropdown ? (
                <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"

              >
                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                {auth.role === "ADMIN" ? 
                <Link
                href="/"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >
                Dashboard
              </Link>
              : ""}
                <Link
                  href="/"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </Link>

                <button
                  onClick={()=> logout()}
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                >
                  logout
                </button>
              </div>
              ) : (
                ""
              )}
              </div>
            </div>

            <div
              className="fixed top-0 sm:absolute  sm:top-8 right-0 z-10"
              id="miniCart"
            >
              {isActive ? <MiniCart toggleCart={toggleCart} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
