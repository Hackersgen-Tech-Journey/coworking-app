import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [],
    bookingDetail: null,
  }),
  actions: {
    createBooking(room_id) {
      const { sendRequest } = useAxios();
      this.bookingDetail = null;
    },
    getBookings() {
      const { sendRequest } = useAxios();
      this.bookings = [];
    },
    getBookingDetail(id) {
      const { sendRequest } = useAxios();
      this.bookingDetail = null;
    },
    deleteBooking(id) {
      const { sendRequest } = useAxios();
      this.bookingDetail = null;
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
