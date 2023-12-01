import { defineStore } from "pinia";
import { Booking } from "./models/booking";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    async createBooking(room_id, booked_on) {
      // facciamo una chiamata per creare una prenotazione
      // ritorniamo true se la chiamata è andata a buon fine
    },
    async getBookings() {
      // facciamo una chiamata per popolare le prenotazioni fatte
      // popoliamo lo store in caso positivo
      // ritorniamo true se la chiamata è andata a buon fine
    },
    async getBookingDetail(id) {
      // facciamo una chiamata per accedere al dettaglio della prenotazione
      // popoliamo lo store in caso positivo
    },
    async deleteBooking(id) {
      // facciamo una chiamata per eliminare la prenotazione
      // in caso positivo eliminiamo la prenotazione da quelle disponibili
    },
  },
  getters: {
    bookingsGetter(state) {
      return state.bookings;
    },
    bookingDetailGetter(state) {
      return state.bookingDetail;
    },
  },
});
