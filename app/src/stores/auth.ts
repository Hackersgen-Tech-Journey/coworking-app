import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { AxiosError, AxiosRequestConfig } from "axios";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    init() {
      this.token = localStorage.getItem("coworking-token");
    },
    async login(form) {
      if (!form["username"] || !form["password"]) {
        return false;
      }
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/auth/login",
        method: "POST",
        data: {
          username: form["username"],
          password: form["password"],
        },
      } as AxiosRequestConfig);
      if (response && response instanceof AxiosError) {
        console.log("Errore nel login");
        return;
      }
      const { data } = response;
      const { token } = data;
      this.token = token;
      localStorage.setItem("coworking-token", this.token);
      return true;
    },
    async register(form) {
      if (!form["username"] || !form["email"] || !form["password"]) {
        return false;
      }
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/auth/signup",
        method: "POST",
        data: {
          username: form["username"],
          email: form["email"],
          password: form["password"],
        },
      } as AxiosRequestConfig);
      if (response && response instanceof AxiosError) {
        console.log("Errore nella registrazione");
        return;
      }
      await this.login(form);
      return true;
    },
  },
  getters: {
    isAuthenticated(state) {
      if (state.token) {
        const claims = JSON.parse(atob(state.token.split(".")[1]));
        const { exp } = claims;
        console.log(exp);
        if (!exp || exp < Date.now() / 1000 - 300) {
          return false;
        }
      }
      return true;
    },
  },
});
