import { defineStore } from "pinia";
import { useAxios } from "../composables/useAxios";
import { Room } from "./models/room";
import { AxiosRequestConfig } from "axios";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
    roomPhotos: [] as Array<string>,
  }),
  actions: {
    async getRooms(body) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "/rooms",
        method: "GET",
        params: {
          ...body,
        },
      } as AxiosRequestConfig);
      const { data } = response;
      this.rooms = data;
    },
    async getRoomDetail(id) {
      const { sendRequest } = useAxios();

      const [rooms, photos] = await Promise.all([
        sendRequest({
          url: "/rooms/" + id,
          method: "GET",
        }),
        sendRequest({
          url: "/rooms/" + id + "/photos",
          method: "GET",
        }),
      ]);
      const { data } = rooms;
      this.roomDetail = data;
      this.roomPhotos = photos.data.photos;
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
