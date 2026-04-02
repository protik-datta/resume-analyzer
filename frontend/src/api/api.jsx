import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const registerUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      return api.post("/auth/register", data);
    },
    onSuccess: (res) => {
      console.log("Registration Success :", res);
    },
    onError: (err) => {
      console.log("Registration Failed :", err);
    },
  });
};

export const userLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return api.post("/auth/login", data);
    },
    onSuccess: (res) => {
      console.log("Login success:", res.data);
    },
    onError: (error) => {
      console.log("Login error:", error);
    },
  });
};
