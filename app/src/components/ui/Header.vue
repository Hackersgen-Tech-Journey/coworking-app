<template>
  <div
    class="h-40 flex flex-row justify-center w-full bg-white relative border-b border-opacity-60"
  >
    <img
      src="@/assets/logo_v2.png"
      alt="Logo"
      class="h-1/2 object-contain object-center absolute left-10 top-1/2 -translate-y-1/2"
    />
    <div class="h-full flex flex-row justify-center items-center">
      <slot />
    </div>
  </div>
</template>
