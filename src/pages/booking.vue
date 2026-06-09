<template>
  <!-- ● 預約狗狗時間頁面 pages/booking.vue -->
  <section id="booking" class="booking">
    <v-container>
      <!-- 狗狗輪播 swiper 套件 -->
      <swiper class="dogSwiper" :centeredSlides="true" :spaceBetween="30" :pagination="{
        clickable: true,
      }" :navigation="true" :breakpoints="{
        0: { slidesPerView: 1 },      // 小於 sm
        576: { slidesPerView: 'auto' } // sm 以上
      }" :modules="modules" @swiper="onSwiper" @slideChangeTransitionEnd="onDogIDChange">
        <swiper-slide v-for="item in items">
          <!-- ● components/dogCard.vue 元件 -->
          <DogsCard v-bind="item"></DogsCard>
        </swiper-slide>
      </swiper>

      <!-- ● 預約資訊 -->
      <v-row class="booking-area">
        <!-- 日期選擇 -->
        <v-col md="6">

          <template v-if="mobile">
            <v-dialog class="data-dialog" v-model="dataDialog">
              <v-date-picker v-model="date" :allowed-dates="allowedSelectDate" @update:year="changYear = $event" @update:month="changMonth = $event"></v-date-picker>

              <dialogCloseBtn @click="dataDialog = false"></dialogCloseBtn>
            </v-dialog>
          </template>

          <template v-else>
            <v-date-picker v-model="date" @click="dialogOpen" :allowed-dates="allowedSelectDate" @update:year="changYear = $event" @update:month="changMonth = $event"></v-date-picker>
          </template>

          <div class="notice">
            <v-icon icon="mdi-message-alert"></v-icon>
            <p>當天日期無法預約，若有需求，請來電洽詢，謝謝！</p>
          </div>
        </v-col>

        <!-- ● 預約表單填寫 -->
        <v-col md="6">
          <v-form class="booking-form" @submit.prevent="submit" :disabled="isSubmitting">

            <v-text-field label="預約人姓名" variant="underlined" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>

            <v-text-field label="預約人電話" variant="underlined" v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>

            <div class="box pb-6">
              <v-col>
                <div class=" d-flex flex-row justify-center align-baseline">
                  <p>預約狗狗：</p>
                  <h6>{{ Dinfo.dogName }}</h6>
                </div>
              </v-col>
              <v-col>
                <img :src="dogImg"></img>
              </v-col>
            </div>


            <template v-if="mobile">
              <!-- mobile 預約日期 -->
              <v-text-field :label="chooseDateTitle" readonly @click="dialogOpen($event, '預約日期')" :model-value="chooseBDate" :error-messages="bookingDate.errorMessage.value"></v-text-field>

              <!-- mobile 預約時段 -->
              <v-textarea label="預約時段" readonly textarea auto-grow rows="1" :model-value="BTimeTxt" :error-messages="bookingTime.errorMessage.value" @click="dialogOpen($event, '預約時段')"></v-textarea>
            </template>

            <template v-else>
              <!-- 預約日期 -->
              <v-text-field :label="chooseDateTitle" disabled :model-value="chooseBDate" :error-messages="bookingDate.errorMessage.value"></v-text-field>

              <!-- 預約時段 -->
              <v-textarea label="預約時段" disabled textarea auto-grow rows="1" :model-value="BTimeTxt" :error-messages="bookingTime.errorMessage.value"></v-textarea>
            </template>


            <!-- 預約總時數 -->
            <v-text-field label=" 預約總時數" disabled :model-value="totalBTimeTxt">
              <span>預估</span>
            </v-text-field>

            <!-- 總計金額 -->
            <v-text-field label="總計金額" disabled :model-value="totalBPriceTxt">
              <span>預估</span>
            </v-text-field>

            <!-- 送出表單按鈕 -->
            <v-btn class="submit-btn" type="submit" @click="useFormUpdate" :loading="isSubmitting">送出預約</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- ● 點擊日期，跳出視窗選擇預約時段 -->
      <v-dialog class="choose-time-dialog" v-model="chooseTimeDialog">
        <div class="choose-time-dialog-txt">
          <h4>可預約時段</h4>

          <v-divider></v-divider>

          <v-checkbox hide-details v-model="selectedTime" v-for="el in sortBookingTimeData" :label="el" :value="el" false-icon="mdi-paw-outline" true-icon="mdi-paw"></v-checkbox>

          <dialogCloseBtn @click="chooseTimeDialog = false"></dialogCloseBtn>
        </div>
      </v-dialog>

      <!-- ● 送出訂單成功後，彈出已預約的訂單資訊 -->
      <v-dialog v-model="dialogOrderInfo">
        <OrderInfoCard class="order-info" :bigTitle="'已成功預約'" :orderInfoData="orderInfoData.infor" :orderInfoDataImg="orderInfoData.img" :dialogClose="dialogClose">
          <!-- noticeInfo 是預定要插在 orderInfoCard 內的 slot 區塊（相對應 name）-->
          <template #noticeInfo>
            <p>
              <v-icon icon="mdi-message-alert"></v-icon>
              如需<span>取消預約訂單</span>，請前往
              <router-link :to="{ path: '/userZone/dogBookingSearch' }">會員專區</router-link>
              做取消，謝謝！
            </p>
          </template>
        </OrderInfoCard>
      </v-dialog>
    </v-container>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import { useBookingOrderStore } from '@/stores/bookingOrder'
import { useSnackbar } from 'vuetify-use-dialog'
import DogsCard from '@/components/dogsCard.vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import OrderInfoCard from '@/components/orderInfoCard'
import dialogCloseBtn from '@/components/dialogCloseBtn.vue'
// 引用需要 swiper 的 modules
import { Pagination, Navigation, HashNavigation } from 'swiper/modules'
// 引用計算產生結果的檔案
import { useBookingSummary } from "@/composables/calculate_area";
import { bookingDateCollection } from "@/composables/bookingDateCollection";




const route = useRoute()
const router = useRouter()
const { mobile, sm } = useDisplay()
const { backApi, apiAuth } = useApi()
const User = useUserStore()
const bookingOrderStores = useBookingOrderStore()
// console.log('bookingOrderStores', bookingOrderStores)
const { createBookingData, getBookingData } = bookingDateCollection()
const createSnackbar = useSnackbar()
// ● 將 swiper 需要啟用的 modules 放入陣列，與上方 <swiper> 標籤內的 :modules 綁定，意思是啟用這些模組功能
const modules = [Pagination, Navigation, HashNavigation]



definePage({
  meta: {
    title: 'Dost | 預約時間',
    login: false,
    admin: false
  }
})


// 取帳戶名稱
const userName = computed(() => {
  if (!User.isLogin) {
    // router.push('/login')
    // return
    return "Guest"
  }
  return User.nickname || User.account
})


// ● 指定 id 的狗狗訊息
const Dinfo = ref({
  _id: '',
  image: '',
  dogName: '',
  age: 0,
  price: 0,
  booking: true,
  bookingTime: [],
  feature: '',
  sell: true,
})




// ● 綁定時間／使用者選擇的時間，並預設 null
const date = ref(null)
// console.log(date.value)

//　● 當前日期
const nowDate = ref(new Date())

const nowDateYear = ref(nowDate.value.getFullYear())
const nowDateMonth = ref(nowDate.value.getMonth())

// 綁定日期選擇器上的更新年、月份的事件
const changYear = ref(null)
const changMonth = ref(null)



// ● 取當前日期的年、月份並轉成 "字串" 的資料型態
// 用作後續查詢後端資料用
const dateYM = computed(() => {
  const y = changYear.value ?? nowDateYear.value
  const m = changMonth.value ?? nowDateMonth.value

  return y + "/" + (m + 1)
})



// 函式：初始化日期選擇器上的更新年、月份
const initYM = () => {
  changYear.value = null
  changMonth.value = null
}



// ● 依據狗狗 id 所有的當月份的已預約日期資料
const alreadybookingColl = ref([])

// 統一日期格式的函式
const dateFormat = (val) => {
  if (val === null || isNaN(val.getTime())) return

  const y = val.getFullYear()
  const m = val.getMonth() + 1
  const d = val.getDate()
  return y + "/" + m + "/" + d
}

// const BdateFormat = (val) => {
//   const [y, m, d] = val.split('/')
//   return y + "-" + m.padStart(2, '0') + "-" + d.padStart(2, '0')
// }

// ● 抓出已經完全預約的日期，做成陣列
const NOTDate = computed(() => {
  if (alreadybookingColl.value.length === 0) return []

  // 判斷狗狗可預約的時段陣列 .length，來判斷是否期日期的時段全部被預約，讓後續推算哪些日期顯示呈無法預約的狀態
  const bookingTimeLength = Dinfo.value.bookingTime.length

  // ● 計算日期重複出現的次數
  // countMap 輸出後的格式：
  // {
  //    "2026/6/15": 2,
  //    "2026/6/16": 1
  // }
  const countMap = {}
  alreadybookingColl.value.forEach((el) => {
    countMap[el.bookingDate] = (countMap[el.bookingDate] || 0) + 1
  })

  // ### 補充知識：也可以用 .reduce 累加的方式來計算日期重複出現的次數。
  // const countMap = alreadybookingColl.value.reduce((map, el) => {
  //   map[el.bookingDate] = (map[el.bookingDate] || 0) + 1
  //   return map
  // }, {}) // 結尾的 {} 是 reduce() 的初始值，代表 map 的初始值是一個空物件

  // 篩選出現次數等於 bookingTimeLength 的日期，表示該日期的時段已全部被預約，需顯示為無法預約的狀態
  const dates = Object.keys(countMap)
    .filter((key) => countMap[key] === bookingTimeLength)
    .map((key) => {
      // 將其格式轉日期再轉成總時間(數值格式)，讓後續的比較方式是「數值比較」，而不是「記憶體位置比較」
      return new Date(key).getTime()
    })

  return dates
})

// watch([alreadybookingColl, NOTDate], ([AVal, BVal]) => {
//   console.log('alreadybookingColl, NOTDate', { AVal, BVal })
// })




// 預約時間欄位的名稱
const chooseDateTitle = ref('預約日期')
// 視窗寬度
const screenWidth = ref(window.innerWidth)

// 預約時間欄位 Title
function updateChooseDateTitle() {
  if (date.value === null || isNaN(date.value.getTime())) {
    if (screenWidth.value > 576) {
      return chooseDateTitle.value = '預約日期（請於左側日期表選擇）'
    } else {
      return chooseDateTitle.value = '選擇預約日期'
    }
  }
}


// ● 限制允許選取的時間為當天以後的日期（不含當天）和已預約日期
// 傳入的 date，是 Vuetify 提供的參數，指的是當前月份所有可以被選取的日期
const allowedSelectDate = (date) => {

  // 將其日期格式統一，.getTime() 轉換成總時間(數值格式)，讓後續的比較方式是「數值比較」，而不是「記憶體位置比較」
  const dateGetTime = date.getTime()

  // .includes() 的判斷方式依據資料型態而有所不同：
  //  - 字串 => "逐字比較"
  //  - 數字 => "數值比較"
  //  - 物件陣列(如：new Date) => "記憶體位置比較"
  // <EX>：假設想要比較 "字串資料"，讓大於 "2026/6/2" 的日期表示顯示；那當在判斷 "2026/6/2" 和 "2026/6/10" 時，邏輯會是前面 2026/6 都一樣，但比較到 2 和 10 時，比較順序就會是 "2" 與 10 的 "1" 來比較 => 結果 2 > 1 => 2026/6/10 就會被判定為不顯示日期。
  const allow = dateGetTime > nowDate.value.getTime() && !NOTDate.value.includes(dateGetTime)

  // console.log('dateGetTime', dateGetTime)
  // console.log('NOTDate', NOTDate.value)
  // console.log('includes(dateGetTime)', NOTDate.value.includes(dateGetTime))

  return allow
}


// ● 動態選取預約時段
const selectedTime = ref([])
// watch(selectedTime, (newVal) => {
//   console.log("selectedTime changed:", newVal);
// })


// ● 將全部狗狗資訊匯入上方的 Swiper 元件
const items = ref([])
// console.log('items', items.value)


// ● 這個函式 loadItems() 用於後續讓 Swiper 使用（Swiper 依賴 DOM 操作），故函式在 onMounted() 裡面被呼叫的，保證 DOM 組件渲染完成後，就會執行 loadItems()，並更新 items.value 的內容，讓 Swiper 顯示出來；同時確保在資料更新後再執行 reSwiper()，讓 Swiper 移動到指定的圖片位置。
const loadItems = async () => {
  try {
    const { data } = await backApi.get('/dogs')
    items.value.splice(0, items.value.length, ...data.result.data)

    // 只有在「改資料後，馬上要用 DOM」時，才需要 nextTick()
    await nextTick()

    // 確保 items.value 有值之後再執行 reSwiper()，讓後續 swiper 移動至指定的圖片
    reSwiper()

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



// ● dogSwiper 滑動圖片至指定位置
// 把 Swiper 內部的實例（instance）存起來，讓你之後可以用 JS 控制 Swiper；以下物件就是 Swiper instance。
// swiper = {
// slideTo(),
// slideNext(),
// slidePrev(),
// activeIndex,
// slides,
// update(),
// ... }
// swiperInstance 用來後續存放「Swiper 建好之後的 instance」
const swiperInstance = ref(null)

// swiper 來自 <swiper @swiper="onSwiper">，當 Swiper 初始化完成時：Swiper 內部呼叫，把 instance 當參數丟入 onSwiper 函式
function onSwiper(swiper) {
  swiperInstance.value = swiper
}

// ● 用來判斷是否有提供 route.query.id
// 取得目前網址的 query.id
const currentID = route.query.id
// console.log('currentID:', currentID)

// ● 從其他頁面進入，並讓 swiper 移動至指定圖片或預設圖片位置
function reSwiper() {
  if (currentID) {
    // 判斷 route.query.id 是否存在
    if (!currentID) return

    // findIndex 從 items 陣列中，找到與 currentID 相符的 id，最終回傳 index 索引值
    const moveToIndex = items.value.findIndex(item => item._id === currentID)
    // console.log('moveToIndex:', moveToIndex)

    if (moveToIndex === -1) return

    // .slideTo(index, speed?, runCallbacks?)
    // - index：第幾張 slide（從 0 開始）
    // - speed：動畫時間（ms）
    // - runCallbacks：是否觸發事件（預設 true），觸發的事件包括：
    //                 ．slideChange
    //                 ．slideChangeTransitionStart
    //                 ．slideChangeTransitionEnd
    //                 ．transitionStart
    //                 ．transitionEnd
    swiperInstance.value.slideTo(moveToIndex, 0, false)

    loadDinfo(currentID)

  } else {
    // 沒有 route.query.id 傳入，使用預設值
    initSwiperHash()
  }
}



// ● swiper 載入當前預設的資料
function initSwiperHash() {
  const initHash = items.value[0]?._id
  // console.log('initHash:', initHash)

  loadDinfo(initHash)
}



// ● Swiper 事件 @slideChangeTransitionEnd 當滑動動畫結束時觸發函式 onDogIDChange
const onDogIDChange = (swiper) => {
  // 邏輯說明：「現在滑到第幾張 → 去資料陣列找那一筆 → 拿它的 id」
  const dogID = items.value[swiper.activeIndex]?._id
  // console.log('dogID:', dogID)

  // 根據當前圖片的 id，去取該 id 的狗狗資料，並更新預約表格的資料
  loadDinfo(dogID)
}



// ● 監聽 Dinfo.value, dateYM（年月份切換會影響） 是否有變動，觸發重新向後端請求查詢其狗狗已預約的日期，作為後續要顯示哪些日期可以預約
watch([Dinfo.value, dateYM], async ([DVal, YMval]) => {
  // console.log('Dinfo.value, DVal', [DVal, YMval])
  // console.log('觸發重新向後端發送請求 "預約日期" 資料')

  alreadybookingColl.value = await getBookingData(DVal._id, YMval)
})



// ● 圖片變更，自動計算
const dogImg = computed(() => {
  return Dinfo.value.image
})


// ● 來自後端的資料（bookingTime）重新排序
const sortBookingTimeData = computed(() => {
  // 因 .sort() 會修改原陣列「改了前端記憶體中的資料（同一份 reference）」，故需複製一個新陣列再排序
  // 目前的 Dinfo.value.bookingTime 資料型態 => 陣列
  // [
  //   "10:00～12:00",
  //   "13:00～15:00"
  // ]
  // [...Dinfo.bookingTime] 執行複製陣列的動作
  // a.localeCompare(b) 比較 "字串" 順序；a-b 比較 "數字"
  const BT = [...Dinfo.value.bookingTime].sort((a, b) => a.localeCompare(b))

  // 將使用者選擇的日期統一日期格式
  const chooseDate = dateFormat(date.value)
  // console.log('chooseDate：', chooseDate)

  // 從已預約的資料中，篩選出當前選擇日期的資料，再從這些資料中，取出已預約的時段，做成一個陣列
  const alreadyBT = alreadybookingColl.value
    .filter((el) => el.bookingDate === chooseDate)
    .map((el) => el.bookingTime)
  // console.log('alreadyBT：', alreadyBT)

  // 將已預約的時段從 BT 中過濾掉，只剩當前日期可以預約的時段
  const noneBT = BT.filter((el) => !alreadyBT.includes(el))

  return noneBT
})
// watch(sortBookingTimeData, (val) => {
//   console.log('sortBookingTimeData', val)
// })


// ● 回傳指定 id 的狗狗訊息
const loadDinfo = async (passInData) => {

  // console.log('passInData:', passInData)

  // 手動清空當前表格欄位
  manualResetForm()

  try {

    // await nextTick()
    // console.log('有觸發')

    // 利用 id 只回傳某一隻狗狗的資料
    const { data } = await backApi.get('/dogs/' + passInData)
    // console.log('data.result:', data.result)

    Dinfo.value._id = data.result._id
    Dinfo.value.image = data.result.image
    Dinfo.value.dogName = data.result.dogName
    Dinfo.value.age = data.result.age
    Dinfo.value.price = data.result.price
    Dinfo.value.booking = data.result.booking
    Dinfo.value.bookingTime = data.result.bookingTime
    Dinfo.value.feature = data.result.feature
    Dinfo.value.sell = data.result.sell

    // 日期選擇器初始化更新的年、月份
    initYM()


  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        class: 'snackbar-fail',
      }
    })
  }
}



// ● 取出各種計算結果
const {
  // 計算結果
  totalBTime,
  totalBPrice,

  // 要呈現在 UI/畫面 的值
  chooseBDate,
  BTimeTxt,
  totalBTimeTxt,
  totalBPriceTxt,
} = useBookingSummary(date, selectedTime, Dinfo)



// ● 函式：確認是否重複預約
const duplicateBD = (passInBD, passInBT) => {

  const isDuplicate = alreadybookingColl.value.some((el) =>
    el.bookingDate === passInBD &&
    passInBT.includes(el.bookingTime)
  )
  // console.log("isDuplicate", isDuplicate)

  return isDuplicate
}



// ● 監視 chooseBDate、selectedTime 欄位，再次確認使用者選擇的預約日期和時段，是否有重複
watch([chooseBDate, selectedTime], ([newBD, newST]) => {
  // console.log("觸發監視 BD ST 欄位")
  // console.log("BD 欄位", newBD)
  // console.log("ST 欄位", newST)
  // console.log("alreadybookingColl", alreadybookingColl.value)

  if (newBD == "" || newST.length == 0) return

  if (duplicateBD(newBD, newST)) {
    alert("選擇的日期和時段已被預約，請刷新頁面後重新選擇")
  }
})



// ● 彈窗效果
const chooseTimeDialog = ref(false) // 預設不跳出
const dataDialog = ref(false)

// 選取日期觸發觸發彈窗事件
// 綁定事件 @click="dialogOpen" 函式本身會預設有 e（等同於 $event），藉由 e 原生事件物件做判斷，當點取的日期數字相同時觸發彈窗事件
const dialogOpen = (e, passInData) => {
  // console.log('傳入的參數', passInData)
  // console.log('選擇的日期', chooseBDate.value)
  // console.log('點擊到的目標', e.target.innerText)

  // 推薦使用 split() 將 年/月/日 另外拆分成 "陣列" 格式
  // 再用 .pop() 取出陣列最後一個元素 "日" 做判斷
  // 範例： chooseBDate.value.split('/')，輸出 ["2026", "2", "12"]，再 .pop() 輸出 "12"
  const day = Number(chooseBDate.value.split('/').pop())
  // console.log('取出 day', day)

  // 點擊事件，利用 data-v-date 這個屬性來精準抓到點擊到的日期，這是官方 Vuetify 的格式，會在每一格日期上加上此屬性
  // ex：<div class="v-date-picker-month__day" data-v-date="2026-02-12">
  const clickDay = Number(e.target.closest('[data-v-date]')?.dataset.vDate.split('-').pop())
  // console.log('clickDay', clickDay)


  if (passInData == '預約日期') {
    dataDialog.value = true
    initYM()
  } else if (passInData == '預約時段' || clickDay === day) {
    chooseTimeDialog.value = true
  }
}

// 監視 "日期選擇器彈窗"，確定有選擇日期後，直接關閉彈窗
watch([date, dataDialog], ([newDate, newDataDialog], [oldDate]) => {
  // console.log('date', [newDate, oldDate])
  // console.log('dataDialog', newDataDialog)

  // 當 newDate 不是 Date 物件（例如：null），直接 return，不執行後續的程式碼
  if (!(newDate instanceof Date)) {
    return
  }

  if (!(oldDate instanceof Date)) {
    dataDialog.value = false
    return
  }

  // 當 newDate 和 oldDate 的日期不同時
  if (newDate.toDateString() !== oldDate.toDateString()) {
    dataDialog.value = false
    // 重製預約時段的值
    selectedTime.value = []
  }
})


// ● 已預約的訂單資料陣列
const orderInfoData = reactive({})

// 已預約的訂單資訊彈窗效果預設關閉
const dialogOrderInfo = ref(false)

// 送出預約表單成功後，彈出已預約的訂單資訊
const openDialogOrderInfo = () => {
  dialogOrderInfo.value = true
}

// 關閉彈窗
// 因 OrderInfoCard 元件內的關閉按鈕（dialogCloseBtn）是獨立的元件，無法直接操作 booking.vue 內的 dialogOrderInfo 變數，所以需要透過 props 傳遞一個函式（dialogClose）給 OrderInfoCard 元件，讓它在按下關閉按鈕時，可以呼叫這個函式來改變 booking.vue 內的 dialogOrderInfo 變數，達到關閉彈窗的效果。
const dialogClose = () => {
  dialogOrderInfo.value = false
}


// ● 手動清除的表格欄位
// 因日期選取和時段選取欄位並沒有與 useForm 雙向綁定資料，故需要手動清除
// 根據日期、時段做計算，總時數、總金額欄位會自動更新歸 0，故不需要再另外手動設定清除
function manualResetForm() {
  date.value = null
  selectedTime.value = []
}



// ● 定義預約表格
const bookingFormSchema = yup.object({
  name: yup
    .string()
    .required('預約人名字必填'),
  phone: yup
    .string()
    .required('預約人電話必填'),
  dogName: yup
    .string()
    .required('狗狗名字必填'),
  bookingDate: yup
    .string()
    .required('預約日期必填'),
  bookingTime: yup
    .array()
    .required('預約時段必填')
    .min(1, '預約時段必填'), // 至少要有 1 個元素
  // totalBookingTime: yup
  //   .number()
  //   .required('預約總時數必填')
  //   .typeError('預約總時數格式錯誤')
  //   .min(1, '預約總時數不能小於 1'),
  // totalPrice: yup
  //   .number()
  //   .required('預約總金額必填')
  //   .typeError('預約總金額格式錯誤')
  //   .min(1, '預約總金額不能小於 1'),
  accountName: yup
    .string()
    .required('帳戶名稱必填'),
  orderStatus: yup
    .boolean()
    .required('訂單狀態必填'),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: bookingFormSchema,
  // initialValues 設定表單各欄位的初始值
  initialValues: {
    name: userName.value,
    phone: '',
    image: '',
    dogName: '',
    bookingDate: '',
    bookingTime: [],
    // totalBookingTime: 0,
    // totalPrice: 0,
    accountName: User.account,
    orderStatus: true,
  }
})

const name = useField('name')
const phone = useField('phone')
const image = useField('image')
const dogName = useField('dogName')
const bookingDate = useField('bookingDate')
const bookingTime = useField('bookingTime')
// const totalBookingTime = useField('totalBookingTime')
// const totalPrice = useField('totalPrice')
const accountName = useField('accountName')
const orderStatus = useField('orderStatus')



// ● 點擊發送按鈕，觸發將輸入表單的資料更新至要發送表單資料內
// name, phone 綁定雙向資料（v-model），只要使用者輸入就會即時更新，故不用在點擊發送按鈕時，再更新一次
function useFormUpdate() {
  image.value.value = Dinfo.value.image;
  dogName.value.value = Dinfo.value.dogName;
  bookingDate.value.value = chooseBDate.value;
  bookingTime.value.value = selectedTime.value;
  // totalBookingTime.value.value = totalBTime.value;
  // totalPrice.value.value = totalBPrice.value;
}


// ★ FormData 直接傳至後端處理會失敗，需再經過 multer 的套件解析 form-data，才能傳入後端
const submit = handleSubmit(async (values) => {
  // console.log('有觸發 submit')
  // console.log('submit values', values)

  // ★ 按下送出表單按鈕時，先判斷是否為登入狀態
  // 非登入狀態，跳出需登入的提示，關閉提示後，自動轉跳至登入頁面
  if (!User.isLogin) {
    // console.log('User.isLogin', User.isLogin)

    createSnackbar({
      text: '請先登入會員',
      snackbarProps: {
        class: 'snackbar-fail',
      }
    })
    router.push('/login')
    return
  }


  try {
    // console.log('有觸發')

    // ● 確認訂單是否有重複預約日期和時段
    if (duplicateBD(values.bookingDate, values.bookingTime)) {
      createSnackbar({
        text: "選擇的日期和時段已被預約，請刷新頁面後重新選擇",
        snackbarProps: {
          class: 'snackbar-fail',
          timeout: 5000
        }
      })

      return
    }

    // ● 建立符合後端可接收格式的表格
    const fd = new FormData()

    // ● 要將東西放進去的語法 fd.append(key, value)
    fd.append('name', values.name)
    fd.append('phone', values.phone)
    fd.append('image', values.image)
    fd.append('dogId', Dinfo.value._id,)
    fd.append('dogName', values.dogName)
    fd.append('bookingDate', values.bookingDate)
    fd.append('bookingTime', JSON.stringify(values.bookingTime)) // 因為 bookingTime 是陣列格式，需轉成字串格式才能放進 FormData 裡面
    // fd.append('totalBookingTime', values.totalBookingTime)
    // fd.append('totalPrice', values.totalPrice)
    fd.append('accountName', values.accountName)
    fd.append('orderStatus', values.orderStatus)


    // ● 將 nowDate 日期格式改為現在常見的 yy/mm/dd
    // .toLocaleDateString() 是在地化日期格式（符合當地使用的日期格式）；若換了一個區域，因使用的日期格式習慣不同，後續處理日期的程式碼可能會報錯，故這邊統一一種格式，不因地區改變。
    const formatNowDate = `${nowDate.value.getFullYear()}/${String(nowDate.value.getMonth() + 1).padStart(2, '0')}/${String(nowDate.value.getDate()).padStart(2, '0')}`
    // console.log('formatNowDate', formatNowDate)


    // ● 向後端發送訂單資料
    // data 為後端回傳的資料
    // 第一個參數要放傳至後端的路徑
    // 第二個參數要放傳至後端的 fd 表格資料
    // 第三個才放查詢參數 params 傳至後端做正則表達式的查詢關鍵字
    const { data } = await apiAuth.post("/order", fd, {
      params: {
        orderDate: formatNowDate, // 提供後端製作訂單流水號用
        dogId: Dinfo.value._id, // 提供後端查詢狗狗資料庫的 id
      },
    });
    // console.log('回傳 data', data)

    // ● 統整後端回傳的資料，作為 "預約完成彈窗的資料"
    // 因為要包2個東西，所以用 {} 一起包住，視為一個物件
    const resOrderInfor = {
      infor: [
        { title: '訂單編號', value: data.result.bookingOrderNumber },
        { title: '預約人', value: data.result.name },
        { title: '電話', value: data.result.phone },
        { title: '預約狗狗', value: data.result.dogName },
        { title: '預約日期', value: data.result.bookingDate },
        // { title: '預約時段', value: data.result.bookingTime[0].replace(/,/g, '\n') },
        { title: '預約時段', value: data.result.bookingTime },
        { title: '預約總金額', value: data.result.totalPrice + ' 元' }
      ],
      img: data.result.image
    }

    // Object.assign(A, B) 把 B 合併進 A 物件
    // 因是物件合併物件，就不會要取 infor 陣列的值時，需要這樣寫 orderInfoData[0]infor
    // 後端回傳的資訊放進預設的空陣列
    Object.assign(orderInfoData, resOrderInfor)
    // console.log('回傳後合併 orderInfoData', orderInfoData)

    // 成功預約後，跳出已預約訂單資訊
    openDialogOrderInfo()

    // ★★★ 同時也在後端資料庫建立預約時間列表的資料，方便日後查詢哪一些日期已預約
    // 先整理要傳至後端的資料
    const handleData = values.bookingTime.map((el) => ({
      dogId: Dinfo.value._id,
      dogName: values.dogName,
      bookingDate: values.bookingDate,
      bookingTime: el
    }))

    // 將整理完的資料傳送至要發送後端的 api
    createBookingData(handleData)


    createSnackbar({
      text: data.message,
      snackbarProps: {
        class: 'snackbar-success',
      }
    })

    // 清空欄位
    resetForm()
    // 因部分欄位沒有與 useForm 雙向綁定資料（v-model），故 resetForm() 僅對有綁定的欄位有效；其他欄位需另外手動設定重置
    // 清空選擇的日期、時段（因總時數、總金額欄位會根據日期、時段自動做計算，故會自動更新歸 0)
    manualResetForm()

    // 更新 pinia 的 bookingOrderStores 的 topThreeDogsData 資料狀態
    bookingOrderStores.topThreeOrder()

  } catch (error) {
    console.log('error', error)
    console.log('error?.response?.data?.message', error?.response?.data?.message)


    createSnackbar({
      text: error?.response?.data?.message || error || '發生錯誤',
      snackbarProps: {
        class: 'snackbar-fail'
      }
    })
  }
})


// ● onMounted(()=>{}) 用來執行在組件首次渲染（DOM 元素掛載）完成後的操作。
// 無論你將 onMounted 放在 <script setup> 的哪個位置，都會在組件掛載完成後自動執行。
// * 使用時機：
// 初始化數據：從 API 或服務器請求數據。
// 設置事件監聽器：比如監聽瀏覽器事件、窗口大小改變等。
// 操作 DOM：比如設置焦點、滾動事件、第三方庫初始化等。
onMounted(async () => {
  await nextTick();

  requestAnimationFrame(async () => {
    updateChooseDateTitle()
  })

  await loadItems()
})

</script>
