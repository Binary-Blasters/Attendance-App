import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // your backend base URL
  withCredentials: true, // so cookies/JWT work
});

export default api;
