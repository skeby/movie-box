import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "02d99523fc7b7ac4eca40e5e0aa9a4c8";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: API_KEY,
  },
  timeout: 60000,
});

export default axiosClient;
