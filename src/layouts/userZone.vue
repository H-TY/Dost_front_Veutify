<template>
  <div class="userZone-all">

    <!-- ● Mobile 版 -->
    <template v-if="mobile">
      <div class="userZone-mobile-navbar">
        <!-- 漢堡按鈕 -->
        <div class="hamburger-btn" @click.stop="hamburgerBtnClick">
          <div class="navbar-icon-dogFoot" :class="{ noneIcon: drawer }">
            <v-icon class="mdi mdi-paw"></v-icon>
          </div>

          <div class="navbar-icon" :class="{ closeIcon: drawer }">
            <hr>
            <hr>
            <hr>
          </div>
        </div>

        <!-- 側邊面板 -->
        <v-navigation-drawer v-model="drawer" :width="NDrawerWidth">
          <!-- 使用者帳戶版面 -->
          <div class="user-panel">
            <div class="box">
              <!-- 帳戶背景圖 -->
              <userAccountBg></userAccountBg>
              <!-- 大頭照 & 帳戶名稱 -->
              <div class="user-info">
                <userPhoto></userPhoto>
                <h6 class="user-name">
                  {{ User.account }}
                </h6>
              </div>
            </div>
          </div>

          <!-- 導覽項目 -->
          <div class="navbar-box">
            <template v-for="item in userZoneNavItems" :key="item.to">
              <v-btn class="navbar-item-box" :to="item.to">
                <v-icon :icon="item.icon"></v-icon>
                <p>
                  {{ item.text }}
                </p>
              </v-btn>
            </template>
          </div>
        </v-navigation-drawer>
      </div>
    </template>

    <!-- ● PC 版導覽列 -->
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
const { mobile, width } = useDisplay()
// console.log('width', width.value)
const User = useUserStore()



// 第一次進入頁面
// 需求是：「第一次進入頁面 → true」
// 而 👉 第一次根本沒有資料（是 null），「只要不是明確被設成 false，就當作第一次」，結果也會判定為 true
// const isFirstEnter = ref(true)
const isFirstEnter = ref(
  localStorage.getItem('isFirstEnter') !== 'false'
)

// 漢堡按鈕預設為折疊起來
const drawer = ref(false)

// 預設 navigation-drawer 的寬度
const NDrawerWidth = ref(300)



// 先判斷是否為 mobile
const drawerHandle = computed(() => {
  if (mobile.value == true) {
    return drawer.value = false
  } else {
    return drawer.value = true
  }
})



// mobile 版時，判斷是否為第一次進入頁面，第一次進入頁面觸發 navbar 全版面樣式，不是就不展開 navbar
// 使用 watchEffect：
// 自動追蹤內部用到的響應式變數（mobile、isFirstEnter）
// 允許副作用（修改其他變數）
// 初始化時會立即執行一次
watchEffect(() => {
  if (mobile.value && isFirstEnter.value) {
    // console.log('有觸發1'))
    isFirstEnter.value = false
    drawer.value = true
    NDrawerWidth.value = width.value
    // 在 localStorage 記錄 isFirstEnter 的值
    localStorage.setItem('isFirstEnter', isFirstEnter.value)

  } else {
    // console.log('有觸發2')
    drawer.value = false
  }
})


// mobile 版時，觸發 navbar 全版面樣式後，在點擊漢堡按鈕恢復成滑出，將原本滿版寬度改回預設尺寸
const hamburgerBtnClick = () => {
  drawer.value = !drawer.value

  if (NDrawerWidth.value > 300) {
    // 恢復預設 navigation-drawer 的寬度
    NDrawerWidth.value = 300
  }
}


</script>