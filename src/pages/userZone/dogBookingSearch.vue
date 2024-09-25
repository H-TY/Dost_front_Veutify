<template>
  <v-container class="my-5" fluid>
    <v-row class="text-center">
      <v-col>
        <h1>預約狗狗查詢</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn color="green" @click="loadItems">查詢預約</v-btn>
      </v-col>
    </v-row>

    <!-- ● 已預約資料表 -->
    <v-card class="mt-8" flat>
      <v-card-title>查詢預約結果</v-card-title>

      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line></v-text-field>
      </template>

      <v-data-table v-model:sort-by="sortBy" :headers="headers" :items="items" :search="search">
        <template #['item.bookingTime']='{ value }'>
          <v-list>
            <!--
              ● 因 value 是雖然是陣列，但時間段未分割（"value": ["15:00～17:00,13:00～15:00"]）
              ● 故用 .join(' ') 先轉成純文字串
              ● 供後續 .split(',') 轉成有分割時間段的陣列（["15:00～17:00", "10:00～12:00"]）
              ● 最後再用排序 .sort((a, b) => parseInt(a) - parseInt(b)) 由小到大排列，加 parseInt() 是為了將 a、b 參數從文字轉數字才可以做比較排序
              -->
            <v-list-item v-for="(el, index) in value.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" :key="index">{{ el }}</v-list-item>
          </v-list>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'



definePage({
  meta: {
    title: 'Dost | 預約狗狗查詢',
    login: true,
    admin: false
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 取帳號名稱
const User = ref(user.account)


const search = ref('')
const items = ref([])
const sortBy = [{key: 'bookingOrderNumber', order:'desc'}]
const headers = [
  { align: 'center', title: '訂單編號', key: 'bookingOrderNumber' },
  { align: 'center', title: '下單日期', key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
  { align: 'center', title: '帳號名稱', key: 'accountName' },
  { align: 'center', title: '預約人', key: 'name' },
  { align: 'center', title: '電話', key: 'phone' },
  { align: 'center', title: '預約狗狗', key: 'dogName' },
  { align: 'center', title: '預約日期', key: 'bookingDate' },
  { align: 'center', title: '預約時段', key: 'bookingTime' },
  { align: 'center', title: '預約總時數', key: 'totalBookingTime' },
  { align: 'center', title: '預約總金額', key: 'totalPrice' },
]

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/order', {
      params: {
        search: User.value
      }
    })
    // 用 .splice() 取查詢結果的資料
    // .splice(索引:開始取資料的地方, 要刪除資料的數量, 要放入的資料:...展開陣列)
    // 若用 .push() 取查詢結果的資料，再重複取資料的時候，會再原先已取到的資料再次重複取資料並疊加上去
    items.value.splice(0, items.value.length, ...data.result.data)
    // console.log('...data.result.data:', ...data.result.data)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
loadItems()




</script>

<route lang="yaml">
  meta:
    layout: userZone
</route>