<template>
  <!-- Mobile 版 -->
  <template v-if="mobile">
    <v-container class="pa-0" fluid>
      <!-- 使用者帳戶版面 -->
      <v-sheet class="bg-transparent position-relative">
        <!-- 帳戶背景圖 -->
        <v-sheet class="overflow-hidden" height="340px">
          <userAccountBg></userAccountBg>
        </v-sheet>
        <!-- 大頭照 & 帳戶名稱 -->
        <v-sheet class="bg-transparent mobileUserPhotoPosition">
          <v-sheet class="d-flex justify-center mobileUserPhotoBorder">
            <userPhoto></userPhoto>
          </v-sheet>
          <v-sheet class="bg-transparent text-center accountName">
            {{ User.account }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <!-- 導覽項目 -->
      <v-sheet class="bg-transparent mobileNavMargin">
        <v-row class="px-5 ma-0">
          <template v-for="item in navItems" :key="item.to">
            <v-col cols="6" class="text-center pa-5">
              <v-btn 
                class="mobileNavCss bg-white"
                :to="item.to" 
                size="80" 
                variant="flat" 
                flat 
                active-color="green-darken-1">
                <v-icon 
                  class="text-light-blue-darken-4" 
                  :icon="item.icon" 
                  size="40"></v-icon>
              </v-btn>
              <v-sheet class="bg-transparent mt-3 text-blue-darken-4" >
                {{ item.text }}
              </v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-sheet>
    </v-container>
  </template>

  <!-- PC 版導覽列 -->
  <template v-if="!mobile">
    <v-navigation-drawer class="border-0" position="relative" v-model="drawer" :permanent="drawerHandle">
      <!-- 使用者帳戶版面 -->
      <!-- 帳戶背景圖 -->
      <v-sheet class="bg-transparent w-100 fill-height position-absolute">
        <v-sheet class="overflow-hidden PCuserBgPosition BgOverlay">
          <userAccountBg></userAccountBg>
        </v-sheet>
      </v-sheet>
      <!-- 大頭照 & 帳戶名稱 -->
      <v-sheet class="bg-transparent PCuserPhotoPosition pa-5">
        <v-sheet class="PCuserPhoto">
          <userPhoto></userPhoto>
        </v-sheet>
        <v-sheet class="bg-transparent text-center accountName mt-3">
          {{ User.account }}
        </v-sheet>
      </v-sheet>
      
      <v-divider></v-divider>

      <!-- 導覽項目 & 登出 -->
      <v-list class="px-6 py-4 Zindex">
        <!-- 導覽項目 -->
        <v-list-item 
          v-for="item in navItems" 
          :key="item.to" 
          :to="item.to" 
          :title="item.text" 
          :prepend-icon="item.icon" 
          border-radius="50" 
          color="light-blue-darken-2"></v-list-item>
        <!-- 登出按鈕 -->
        <v-col class="d-flex justify-center mt-15">
          <v-btn 
          v-if="User.isLogin" 
          prepend-icon="mdi-account-arrow-right" 
          class="bg-deep-orange-darken-2" 
          variant="outlined" 
          rounded 
          :ripple="false" 
          @click="logout">登出</v-btn>
        </v-col>
      </v-list>
    </v-navigation-drawer>
  </template>

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
import userAccountBg from '@/components/userAccountBg.vue'



// 解構出 mobile的斷點
const { mobile } = useDisplay()
const User = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()


// 漢堡按鈕預設為折疊起來
const drawer = ref(false)

// 先判斷是否為 mobile
const drawerHandle = computed(() => {
  if (mobile.value == true) {
    return drawer.value = false
  } else {
    return drawer.value = true
  }
})

// 取帳號名稱
const userAccountName = ref(User.account)

// Logo
const logo = { to: '/userZone', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/', text: '回首頁', icon: 'mdi-home' },
    { to: '/userZone', text: '會員基本資料', icon: 'mdi-list-box' },
    { to: '/userZone/dogBookingSearch', text: '預約狗狗查詢', icon: 'mdi-dog' },
    { to: '/', text: '狗狗適性測試結果', icon: 'mdi-tooltip-edit' },
    { to: '/', text: '設定', icon: 'mdi-cog-outline' },
    // { to: '/', text: '預約住宿查詢', icon: 'mdi-bed' },
    // { to: '/', text: '喜愛商品追蹤', icon: 'mdi-heart' },
    // { to: '/', text: '訂單查詢', icon: 'mdi-text-box-search' },
  ]
})

// 登出函式
const logout = async () => {
  await User.logout()
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
.accountBgFilter {
  filter: blur(1px) opacity(20%);
}

/* Mobile 版大頭照外框 */
.mobileUserPhotoBorder {
  background: #FFFDE7;
  border: 13px solid #FFFDE7;
  border-radius: 50%;
}

/* Mobile 版大頭照定位 */
.mobileUserPhotoPosition {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Mobile 版導覽列區塊位置*/
.mobileNavMargin{
  margin-top: 100px;
}

/* Mobile 版導覽列物件按鈕樣式*/
.mobileNavCss{
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border: 4px solid #E1F5FE;
  border-radius: 50%;
  opacity: 100%;
}

/* PC 版帳戶大頭照樣式 & 定位 */
.PCuserPhotoPosition{
  position: relative;
  padding: 20px
}

/* PC 版大頭照外框 */
.PCuserPhoto {
  margin: auto;
  width: 130px;
  border-radius: 50%;
}

/* PC 版帳號背景圖遮色片 */
/* 須設定 寬和高 */
.BgOverlay {
  width: 100%;
  height: 100%;
}
/* 用偽元素設定要遮色的細節 */
.BgOverlay::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  /* 預設由上至下的漸變遮色片 */
  /* 指定漸層方向 to left, to right, to bottom */
  background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 45%); 
  z-index: 1;
  /* 因為有覆蓋遮色片，故要設定 pointer-events: none; 讓下面的元素能觸發事件（例如鼠標點擊、滑鼠懸停等） */
  pointer-events: none;
}

/* PC 版帳號背景圖樣式 & 定位 */
.PCuserBgPosition {
  height: 300px;
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 0px;
}

/* 設定 PC 版_導覽項目的層級 */
.Zindex{
  z-index: 2;
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
.accountName {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
}

/* 此頁面所有 btn 樣式 */
::v-deep .v-btn--active > .v-btn__overlay{
  opacity: 0%;
}
</style>