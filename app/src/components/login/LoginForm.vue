<script setup lang="ts">
import PasswordField from "../inputs/PasswordField.vue";
import TextField from "../inputs/TextField.vue";
import { ref } from "vue";
// importare authStore
// importare router
const loginMap = ref(new Map());
function updateForm(key, value) {
  loginMap.value.set(key, value);
}
async function login() {
  // chiamare metodo di login con come valore loginMap trasformata in oggetto
  // in caso di risposta affermativa fare redirect su home
}
</script>
<template>
  <div class="flex flex-col w-full gap-2">
    <div class="text-3xl font-medium justify-center text-black">
      <span>
        Accedi al tuo account
        <span class="text-blue-water-500 font-bold">Goodplace</span>
      </span>
    </div>
    <div class="text-base font-normal text-black">
      Inserisci le tue credenziali per accedere al tuo account
    </div>
    <div class="flex flex-col gap-6">
      <!-- aggiungere handler per aggiornare il form con key 'username' -->
      <TextField
        text="Username"
        placeholder="Inserisci il tuo username"
      ></TextField>
      <PasswordField
        text="Password"
        placeholder="Inserisci una password"
        @on-changed-value="(value) => updateForm('password', value)"
      ></PasswordField>
      <div
        @click="() => login()"
        class="p-5 w-full flex flex-row bg-blue-water-500 text-white rounded-xl justify-center cursor-pointer"
      >
        Accedi
      </div>
    </div>
  </div>
</template>
