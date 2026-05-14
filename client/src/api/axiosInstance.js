import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        if (!refresh) throw error;
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken: refresh,
        });
        const accessToken = data?.data?.accessToken ?? data?.accessToken;
        if (!accessToken) throw error;
        localStorage.setItem("accessToken", accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(original);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);
