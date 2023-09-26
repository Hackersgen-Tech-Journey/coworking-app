<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header
    class="absolute top-0 w-full left-0 h-24 bg-transparent flex flex-row justify-between items-center px-10"
  >
    <img
      src="@/assets/logo.png"
      alt="logo"
      class="h-full object-contain object-center"
    />
  </header>

  <RouterView />
</template>
