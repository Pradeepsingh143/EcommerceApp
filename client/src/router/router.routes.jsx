import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Loader from "../components/Loader.spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = lazy(() => import("../pages/Home"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const GoToTop = lazy(() => import("../components/GoToTop"));
const RequireAuth = lazy(() => import("../components/auth/RequireAuth"));

// auth routes
const Register = lazy(() => import("../components/auth/Register"));
const Login = lazy(() => import("../components/auth/Login"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const Unauthorized = lazy(() => import("../components/Unauthorized"));
const NotFound = lazy(() => import("../components/NotFound"));
const PersistLogin = lazy(() => import("../components/auth/PersistLogin"));

const Layout = () => (
  <>
    <GoToTop />
    <Header />
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
    <Footer />
  </>
);

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/productPage/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Protected Routes for USERS */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={"USER"} />}>
          </Route>
        </Route>

        {/* Protected Routes for ADMIN */}
          <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
            <Route element={<RequireAuth allowedRoles={"ADMIN"} />} />
          </Route>

        {/* Catch All Path or 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}


export default Router;
