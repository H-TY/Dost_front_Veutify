<template>
  <div class="userZone-all theme-box" :class="themeColorCss">
    <div class="userZone-navbar">
      <!-- 漢堡按鈕 -->
      <template v-if="smAndDown">
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
      </template>

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
              <h5 class="user-name">
                {{ User.nickname || User.account }}
              </h5>
            </div>
          </div>
        </div>

        <!-- 導覽項目 -->
        <div ref="refNavbarBox" class="navbar-box">
          <template v-for="item in userZoneNavItems" :key="item.to">
            <v-btn class="navbar-item-box" :to="item.to" @click="drawerHandle">
              <v-icon :icon="item.icon"></v-icon>
              <p>
                {{ item.title }}
              </p>
            </v-btn>
          </template>

          <!-- 登出按鈕 -->
          <logOutBtn></logOutBtn>
        </div>
      </v-navigation-drawer>
    </div>


    <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
    <v-main class="userZone-main">
      <section class="userZone-bg">
        <router-view></router-view>
      </section>
    </v-main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useThemeSettingStore } from '@/stores/themeSettings.js'
import logOutBtn from '@/components/logOutBtn.vue'
import userPhoto from '@/components/userPhoto.vue'
import userAccountBg from '@/components/userAccountBg.vue'
import { logo, userZoneNavItems } from '@/plugins/data_json'



// 解構出 mobile的斷點
const { mobile, smAndDown, mdAndUp, width } = useDisplay()
// console.log('width', width.value)
const themeSettingStore = useThemeSettingStore()
const { themeColorCss } = storeToRefs(themeSettingStore)
const User = useUserStore()



// ● 用來記錄是否第一次進入頁面
// 需求是：「第一次進入頁面 → true」
// 而 👉 第一次根本沒有資料（是 null），「只要不是明確被設成 false，就當作第一次」，結果也會判定為 true
const isFirstEnter = ref(
  localStorage.getItem('isFirstEnter') !== 'false'
)

// navbar 預設為折疊起來
const drawer = ref(false)

// 預設 navigation-drawer 展開的寬度
const deMobileSize = 300
const deMdupSize = 320
const NDrawerWidth = ref(deMobileSize)

// 抓取 navbar 的 DOM 元素，準備在 watchEffect 和 hamburgerBtnClick 裡面操作它
const refNavbarBox = ref(null)


// ● mobile 時，判斷是否為第一次進入頁面，第一次進入頁面觸發 navbar 全版面樣式，不是就不展開 navbar
// 使用 watchEffect：
// 自動追蹤內部用到的響應式變數（mobile、isFirstEnter）
// 允許副作用（修改其他變數）
// 初始化時會立即執行一次
watchEffect(() => {
  if (smAndDown.value && isFirstEnter.value) {
    // console.log('有觸發1')
    isFirstEnter.value = false
    drawer.value = true
    NDrawerWidth.value = width.value
    // 在 localStorage 記錄 isFirstEnter 的值
    localStorage.setItem('isFirstEnter', isFirstEnter.value)

    // 因 navbar-box 的 DOM 元素包在 vuetify 的元件中 <v-navigation-drawer>，可能還沒被渲染出來，所以用 requestAnimationFrame 來確保 DOM 已經更新
    requestAnimationFrame(() => {
      refNavbarBox.value.classList.add('first-enter-navbar')
    })

  } else if (mdAndUp.value) {
    // 當螢幕寬度 md 以上，navbar 固定展開不收闔
    drawer.value = true
    NDrawerWidth.value = deMdupSize

  } else {
    drawer.value = false
  }
})



// ● mobile 版時，觸發 navbar 全版面樣式後，在點擊漢堡按鈕恢復成滑出，將原本滿版寬度改回預設尺寸
const hamburgerBtnClick = () => {
  drawer.value = !drawer.value

  if (NDrawerWidth.value > deMobileSize) {
    // 恢復預設 navigation-drawer 的寬度
    NDrawerWidth.value = deMobileSize

    // 移除 navbar 第一次進入的指定樣式
    refNavbarBox.value.classList.remove('first-enter-navbar')
  }
}


// ● 判斷 mobile 與 md 場合，決定點擊 navbarItem 是否會處收合 navbar
const drawerHandle = () => {
  if (smAndDown.value) {
    drawer.value = false
  }
}


</script>