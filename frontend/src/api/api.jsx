import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      return api.post("/auth/register", data);
    },
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return api.post("/auth/login", data);
    },
  });
};

export const useGetMe = ()=> {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return api.get("/auth/me");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export const useUserLogout = ()=> {
  return useMutation({
    mutationFn: async () => {
      return api.post("/auth/logout");
    },
  });
}

export const useAnalyzeResume = () => {
  return useMutation({
    mutationFn: async (formData) => {
      return api.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
};

export const useGetHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await api.get("/resume/history");
      return res.data
    },
  });
};

export const useGetAnalysisDetails = (id) => {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: async () => {
      const res = await api.get(`/resume/analysis/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useDeleteAnalysis = () => {
  return useMutation({
    mutationFn: async (id) => {
      return api.delete(`/resume/analysis/${id}`);
    },
  });
};

export const useClearHistory = () => {
  return useMutation({
    mutationFn: async () => {
      return api.delete("/resume/history");
    },
  });
};
