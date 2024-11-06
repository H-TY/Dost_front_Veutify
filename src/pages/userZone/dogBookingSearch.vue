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

      <!-- 設定 v-model:sort-by="sortBy" 可以預設排序欄位，但會讓其他表頭排序功能失效 -->
      <v-data-table :headers="headers" :items="items" :search="search">
        <!-- 訂單狀態欄位 -->
        <template #['item.orderStatus']='{ value, item }'>
          <v-row class="flex-column justify-content-center my-6">
            <v-col class="pa-0">
              <v-chip @update:modelValue="newOS" :text="value ? '已預約' : '已取消'" :color="value ? 'green' : 'red'" size="default"></v-chip>
            </v-col>
            <v-col class="pa-0 mt-4">
              <template v-if="value">
                <v-btn class="cancelBtnCss" variant="flat" flat @click="openDialog(item)">取消訂單</v-btn>
              </template>
            </v-col>
          </v-row>
        </template>
        <!-- 下單日期欄位 -->
        <template #['item.createdAt']='{ value }'>
          <!-- 使用 .split(' ') 依據"空白"的字符作為分割成新的陣列
              假如 value = "Hello new world" --→ ["Hello", "new", "world"]
          -->
          {{ value.split(' ')[0] }}
        </template>
        <!-- 狗狗圖片欄位 -->
        <template #['item.image']='{ value }'>
          <v-sheet class="bg-transparent my-2" width="70" height="70" rounded="lg" elevation="2">
            <v-img :src="value" class="w-100 h-100" rounded="lg" cover></v-img>
          </v-sheet>
        </template>
        <!-- 預約時段欄位 -->
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
        <!-- 預約預約總時數欄位 -->
        <template #['item.totalBookingTime']='{ value }'>
          {{ value ? value + ' 小時' : '無資料' }}
        </template>
        <!-- 預約總金額欄位 -->
        <template #['item.totalPrice']='{ value }'>
          {{ value }} 元
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog">
      <!-- 將外部資料傳入元件內 -->
      <OrderInfoCard 
        :bigTitle="'是否要取消訂單？'"
        :orderInfoData="orderInfoData"
        :orderInfoDataImg="orderInfoDataImg"
        :changeOrderStatus="changeOrderStatus" 
        :dialogClose="dialogClose"
        :submit="submit" 
        :isSubmitting="isSubmitting"
      ></OrderInfoCard>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, computed, watch } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useBookingOrderStore } from '@/stores/bookingOrder'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import OrderInfoCard from '@/components/orderInfoCard'



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
const BookingOrderStore = useBookingOrderStore()

// 取帳號名稱
const User = ref(user.account)


const search = ref('')
const items = ref([])

// asc 升冪（由小至大排序）；desc 降冪（由大至小排序）
// const sortBy = [{key: 'bookingOrderNumber', order:'desc'}]
const headers = [
  { align: 'center', title: '訂單編號', key: 'bookingOrderNumber' },
  { align: 'center', title: '訂單狀態', key: 'orderStatus' },
  { align: 'center', title: '下單日期', key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
  // { align: 'center', title: '帳號名稱', key: 'accountName' },
  { align: 'center', title: '預約人', key: 'name' },
  { align: 'center', title: '電話', key: 'phone' },
  { align: 'center', title: '預約狗狗', key: 'dogName' },
  { align: 'center', title: '圖片', key: 'image' },
  { align: 'center', title: '預約日期', key: 'bookingDate' },
  { align: 'center', title: '預約時段', key: 'bookingTime' },
  { align: 'center', title: '預約總時數', key: 'totalBookingTime' },
  { align: 'center', title: '預約總金額', key: 'totalPrice' },
]

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/order', {
      params: {
        // 傳至後端的搜尋關鍵字"帳戶名稱"
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


// 訂單狀態
const nowOrderStatus = ref(null)
// console.log('nowOrderStatus', nowOrderStatus.value)
// watch(nowOrderStatus, (A, B) => {
//   console.log(A, B)
// })

// 取消訂單按鈕更改訂單狀態
const changeOrderStatus = () => {
  nowOrderStatus.value = false
}

// 宣告要取消的資料變數
const orderInfoData = ref([
  { title: '訂單編號', value: '', },
  { title: '預約人', value: '', },
  { title: '電話', value: 0, },
  { title: '預約狗狗', value: '', },
  { title: '預約日期', value: '', },
  { title: '預約總金額', value: 0 + ' 元', },
])

const orderInfoDataImg = ref('')

const orderInfoDataId = ref('')
// watch(confirmCancelDataId.value, (A, B) => {
//   console.log(A, B)
// })


// 默認彈窗關閉狀態
const dialog = ref(false)

// 開啟彈窗
const openDialog = (item) => {
  if (item) {
    orderInfoData.value[0].value = item.bookingOrderNumber
    orderInfoData.value[1].value = item.name
    orderInfoData.value[2].value = item.phone
    orderInfoData.value[3].value = item.dogName
    orderInfoData.value[4].value = item.bookingDate
    orderInfoData.value[5].value = item.totalPrice
    orderInfoDataImg.value = item.image
    orderInfoDataId.value = item._id
    nowOrderStatus.value = item.orderStatus
  }
  dialog.value = true
}

// 關閉彈窗
const dialogClose = () => {
  dialog.value = false
}


// 觸發更新指定 id 的訂單狀態函式
const newOS = (id, newValue) => {
  // console.log('id', id, 'newValue', newValue)
  const findItem = items.value.find(item => item._id === id)
  // console.log('findItem', findItem)
  if (findItem) {
    findItem.orderStatus = newValue
  }
}



const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 初始化表單資料
  initialValues: {
    id: '',
    orderStatus: '',
  }
})

// 建立欄位 useField 的欄位
const id = useField('id')
const orderStatus = useField('orderStatus')

const submit = handleSubmit(async (orderEditData) => {
  try {
    orderEditData.id = orderInfoDataId.value
    orderEditData.orderStatus = nowOrderStatus.value

    const result = await BookingOrderStore.edit(orderEditData)
    // console.log('result', result)


    if (result.text === '修改訂單成功') {

      // 更新目前的訂單狀態
      newOS(orderEditData.id, result.reOrderStatus)

      createSnackbar({
        text: result.text,
        snackbarProps: {
          color: 'green'
        }
      })
    }
    // 關閉彈窗
    dialogClose()

  } catch (error) {
    console.log(error)
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'red'
      }
    })
  }
})


</script>


<style scoped>
/* 取消按鈕樣式 */
.cancelBtnCss {
  width: 72px;
  height: 32px;
  font-size: 13px;
  font-weight: 600;
  color: #613f0096;
  border: 1px solid #613f0096;
}

.cancelBtnCss:hover{
  color: white;
  background: #613f0096;
  border: none;
}

</style>



<route lang="yaml">
  meta:
    layout: userZone
</route>