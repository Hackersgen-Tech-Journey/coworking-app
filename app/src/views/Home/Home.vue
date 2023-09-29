<script setup lang="ts">
import { ref } from "vue";
import IconInput from "../../components/inputs/IconInput.vue";

import { useRoomsStore } from "../../stores/rooms";
import RoomCard from "../../components/cards/RoomCard.vue";

const searchMap = ref(new Map());
const roomsStore = useRoomsStore();
function updateMap(key, value) {
  searchMap.value.set(key, value);
}
function getRooms() {
  if (!searchMap.value.get("day_to_book")) return;
  roomsStore.getRooms(Object.fromEntries(searchMap.value));
}
</script>
<template>
  <div class="w-full h-full pb-20 flex flex-col">
    <div
      class="h-28 w-full rounded-3xl bg-pattern bg-repeat bg-contain bg-blend-overlay bg-blue-water-400 border border-blue-water-500 relative"
    >
      <div
        src="@/assets/logo.png"
        alt="logo"
        class="text-white font-bold font-instrument tracking-widest text-3xl absolute left-3 top-1/2 -translate-y-1/2 bg-blue-water-500 p-3"
      >
        GOODPLACE
      </div>
      <div
        class="w-fit h-fit bg-white flex flex-row absolute bottom-3 left-1/2 -translate-x-1/2 border-2 border-blue-water-500 p-4 rounded-3xl gap-3"
      >
        <IconInput
          :placeholder="'Scegli la data'"
          type="date"
          @on-value-changed="(value) => updateMap('day_to_book', value)"
        >
          <template #icon>
            <img src="@/assets/svg/calendar.svg" alt="map pin" class="mr-3" />
          </template>
        </IconInput>
        <div
          class="flex items-center p-3 bg-blue-water-500 text-white rounded-xl cursor-pointer"
          @click="getRooms"
        >
          Cerca
        </div>
      </div>
    </div>
    <div
      class="flex-1 w-full grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-3 relative pt-5 overflow-scroll"
    >
      <div
        v-if="!roomsStore.roomsGetter.length"
        class="absolute text-gray-500 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      >
        Seleziona data per visualizzare i workspace
      </div>
      <RoomCard
        v-for="room in roomsStore.roomsGetter"
        :key="room.id"
        :id="room.id"
        :category="room.category"
        :number_of_seats="room.number_of_seats"
        :cost="room.cost"
        :is_available="room.is_available"
        :main_photo="room.main_photo"
        :name="room.name"
      ></RoomCard>
    </div>
  </div>
</template>
