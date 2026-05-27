<template>
  <v-app>
    <template v-if="showAnmi">
      <div class="enter-anmi" :class="{ fade: fadeAnmi }">
        <div class="img-box">
          <template v-for="(el, index) in images" :key="index">
            <img :src="el">
          </template>
        </div>
      </div>
    </template>

    <component :is="layoutComponent">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup>

import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user';
import { useThemeSettingStore } from '@/stores/themeSettings.js'
import AdminLayout from '@/layouts/admin.vue'
import UserLayout from '@/layouts/userZone.vue'
import EmptyLayout from '@/layouts/empty.vue'


const UserStore = useUserStore()
const themeSettingStore = useThemeSettingStore()
const { fontSizeContrl } = storeToRefs(themeSettingStore)
const route = useRoute()


// ● 使用 Vite 提供的特殊 API，用來「批次抓取資料夾裡的檔案」。
// 可以不用自己計算有幾張圖，系統會自己抓取圖片
const images = import.meta.glob("@/assets/img/enterAnmi_img/*.avif", {
  eager: true, // 立即 import 檔案，而不是等到使用時才載入
  import: "default", // 只取每個檔案的 default export（通常就是檔案的 URL）
});

// ● 進場動畫設定
const showAnmi = ref(true)
const fadeAnmi = ref(false)

const anmiSet = () => {
  // 設定進場動畫透明度歸 0
  setTimeout(() => {
    fadeAnmi.value = true

    // 完全移除進場動畫
    setTimeout(() => {
      showAnmi.value = false
    }, 500);

  }, 2100);
}

onMounted(() => {
  // console.log('refEnterAnmi', refEnterAnmi.value)
  anmiSet()
})

// ● 將使用者自訂的文字大小放到 DOM（<html> 做全域宣告變數） 給 CSS 使用
watch(fontSizeContrl, (newVal) => {
  document.documentElement.style.setProperty('--setting-font-size', `${fontSizeContrl.value}px`)
},
  {
    immediate: true // watch 建立後立刻執行一次 callback
  }
)



// ● 針對 /settingsConfig 頁面，特別動態設定 layout 版面（admin、userZone）
const layoutComponent = computed(() => {
  // console.log("route", route)
  if (route.path.includes("settingsConfig")) {
    if (UserStore.isLogin && UserStore.isAdmin) {
      return AdminLayout
    }

    else if (UserStore.isLogin && !UserStore.isAdmin) {
      return UserLayout
    }
  }

  return EmptyLayout
})


</script>
