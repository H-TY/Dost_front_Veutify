<template>
  <v-navigation-drawer class="border-0" position="relative" theme="light" permanent>
    <template v-slot:image>
      <v-img src="@/assets/img/userZone_bg_01-修.png" height="1000" cover></v-img>
    </template>

    <!-- Logo -->
    <v-list class="d-flex align-center pa-0 ma-4">
      <v-col class="pa-0 d-flex justify-end pe-4">
        <v-list-item class="rounded-circle pa-2" color="white" width=" 70" height="70" :to="logo.to" :ripple="false">
          <v-img :src="logo.img" cover></v-img>
        </v-list-item>
      </v-col>
      <v-col>
        <v-row class="d-flex flex-column">
          <v-col class="pa-0">
            <v-list-item :to="logo.to" :ripple="false" min-height="0" class="align-center justify-center pa-0" text="會員專區"></v-list-item>
          </v-col>
          <v-col class="pa-0">
            <v-sheet class="bg-transparent text-h5 font-weight-bold">
              {{ User }}
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-list>

    <v-divider></v-divider>

    <!-- 導覽項目 -->
    <v-list class="px-6 py-4">
      <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon" border-radius="50" color="light-blue-darken-2
"></v-list-item>
    </v-list>

    <!-- <v-divider></v-divider> -->

    <!-- 登出按鈕 -->
    <v-col class="d-flex justify-center mt-5">
      <v-btn v-if="user.isLogin" prepend-icon="mdi-account-arrow-right" class="bg-light-blue bottom-0 mb-11" position="absolute" variant="outlined" rounded :ripple="false" @click="logout">登出</v-btn>
    </v-col>
  </v-navigation-drawer>

  <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'


// 解構出 mobile的斷點
const { mobile } = useDisplay()

const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()

// 取帳號名稱
const User = ref(user.account)


// Logo
const logo = computed(() => {
  return { to: '/userZone', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }
})

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/', text: '回首頁', icon: 'mdi-home' },
    { to: '/', text: '會員基本資料', icon: 'mdi-list-box' },
    { to: '/userZone/dogBookingSearch', text: '預約狗狗查詢', icon: 'mdi-dog' },
    { to: '/', text: '預約住宿查詢', icon: 'mdi-bed' },
    { to: '/', text: '狗狗適性測試結果', icon: 'mdi-tooltip-edit' },
    { to: '/', text: '喜愛商品追蹤', icon: 'mdi-heart' },
    { to: '/', text: '訂單查詢', icon: 'mdi-text-box-search' },
    { to: '/', text: '設定', icon: 'mdi-cog-outline' },
  ]
})

// 登出函式
const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
  return router.push('/')
}

</script>


<style scoped>
/* 導覽列物件欄位的設定 */
::v-deep .v-list-item__prepend {
  align-items: center;
  display: block;
  grid-area: prepend;
}

/* 導覽列物件 icon 和文字的間距 */
::v-deep .v-list-item-title {
  padding-left: 8px;
}
</style>