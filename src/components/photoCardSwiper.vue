<template>
  <v-container fluid class="pa-0">
    <swiper 
    :effect="'cards'" 
    :grabCursor="true" 
    :modules="modules" 
    class="mySwiper">
      <swiper-slide 
      v-for="(el, index) in photos" 
      :key="index">
        <img :src="el.img">
      </swiper-slide>
    </swiper>
  </v-container>
</template>



<script setup>
// ● 引進 Swiper 套件以及相關檔案
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper/modules'

const modules = [EffectCards]

const photos = computed(() => {
  return [
    { img: new URL('../assets/img/active_img/active_img 01.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 02.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 03.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 04.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 05.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 06.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 07.jpg', import.meta.url).href },
  ]
})



</script>

<style scoped>
.swiper {
  width: 100%;
  height: 500px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
  background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
  background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
  background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
  background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
  background-color: rgb(54, 94, 77);
}
</style>
