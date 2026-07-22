import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Vendor Login
export const vendorLogin = async (email, password) => {
  const response = await api.post(API_ENDPOINTS.VENDOR_LOGIN, {
    email,
    password,
  });

  // Store tokens
  localStorage.setItem("access_token_vendor", response.data.access);
  localStorage.setItem("refresh_token_vendor", response.data.refresh);

  // Store user details
  localStorage.setItem("user", JSON.stringify(response.data.user));
  localStorage.setItem(
    "professional",
    JSON.stringify(response.data.professional)
  );

  return response.data;
};

// Generic GET API
export const getData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

// Generic POST API
export const postData = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

export default api;