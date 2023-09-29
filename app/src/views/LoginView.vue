<script setup>
import { ref } from "vue";
import RegisterForm from "../components/login/RegisterForm.vue";
import LoginForm from "../components/login/LoginForm.vue";
import LoginSwitcher from "../components/login/LoginSwitcher.vue";
const isRegistering = ref(false);
</script>

<template>
  <header
    class="z-30 absolute top-0 w-full left-0 h-24 bg-transparent flex flex-row justify-between items-center px-10"
  >
    <img
      src="@/assets/logo.png"
      alt="logo"
      class="h-full object-contain object-center bg-white"
    />
  </header>
  <div class="w-full flex flex-col md:flex-row h-full flex-1 gap-5">
    <div
      class="md:flex-1 md:h-full md:overflow-scroll flex-col flex py-5 px-20 mt-24 gap-6"
    >
      <LoginForm v-if="!isRegistering" />
      <RegisterForm v-else />
      <LoginSwitcher
        :is-registering="isRegistering"
        @on-switch="() => (isRegistering = !isRegistering)"
      />
    </div>
    <div class="w-full md:w-1/2 h-full relative">
      <div class="p-5 absolute bottom-10 left-10">
        <span
          class="text-white text-8xl font-bold bg-blue-water-400 leading-tighter"
        >
          Sogna <br />
          Viaggia e Divertiti mentre lavori
        </span>
      </div>
      <div class="w-full h-full p-5">
        <img
          src="@/assets/login_img.jpeg"
          alt="login image"
          class="object-cover object-center w-full h-full rounded-xl overflow-hidden border border-blue-water-500"
        />
      </div>
    </div>
  </div>
</template>
