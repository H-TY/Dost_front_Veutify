<template>
  <swiper
    :pagination="{
      dynamicBullets: true,
    }"
    :navigation="true" 
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
    v-for="(el, index) in banners" :key="index"
    ><img :src="el.img" hight="200px"></swiper-slide>
  </swiper>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

// ● 引進 Swiper 套件以及相關檔案
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import '@/styles/style.css'
// import required modules
import { Pagination, Navigation } from 'swiper/modules'

const modules = [Pagination, Navigation]

definePage({
  meta: {
    title: 'Dost',
    login: false,
    admin: false
  }
})

const banners = computed(() => {
  return [
    {img: new URL('@/assets/img/banner_img/banner_01.jpg', import.meta.url).href},
    {img: new URL('@/assets/img/banner_img/banner_02.jpg', import.meta.url).href},
    {img: new URL('@/assets/img/banner_img/banner_03.jpg', import.meta.url).href},
  ]
})



</script>



<style scoped>
::v-deep .swiper {
    width: 100%;
    height: 60%;
}
</style>
