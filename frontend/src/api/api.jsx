import { useMutation, useQuery } from "@tanstack/react-query";
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

export const getMe = ()=> {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return api.get("/auth/me");
    },
    onSuccess: (res) => {
      console.log("Get Me success:", res.data);
    },
    onError: (error) => {
      console.log("Get Me error:", error);
    },
  });
}

export const userLogout = ()=> {
  return useMutation({
    mutationFn: async () => {
      return api.post("/auth/logout");
    },
    onSuccess: (res) => {
      console.log("Logout success:", res.data);
    },
    onError: (error) => {
      console.log("Logout error:", error);
    },
  });
}
