import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";

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
        return;
      }
      // facciamo la chiamata di login
      const { sendRequest } = useAxios();
      const response = await sendRequest({}, "DUMMY");
      // settiamo il token nello store
      this.token = response;
      // settiamo il token nel localStorage
      localStorage.setItem("coworking-token", this.token);
      // ritorniamo true in caso di settaggio del token positivo
      return true;
    },
    async register(form) {
      // validiamo il form

      if (!form["username"] || !form["password"] || !form["email"]) {
        return;
      }
      // facciamo la chiamata di registrazione
      const { sendRequest } = useAxios();
      const response = await sendRequest({});
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
