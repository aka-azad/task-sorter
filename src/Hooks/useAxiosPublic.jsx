import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://task-sorter-api.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
