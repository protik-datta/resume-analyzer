import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ✅ Request interceptor — header-এ token দাও
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor — 401 হলে token clear করো
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/register", data);
      if (res.data?.token) localStorage.setItem("token", res.data.token); // ✅
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      if (res.data?.token) localStorage.setItem("token", res.data.token); // ✅
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => api.get("/auth/me"),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      localStorage.removeItem("token"); // ✅
      queryClient.clear();
      return res;
    },
  });
};

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
      return res.data;
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
    mutationFn: async (id) => api.delete(`/resume/analysis/${id}`),
  });
};

export const useClearHistory = () => {
  return useMutation({
    mutationFn: async () => api.delete("/resume/history"),
  });
};
