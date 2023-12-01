<script setup lang="ts">
import Content from "../components/ui/Content.vue";
import HeaderVue from "../components/ui/Header.vue";
import { useRoomsStore } from "../stores/rooms";
import { useBookingsStore } from "../stores/bookings";
import Carousel from "../components/ui/Carousel.vue";
import { ref } from "vue";
import { useDayjs } from "../composables";
const roomStore = useRoomsStore();
const bookingStore = useBookingsStore();

// carica il dettaglio della stanza tramite l'roomId presente nella route

const { dayJs } = useDayjs();
const bookedDay = ref(
  localStorage.getItem("day_to_book")
    ? dayJs(localStorage.getItem("day_to_book")).format("DD/MM/YYYY")
    : "NOT_DEFINED"
);
async function bookDay() {
  const currentDay = localStorage.getItem("day_to_book");
  if (!currentDay) {
    return;
  }
  if (!roomStore.roomDetailGetter) {
    return;
  }
  const response = await bookingStore.createBooking(
    roomStore.roomDetailGetter.id,
    currentDay
  );
  // in caso di risposta affermativa manda l'utente sulla pagina 'my-bookings'
}
</script>
<template>
  <HeaderVue>
    <div class="flex flex-col">
      <div class="text-center text-2xl font-bold">
        Dettaglio della stanza:
        <span v-if="roomStore.roomDetailGetter">{{
          roomStore.roomDetailGetter?.name
        }}</span>
      </div>
      <div class="text-center text-lg font-bold mt-3">
        Giorno:
        <span>{{ bookedDay }}</span>
      </div>
    </div>
  </HeaderVue>
  <Content v-if="roomStore.roomDetailGetter">
    <div class="w-full flex flex-col items-start gap-3">
      <div class="w-full flex flex-row justify-center mb-5">
        <Carousel :img_urls="roomStore.roomPhotos" class="mt-10" />
      </div>
      <div class="font-bold text-xl">{{ roomStore.roomDetailGetter.name }}</div>
      <div class="text-gray-500">
        Costo: {{ roomStore.roomDetailGetter.cost }}
      </div>
      <div class="italic">{{ roomStore.roomDetailGetter.category }}</div>
      <div>Numero posti: {{ roomStore.roomDetailGetter.number_of_seats }}</div>
      <div
        @click="bookDay"
        class="py-3 mt-5 w-full text-white text-center bg-blue-water-500 cursor-pointer"
      >
        Prenota
      </div>
    </div>
  </Content>
</template>
