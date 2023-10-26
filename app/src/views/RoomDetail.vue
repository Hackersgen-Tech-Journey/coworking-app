<script setup lang="ts">
import { useRoute } from "vue-router";
import Content from "../components/ui/Content.vue";
import HeaderVue from "../components/ui/Header.vue";
import { useRoomsStore } from "../stores/rooms";
const roomStore = useRoomsStore();
const route = useRoute();
roomStore.getRoomDetail(route.params.roomId);
</script>
<template>
  <HeaderVue>
    <div class="text-center text-2xl font-bold">
      Dettaglio della stanza:
      <span v-if="roomStore.roomDetailGetter">{{
        roomStore.roomDetailGetter?.name
      }}</span>
    </div>
  </HeaderVue>
  <Content v-if="roomStore.roomDetailGetter">
    <div class="w-full flex flex-col items-start gap-3">
      <div class="w-full flex flex-row justify-center mb-5">
        <img
          src="https://flawless.life/wp-content/uploads/2018/01/copernico-milano-cover.jpg"
          class="h-72 w-full object-cover object-center mt-10"
          alt="immagine stanza"
        />
      </div>
      <div class="font-bold text-xl">{{ roomStore.roomDetailGetter.name }}</div>
      <div class="text-gray-500">
        Costo: {{ roomStore.roomDetailGetter.cost }}
      </div>
      <div class="italic">{{ roomStore.roomDetailGetter.category }}</div>
      <div>Numero posti: {{ roomStore.roomDetailGetter.number_of_seats }}</div>
      <div>
        Disponibile: {{ roomStore.roomDetailGetter.is_available ? "Si" : "No" }}
      </div>
      <div class="py-3 mt-5 w-full text-white text-center bg-blue-water-500">
        Prenota
      </div>
    </div>
  </Content>
</template>
