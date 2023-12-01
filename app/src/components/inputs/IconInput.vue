<script setup lang="ts">
import { ref, watch } from "vue";

// inserire prop id di tipo String con default icon-input
// inserire prop placeholder di tipo String con required true
// inserire prop initialValue di tipo String con default ''
// inserire prop type di tipo String con default 'text'
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

// inserire watcher che emitta il nuovo valore di inputValue
watch(
  () => inputValue.value,
  (newValue) => {
    emit("onValueChanged", newValue);
  }
);
// inserire watcher che cambia il valore di inputValue se initialValue cambia
watch(
  () => props.initialValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

// inserire emit 'onValueChanged'
const emit = defineEmits(["onValueChanged"]);
</script>

<template>
  <div class="p-1.5 flex flex-row w-90 max-w-full">
    <!-- aggiungere id key con valore id -->
    <slot name="icon" :id="id">
      <!-- aggiungere for con valore id -->
      <label :for="id">
        <img src="@/assets/svg/map-pin.svg" alt="map pin" class="mr-3" />
      </label>
    </slot>
    <!-- Collgare inputValue in maniera bilaterale all'input -->
    <!-- aggiungere id, type, placeholder -->
    <input
      v-model="inputValue"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="flex-1 font-instrument focus:outline-none text-center"
    />
  </div>
</template>
