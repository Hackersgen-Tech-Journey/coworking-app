<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useRoomsStore } from "../../stores/rooms";
import { useDayjs } from "../../composables/index";

// importare RoomCard, HeaderVue, IconInput, Content
import RoomCard from "../../components/cards/RoomCard.vue";
import HeaderVue from "../../components/ui/Header.vue";
import IconInput from "../../components/inputs/IconInput.vue";
import Content from "../../components/ui/Content.vue";
const searchMap = ref(new Map());
const initialDayToBook = ref("");
const roomsStore = useRoomsStore();
const { dayJs } = useDayjs();
function updateMap(key, value) {
  // inserire logica per popolare la mappa searchMap
  searchMap.value.set(key, value);
}
// popolare initialDayToBook con l'ultimo giorno cercato
onMounted(() => {
  const dayToBook = localStorage.getItem("day_to_book");
  if (dayToBook) {
    initialDayToBook.value = dayToBook;
  }
});

function getRooms() {
  if (!searchMap.value.get("day_to_book")) return;
  localStorage.setItem("day_to_book", searchMap.value.get("day_to_book"));
  roomsStore.getRooms(Object.fromEntries(searchMap.value));
}
</script>
<template>
  <div class="w-full h-full pb-20 flex flex-col">
    <HeaderVue>
      <div
        class="h-fit bg-white gap-3 flex sm:flex-row flex-col border border-opacity-60 max-w-full"
      >
        <IconInput
          :placeholder="'Scegli la data'"
          type="date"
          :initial-value="initialDayToBook"
          @on-value-changed="
            (value) =>
              updateMap('day_to_book', dayJs(value).format('YYYY-MM-DD'))
          "
        >
          <template #icon="{ id }">
            <label :for="id" class="h-full flex flex-col justify-center">
              Data Selezionata: &nbsp;&nbsp;
            </label>
          </template>
        </IconInput>
        <div
          class="flex items-center p-3 bg-blue-water-500 text-white cursor-pointer"
          @click="getRooms"
        >
          Cerca
        </div>
      </div>
    </HeaderVue>
    <Content>
      <div class="w-full grid sm:grid-cols-3 grid-cols-1 gap-3 relative py-10">
        <div
          v-if="!roomsStore.roomsGetter.length"
          class="absolute text-gray-500 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        >
          Seleziona data per visualizzare i workspace disponibili
        </div>
        <RoomCard
          v-for="room in roomsStore.roomsGetter"
          :key="room.id"
          :id="room.id"
          :category="room.category"
          :number_of_seats="room.number_of_seats"
          :cost="room.cost"
          :is_available="room.IsAvailable"
          :main_photo="room.main_photo"
          :name="room.name"
        ></RoomCard>
      </div>
    </Content>
  </div>
</template>
