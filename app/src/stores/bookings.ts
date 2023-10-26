import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { bookings } from "./data/bookings";
import { Booking } from "./models/booking";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    createBooking(room_id, booked_on) {
      const { sendRequest } = useAxios();
    },
    getBookings() {
      const { sendRequest } = useAxios();
      this.bookings = bookings;
    },
    getBookingDetail(id) {
      const { sendRequest } = useAxios();
      this.bookingDetail = bookings.find((booking) => booking.id === id);
    },
    deleteBooking(id) {
      const { sendRequest } = useAxios();
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
