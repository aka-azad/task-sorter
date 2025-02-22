import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://task-sorter-api.onrender.com",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);

  // send token to server
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // handle response
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await signOutUser();
        navigate("/sign-in");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
