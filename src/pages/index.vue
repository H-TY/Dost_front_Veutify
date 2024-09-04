<template>
  <v-container fluid class="pa-0">
    <!-- ● Banner區 -->
    <v-sheet class="bg-transparent">
      <bannerSwiper></bannerSwiper>
    </v-sheet>

    <!-- ● 熱門狗狗區 -->
    <v-sheet class="justify-center bg-transparent my-12 px-10">
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
    <v-sheet class="bg-transparent px-10">
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
    </v-sheet>

    <!-- ● 照片區 -->
    <v-sheet class="bg-transparent px-10">
      <v-row class="d-flex my-10">
        <v-col cols="7" class="pa-5">
          <v-sheet class="bg-transparent">
            <photoCardSwiper></photoCardSwiper>
          </v-sheet>
        </v-col>
        <v-col cols="5" class="pa-15 position-relative">
          <v-sheet class="bg-transparent d-flex flex-column align-start">
            <h1 class="mb-3">滿滿的精采歡樂回憶!</h1>
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


definePage({
  meta: {
    title: 'Dost',
    login: false,
    admin: false
  }
})

</script>


<style scoped>

</style>
