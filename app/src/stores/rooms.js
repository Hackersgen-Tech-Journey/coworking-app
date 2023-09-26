import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null,
    rooms: [],
  }),
  actions: {
    getRooms() {
      const { sendRequest } = useAxios();
      this.rooms = [];
    },
    getRoomDetail(id) {
      const { sendRequest } = useAxios();
      this.roomDetail = {};
    },
  },
  getters: {
    roomsGetter(state) {
      return state.rooms;
    },
    roomDetailGetter(state) {
      return state.roomDetail;
    },
  },
});
