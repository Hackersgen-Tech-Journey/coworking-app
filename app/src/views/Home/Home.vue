<script setup lang="ts">
import { ref } from "vue";
import IconInput from "../../components/inputs/IconInput.vue";

const searchMap = ref(new Map());

function updateMap(key, value) {
  searchMap.value.set(key, value);
}
</script>
<template>
  <div
    class="h-90 w-full rounded-3xl bg-coworking bg-center bg-cover border border-blue-water-500 relative"
  >
    <div
      class="w-fit h-fit bg-white flex flex-row absolute bottom-3 left-1/2 -translate-x-1/2 border-2 border-blue-water-500 p-4 rounded-3xl gap-3"
    >
      <IconInput
        :placeholder="'Dove vuoi andare?'"
        @on-value-changed="(value) => updateMap('location', value)"
      />
      <IconInput
        :placeholder="'Scegli la data'"
        type="date"
        @on-value-changed="(value) => updateMap('date_to_book', value)"
      >
        <template #icon>
          <img src="@/assets/svg/calendar.svg" alt="map pin" class="mr-3" />
        </template>
      </IconInput>
      <IconInput
        :placeholder="'In quanti siete?'"
        type="number"
        @on-value-changed="(value) => updateMap('number_of_users', value)"
      >
        <template #icon>
          <img src="@/assets/svg/user.svg" alt="map pin" class="mr-3" />
        </template>
      </IconInput>
      <div
        class="flex items-center p-3 bg-blue-water-500 text-white rounded-xl"
      >
        Cerca
      </div>
    </div>
  </div>
</template>
