<script setup lang="ts">
import { RouterView } from "vue-router";
import BottomMenu from "../components/menu/BottomMenu.vue";
</script>

<template>
  <div class="px-5 h-full">
    <!-- Inserire componente per poter vedere dinamicamente le pagine -->
    <RouterView />
    <BottomMenu />
  </div>
</template>
