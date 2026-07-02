<template>
  <div class="order-list">
    <!-- ● 搜尋欄位 -->
    <v-text-field class="search-box" label="搜尋訂單" v-model="search" prepend-inner-icon="mdi-magnify" variant="solo-filled" density="comfortable" flat hide-details single-line></v-text-field>

    <v-divider></v-divider>

    <!-- ● 已預約訂單清單 -->
    <v-data-table ref="refTableBox" class="table-box" :class="isSlideTable ? 'right-slide' : ''" :height="tableHeight" :headers="headers" :items="items" :search="search" @update:page="handleEvent">
      <!-- 訂單狀態欄位 -->
      <template #['item.orderStatus']='{ value, item }'>
        <div class="status-box">
          <v-chip @update:modelValue="newOS" :text="orderStatusTextStyle(item.bookingDate, value).text" :class="orderStatusTextStyle(item.bookingDate, value).class"></v-chip>
          <template v-if="orderStatusTextStyle(item.bookingDate, value).haveCancelBtn">
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
    <OrderInfoCard class="order-info" :bigTitle="'是否要取消訂單？'" :orderInfoData="confirmCancelData" :orderInfoDataImg="confirmCancelDataImg.image" :submit="submit" :dialogClose="dialogClose">
      <!-- cancelOrderBtn 是預定要插在 orderInfoCard 內的 slot 區塊（相對應 name）-->
      <template #cancelOrderBtn>
        <v-btn class="cancel-btn" type="submit" @click="changeOrderStatus" :loading="isSubmitting">確認取消</v-btn>
      </template>
    </OrderInfoCard>
  </v-dialog>

</template>


<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useBookingOrderStore } from '@/stores/bookingOrder'
import { useApi } from '@/composables/axios'
import { useTitleScrollDown, useTableScroll } from '@/composables/scrollAddClass'
import { scrollToTop } from "@/composables/scrollToTop";
import OrderInfoCard from '@/components/orderInfoCard'
import { useSnackbar } from 'vuetify-use-dialog'


defineProps({
  headers: {
    type: Array,
    require: true,
  }
})


const { smAndDown, mdAndUp, height } = useDisplay()
// console.log('height', height.value)
const route = useRoute()
// console.log('route.name', route.name)
const { apiAuth } = useApi()
const { refTableBox, isSlideTable, resetTableScroll } = useTableScroll()
const createSnackbar = useSnackbar()
const user = useUserStore()
const BookingOrderStore = useBookingOrderStore()


// ● 帳號名稱
const accountName = ref(user.account)


// ● 表格變數宣告
const search = ref('')
const items = ref([])


// ● 依據不同裝置，將 "訂單清單表格" 設定不同的高度
// 想要將 JS 計算出的高度傳遞至 CSS 使用，流程：JS計算 --> DOM 設定全域宣告變數 --> CSS 使用全域宣告變數
const tableHeight = computed(() => {

  // 因為管理者頁面與使用者頁面有不同的元素高度（ex: 管理者頁面多了 "新增服務" 的按鈕），所以會依據 route.name 的不同來設定不同的表格高度
  if (route.name === '/admin/manageBooking') {

    // 當螢幕寬度小於 md 的裝置，不設定表格高度，讓表格高度自動適應內容高度
    if (!mdAndUp.value) return

    // 方法一：設定全域宣告的 CSS 變數 --table-height 的值（在 <html> 元素上）
    // document.documentElement.style.setProperty('--table-height', `${reHeight}px`)

    // 方法二：直接將計算出的高度傳遞至要使用的元素上（ex: v-data-table）
    // 350 是預抓的數值，包含：上方搜尋欄位、下方分隔線、表格內部的 padding 等等
    return `${height.value - 350}px`

  } else {
    return `${height.value - 340}px`
  }
})


// ● 表單換頁時，會觸發指定事件
const handleEvent = () => {
  resetTableScroll() // 表格滾動回頂部

  // 在管理者頁面，且螢幕寬度小於 md 的裝置，點擊表單上下分頁按鈕時，會觸發 scrollToTop()
  if (route.name === '/admin/manageBooking' && !mdAndUp.value) {
    scrollToTop() // 頁面滾動回頂部
    // console.log('有觸發 scrollToTop')
  }
}



// ● 依據登入身分的不同（使用者、管理者），向後端請求資料的路徑、設定也有所不同
const postPath = computed(() => {
  // console.log("有觸發 postPath")
  // console.log("user.isLogin", user.isLogin)
  // console.log("user.isAdmin", user.isAdmin)

  if (!user.isLogin) return

  if (user.isAdmin) {
    return {
      url: "/order/all"
    }
  } else {
    // console.log("accountName.value", accountName.value)
    return {
      url: "/order",
      config: {
        params: {
          // 傳至後端的搜尋關鍵字 "帳戶名稱"（目前帳戶名稱，資料庫有限制不能重複），用來只找出相對應用戶的訂單
          search: accountName.value
        }
      }
    }
  }
})



// ● 向後端請求所有訂單資料，並將資料放入 items 變數中
const loadItems = async () => {
  if (!postPath.value) return // 防呆

  try {
    const { url, config } = postPath.value

    const { data } = await apiAuth.get(url, config)

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
        class: 'snackbar-fail'
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



// ● 訂單狀態的文字顯示 & 樣式設定
const orderStatusTextStyle = (bookingDate, statusBoolean) => {
  // console.log('bookingDate', bookingDate, 'statusBoolean', statusBoolean)

  // * 時間不能用字串比較（字串 2 會大於 11，因為比較方向是從左到右，逐字比較）
  // 故需轉換數字來比較，可以使用：
  // .getTime() 計算總毫秒數
  // .setHours(時, 分, 秒, 毫秒) 把日期的「時間部分全部清掉歸　０」，只保留日期
  const today = new Date().setHours(0, 0, 0, 0)
  const bookingD = new Date(bookingDate).setHours(0, 0, 0, 0)


  if (bookingD < today && statusBoolean === true) {
    return {
      text: '已完成',
      class: 'complete',
      haveCancelBtn: false
    }
  } else if (bookingD >= today && statusBoolean === true) {
    return {
      text: '已預約',
      class: 'fill',
      haveCancelBtn: true
    }
  } else if (statusBoolean === false) {
    return {
      text: '已取消',
      class: 'no-fill',
      haveCancelBtn: false
    }
  }


}


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
  { title: '預約時段', value: [], },
  { title: '預約總金額', value: 0 + ' 元', },
])

const confirmCancelDataImg = ref({
  title: '圖片', image: '',
})

const confirmCancelDataId = ref({
  title: 'orderId', id: '',
})
// watch(confirmCancelDataId.value, (A, B) => {
//   console.log(A, B)
// })


// ● 默認彈窗關閉狀態
const dialog = ref(false)

// ● 開啟彈窗
const openDialog = (item) => {
  // console.log('item', item)
  if (item) {
    confirmCancelData.value[0].value = item.bookingOrderNumber
    confirmCancelData.value[1].value = item.name
    confirmCancelData.value[2].value = item.phone
    confirmCancelData.value[3].value = item.dogName
    confirmCancelData.value[4].value = item.bookingDate
    confirmCancelData.value[5].value = item.bookingTime
    confirmCancelData.value[6].value = item.totalPrice
    confirmCancelDataImg.value.image = item.image
    // 取消訂單需傳送至後端的參數
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

// 因取消訂單的動作，不需使用者輸入資料或是傳送檔案、圖片，故也不需要表單欄位驗證
const { handleSubmit, isSubmitting } = useForm()


const submit = handleSubmit(async (orderEditData) => {
  try {
    orderEditData.id = confirmCancelDataId.value.id
    orderEditData.orderStatus = nowOrderStatus.value

    const result = await BookingOrderStore.edit(orderEditData)
    // console.log('result', result)
    console.log('result.BDtext', result.BDtext)
    const updateData = result.updateData
    // console.log('updateData', updateData)

    if (result.text === '修改訂單成功') {

      // 更新目前的訂單狀態
      newOS(orderEditData.id, updateData.orderStatus)

      createSnackbar({
        text: result.text,
        snackbarProps: {
          class: 'snackbar-success'
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
        class: 'snackbar-fail'
      }
    })
  }
})


</script>