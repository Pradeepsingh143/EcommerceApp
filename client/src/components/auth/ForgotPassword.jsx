import React, { useState} from "react";
import axios from "axios";
import { SiMinutemailer } from "react-icons/si";


const ForgotPassword = () => {
  // const navigate = useNavigate();
  const [message, setMessage] = useState({
    message: "",
    code: "",
    loading: ""
  });
  const [user, setUser] = useState({ email: "" });

  const ForgotPasswordHandle = async (e) => {
    e.preventDefault();
    try {
      setMessage({loading: true})
      const response = await axios.post("/api/auth/password/forgot", user);
      setUser({ email: "" });
      setMessage({ message: response.data.message, code: response.status, loading: false });
      // navigate("/");
    } catch (error) {
      console.log("Error forgotpassword form: ", error);
      setMessage({
        message: error.response.data.message,
        code: error.response.status,
        loading: false
      });
    }
  };

  return (
    <>
      <div className="flex min-h-[85vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot your password
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={ForgotPasswordHandle}
            method="POST"
          >
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
                      email: e.target.value,
                    });
                  }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your email address"
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
                {message.loading? <p className="text-green-600">Email Sending...</p>: ""}
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

export default ForgotPassword;
