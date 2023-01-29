import React, { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const Home = lazy(() => import("../pages/Home"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const GoToTop = lazy(() => import("../components/GoToTop"));

// auth routes
const Register = lazy(() => import("../components/auth/Register"));
const Login = lazy(() => import("../components/auth/Login"));
const ForgotPassword = lazy(()=> import("../components/auth/ForgotPassword"));
const ResetPassword = lazy(()=> import("../components/auth/ResetPassword"));

const Layout = () => (
  <>
    <GoToTop />
    <Header />
    <Outlet />
    <Footer />
  </>
);

const Router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/api/auth/register",
        element: <Register />,
      },
      {
        path: "/api/auth/login",
        element: <Login />,
      },
      {
        path: "/api/auth/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/api/auth/password/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/productPage/:id/",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default Router;
