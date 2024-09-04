<template>
  <v-container fluid class="pa-0">
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
  </v-container>
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
    { img: new URL('@/assets/img/banner_img/banner_01.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_02.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_03.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_04.jpg', import.meta.url).href },

  ]
})

</script>


<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide {
  width: 50%;
}

/* swiper-slide 下方的圓點 */
.swiper-pagination {
  position: relative;
  margin-top: 30px;
}

/* 圓點的顏色 */
.swiper-pagination-bullet {
  background: rgb(11, 166, 228);
}

/* 選定圓點的顏色 */
.swiper-pagination-bullet-active {}

</style>