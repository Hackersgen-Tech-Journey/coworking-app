<template>
  <div class="h-40 flex flex-row justify-center w-full bg-white relative">
    <img
      src="@/assets/logo_v2.png"
      alt="Logo"
      class="h-10 sm:h-1/2 object-contain object-center absolute left-0 sm:left-10 top-6 sm:top-1/2 sm:-translate-y-1/2"
    />
    <div
      class="mt-16 sm:mt-0 h-full flex flex-row justify-center items-center max-w-full"
    >
      <slot />
    </div>
  </div>
</template>
