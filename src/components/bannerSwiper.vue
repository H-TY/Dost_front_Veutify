<template>
  <swiper 
  :pagination="{
    dynamicBullets: true,
  }" 
  :navigation="true" 
  :modules="modules" 
  class="mySwiper">
    <swiper-slide 
    v-for="(el, index) in banners" 
    :key="index">
      <img :src="el.img">
    </swiper-slide>
  </swiper>
</template>


<script setup>
// ● 引進 Swiper 套件以及相關檔案
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
// import required modules
import { Pagination, Navigation } from 'swiper/modules'

const modules = [Pagination, Navigation]

const banners = computed(() => {
  return [
    { img: new URL('@/assets/img/banner_img/img-1.avif', import.meta.url).href },
    // { img: new URL('@/assets/img/banner_img/img-2.avif', import.meta.url).href },
    // { img: new URL('@/assets/img/banner_img/img-3.avif', import.meta.url).href },
    // { img: new URL('@/assets/img/banner_img/img-4.avif', import.meta.url).href },

  ]
})

</script>