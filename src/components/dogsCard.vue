<!-- ● 狗狗簡述_Card 元件 -->
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
        <v-btn :class="{ 'red-btn': bookingState }" :text="booking === '預約已滿' ? '預約已滿' : '預約'" @click="bookingAddId"></v-btn>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useSnackbar } from 'vuetify-use-dialog'


const user = useUserStore()
const router = useRouter()
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



</script>
