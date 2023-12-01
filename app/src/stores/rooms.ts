import { defineStore } from "pinia";
import { Room } from "./models/room";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
    roomPhotos: [] as Array<string>,
  }),
  actions: {
    async getRooms(body) {
      // facciamo una chiamata per visualizzare tutte le stanze disponibili
      // popoliamo lo store in caso positivo
    },
    async getRoomDetail(id) {
      // facciamo una chiamata per caricare dettaglio della stanza
      // facciamo una chiamata per caricare le foto della stanza
      // popoliamo lo store in caso positivo
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
