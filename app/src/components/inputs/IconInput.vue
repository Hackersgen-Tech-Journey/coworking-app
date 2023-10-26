<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "icon-input",
  },
  placeholder: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    default: "",
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

watch(
  () => props.initialValue,
  (newVal) => {
    if (!inputValue.value) {
      inputValue.value = newVal;
    }
  }
);

const emit = defineEmits(["onValueChanged"]);
</script>

<template>
  <div class="p-1.5 flex flex-row w-90">
    <slot name="icon" :id="id">
      <label :for="id">
        <img src="@/assets/svg/map-pin.svg" alt="map pin" class="mr-3" />
      </label>
    </slot>
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      class="flex-1 font-instrument focus:outline-none text-center"
      :placeholder="placeholder"
    />
  </div>
</template>
