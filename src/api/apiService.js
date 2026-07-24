import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach vendor token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token_vendor");
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
  localStorage.setItem("access_token_vendor", response.data.access);
  localStorage.setItem("refresh_token_vendor", response.data.refresh);
  localStorage.setItem("vendor_professional_id", response.data.professional_id);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  localStorage.setItem("professional", JSON.stringify(response.data.professional));
  return response.data;
};

// ─── Generic HTTP Methods ──────────────────────────────
export const getData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

export const postData = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

export const putData = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

export const patchData = async (url, data) => {
  const response = await api.patch(url, data);
  return response.data;
};

export const deleteData = async (url) => {
  const response = await api.delete(url);
  return response.data;
};

export default api;