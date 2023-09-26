<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
const value = ref("");
const emit = defineEmits(["onChangedValue"]);
watch(
  () => value.value,
  (value) => emit("onChangedValue", value)
);
</script>
<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="font-instrument">{{ text }}</div>
    <div class="border border-black p-3 rounded-xl w-full">
      <input
        class="w-full focus:outline-none"
        type="text"
        v-model="value"
        :placeholder="props.placeholder"
      />
    </div>
  </div>
</template>
