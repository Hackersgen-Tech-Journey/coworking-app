<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useRoomsStore } from "../../stores/rooms";
import RoomCard from "../../components/cards/RoomCard.vue";
import HeaderVue from "../../components/ui/Header.vue";
import IconInput from "../../components/inputs/IconInput.vue";
import Content from "../../components/ui/Content.vue";

const searchMap = ref(new Map());
const initialDayToBook = ref("");
const roomsStore = useRoomsStore();
function updateMap(key, value) {
  searchMap.value.set(key, value);
}

onMounted(() => {
  const dayToBook = localStorage.getItem("day_to_book");
  if (!dayToBook) return;
  initialDayToBook.value = dayToBook;
  roomsStore.getRooms({ day_to_book: dayToBook });
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
        class="w-fit h-fit bg-white gap-3 flex flex-row border border-opacity-60"
      >
        <IconInput
          :placeholder="'Scegli la data'"
          type="date"
          :initial-value="initialDayToBook"
          @on-value-changed="(value) => updateMap('day_to_book', value)"
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
          :is_available="room.is_available"
          :main_photo="room.main_photo"
          :name="room.name"
        ></RoomCard>
      </div>
    </Content>
  </div>
</template>
