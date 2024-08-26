<template>
  <v-container fluid>
    <!-- ● Banner區 -->
    <swiper :pagination="{
      dynamicBullets: true,
    }" :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(el, index) in banners" :key="index"><img :src="el.img"></swiper-slide>
    </swiper>

    <!-- ● 熱門狗狗區 -->
    <v-sheet class="justify-center bg-transparent my-12">
      <v-sheet class="text-center text-h3 font-weight-blod bg-transparent">人氣狗狗大集合！</v-sheet>
      <v-row class="d-flex flex-nowrap mt-3">
        <v-col cols="3" class="mt-12 d-inline-flex align-end">
          <v-img src="@/assets/img/popular/award_02_silver.png" cover></v-img>
        </v-col>
        <v-col cols="6" class="d-flex justify-center" width="300">
          <v-img src="@/assets/img/popular/award_01_gold.png" class=" " cover></v-img>
        </v-col>
        <v-col cols="3" class="mt-12 d-inline-flex align-end">
          <v-img src="@/assets/img/popular/award_03_copper.png" cover></v-img>
        </v-col>
        <!-- 鐵獎牌 ↓ -->
        <!-- <v-col class="mt-12 d-flex justify-center w-50">
          <v-img src="@/assets/img/popular/award_04_iron.png" width="50px" cover></v-img>
        </v-col> -->
      </v-row>
    </v-sheet>

    <v-divider class="my-10 w-80 d-flex justify-center"></v-divider>

    <!-- ● 影音生活區 -->
    <v-sheet class="text-center text-h3 font-weight-blod bg-transparent my-12">
      狗狗生活札記
    </v-sheet>
    <v-sheet class="bg-transparent d-flex pa-0">
      <v-row>
        <v-col cols="5" class="pa-0">
          <v-sheet class="bg-transparent pa-0 px-5">
            <h1 class="mb-3">可愛影片～療癒身心～</h1>
            大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
          </v-sheet>
        </v-col>
        <v-col cols="7" class="pa-0">
          <v-responsive aspect-ratio="16/9">
            <video class="w-100 rounded-xl" controls>
              <source src="@/assets/video/01_Dog_1280x720.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </v-responsive>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- ● 照片區 -->
    <v-row class="d-flex my-10">
      <v-col cols="7" class="pa-5">
        <v-sheet class="bg-transparent">
          <photoCard></photoCard>
        </v-sheet>
      </v-col>
      <v-col cols="5" class="pa-15 position-relative">
        <v-sheet class="bg-transparent d-flex flex-column align-start">
          <h1 class="mb-3">滿滿的精采歡樂回憶!</h1>
          大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ● 關於我們 / 品牌故事 -->


  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import photoCard from '@/components/Swiper_Effect cards.vue'

// ● 引進 Swiper 套件以及相關檔案
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
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
    { img: new URL('@/assets/img/banner_img/banner_01.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_02.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_03.jpg', import.meta.url).href },
    { img: new URL('@/assets/img/banner_img/banner_04.jpg', import.meta.url).href },

  ]
})



</script>
<style scoped>
::v-deep .swiper {
  width: 100%;
  height: 60%;
}
</style>
