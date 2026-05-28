<template>
  <div class="floating-btn-box">
    <!-- 回到頂部按鈕 -->
    <!-- 加上 tabindex="-1" @mousedown.prevent 阻止按鈕 focus 觸發 -->
    <v-btn class="back-top-btn" :class="{ fade: showBtn }" tabindex="-1" @mousedown.prevent @click="scrollTop">
      <v-icon :icon="hover ? 'mdi-arrow-up-circle' : 'mdi-arrow-up-circle-outline'" @mouseenter="hover = true" @mouseleave="hover = false"></v-icon>
    </v-btn>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ● 判定 hover 狀態
const hover = ref(false)

// ● 回到頂部函式
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


// ● 向下滾動指定距離後，才顯示按鈕
const showBtn = ref(false)

const handleScroll = () => {
  // console.log('window.scrollY', window.scrollY)
  showBtn.value = window.scrollY > 150
}

onMounted(() => {
  // listen 監聽事件：監聽目前螢幕向下滾動距離
  window.addEventListener('scroll', handleScroll)
})

// 移除監聽事件
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>