<template>
  <swiper :pagination="{
    dynamicBullets: true,
  }" :navigation="true" :modules="modules" class="bannerSwiper">
    <swiper-slide v-for="(el, index) in banners" :key="index">
      <img :src="el.img">
    </swiper-slide>
  </swiper>
</template>


<script setup>
// 引用需要 swiper 的 modules
import { Pagination, Navigation } from 'swiper/modules'

// ● 將需要啟用的 modules 放入陣列，與上方 swiper 標籤內的 :modules 綁定，意思是啟用這些模組功能
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