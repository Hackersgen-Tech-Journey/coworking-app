import axios from "axios";

export function useAxios() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL ?? "http://localhost:8080",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("coworking-token");
    if (token) {
      config.headers["X-Auth-Token"] = token;
    }
    return config;
  });

  const sendRequest = (config) => instance.request(config);

  return { sendRequest };
}
