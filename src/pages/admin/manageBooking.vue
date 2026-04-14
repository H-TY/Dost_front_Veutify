<template>
  <div class="booking-info">
    <div class="admin-page-title" ref="RefTitle">
      <h2>預約訂單管理</h2>
    </div>

    <div class="list-box">
      <!-- ● 搜尋欄位 -->
      <v-text-field class="search-box" label="搜尋訂單" v-model="search" prepend-inner-icon="mdi-magnify" variant="solo-filled" density="comfortable" flat hide-details single-line></v-text-field>

      <v-divider></v-divider>

      <!-- ● 已預約訂單清單 -->
      <v-data-table ref="refTableBox" class="table-box" :class="isSlideTable ? 'right-slide' : ''" :headers="headers" :items="items" :search="search">
        <!-- 訂單狀態欄位 -->
        <template #['item.orderStatus']='{ value, item }'>
          <div class="status-box">
            <v-chip @update:modelValue="newOS" :text="value ? '已預約' : '已取消'" :class="value ? 'no-fill' : 'fill'"></v-chip>
            <template v-if="value">
              <v-btn class="cancel-btn" @click="openDialog(item)">取消訂單</v-btn>
            </template>
          </div>
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
          <div class="img-box">
            <img :src="value"></img>
          </div>
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
            <v-list-item v-for="(el, index) in value" :key="index">● {{ el }}</v-list-item>
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
    </div>

    <!-- ● 取消訂單彈窗 -->
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
          <dialogCloseBtn @click="dialog = false"></dialogCloseBtn>
        </v-sheet>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref, computed, watch } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useBookingOrderStore } from '@/stores/bookingOrder'
import { useApi } from '@/composables/axios'
import { useTitleScrollDown, useTableScroll } from '@/composables/scrollAddClass'
import dialogCloseBtn from '@/components/dialogCloseBtn.vue'
import { useSnackbar } from 'vuetify-use-dialog'



definePage({
  meta: {
    title: 'Dost | 預約狗狗查詢',
    login: true,
    admin: false
  }
})


const { apiAuth } = useApi()
const { RefTitle } = useTitleScrollDown()
const { refTableBox, isSlideTable, resetTableScroll } = useTableScroll()
const createSnackbar = useSnackbar()
const user = useUserStore()
const BookingOrderStore = useBookingOrderStore()


// ● 帳號名稱
const User = ref(user.account)


// ● 表格變數宣告
const search = ref('')
const items = ref([])
// asc 升冪（由小至大排序）；desc 降冪（由大至小排序）
// const sortBy = [{key: 'bookingOrderNumber', order:'desc'}]
const headers = [
  { title: '訂單編號', key: 'bookingOrderNumber', align: 'center' },
  { title: '訂單狀態', key: 'orderStatus', align: 'center' },
  { title: '下單日期', key: 'createdAt', align: 'center', value: item => new Date(item.createdAt).toLocaleString() },
  { title: '帳號名稱', key: 'accountName', align: 'center' },
  { title: '預約人', key: 'name', align: 'center' },
  { title: '電話', key: 'phone', align: 'center' },
  { title: '預約狗狗', key: 'dogName', align: 'center' },
  { title: '圖片', key: 'image', align: 'center' },
  { title: '預約日期', key: 'bookingDate', align: 'center' },
  { title: '預約時段', key: 'bookingTime', align: 'center' },
  { title: '預約總時數', key: 'totalBookingTime', align: 'center' },
  { title: '預約總金額', key: 'totalPrice', align: 'center' },
]

// 向後端請求所有訂單資料，並將資料放入 items 變數中
const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/order/all')
    items.value.splice(0, items.value.length, ...data.result.data)

    // 切換頁數，表格會自動滾動回頂部
    resetTableScroll()

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


// // ● 升冪排序資料
// // 因避免前端資料狀態被汙染，故會直接改變原本資料內容的：
// // .sort() 排序
// // .reverse() 反轉
// // .splice() 刪除/插入
// // .push() 從「後面加入元素」
// // .pop() 移除「最後一個元素」
// // .shift() 移除「第一個元素」
// // .unshift() 從「前面加入元素」
// // 先將原資料複製一份，再針對 "複製的資料" 進行排序
// const sortItemsBookingTime = (value) => {
//   return [...value].sort((a, b) => parseInt(a) - parseInt(b))
// }



// ● 訂單狀態
const nowOrderStatus = ref(null)
// console.log('nowOrderStatus', nowOrderStatus.value)
// watch(nowOrderStatus, (A, B) => {
//   console.log(A, B)
// })

// ● 取消訂單按鈕更改訂單狀態
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


// ● 默認彈窗關閉狀態
const dialog = ref(false)

// ● 開啟彈窗
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

// ● 關閉彈窗
// 這邊還是要寫這一段，因後續會在取消訂單成功後呼叫 dialogClose() 來關閉彈窗
const dialogClose = () => {
  dialog.value = false
}

// ● 觸發更新指定 id 的訂單狀態函式
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

// ● 建立欄位 useField 的欄位
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


<!-- <style scoped>
/* 取消按鈕樣式 */
.cancelBtnCss {
  width: 72px;
  height: 32px;
  font-size: 13px;
  font-weight: 600;
  color: #613f0096;
  border: 1px solid #613f0096;
}

.cancelBtnCss:hover {
  color: white;
  background: #613f0096;
  border: none;
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
</style> -->



<route lang="yaml">
  meta:
    layout: admin
</route>