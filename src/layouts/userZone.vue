<template>
  <template v-if="mobile">
    <v-container class="pa-0" fluid>
      <v-sheet class="bg-transparent position-relative" max-height="450px">
        <v-sheet class="bg-red d-flex justify-center pa-10" max-height="380px">
          <v-img :src="logo.img" class="accountBgFilter" fit></v-img>
        </v-sheet>
        <v-sheet class="bg-transparent userPhotoPosition">
          <v-sheet class="d-flex justify-center userPhotoBorder">
            <userPhoto></userPhoto>
          </v-sheet>
          <v-sheet class="bg-transparent text-center accountName">
            {{ user.account }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-container>
  </template>

  <v-navigation-drawer class="border-0" position="relative" :location="mobile ? 'right' : 'left'" theme="light" v-model="drawer" :permanent="drawerHandle">
    <template v-slot:image>
      <v-img src="@/assets/img/bg_img/userZone_bg_01-修.png" height="1000" cover></v-img>
    </template>

    <!-- Logo + 會員帳號名稱 -->
    <template v-if="!mobile">
      <v-list class="d-flex align-center pa-0 ma-4">
        <v-col class="pa-0 d-flex justify-end pe-4">
          <v-list-item class="rounded-circle pa-2" color="white" width=" 70" height="70" :to="logo.to" :ripple="false">
            <v-img :src="logo.img" cover></v-img>
          </v-list-item>
        </v-col>
        <v-col>
          <v-row class="d-flex flex-column">
            <v-col class="pa-0">
              <v-list-item :to="logo.to" :ripple="false" min-height="0" class="d-flex align-center pa-0 text-overline" text="會員專區"></v-list-item>
            </v-col>
            <v-col class="pa-0">
              <v-sheet class="bg-transparent accountName d-flex ">
                {{ User }}
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-list>
    </template>

    <v-divider></v-divider>

    <!-- 導覽項目 -->
    <v-list class="px-6 py-4">
      <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon" border-radius="50" color="light-blue-darken-2"></v-list-item>
    </v-list>

    <!-- 登出按鈕 -->
    <v-col class="d-flex justify-center mt-5">
      <v-btn v-if="user.isLogin" prepend-icon="mdi-account-arrow-right" class="bg-deep-orange-darken-2 bottom-0 mb-11" position="absolute" variant="outlined" rounded :ripple="false" @click="logout">登出</v-btn>
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
import userPhoto from '@/components/userPhoto.vue'


// 解構出 mobile的斷點
const { mobile } = useDisplay()
const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()


// 漢堡按鈕預設為折疊起來
const drawer = ref(false)

// 先判斷是否為 mobile
const drawerHandle = computed (() => {
  if (mobile.value == true){
    return drawer.value = false
  }else{
    return drawer.value = true
  }
})

// 取帳號名稱
const User = ref(user.account)

// Logo
const logo = { to: '/userZone', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/', text: '回首頁', icon: 'mdi-home' },
    { to: '/userZone', text: '會員基本資料', icon: 'mdi-list-box' },
    { to: '/userZone/dogBookingSearch', text: '預約狗狗查詢', icon: 'mdi-dog' },
    // { to: '/', text: '預約住宿查詢', icon: 'mdi-bed' },
    { to: '/', text: '狗狗適性測試結果', icon: 'mdi-tooltip-edit' },
    // { to: '/', text: '喜愛商品追蹤', icon: 'mdi-heart' },
    // { to: '/', text: '訂單查詢', icon: 'mdi-text-box-search' },
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
/* 帳號大頭照 & 名稱的背景樣式 */
.accountBgFilter{
  filter: blur(2px) opacity(30%);
}

/* 大頭照定位 */
.userPhotoPosition{
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.userPhotoBorder{
  background: #FFFDE7;
  border: 13px solid #FFFDE7;
  border-radius: 50%;
}

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

/* 使用者名稱的文字樣式設定 */
.accountName{
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
}
</style>