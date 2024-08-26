<template>
  <v-container fluid>
    <v-sheet class="bg-transparent" width="900px">
      <v-row>
        <v-col class="cpin">
          <v-img src="@/assets/素材/獎牌素材/獎牌 01.png" width="200px" cover></v-img>
          <v-img src="@/assets/img/dogs_img/dog1.jpg" width="120px" height="120px" class="rounded-circle cposition" cover></v-img>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>



<script setup>
</script>



<style scoped>
/* 定位獎牌與照片 */
.cpin {
  position: relative;
}

.cposition {
  position: fixed;
  top: 70%;
  left: 25%;
  transform: translate(-50%, -50%);
}
</style>