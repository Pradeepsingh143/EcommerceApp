import axios from "../api/axios";
import UseAuth from "./UseAuth";

const UseRefreshToken = () => {
  const { setAuth } = UseAuth();

  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        role: response.data.role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default UseRefreshToken;
