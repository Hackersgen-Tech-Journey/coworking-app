<script setup lang="ts">
import Content from "../../components/ui/Content.vue";
import HeaderVue from "../../components/ui/Header.vue";
import { useDayjs } from "../../composables";
import { useBookingsStore } from "../../stores/bookings";
const bookingsStore = useBookingsStore();
bookingsStore.getBookings();
const { dayJs } = useDayjs();
</script>
<template>
  <div class="w-full h-full pb-20 flex flex-col">
    <HeaderVue>
      <div class="text-center text-2xl font-bold">Le mie prenotazioni</div>
    </HeaderVue>
    <Content>
      <div class="flex flex-col w-full pb-10">
        <div
          class="w-full h-16 border-b border-b-black border-opacity-30 flex flex-row justify-between items-center"
          v-for="booking in bookingsStore.bookingsGetter"
        >
          <div>
            <span class="font-semibold"> Nome stanza:</span>
            {{ booking.room_id }}
          </div>
          <div>
            <span class="font-semibold"> Data prenotazione:</span>
            {{ dayJs(booking.booked_on).format("DD/MM/YYYY") }}
          </div>
          <div
            class="p-3 bg-red-500 text-white cursor-pointer"
            @click="() => bookingsStore.deleteBooking(booking.id)"
          >
            Elimina
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
