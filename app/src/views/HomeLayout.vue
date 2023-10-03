<script setup lang="ts">
import BottomMenu from "../components/menu/BottomMenu.vue";
</script>

<template>
  <div class="px-5 h-full">
    <RouterView />
    <BottomMenu />
  </div>
</template>
