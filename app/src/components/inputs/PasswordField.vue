<script setup lang="ts">
import { ref, watch } from "vue";
import Eye from "../icons/Eye.vue";
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
const obfuscate = ref(true);
const emit = defineEmits(["onChangedValue"]);
watch(
  () => value.value,
  (value) => emit("onChangedValue", value)
);
</script>
<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="font-instrument">{{ text }}</div>
    <div class="border border-black p-3 rounded-xl w-full flex flex-row">
      <!-- ofuscare password in base al valore di obfuscate -->
      <input
        class="flex-1 focus:outline-none"
        v-model="value"
        :type="obfuscate ? 'password' : 'text'"
        :placeholder="props.placeholder"
      />
      <!-- cambiare valore di obfuscate nell'opposto al click -->
      <div @click="() => (obfuscate = !obfuscate)">
        <Eye :color="!obfuscate ? '#42B0A0' : '#bababa'"></Eye>
      </div>
    </div>
  </div>
</template>
