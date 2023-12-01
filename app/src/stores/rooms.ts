import { defineStore } from "pinia";
import { Room } from "./models/room";
import { rooms } from "./data/rooms";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
    roomPhotos: [] as Array<string>,
  }),
  actions: {
    async getRooms(body) {
      // facciamo una chiamata per visualizzare tutte le stanze disponibili
      this.rooms = rooms;
      // popoliamo lo store in caso positivo X
      return true;
    },
    async getRoomDetail(id) {
      // facciamo una chiamata per caricare dettaglio della stanza
      const room = rooms.find((room) => room.id === id);
      // facciamo una chiamata per caricare le foto della stanza
      // popoliamo lo store in caso positivo
      this.roomDetail = room;
    },
  },
  getters: {
    roomsGetter(state) {
      return state.rooms;
    },
    roomDetailGetter(state) {
      return state.roomDetail;
    },
    roomPhotosGetter(state) {
      return state.roomPhotos;
    },
  },
});
