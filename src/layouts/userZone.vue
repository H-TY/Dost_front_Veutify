<template>
  <div class="userZone-all">
    <!-- Mobile 版 -->
    <template v-if="mobile">
      <v-container class="userZone-mobile-navbar" fluid>
        <!-- 使用者帳戶版面 -->
        <div class="user-panel">
          <!-- 帳戶背景圖 -->
          <userAccountBg></userAccountBg>
          <!-- 大頭照 & 帳戶名稱 -->
          <div class="user-info">
            <userPhoto></userPhoto>
            <div class="user-name">
              {{ User.account }}
            </div>
          </div>
        </div>

        <!-- 導覽項目 -->
        <div class="navbar-box">
          <template v-for="item in userZoneNavItems" :key="item.to">
            <div class="navbar-item-box">
              <v-btn :to="item.to">
                <v-icon :icon="item.icon"></v-icon>
              </v-btn>
              <p>
                {{ item.text }}
              </p>
            </div>
          </template>
        </div>
      </v-container>
    </template>

    <!-- PC 版導覽列 -->
    <template v-else>
      <v-navigation-drawer class="userZone-pc-navbar" v-model="drawer" :permanent="drawerHandle">
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

        <!-- 水平線 -->
        <!-- <v-divider></v-divider> -->

        <!-- 導覽項目 & 登出 -->
        <v-list class="ps-6 py-4 Zindex text-grey-darken-2">
          <!-- 導覽項目 -->
          <v-list-item v-for="item in userZoneNavItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon" class="rounded-s-pill" active-class="selectedStatus"></v-list-item>

          <!-- 登出按鈕 -->
          <logoOutBtn></logoOutBtn>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
    <v-main class="userZone-main">
      <router-view></router-view>
    </v-main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import logoOutBtn from '@/components/logoOutBtn.vue'
import userPhoto from '@/components/userPhoto.vue'
import userAccountBg from '@/components/userAccountBg.vue'
import { logo, userZoneNavItems } from '@/plugins/data_json'



// 解構出 mobile的斷點
const { mobile } = useDisplay()
const User = useUserStore()


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
.mobileNavMargin {
  margin-top: 100px;
}

/* Mobile 版導覽列物件按鈕樣式*/
.mobileNavCss {
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border: 4px solid #E1F5FE;
  border-radius: 50%;
  opacity: 100%;
}

/* PC 版帳戶大頭照樣式 & 定位 */
.PCuserPhotoPosition {
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
.Zindex {
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
::v-deep .v-btn--active>.v-btn__overlay {
  opacity: 0%;
}


/* 原默認導覽物件選擇狀態設為 none */
::v-deep .v-list-item--variant-text .v-list-item__overlay {
  background: none;
}

/* 自訂導覽物件選擇狀態 */
.selectedStatus {
  color: #0288D1;
  border: 3px solid #fcd796;
  border-top: 0px;
  /* border-bottom: 0px; */
  /* border-left: 0px; */
  border-right: 0px;
  background-color: #FFFDE7;
}
</style>