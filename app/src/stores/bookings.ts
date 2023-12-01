import { defineStore } from "pinia";
import { Booking } from "./models/booking";
import { bookings } from "./data/bookings";
import { useAxios } from "@/composables/useAxios";

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
      const { sendRequest } = useAxios();
      const response = await sendRequest({}, booking);
      this.bookings.push(response);
      // ritorniamo true se la chiamata è andata a buon fine X
      return true;
    },
    async getBookings() {
      // facciamo una chiamata per popolare le prenotazioni fatte
      // popoliamo lo store in caso positivo
      const { sendRequest } = useAxios();
      const response = await sendRequest({}, bookings);
      this.bookings = response;
      // ritorniamo true se la chiamata è andata a buon fine
      return true;
    },
    async getBookingDetail(id) {
      // facciamo una chiamata per accedere al dettaglio della prenotazione
      const booking = bookings.find((booking) => booking.id === id);
      const { sendRequest } = useAxios();
      const response = await sendRequest({}, booking);
      // popoliamo lo store in caso positivo
      this.bookingDetail = response;
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
