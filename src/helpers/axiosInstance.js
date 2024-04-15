import axios from "axios";
import { BASE_URL } from "../constants.js"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true
});

// const url = axiosInstance.defaults.baseURL = BASE_URL;
// console.log("backend url : ", axiosInstance);
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;