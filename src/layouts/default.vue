<template>
  <!-- Logo & 導覽列 -->
  <v-app-bar :height="reNavbarHeight">

    <!-- Mobile 版導覽列 -->
    <!-- v-if 若為手機的斷點尺寸時，顯示以下 code -->
    <template v-if="mobile">
      <div ref="navbarHeightRef" class="w-100 mx-auto">
        <v-container fluid class="d-flex flex-row align-center justify-space-between">
          <!-- Logo -->
          <div class="navbar-logo d-flex align-center justify-center">
            <div class="navbar-logo-bg-border">
              <v-btn :to="logo.to">
                <img :src="logo.img"></img>
              </v-btn>
            </div>
          </div>

          <!-- Mobile版_購物車懸浮按鈕 -->
          <!-- user.cart > 0 時，才會顯示購物車按鈕 -->
          <template v-if="user.cart > 0">
            <v-btn class="" position="fixed" location="center" :to="cart.to" variant="flat" :ripple="false" color="transparent">
              <!-- badge 徽章 指的是 icon 右上角的紅點或數字的狀態提示 -->
              <v-badge offset-x="2" offset-y="2" color="pink-lighten-1" :content="user.cart" v-if="cart.to === '/cart' && user.cart > 0">
                <v-icon class="bg-white rounded-circle text-h5" size="46" color="pink-lighten-1" :icon="cart.icon"></v-icon>
              </v-badge>
            </v-btn>
          </template>

          <!-- 漢堡按鈕 / 摺疊按鈕（作為綁定觸發動作用的 icon） -->
          <div class="hamburger-btn" @click.stop="drawer = !drawer">
            <div class="navbar-icon" :class="{ closeIcon: drawer }">
              <hr>
              <hr>
              <hr>
            </div>
          </div>
        </v-container>
      </div>
    </template>

    <!-- PC 版導覽列 -->
    <!-- v-else 若不是手機的斷點尺寸時，顯示以下 code -->
    <template v-else>
      <div ref="navbarHeightRef" class="mx-auto">
        <v-container fluid class="d-flex flex-column align-center justify-center">
          <!-- Logo -->
          <div class="navbar-logo d-flex align-center justify-center" :class="{ moveDown: isScrolled }">
            <div class=" navbar-logo-bg-border">
              <v-btn :to="logo.to">
                <img :src="logo.img"></img>
              </v-btn>
            </div>
          </div>
          <!-- 導覽項目 -->
          <div class="navbar-box">
            <div class="navbar-items">
              <template v-for="item in navItems" :key="item.to">
                <v-btn v-if="item.show" :to="item.to">
                  <v-icon :icon="item.icon"></v-icon>
                  {{ mdAndDown ? '' : item.text }}
                </v-btn>
              </template>
              ｜
              <!-- 導覽列_右側_註冊 & 登入 按鈕 -->
              <div class="RL-box">
                <template v-for="RLitem in RegLogin" :key="RLitem.to">
                  <v-btn v-if="RLitem.show" :to="RLitem.to" :class="{ loginState: user.isLogin, adminState: user.isAdmin }">
                    <v-icon :icon="RLitem.icon"></v-icon>
                    {{ mdAndDown ? '' : RLitem.text }}
                  </v-btn>
                </template>

                <!-- 登出按鈕 -->
                <v-btn v-if="user.isLogin" class="logoOut-btn" @click="logout">
                  <v-icon icon="mdi-account-arrow-right"></v-icon>{{ mdAndDown ? '' : '登出' }}
                </v-btn>
              </div>
            </div>
          </div>

          <!-- PC版_購物車懸浮按鈕 -->
          <!-- user.cart > 0 時，才會顯示購物車按鈕 -->
          <template v-if="user.cart > 0">
            <v-btn class="me-4" position="fixed" location="right" :to="cart.to" color="transparent">
              <!-- badge 徽章 指的是 icon 右上角的紅點或數字的狀態提示 -->
              <v-badge offset-x="2" offset-y="2" color="pink-lighten-1" :content="user.cart" v-if="cart.to === '/cart' && user.cart > 0">
                <v-icon class="bg-white rounded-circle text-h5" size="46" color="pink-lighten-1" :icon="cart.icon"></v-icon>
              </v-badge>
            </v-btn>
          </template>
        </v-container>
      </div>
    </template>
  </v-app-bar>

  <!-- Mobile 版_點擊漢堡按鈕_展開導覽列項目 -->
  <!-- location="right" 從右側開啟 menu -->
  <v-navigation-drawer v-if="mobile" v-model="drawer" location="right">
    <div class="navbar-box">
      <div class="navbar-items">
        <template v-for="item in navItems" :key="item.to">
          <v-btn v-if="item.show" :to="item.to">
            <v-icon :icon="item.icon"></v-icon>
            {{ item.text }}
          </v-btn>
        </template>

        <v-divider></v-divider>

        <!-- 導覽列_右側_註冊 & 登入 按鈕 -->
        <div class="RL-box">
          <template v-for="RLitem in RegLogin" :key="RLitem.to">
            <v-btn v-if="RLitem.show" :to="RLitem.to" :class="{ loginState: user.isLogin, adminState: user.isAdmin }">
              <v-icon :icon="RLitem.icon"></v-icon>
              {{ RLitem.text }}
            </v-btn>
          </template>

          <!-- 登出按鈕 -->
          <v-btn v-if="user.isLogin" class="logoOut-btn" @click="logout">
            <v-icon icon="mdi-account-arrow-right"></v-icon>登出
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <!-- 
    ● pages 的頁面都在這邊由 <router-view> 做渲染。
    ● 告知 Router 要渲染頁面的組件和當前路徑。
  -->
  <v-main>
    <router-view></router-view>
  </v-main>

  <!-- ● footer 欄位 -->
  <v-footer>
    <v-container class="pa-0" fluid>
      <v-row class="contact-box">
        <v-col cols="12" md="6" lg="4" class="contact-txt d-flex flex-row justiyy-center align-center">
          <div class="QRcode-img">
            <v-img src="@/assets/img/Dost_QRcode.png"></v-img>
          </div>
          <v-list>
            <v-list-item>
              <p>DOST</p>
            </v-list-item>
            <v-list-item>02-1234 1234</v-list-item>
            <v-list-item>243新北市泰山區貴子里致遠新村55之1號</v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6" lg="8" class="h-100 d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-center align-center">
          <v-col cols="12" sm="4" md="12" lg="6" class="social-box">
            <v-btn icon="mdi-facebook"></v-btn>
            <v-btn icon="mdi-twitter"></v-btn>
            <v-btn icon="mdi-youtube"></v-btn>
          </v-col>
          <v-col cols="12" sm="8" md="12" lg="6" class="subscribe-box">
            <v-text-field type="input" placeholder="Enter your e-mail" prepend-inner-icon="mdi-email" clearable></v-text-field>
            <v-btn>訂閱</v-btn>
          </v-col>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row class="indicate-box">
        <v-col cols="12" sm="6">
          前端網頁設計課程 — <strong>期末專題作業</strong>
        </v-col>
        <v-col cols="12" sm="6">
          資料、圖片、影片來源：
          <a href="https://unsplash.com/" target="_blank">unsplash</a>
          ｜
          <a href="https://www.freepik.com/" target="_blank">Freepik</a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'



// ● 解構出 mobile的斷點
const { width, mobile, sm, md, mdAndDown } = useDisplay()
// console.log('useDisplay()', useDisplay())
const user = useUserStore()
// console.log('useUserStore()', user)
const router = useRouter()
const createSnackbar = useSnackbar()


// ● 漢堡按鈕預設為折疊起來
const drawer = ref(false)


// ● Logo
const logo = computed(() => {
  return { to: '/', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }
})


// ● 購物車
const cart = computed(() => {
  return { to: '/cart', text: '購物車', icon: 'mdi-cart-variant' }
})


// ● 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/', text: 'Home', icon: 'mdi-home', show: user.isLogin || !user.isLogin },
    { to: '/coolDogs', text: '帥氣狗狗', icon: 'mdi-dog', show: user.isLogin || !user.isLogin },
    { to: '/booking', text: '預約時間', icon: 'mdi-calendar-clock', show: user.isLogin || !user.isLogin },
    // { to: '/test', text: '狗狗適性測驗', icon: 'mdi-dog-side', show: user.isLogin || !user.isLogin },
    // { to: '/shop', text: '寵物用品', icon: 'mdi-store', show: user.isLogin || !user.isLogin },
    // { to: '/cart', text:'購物車', icon:'mdi-cart-variant', show: user.isLogin},
  ]
})


// ● 導覽列_註冊 & 登入
const RegLogin = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin && !user.isAdmin },
    { to: '/login', text: '登入', icon: 'mdi-account-circle', show: !user.isLogin && !user.isAdmin },
    { to: '/userZone', text: '會員專區', icon: 'mdi-account-box', show: user.isLogin && !user.isAdmin },
    { to: '/admin', text: '管理區', icon: 'mdi-account-tie', show: user.isLogin && user.isAdmin },
  ]
})

// ● 登出函式
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

// ● 抓取目前 navbar 高度，隨螢幕寬度改變高度
const navbarHeightRef = ref(null)
const reNavbarHeight = ref(50)

// 更新 navbar 高度函式
function updateNH() {
  // 在 onMounted 使用「微小延遲」比 nextTick 更可靠，Vuetify 官方也建議使用
  requestAnimationFrame(() => {
    if (!navbarHeightRef.value) return;
    // console.log(navbarHeightRef.value.clientHeight)
    reNavbarHeight.value = navbarHeightRef.value.clientHeight
  })
}

// 監聽螢幕寬度，更新 navbar 高度
watch(width, () => {
  updateNH()
})


// ● navbar 向下移動指定距離，添加 class 樣式（且在需要操作元素的標籤新增 :class="{moveDown: isScrolled}" ）
const isScrolled = ref(false)

window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 80
})

// onMounted 生命週期指 DOM 掛載完成，之後才會觸發裡面的程式碼
onMounted(() => {
  updateNH()
})

</script>
