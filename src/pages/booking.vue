<template>
  <!-- ● 預約狗狗時間頁面 pages/booking.vue -->
  <section id="booking" class="booking">
    <v-container>
      <!-- 狗狗輪播 swiper 套件 -->
      <swiper class="dogSwiper" :centeredSlides="true" :spaceBetween="30" :pagination="{
        clickable: true,
      }" :navigation="true" :hashNavigation="{
        replaceState: true,
        watchState: true
      }" :breakpoints="{
        0: { slidesPerView: 1 },      // 小於 sm
        576: { slidesPerView: 'auto' } // sm 以上
      }" :modules="modules" @swiper="onSwiper" @slideChangeTransitionEnd="onHashChange">
        <swiper-slide v-for="item in items" :data-hash="`/booking#${item._id}`">
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
              <v-date-picker v-model="date" :allowed-dates="allowedSelectDate">
              </v-date-picker>

              <div class="dialog-close">
                <v-btn @click="dialogClose">
                  <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
                </v-btn>
              </div>
            </v-dialog>
          </template>

          <template v-else>
            <v-date-picker v-model="date" @click="dialogOpen" :allowed-dates="allowedSelectDate">
            </v-date-picker>
          </template>

          <div class="notice">
            <v-icon icon="mdi-message-alert"></v-icon>
            <p>當天日期無法預約，若有需求，請來電洽詢，謝謝！</p>
          </div>
        </v-col>

        <!-- ● 預約表單填寫 -->
        <v-col md="6">
          <v-form class="booking-form" @submit.prevent="submit" :disabled="isSubmitting">

            <v-text-field label="預約人姓名" variant="underlined" :class="addClass" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>

            <v-text-field label="預約人電話" variant="underlined" :class="addClass" v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>

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
              <!-- <div class="box">
                <v-col>
                  <p>預約日期：</p>
                </v-col>
                <v-col>
                  <v-text-field @click="dialogOpen">
                    {{ dateForm }}
                  </v-text-field>
                </v-col>
              </div> -->

              <!-- mobile 預約日期 -->
              <v-text-field :label="chooseDateTitle" disabled variant="underlined" @click="dialogOpen" v-model="bookingDate.value.value" :error-messages="bookingDate.errorMessage.value"></v-text-field>

              <!-- mobile 預約時段 -->
              <v-textarea label="預約時段" disabled textarea auto-grow rows="1" variant="underlined" :model-value="bookingTimeText" @click="dialogOpen($event, '預約時段')"></v-textarea>
            </template>

            <template v-else>
              <!-- 預約日期 -->
              <v-text-field :label="chooseDateTitle" disabled variant="underlined" v-model="bookingDate.value.value" :error-messages="bookingDate.errorMessage.value"></v-text-field>

              <!-- 預約時段 -->
              <v-textarea label="預約時段" disabled textarea auto-grow rows="1" variant="underlined" :model-value="bookingTimeText"></v-textarea>
            </template>


            <!-- 預約總時數 -->
            <v-text-field label=" 預約總時數" disabled variant="underlined" :model-value="totalBookingTime.value.value">
            </v-text-field>

            <!-- 總計金額 -->
            <v-text-field label="總計金額" disabled variant="underlined" :model-value="totalPrice.value.value">
            </v-text-field>

            <!-- 送出表單按鈕 -->
            <v-btn class="w-40 mt-5" type="submit" color="green" :loading="isSubmitting">送出預約</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- 點擊日期，跳出視窗選擇預約時段 -->
      <v-dialog class="choose-time-dialog" v-model="chooseTimeDialog">
        <div class="choose-time-dialog-txt">
          <h4>可預約時段</h4>

          <v-divider></v-divider>

          <v-checkbox hide-details v-model="selectedTime" v-for="el in Dinfo.bookingTime.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" :label="el" :value="el" false-icon="mdi-paw-outline" true-icon="mdi-paw"></v-checkbox>

          <div class="dialog-close">
            <v-btn @click="dialogClose">
              <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
            </v-btn>
          </div>
        </div>
      </v-dialog>

      <!-- ● 送出訂單成功後，彈出已下單的資訊 -->
      <v-dialog v-model="dialogOrderInfo">
        <OrderInfoCard :bigTitle="'已預約資訊'" :orderInfoData="orderInfoData.infor" :orderInfoDataImg="orderInfoData.img" :dialogClose="dialogClose" :submit="submit" :isSubmitting="isSubmitting"></OrderInfoCard>
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
// 引用需要 swiper 的 modules
import { Pagination, Navigation, HashNavigation } from 'swiper/modules'



const route = useRoute()
const router = useRouter()
const { mobile, sm } = useDisplay()
const { backApi, apiAuth } = useApi()
const User = useUserStore()
const BookingOrderStore = useBookingOrderStore()
// console.log('BookingOrderStore', BookingOrderStore)
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
  return User.account
})


// 綁定時間，讓日期和表格時間一致
// 綁定選取的日期，並預設空字串
const date = ref(null)
// console.log(date.value)

//當前日期
const nowDate = ref(new Date())

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


// 取出日期並將日期當地化
const dateForm = computed(() => {
  if (date.value === null || isNaN(date.value.getTime())) {
    return "尚未選取日期"
  } else {
    return date.value.toLocaleDateString()
  }
})

// 監視彈窗的日期選擇器，確定有選擇日期後，直接關閉彈窗
// * 比較日期物件要注意：
//  - date 通常是 Date 物件
//  - newVal != oldVal 比較的是 "物件引用"，即使日期相同，如果是不同的 Date 物件，也會判定為不同
watch(date, (newDate, oldDate) => {
  if (!(newDate instanceof Date) || !(oldDate instanceof Date)) { dataDialog.value = false }
  else if (newDate.toLocaleDateString() != oldDate.toLocaleDateString()) {
    dataDialog.value = false
  }
})

// 限制允許選取的時間為當天以後的日期（不含當天）
const allowedSelectDate = (date) => {
  return date > nowDate.value
}


// ● 將全部狗狗資訊匯入上方的 Swiper 元件
const items = ref([])
// console.log('items', items.value)

const loadItems = async () => {
  try {
    const { data } = await backApi.get('/dogs')
    items.value.splice(0, items.value.length, ...data.result.data)

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
loadItems()

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

// ● 用來判斷是否是從 "帥氣狗狗" 頁面點擊過來的（若是，會提供 id 值）
// 取得目前網址的 query.id
const currentID = route.query.id
// console.log('currentID:', currentID)

// ● 讓 swiper 移動至指定圖片或預設圖片位置
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
    initSwiperHash()
  }
}

// ● 當前頁面刷新或是從非 "帥氣狗狗" 頁面進入此頁面時，載入當前預設的資料
function initSwiperHash() {
  const initHash = items.value[0]?._id
  // console.log('initHash:', initHash)

  loadDinfo(initHash)
}



// ● Swiper 事件 @slideChangeTransitionEnd 當滑動動畫結束時觸發函式 onHashChange
const onHashChange = () => {
  const changeHash = window.location.hash.split('#')[2]
  // console.log('changeHash:', changeHash)
  loadDinfo(changeHash)
}


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
  counter: 0,
})

// 圖片變更，自動計算
const dogImg = computed(() => {
  return Dinfo.value.image
})

// ● 回傳指定 id 的狗狗訊息
const loadDinfo = async (passInData) => {

  // console.log('passInData:', passInData)

  // 手動清空當前表格欄位
  manualResetForm()

  try {

    await nextTick()
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
    Dinfo.value.counter = data.result.counter

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



// ● 彈窗效果
const chooseTimeDialog = ref(false) // 預設不跳出
const dataDialog = ref(false)

// 選取日期觸發觸發彈窗事件
// 綁定事件 @click="dialogOpen" 函式本身會預設有 e（等同於 $event），藉由 e 原生事件物件做判斷，當點取的日期數字相同時觸發彈窗事件
// .slice(-2) 擷取文字，-2 表示從後面開始接取 2 位
const dialogOpen = (e, passInData) => {
  // console.log('e', e)
  // console.log('passInData', passInData)
  // console.log('e.target.innerText:', e.target.innerText)
  // console.log(`dateForm.value`, dateForm.value)
  // console.log(`dateForm.value.slice(-2).replace('/',''):`, dateForm.value.slice(-2).replace('/',''))
  // console.log('dateForm.value.slice(-2)', dateForm.value.slice(-2))
  if (passInData == '預約時段' || e.target.innerText == dateForm.value.slice(-2).replace('/', '')) {
    chooseTimeDialog.value = true
  } else {
    dataDialog.value = true
  }
}

// ● 已預約的訂單資訊陣列
const orderInfoData = reactive({})

// 已預約的訂單資訊彈窗效果預設關閉
const dialogOrderInfo = ref(false)

// 送出預約表單成功後，彈出已預約的訂單資訊
const openDialogOrderInfo = () => {
  dialogOrderInfo.value = true
}

// ● 關閉彈窗
const dialogClose = () => {
  dataDialog.value = false
  chooseTimeDialog.value = false
  dialogOrderInfo.value = false
}

// 個別關閉彈窗
// const dialogClose = (e) => {
//   console.log('DC-e', e)
//   const dataDialogParent = e.target.closest('.data-dialog')
//   const chooseTimeDialogParent = e.target.closest('.choose-time-dialog')

//   if (dataDialogParent) {
//     dataDialog.value = false
//   } else if (chooseTimeDialogParent) {
//     chooseTimeDialog.value = false
//   } else {
//     dialogOrderInfo.value = false
//   }
// }

// ● 用滑鼠滑入、滑出，觸發改變圖示。
// * 滑鼠事件：
// mouseenter：當滑鼠進入元素時觸發（不冒泡，滑鼠在父元素也不會觸發事件）。
// mouseleave：當滑鼠離開元素時觸發（不冒泡）。
// mouseover：當滑鼠移動到元素上方時觸發（冒泡，滑鼠在父元素也會觸發事件）。
// mouseout：當滑鼠移動離開元素上方時觸發（冒泡）
const mouseToggle = ref(false)

const mouseoverHandle = () => {
  mouseToggle.value = !mouseToggle.value
}

const clickmouseToggleOff = () => {
  mouseToggle.value = false
}


// ● 動態選取預約時段
const selectedTime = ref([])

const bookingTimeText = computed(() => {
  const val = selectedTime.value

  if (val.length > 1) {
    // 加入換行符號
    return val.join('\n')
  } else {
    return selectedTime.value
  }
})

// ● 預約總時數計算
const totalBTime = computed(() => {
  return `${selectedTime.value.length * 2} 小時`;
})

// ● 計算總金額
const Total = computed(() => {
  return `${Dinfo.value.price * selectedTime.value.length} 元`;
})


// 手動清除的表格欄位
function manualResetForm() {
  date.value = null
  selectedTime.value = []
}

// 定義預約表格
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
    .required('預約時段必填'),
  totalBookingTime: yup
    .number()
    .required('預約總時數必填')
    .typeError('預約總時數格式錯誤')
    .min(0, '預約總時數不能小於 0'),
  totalPrice: yup
    .number()
    .required('預約總金額必填')
    .typeError('預約總金額格式錯誤')
    .min(0, '預約總金額不能小於 0'),
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
    totalBookingTime: 0,
    totalPrice: 0,
    accountName: '',
    orderStatus: true,
  }
})

const name = useField('name')
const phone = useField('phone')
const image = useField('image')
const dogName = useField('dogName')
const bookingDate = useField('bookingDate')
const bookingTime = useField('bookingTime')
const totalBookingTime = useField('totalBookingTime')
const totalPrice = useField('totalPrice')
const accountName = useField('accountName')
const orderStatus = useField('orderStatus')




// 監聽綁定使用者和狗狗名字
watch(dateForm, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return accountName.value.value = userName.value,
      dogName.value.value = Dinfo.value.dogName,
      image.value.value = Dinfo.value.image
  }
})


// 監聽綁定預約時間
// 監聽選取的日期，當選取的日期不同時，取消原選擇的預約時段，並同時傳遞更新的預約日期給裏表格(要送至後端的表格資訊)
// 外表格的綁定不是用 v-model，而是借由此函式監聽觸發更改日期並回傳值給裏表格
watch(dateForm, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return selectedTime.value = [],
      bookingDate.value.value = dateForm.value
  }
})


// 監聽綁定預約時段
watch(selectedTime, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return bookingTime.value.value = selectedTime.value.sort((a, b) => parseInt(a) - parseInt(b))
  }
})

// 監聽綁定總計時數
watch(totalBTime, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return totalBookingTime.value.value = totalBTime.value
  }
})

// 監聽綁定總計金額
watch(Total, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return totalPrice.value.value = Total.value
  }
})


// ★ FormData 直接傳至後端處理會失敗，需再經過 multer 的套件解析 form-data，才能傳入後端
const submit = handleSubmit(async (values) => {
  try {
    // ★ 按下送出表單按鈕時，先判斷是否為登入狀態
    // 非登入狀態，跳出需登入的提示，關閉提示後，自動轉跳至登入頁面
    if (!User.isLogin) {
      console.log('User.isLogin', User.isLogin)
      createSnackbar({
        text: '請先登入會員',
        snackbarProps: {
          color: 'red'
        }
      })
      router.push('/login')
      return
    }

    // console.log('有觸發')

    // 建立符合後端可接收格式的表格
    const fd = new FormData()

    // 要將東西放進去的語法 fd.append(key, value)
    fd.append('name', values.name)
    fd.append('phone', values.phone)
    fd.append('image', values.image)
    fd.append('dogName', values.dogName)
    fd.append('bookingDate', values.bookingDate)
    fd.append('bookingTime', values.bookingTime)
    fd.append('totalBookingTime', values.totalBookingTime)
    fd.append('totalPrice', values.totalPrice)
    fd.append('accountName', values.accountName)
    fd.append('orderStatus', values.orderStatus)

    const result = await BookingOrderStore.createBookingOrder(fd)
    // console.log('result.data.result', result.data.result)

    // 因為要包2個東西，所以用 {} 一起包住，視為一個物件
    const resOrderInfor = {
      infor: [{ title: '訂單編號', value: result.data.result.bookingOrderNumber },
      { title: '預約人', value: result.data.result.accountName },
      { title: '電話', value: result.data.result.phone },
      { title: '預約狗狗', value: result.data.result.dogName },
      { title: '預約日期', value: result.data.result.bookingDate },
      // { title:'預約時段', value: result.data.result.bookingTime },
      { title: '預約總金額', value: result.data.result.totalPrice + ' 元' }],
      img: result.data.result.image
    }

    // Object.assign(A, B) 把 B 合併進 A 物件
    // 因是物件合併物件，就不會要取 infor 陣列的值時，需要這樣寫 orderInfoData[0]infor
    // 後端回傳的資訊放進預設的空陣列
    Object.assign(orderInfoData, resOrderInfor)

    // 成功預約後，跳出已預約訂單資訊
    openDialogOrderInfo()

    createSnackbar({
      text: result.text,
      snackbarProps: {
        color: 'green'
      }
    })

    resetForm()
    // 因不是綁在表格上，故 resetForm() 僅對有手動輸入表格的資料有效；其他欄位需另外手動設定重置
    // 清空選擇的日期、時段、總金額欄位
    manualResetForm()

  } catch (error) {
    console.log('error', error)
    console.log('error?.response?.data?.message', error?.response?.data?.message)


    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})


// 在表單的"預約人姓名"欄位，動態計算添加自定義 class(.myClass)
// v-model="name.value.value" 已宣告
const addClass = computed(() => {
  return { 'myClass': name.value.value.length > 0 } // 回傳的是 boolean 值
})
// console.log(addClass)




// ● onMounted(()=>{}) 用來執行在組件首次渲染（DOM 元素掛載）完成後的操作。
// 無論你將 onMounted 放在 <script setup> 的哪個位置，都會在組件掛載完成後自動執行。
// * 使用時機：
// 初始化數據：從 API 或服務器請求數據。
// 設置事件監聽器：比如監聽瀏覽器事件、窗口大小改變等。
// 操作 DOM：比如設置焦點、滾動事件、第三方庫初始化等。
onMounted(async () => {
  await nextTick();

  requestAnimationFrame(() => {
    updateChooseDateTitle()
  })
})

</script>
