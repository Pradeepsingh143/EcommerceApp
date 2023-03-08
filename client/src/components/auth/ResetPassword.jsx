import React, { useState, useTransition } from "react";
import axios from "axios";
import { SiMinutemailer } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    message: "",
    code: "",
    loading: "",
  });
  const [user, setUser] = useState({ password: "", confirmPassword: "" });

  const ResetPasswordHandle = async(e) => {
      e.preventDefault();
      try {
        setMessage({ loading: true });
        const response = await axios.put(
          `/api/auth/password/reset/${token}`,
          user
        );
        setUser({ password: "", confirmPassword: "" });
        setMessage({
          message: response.data.message,
          code: response.status,
          loading: false,
        });
        navigate("/login");
      } catch (error) {
        console.log("Error forgotpassword form: ", error);
        setMessage({
          message: error.response.data.message,
          code: error.response.status,
          loading: false,
        });
      }
  };

  return (
    <>
      <div className="flex min-h-[85vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset your password
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={ResetPasswordHandle}
            method="PUT"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="text"
                  required
                  value={user.password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  confirm-Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  required
                  value={user.confirmPassword}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      confirmPassword: e.target.value,
                    });
                  }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="confirm password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black brightness-75 py-2 px-4 text-sm font-medium text-white hover:brightness-100 focus:outline-none focus:ring-2 focus:bg-black focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SiMinutemailer
                    className="h-5 w-5 text-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Submit
              </button>
              <div className="mt-2">
                {message.loading ? (
                  <p className="text-green-600">Email Sending...</p>
                ) : (
                  ""
                )}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
