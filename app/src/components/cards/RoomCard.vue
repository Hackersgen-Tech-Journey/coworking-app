<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  number_of_seats: { type: Number, required: true },
  category: { type: String, required: true },
  is_available: { type: Boolean, required: true },
  main_photo: { type: String, required: true },
});
const router = useRouter();
</script>

<template>
  <!-- al click indirizzare l'utente alla pagina di dettaglio della stanza -->
  <!-- passando come roomId l'id presente nelle props -->
  <div
    class="w-full h-fit border rounded-xl flex flex-col cursor-pointer"
    @click="
      () => {
        router.push({
          name: 'room-detail',
          params: {
            roomId: props.id,
          },
        });
      }
    "
  >
    <img
      :src="'http://localhost:8080/imgs' + main_photo"
      :alt="name"
      class="w-full rounded-t-xl object-center object-cover"
    />
    <div class="flex flex-col w-full p-3">
      <div class="font-bold text-xl">{{ name }}</div>
      <div class="text-gray-500">Costo: {{ cost }}</div>
      <div class="italic">{{ category }}</div>
      <div>Numero posti: {{ number_of_seats }}</div>
      <div>Disponibile: {{ is_available ? "Si" : "No" }}</div>
    </div>
  </div>
</template>
