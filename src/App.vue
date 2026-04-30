<template>
  <v-app>
    <component :is="layoutComponent">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import AdminLayout from '@/layouts/admin.vue'
import UserLayout from '@/layouts/userZone.vue'
import EmptyLayout from '@/layouts/empty.vue'


const UserStore = useUserStore()
const route = useRoute()


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
