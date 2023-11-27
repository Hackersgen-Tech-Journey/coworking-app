import axios, { AxiosRequestConfig } from "axios";

export function useAxios() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("coworking-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });

  const sendRequest = (config: AxiosRequestConfig) => instance.request(config);

  return { sendRequest };
}
