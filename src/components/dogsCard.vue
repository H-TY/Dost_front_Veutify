<template>
  <div class="card">
    <router-link :to="{ path: '/dogsResume' }" class="card-img">
      <img :src="image"></img>
    </router-link>
    <div class="card-txt-box">
      <div class="name-age-box">
        <p>名字｜
          <span>{{ dogName }}</span>
        </p>
        <v-divider></v-divider>
        <p>年齡｜
          <span>{{ age }}</span> 歲
        </p>
      </div>
      <p>性格、特徵｜
        <span>{{ feature }}</span>
      </p>
      <div class="price-booking-box">
        <p>價格｜
          <span>{{ price }}</span> 元 / 2小時
        </p>
        <v-btn :class="{ 'red-btn': bookingState, 'd-none': route.path === '/booking' }" :text="booking === '預約已滿' ? '預約已滿' : '預約'" @click="bookingAddId"></v-btn>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useSnackbar } from 'vuetify-use-dialog'


const user = useUserStore()
const route = useRoute() // 目前路由狀態（「現在在哪」），詳細說明看最底下
const router = useRouter() // 負責「跳轉、返回、取路由設定」（「要去哪、怎麼去」），詳細說明看最底下
const { mobile } = useDisplay()
const createSnackbar = useSnackbar()

// 定義父組件傳遞給當前組件的數據，類似於組件的「輸入參數」。
// 指定了當前組件可以接收哪些 props。這些 props 是來自父組件的屬性，並且在當前組件中可以使用它們。
const props = defineProps(['_id', 'image', 'dogName', 'age', 'price', 'booking', 'bookingTime', 'feature', 'sell', 'counter'])


// ● 在網址添加 id 資訊，以利下個頁面查詢利用
// 動作綁定點擊觸發，調用以下的 bookingAddId 函式，而不用 to 去導航
const bookingAddId = () => {
  router.push({
    path: '/booking',
    // 這邊 props._id 的 props 必須寫出來
    query: { id: props._id }, // 直接使用 props 中的 id
  });
}


// ● 藉由傳入的 props 推算預約按鈕狀態，後續根據狀態設定樣式
const bookingState = computed(() => props.booking === '預約已滿');



// ===============================
// ◆ useRoute 跟 useRouter 差異
// * route 是「現在在哪」
// * router 是「要去哪、怎麼去」

// useRoute：用來取得目前的路由資訊，例如當前的路由參數、查詢字串、路由名稱等。它提供了一個響應式的物件，可以讓你在組件中輕鬆地訪問當前路由的相關資訊。
// 常用屬性：
// - route.path        // '/booking'
// - route.name        // 'booking'
// - route.params      // 動態路由參數
// - route.query       // query string
// - route.fullPath
// - route.meta
// 使用時機：
//   ✔ 判斷頁面
//   ✔ 顯示 / 隱藏元素
//   ✔ watch 路由變化

// useRouter：用來進行路由導航操作，例如跳轉到不同的路徑/頁面。
// 常用屬性：
// - router.push('/booking')
// - router.push({ name: 'booking' })
// - router.replace('/login')
// - router.back()
// - router.go(-1)
// 使用時機：
//   ✔ 點擊跳頁
//   ✔ 登入後導頁
//   ✔ 條件導向

</script>
