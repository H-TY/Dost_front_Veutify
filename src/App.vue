<template>
  <v-app>
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
  if (route.path !== "/settingsConfig") return EmptyLayout

  if (UserStore.isLogin && UserStore.isAdmin) {
    return AdminLayout
  } else if (UserStore.isLogin && !UserStore.isAdmin) {
    return UserLayout
  }
})


</script>
