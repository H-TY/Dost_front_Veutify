<template>
  <v-row dense>
    <template v-for="(layoutEl, layoutIdx) in imgLayout" :key="layoutIdx">
      <v-col :cols="layoutEl.cols" width="500px" height="300px" >
        <v-img
          :src="photos[layoutIdx].img"
          width="100%"
          height="100%"
          rounded="lg"
          cover
        ></v-img>
      </v-col>

      <v-col v-if="layoutEl.children" class="d-flex flex-column" cols="6">
        <v-row dense>
          <v-col
            v-for="(chEl, chIdx) in layoutEl.children"
            :key="chIdx"
            :cols="chEl.cols"
            width="500px"
            height="300px"
          >
            <!-- 
              chIdx 的索引為 0, 1，若設為 chIdx+3 的順序，會重複前面的圖片
              :src="photos[layoutIdx + chIdx + 4].img" 抓取的是 photos 後面的圖片，避免重複
            -->
            <v-img
              :src="photos[layoutIdx + chIdx + 4].img"
              width="100%"
              rounded="lg"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
    </template>
  </v-row>
</template>



<script setup>
const imgLayout = [
    { cols: 4 },
    {
      cols: 8,
      children: [{ cols: 12 }, { cols: 12 }],
    },
    { cols: 6 },
  ]


const photos = computed(() => {
  return [
    { img: new URL('../assets/img/active_img/active_img 01.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 02.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 03.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 04.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 05.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 06.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 07.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 08.jpg', import.meta.url).href },
    { img: new URL('../assets/img/active_img/active_img 09.jpg', import.meta.url).href },
  ]
})

</script>



<style scoped>

</style>
