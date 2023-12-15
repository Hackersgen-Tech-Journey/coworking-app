import axios, { AxiosRequestConfig } from "axios";

export const useAxios = () => {
  // creare istanza di axios
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // aggiungere interceptor per aggiungere token di autenticazione
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("coworking-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });
  // scrivere metodo sendRequest che fa una richiesta con axios
  // passandogli come primo parametro una configurazione di axios
  // passandogli come secondo parametro un valore default di ritorno

  const sendRequest = async (config: AxiosRequestConfig) => {
    try {
      const { data } = await instance.request(config);
      return data;
    } catch (error) {
      return error;
    }
  };

  return { sendRequest };
};
