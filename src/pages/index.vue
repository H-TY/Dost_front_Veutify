<template>
  <v-container fluid class="pa-0">
    <!-- ● Banner區 -->
    <v-sheet class="bg-transparent">
      <bannerSwiper></bannerSwiper>
    </v-sheet>

    <!-- ● 熱門狗狗區 -->
    <v-sheet class="justify-center bg-transparent my-12 px-10">
      <v-sheet class="text-center font-weight-black bg-transparent" :class="mobile === true ? 'text-h4' : 'text-h3'">人氣狗狗大集合！</v-sheet>
      <v-row class="d-flex flex-nowrap mt-3">
        <v-col cols="3" class="mt-12 d-inline-flex align-end">
          <v-img src="@/assets/img/popular/award_02_silver.png" cover></v-img>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-img src="@/assets/img/popular/award_01_gold.png" cover></v-img>
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

    <v-divider class="my-10 w-80 mx-auto"></v-divider>

    <!-- ● 影音生活區 -->
    <v-sheet class="bg-transparent px-10">
      <v-sheet class="text-center font-weight-black bg-transparent my-12" :class="mobile === true ? 'text-h4' : 'text-h3'">
        狗狗生活札記
      </v-sheet>
      <v-sheet class="bg-transparent d-flex pa-0">
        <v-row>
          <v-col cols="12" sm="5" class="pa-0 d-flex" :class="mobile === true ? 'pa-3 justify-center' : 'pa-0 pe-7 align-center'">
            <v-sheet class="bg-transparent d-flex flex-column">
              <h1 class="mb-3 text-center" :class="mobile === true ? 'text-h5' : 'text-h4'">可愛影片～療癒身心～</h1>
              大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="7" class="pa-0">
            <v-responsive aspect-ratio="16/9">
              <video class="w-100 rounded-xl" controls>
                <source src="@/assets/video/01_Dog_1280x720.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </v-responsive>
          </v-col>
        </v-row>
      </v-sheet>
    </v-sheet>

    <!-- ● 照片區 -->
    <v-sheet class="bg-transparent px-10 my-13">
      <v-row class="d-flex" :class="mobile === true ? 'flex-column-reverse' : ''">
        <v-col cols="12" sm="7" class="pa-0">
          <v-sheet class="bg-transparent">
            <!-- <photoCardSwiper></photoCardSwiper> -->
            <photoCard></photoCard>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="5" class="position-relative pa-0 d-flex mt-5" :class="mobile === true ? 'pa-3 justify-center' : 'pa-0 ps-7 align-center'">
          <v-sheet class="bg-transparent d-flex flex-column" >
            <h1 class="mb-3 text-center" :class="mobile === true ? 'text-h5' : 'text-h4'">滿滿的精采歡樂回憶！</h1>
            大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- ● 關於我們 / 品牌故事 -->


  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import bannerSwiper from '@/components/bannerSwiper.vue'
import photoCardSwiper from '@/components/photoCardSwiper.vue'
import photoCard from '@/components/photoCard.vue'

import { useDisplay } from 'vuetify'


definePage({
  meta: {
    title: 'Dost',
    login: false,
    admin: false
  }
})

// 解構出 mobile 的斷點
const { mobile } = useDisplay()


</script>


<style scoped>

</style>
