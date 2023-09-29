<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
});
const inputValue = ref("");

watch(
  () => inputValue.value,
  (newVal) => emit("onValueChanged", newVal)
);

const emit = defineEmits(["onValueChanged"]);
</script>

<template>
  <div class="border border-black rounded-xl p-1.5 flex flex-row w-90">
    <slot name="icon">
      <img src="@/assets/svg/map-pin.svg" alt="map pin" class="mr-3" />
    </slot>
    <input
      :type="type"
      v-model="inputValue"
      class="flex-1 font-instrument focus:outline-none"
      :placeholder="placeholder"
    />
  </div>
</template>
