import { defineStore } from "pinia";
import { Room } from "./models/room";
import { rooms } from "./data/rooms";
import { useAxios } from "../composables/useAxios";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
    roomPhotos: [] as Array<string>,
  }),
  actions: {
    async getRooms(body) {
      // facciamo una chiamata per visualizzare tutte le stanze disponibili

      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "rooms",
        method: "GET",
      });
      const { data } = response;
      this.rooms = data;
      // popoliamo lo store in caso positivo X
      return true;
    },
    async getRoomDetail(id) {
      // facciamo una chiamata per caricare dettaglio della stanza
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "rooms/" + id,
        method: "GET",
      });
      // facciamo una chiamata per caricare le foto della stanza
      const responsePhotos = await sendRequest({
        url: "rooms/" + id + "/photos",
        method: "GET",
      });

      // popoliamo lo store in caso positivo
      const { data } = response;
      this.roomDetail = data;
      this.roomPhotos = responsePhotos.data.photos;
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
