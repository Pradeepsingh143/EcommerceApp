import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import UseAuth from "./UseAuth";

const UseLogout = () => {
    const { setAuth } = UseAuth();
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        try {
            await axios('/api/auth/logout', {
                withCredentials: true
            });
            navigate("/login")
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default UseLogout