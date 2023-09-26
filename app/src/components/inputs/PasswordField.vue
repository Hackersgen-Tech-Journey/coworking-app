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
      <input
        class="flex-1 focus:outline-none"
        :type="obfuscate ? 'password' : 'text'"
        v-model="value"
        :placeholder="props.placeholder"
      />
      <div @click="() => (obfuscate = !obfuscate)">
        <Eye :color="!obfuscate ? '#42B0A0' : '#bababa'"></Eye>
      </div>
    </div>
  </div>
</template>
