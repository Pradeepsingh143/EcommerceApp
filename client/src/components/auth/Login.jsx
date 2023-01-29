import React, { useState } from "react";
import axios from "axios";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


const Login = () => {
  // const navigate = useNavigate();
  const [message, setMessage] = useState({ message: "", code: "" });
  const [user, setUser] = useState({ email: "", password: "" });

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", user);
      setUser({ email: "", password: "" });
      setMessage({ message: response.data.message, code: response.status });
      // navigate("/");
    } catch (error) {
      console.log("Error login form: ", error);
      setMessage({
        message: error.response.data.message,
        code: error.response.status,
      });
    }
  };

  return (
    <>
      <div className="flex min-h-[85vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginHandle} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={user.email}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={user.password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black brightness-75 py-2 px-4 text-sm font-medium text-white hover:brightness-100 focus:outline-none focus:ring-2 focus:bg-black focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiLockClosed
                    className="h-5 w-5 text-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
              <div className="mt-2">
                {message.code ? (
                  message.code > 250 ? (
                    <p className="text-red-600">{`${message.code}: ${message.message}`}</p>
                  ) : (
                    <p className="text-green-600">{message.message}</p>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  to={"/api/auth/register"}
                  className="font-normal text-black hover:brightness-50"
                >
                  Don't have account register now
                </Link>
              </div>

              <div className="text-sm">
                <Link
                  to={"/api/auth/password/forgot"}
                  className="font-medium text-blue-500 hover:text-blue-700"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
