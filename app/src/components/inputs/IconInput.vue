<script setup lang="ts">
import { ref, watch } from "vue";

// inserire prop id di tipo String con default icon-input
// inserire prop placeholder di tipo String con required true
// inserire prop placeholder di tipo String con default ''
// inserire prop placeholder di tipo String con default 'text'

const inputValue = ref("");

// inserire watcher che emitta il nuovo valore di inputValue

// inserire watcher che cambia il valore di inputValue se initialValue cambia

// inserire emit 'onValueChanged'
</script>

<template>
  <div class="p-1.5 flex flex-row w-90 max-w-full">
    <!-- aggiungere id key con valore id -->
    <slot name="icon">
      <!-- aggiungere for con valore id -->
      <label>
        <img src="@/assets/svg/map-pin.svg" alt="map pin" class="mr-3" />
      </label>
    </slot>
    <!-- Collgare inputValue in maniera bilaterale all'input -->
    <!-- aggiungere id, type, placeholder -->
    <input class="flex-1 font-instrument focus:outline-none text-center" />
  </div>
</template>
