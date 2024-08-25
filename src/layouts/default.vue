<template>
  <!-- Logo & 導覽列 -->
  <v-app-bar class="bg-light-blue-darken-4 align-center" :height="mobile === true ? '120' : '190'">

    <!-- Mobile 版導覽列 -->
    <!-- v-if 若為手機的斷點尺寸時，顯示以下 code -->
    <template v-if="mobile">
      <v-container class="py-0 px-8">
        <v-row>
          <!-- Logo -->
          <v-col class="d-flex justify-star align-center">
            <v-btn class="bg-white rounded-circle" :to="logo.to" variant="text" :ripple="false" size="60">
              <v-img :src="logo.img" width="40"></v-img>
            </v-btn>
          </v-col>
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
          <v-col class="d-flex justify-end align-center">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- PC 版導覽列 -->
    <!-- v-else 若不是手機的斷點尺寸時，顯示以下 code -->
    <template v-else>
      <v-container class="pt-0 pa-0 w-100 h-100">
        <v-row class="pt-5 w-100">
          <!-- Logo -->
          <v-col class="d-flex justify-center align-center">
            <v-btn class="bg-white rounded-circle" color="white" :to="logo.to" :ripple="false" size="100">
              <v-img class="opacity-100" :src="logo.img" width="70" cover></v-img>
            </v-btn>
          </v-col>
        </v-row>
        <!-- 導覽項目 -->
        <v-row class="mt-5 ma-0 rounded flex-nowrap">
          <v-col class="pa-0 d-flex justify-center align-center">
            <template v-for="item in navItems" :key="item.to">
              <v-btn v-if="item.show" class="px-0" width="150" :prepend-icon="item.icon" :to="item.to" variant="plain" :ripple="false">{{ item.text }}</v-btn>
            </template>
            <v-col class="pa-0 d-flex d-flex justify-center align-center">|</v-col>
            <!-- 導覽列_右側_註冊 & 登入 按鈕 -->
            <v-row>
              <v-col class="pa-0 d-flex flex-nowrap justify-center align-center h-100" width="100">
                <template v-for="RLitem in RegLogin" :key="RLitem.to">
                  <v-col class="d-flex justify-center align-center pa-0 px-2">
                    <v-btn v-if="RLitem.show" :prepend-icon="RLitem.icon" :to="RLitem.to" class="pa-0" :class="RLitem.text == '登入' ? 'bg-green text-light-green-lighten-5' : 'bg-white text-green'" width="100px" variant=" " rounded :ripple="false">{{ RLitem.text }}</v-btn>
                  </v-col>
                </template>
              </v-col>
            </v-row>
            <!-- 登出按鈕 -->
            <v-btn v-if="user.isLogin" class="bg-deep-orange-darken-2" prepend-icon="mdi-account-arrow-right" variant=" " rounded :ripple="false" @click="logout">登出</v-btn>
          </v-col>
        </v-row>
        <!-- PC版_購物車懸浮按鈕 -->
        <!-- user.cart > 0 時，才會顯示購物車按鈕 -->
        <template v-if="user.cart > 0">
          <v-btn class="me-4" position="fixed" location="right" :to="cart.to" variant="flat" :ripple="false" color="transparent">
            <!-- badge 徽章 指的是 icon 右上角的紅點或數字的狀態提示 -->
            <v-badge offset-x="2" offset-y="2" color="pink-lighten-1" :content="user.cart" v-if="cart.to === '/cart' && user.cart > 0">
              <v-icon class="bg-white rounded-circle text-h5" size="46" color="pink-lighten-1" :icon="cart.icon"></v-icon>
            </v-badge>
          </v-btn>
        </template>
      </v-container>
    </template>
  </v-app-bar>

  <!-- Mobile 版_漢堡按鈕_導覽列項目 -->
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <v-list nav>
      <!-- 導覽項目 -->
      <template v-for="item in navItems" :key="item.to">
        <v-list-item class="px-10" v-if="item.show" :prepend-icon="item.icon" :to="item.to" :title="item.text"></v-list-item>
      </template>
      <v-divider class="my-4"></v-divider>
      <!-- 註冊 & 登入項目 -->
      <v-row>
        <template v-for="RLitem in RegLogin" :key="RLitem.to">
          <v-col class="d-flex justify-center align-center">
            <v-btn v-if="RLitem.show" :prepend-icon="RLitem.icon" :to="RLitem.to" variant="plain" :ripple="false">{{ RLitem.text }}</v-btn>
          </v-col>
        </template>
      </v-row>
      <!-- 登出按鈕 -->
      <v-col class="d-flex justify-center">
        <v-btn v-if="user.isLogin" prepend-icon="mdi-account-arrow-right" variant="outlined" rounded :ripple="false" @click="logout">登出</v-btn>
      </v-col>
    </v-list>
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

// 漢堡按鈕預設為折疊起來
const drawer = ref(false)

// Logo
const logo = computed(() => {
  return { to: '/', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }
})

// 購物車
const cart = computed(() => {
  return { to: '/cart', text: '購物車', icon: 'mdi-cart-variant' }
})

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/about', text: 'About Me', icon: 'mdi-alpha-d-box', show: user.isLogin || !user.isLogin },
    { to: '/coolDogs', text: '帥氣狗狗', icon: 'mdi-dog', show: user.isLogin || !user.isLogin },
    { to: '/booking', text: '預約時間', icon: 'mdi-calendar-clock', show: user.isLogin || !user.isLogin },
    { to: '/test', text: '狗狗適性測驗', icon: 'mdi-dog-side', show: user.isLogin || !user.isLogin },
    { to: '/shop', text: '寵物用品', icon: 'mdi-store', show: user.isLogin || !user.isLogin },
    // { to: '/cart', text:'購物車', icon:'mdi-cart-variant', show: user.isLogin},
    { to: '/userZone', text: '會員專區', icon: 'mdi-account-box', show: user.isLogin && !user.isAdmin },
    { to: '/admin', text: '管理區', icon: 'mdi-account-tie', show: user.isLogin && user.isAdmin },
  ]
})

// 導覽列_註冊 & 登入
const RegLogin = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin && !user.isAdmin },
    { to: '/login', text: '登入', icon: 'mdi-account-circle', show: !user.isLogin && !user.isAdmin },
  ]
})

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
/* 移除導覽列的陰影、背景色 */
.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
  box-shadow: none;
}

.v-app-bar.v-toolbar {
  background: none;
}

.v-toolbar {
  background: none;
}
</style>
