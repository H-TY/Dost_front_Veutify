<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col>
        <h1>預約管理</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn class="d-inline-flex pa-4" color="green" @click="loadItems">查詢預約</v-btn>
      </v-col>
    </v-row>

    <!-- ● 已預約資料表格 -->
    <v-card class="mt-8" flat>
      <v-card-title>查詢預約資料</v-card-title>

      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line></v-text-field>
      </template>

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
          <v-sheet class="bg-transparent my-2" elevation="2" rounded>
            <v-img :src="value" width="70" height="70" cover></v-img>
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
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
        <v-sheet class="bg-white d-flex flex-column justify-self-center align-self-center justify-center pa-7" max-width="600" height="auto">
          <v-sheet class="bg-transparent d-flex flex-wrap justify-center align-self-center">
            <h3 class="confirmCancelText">是否要取消訂單？</h3>
            <v-sheet class="bg-transparent d-flex w-100 my-6">
              <v-col>
                <template v-for="el in confirmCancelData" :key="el.value">
                  <v-row>
                    <v-col class="confirmCancelDataBorderCss">{{ el.title }}</v-col>
                  </v-row>
                </template>
              </v-col>
              <v-col>
                <template v-for="el in confirmCancelData" :key="el.value">
                  <v-row>
                    <v-col class="confirmCancelDataBorderCss">
                      {{ el.value }}
                    </v-col>
                  </v-row>
                </template>
              </v-col>
              <v-col class="pa-0 ms-4 d-flex justify-center  align-center">
                <v-img :src="confirmCancelDataImg.image" width="160" height="100%" cover=""></v-img>
              </v-col>
            </v-sheet>
            <!-- 確認取消訂單按鈕 -->
            <v-btn class="confirmCancelBtn my-6" type="submit" variant="plain" flat @click="changeOrderStatus" :loading="isSubmitting">確認取消</v-btn>
          </v-sheet>
          <v-sheet class="dialogClosePosition rounded-circle bg-transparent d-flex">
            <v-btn class="rounded-circle d-flex pa-0 bg-white opacity-100" min-width="60" min-height="60" variant="plain" @click="dialogClose" flat>
              <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" size="48" color="red-darken-4" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-form>
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
  { align: 'center', title: '帳號名稱', key: 'accountName' },
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
    const { data } = await apiAuth.get('/order/all')
    items.value.splice(0, items.value.length, ...data.result.data)
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
const confirmCancelData = ref([
  { title: '訂單編號', value: '', },
  { title: '預約人', value: '', },
  { title: '電話', value: 0, },
  { title: '預約狗狗', value: '', },
  { title: '預約日期', value: '', },
  { title: '預約總金額', value: 0 + ' 元', },
])

const confirmCancelDataImg = ref({
  title: '圖片', image: '',
})

const confirmCancelDataId = ref({
  title: 'Id', id: '',
})
// watch(confirmCancelDataId.value, (A, B) => {
//   console.log(A, B)
// })


// 默認彈窗關閉狀態
const dialog = ref(false)

// 開啟彈窗
const openDialog = (item) => {
  if (item) {
    console.log('item', item.value)

    confirmCancelData.value[0].value = item.bookingOrderNumber
    confirmCancelData.value[1].value = item.name
    confirmCancelData.value[2].value = item.phone
    confirmCancelData.value[3].value = item.dogName
    confirmCancelData.value[4].value = item.bookingDate
    confirmCancelData.value[5].value = item.totalPrice
    confirmCancelDataImg.value.image = item.image
    confirmCancelDataId.value.id = item._id
    nowOrderStatus.value = item.orderStatus
  }
  dialog.value = true
}

// 關閉彈窗
const dialogClose = () => {
  dialog.value = false
}

// ● 用來觸發判斷滑鼠滑入、滑出的圖示。
const mouseToggle = ref(false)

const mouseoverHandle = () => {
  mouseToggle.value = !mouseToggle.value
}

const clickmouseToggleOff = () => {
  mouseToggle.value = false
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
    orderEditData.id = confirmCancelDataId.value.id
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

/* 在彈窗選擇時段物件添加關閉安鈕的 class 設定 */
.dialogClosePosition {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 確認取消文字的樣式 */
.confirmCancelText {
  letter-spacing: 2px;
}

/* 確認取消按鈕的樣式 */
.confirmCancelBtn {
  width: 100px;
  background: #616161;
  color: white;
}

/* 確認取消資料的邊框樣式 */
.confirmCancelDataBorderCss {
  border: 1px solid #dfdfdf;
}
</style>



<route lang="yaml">
  meta:
    layout: admin
</route>