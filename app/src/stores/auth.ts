import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";

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
      this.token = "DUMMY";
      localStorage.setItem("coworking-token", this.token);
      return true;
    },
    async register(form) {
      if (!form["username"] || !form["email"] || !form["password"]) {
        return false;
      }
      const { sendRequest } = useAxios();
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
