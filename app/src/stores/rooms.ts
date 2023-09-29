import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { Room } from "./models/room";
import { rooms } from "./data/rooms";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
  }),
  actions: {
    getRooms(body) {
      const { sendRequest } = useAxios();
      this.rooms = rooms;
    },
    getRoomDetail(id) {
      const { sendRequest } = useAxios();
      this.roomDetail = rooms.find((room) => room.id === id);
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
