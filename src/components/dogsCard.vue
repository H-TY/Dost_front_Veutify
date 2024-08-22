<template>
    <!-- ● 狗狗簡述_Card 元件 -->
  <v-card class="pa-0" position="relative">
    <router-link :to="{ path: '/dogsResume' }">
      <v-img :src="image" cover width="100%" height="450"></v-img>
    </router-link>
    <v-sheet position="absolute" class="bottom-0 opacity-70 w-100" :style="$route.path === '/booking' ? 'box-sizing: border-box;' : ''">
      <v-col class="d-flex flex-column">
        <v-col class="d-flex pa-0">
          <v-card-subtitle class="pa-0">名字
            <span class="text-h6 font-weight-bold ms-2">{{dogName}}</span>
          </v-card-subtitle>
          <v-divider class="align-self-center"></v-divider>
          <v-card-subtitle class="pa-0">年齡 
            <span class="text-h6 ms-1">{{age}}</span> 歲
          </v-card-subtitle>
        </v-col>
        <v-card-subtitle class="pa-0 mt-2 text-start">性格、特徵
          <span class="text-body-1 ms-2">{{feature}}</span>
        </v-card-subtitle>
      </v-col>
      <v-col class="d-flex pt-2" :class="$route.path === '/booking' ? 'justify-end':'justify-space-between'">
        <v-card-subtitle class="pa-0 align-self-end ">價格
          <span class="text-h5 font-weight-bold ms-2">{{price}}</span> 元 / 2小時
        </v-card-subtitle>
        <v-btn class="bg-red" :class="$route.path === '/booking' ? 'd-none' : 'd-flex'" @click="bookingAddId">預約</v-btn>
      </v-col>
    </v-sheet>
  </v-card>

</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'


const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()

const props = defineProps(['_id', 'image', 'dogName', 'age', 'price', 'booking', 'bookingTime', 'feature', 'sell', 'counter'])


// ● 在網址添加 id 資訊，以利下個頁面查詢利用
// 動作綁定點擊觸發，調用以下的 bookingAddId 函式，而不用 to 去導航
const bookingAddId = () => {
  router.push({
    path: '/booking',
    query: { id: props._id }, // 直接使用 props 中的 id
  });
}

</script>
