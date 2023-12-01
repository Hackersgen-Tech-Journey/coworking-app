import { defineStore } from "pinia";
import { Booking } from "./models/booking";
import { bookings } from "./data/bookings";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    async createBooking(room_id, booked_on) {
      // facciamo una chiamata per creare una prenotazione
      const booking = {
        room_id,
        booked_on,
        id: "1",
        created_at: "2023",
      } as Booking;
      this.bookings.push(booking);
      // ritorniamo true se la chiamata è andata a buon fine X
      return true;
    },
    async getBookings() {
      // facciamo una chiamata per popolare le prenotazioni fatte
      // popoliamo lo store in caso positivo
      this.bookings = bookings;
      // ritorniamo true se la chiamata è andata a buon fine
      return true;
    },
    async getBookingDetail(id) {
      // facciamo una chiamata per accedere al dettaglio della prenotazione
      const booking = bookings.find((booking) => booking.id === id);
      // popoliamo lo store in caso positivo
      this.bookingDetail = booking;
    },
    async deleteBooking(id) {
      // facciamo una chiamata per eliminare la prenotazione
      // in caso positivo eliminiamo la prenotazione da quelle disponibili
      const oldBookings = [...this.bookings];
      const index = oldBookings.findIndex((value) => value.id === id);
      oldBookings.splice(index, 1);
      this.bookings = oldBookings;
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
