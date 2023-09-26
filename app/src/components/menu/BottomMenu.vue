<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const activeRoute = computed(() => route.name);
</script>
<template>
  <div
    class="flex flex-row justify-stretch w-full fixed left-0 bottom-0 h-20 bg-white border-t border-black border-opacity-10 text-xl cursor-pointer"
  >
    <div
      class="flex flex-1 flex-row justify-center items-center border-r border-black border-opacity-10"
      :class="{ 'text-green-600 font-bold': activeRoute == 'home' }"
      @click="() => router.push({ name: 'home' })"
    >
      Home
    </div>
    <div
      class="flex flex-1 flex-row justify-center items-center"
      :class="{ 'text-green-600 font-bold': activeRoute == 'my-bookings' }"
      @click="() => router.push({ name: 'my-bookings' })"
    >
      My bookings
    </div>
  </div>
</template>
