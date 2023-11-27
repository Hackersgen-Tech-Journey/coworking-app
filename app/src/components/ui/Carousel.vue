<script setup lang="ts">
import SwiperCore from "swiper";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
SwiperCore.use([Navigation, Pagination, A11y]);
const props = defineProps({
  img_urls: {
    type: Array<string>,
    required: true,
  },
});
</script>
<template>
  <swiper
    class="h-96 outline-none border-none"
    :slides-per-view="1"
    navigation
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="img in props.img_urls">
      <img
        class="w-full h-full object-contain object-center outline-none border-none"
        :src="'http://localhost:8080/imgs' + img"
        alt="Picture"
      />
    </swiper-slide>
  </swiper>
</template>
