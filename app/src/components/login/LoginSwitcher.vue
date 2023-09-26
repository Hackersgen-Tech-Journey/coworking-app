<script setup lang="ts">
const props = defineProps({
  isRegistering: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["onSwitch"]);
</script>
<template>
  <div class="font-instrument">
    {{ isRegistering ? "Hai già un'account?" : "Non hai un'account?" }}
    <span
      class="text-blue-water-500 font-bold cursor-pointer"
      @click="() => emit('onSwitch')"
      >{{ isRegistering ? "Accedi" : "Registrati" }}</span
    >
  </div>
</template>
