import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    init() {
      // Bisogna inizializzare il token prendendolo dal localStorage
    },
    async login(form) {
      // validiamo il form
      // facciamo la chiamata di login
      // settiamo il token nello store
      // settiamo il token nel localStorage
      // ritorniamo true in caso di settaggio del token positivo
    },
    async register(form) {
      // validiamo il form
      // facciamo la chiamata di registrazione
      // facciamo il login in automatico (?)
      // ritorniamo true in caso di settaggio del token positivo
    },
  },
  getters: {
    isAuthenticated(state) {
      // ritorniamo true nel caso in cui il token sia valido
    },
  },
});
