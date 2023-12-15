import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { AxiosRequestConfig, AxiosError } from "axios";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    init() {
      // Bisogna inizializzare il token prendendolo dal localStorage
      this.token = localStorage.getItem("coworking-token");
    },
    async login(form) {
      // validiamo il form
      if (!form["username"] || !form["password"]) {
        return false;
      }
      // facciamo la chiamata di login
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "auth/login",
        data: {
          username: form["username"],
          password: form["password"],
        },
        method: "POST",
      } as AxiosRequestConfig);
      // settiamo il token nello store
      if (response instanceof AxiosError) {
        return false;
      }
      this.token = response.token;
      // settiamo il token nel localStorage
      localStorage.setItem("coworking-token", this.token);
      // ritorniamo true in caso di settaggio del token positivo
      return true;
    },
    async register(form) {
      // validiamo il form

      if (!form["username"] || !form["password"] || !form["email"]) {
        return false;
      }
      // facciamo la chiamata di registrazione
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "auth/signup",
        data: {
          username: form["username"],
          password: form["password"],
          email: form["email"],
        },
        method: "POST",
      });
      if (response instanceof AxiosError) {
        return false;
      }
      // facciamo il login in automatico (?)
      this.login(form);
      // ritorniamo true in caso di settaggio del token positivo
      return true;
    },
  },
  getters: {
    isAuthenticated(state) {
      // ritorniamo true nel caso in cui il token sia valido
      return !!state.token;
    },
  },
});
