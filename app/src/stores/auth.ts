import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { AxiosError, AxiosRequestConfig } from "axios";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null,
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
      this.token = data;
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
      this.login(form.username, form.password);
      return true;
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
