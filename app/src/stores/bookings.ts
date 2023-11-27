import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { bookings } from "./data/bookings";
import { Booking } from "./models/booking";
import { AxiosError } from "axios";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    async createBooking(room_id, booked_on): Promise<boolean> {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/bookings",
        method: "POST",
        data: {
          room_id,
          booked_on,
        },
      });
      if (response && response instanceof AxiosError) {
        return false;
      }
      return true;
    },
    async getBookings() {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/bookings",
        method: "GET",
      });
      const { data } = response;
      this.bookings = data;
    },
    async getBookingDetail(id) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/bookings/" + id,
        method: "GET",
      });
      const { data } = response;
      this.bookingDetail = data;
    },
    async deleteBooking(id) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/bookings/" + id,
        method: "DELETE",
      });
      if (response && response instanceof AxiosError) {
        return;
      }
      const oldBookings = [...this.bookings];
      const index = this.bookings.findIndex((value) => value.id == id);
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
