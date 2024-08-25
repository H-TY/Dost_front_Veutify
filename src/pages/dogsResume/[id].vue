<template>
  <h1>這裡是 pages/dosResume.vue</h1>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <v-btn :to="logo.to" variant="plain" :ripple="false" size="50">
          <!-- Logo 圖片 -->
          <v-img :src="logo.img" width="50"></v-img>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const logo = {to: '/', img: new URL('@/assets/logo.png', import.meta.url).href}
</script>