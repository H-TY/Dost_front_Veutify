<template>
  <section id="settings-config-area" class="settings-config-area">
    <div :class="titleCss">
      <h2>設定</h2>
    </div>

    <div class="box">
      <p>這裡是設定頁面，尚未完成</p>
    </div>
  </section>
</template>



<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRoute } from 'vue-router'
import { definePage } from 'vue-router/auto'
// import sectionTitle from '@/components/sectionTitle.vue'


definePage({
  meta: {
    title: 'Dost | 設定',
    login: true,
  }
})



const userStore = useUserStore()
const route = useRoute()

// ● 控制 "標題" 的 CSS 樣式
const titleCss = computed(() => {
  if (userStore.isAdmin && userStore.isLogin) {
    return 'admin-page-title'
  } else {
    return 'userZone-page-title'
  }
})

</script>


<route lang="yaml">
  meta:
    layout: "empty"
</route>