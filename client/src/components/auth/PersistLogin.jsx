import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import UseRefreshToken from "../../hooks/UseRefreshToken";
import UseAuth from "../../hooks/UseAuth";
import Loader from "../Loader.spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = UseRefreshToken();
  const { auth, persist } = UseAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

//   useEffect(() => {
//     console.log(`isLoading: ${isLoading}`)
//     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
// }, [isLoading])

  return (
    <>{!persist ? <Outlet /> : isLoading ? <Loader/> : <Outlet />}</>
  );
};

export default PersistLogin;
