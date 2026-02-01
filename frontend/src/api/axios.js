import axios from "axios";
import api from "../api/axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true, // ✅ COOKIE AUTH
});

export default api;
