import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // 🔥 REQUIRED
});

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
