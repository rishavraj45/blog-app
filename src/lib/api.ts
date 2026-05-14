import axios from "axios";
import { API_BASE } from "@/utils/constants";
import { getStore } from "@/lib/storeRef";
import { logout } from "@/store/slices/authSlice";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = window.localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const store = getStore();
      store?.dispatch(logout());
    }
    return Promise.reject(error);
  },
);
