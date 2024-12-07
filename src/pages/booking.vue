<template>
  <v-container class="text-center mt-8">
    <h1>預約狗狗時間</h1>
    <!-- ● 狗狗簡述資訊卡片 -->
    <swiper :slidesPerView="'auto'" :centeredSlides="true" :spaceBetween="30" :pagination="{
      clickable: true,
    }" :navigation="true" :hashNavigation="{
      replaceState: true,
      watchState: true
    }" :modules="modules" @slideChangeTransitionEnd="onHashChange" class="mySwiper my-10">
      <swiper-slide v-for="item in items" :data-hash="`/booking#${item._id}`">
        <v-sheet style="width: 100%;">
          <DogsCard v-bind="item"></DogsCard>
        </v-sheet>
      </swiper-slide>
    </swiper>

    <v-row class="my-7">
      <!-- ● 日期選擇 -->
      <v-col class="d-flex flex-wrap justify-center" cols="12" sm="6">
        <v-date-picker width="400" color="primary" v-model="date" show-adjacent-months :allowed-dates="allowedSelectDate" @click="dialogOpen($event)">
        </v-date-picker>
        <!-- 點擊日期，跳出視窗選擇預約時段 -->
        <v-dialog v-model="dialog">
          <v-form>
            <v-sheet class="bg-white d-flex flex-column text-center justify-self-center align-self-center pa-7" width="350" height="240">
              <h3>可預約時段</h3>
              <v-divider class=" my-4"></v-divider>
              <v-checkbox class="d-flex justify-center" v-model="selectedTime" v-for="el in Dinfo.bookingTime.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" :label="el" :value="el" false-icon="mdi-paw-outline" true-icon="mdi-paw"></v-checkbox>
              <v-sheet class="dialogClosePosition rounded-circle bg-transparent d-flex">
                <v-btn class="rounded-circle d-flex pa-0 bg-white opacity-100" min-width="60" min-height="60" variant="plain" @click="dialogClose" flat>
                  <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" size="48" color="red-darken-4" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
                </v-btn>
              </v-sheet>
            </v-sheet>
          </v-form>
        </v-dialog>
        <v-sheet class="bg-transparent d-flex align-center" :class="mobile ? 'mt-5' : ''"><v-icon icon="mdi-message-alert" class="me-1" color="orange-darken-2"></v-icon>當天日期無法預約，若有需求，請來電洽詢，謝謝！</v-sheet>
      </v-col>
      <!-- ● 預約表單 -->
      <v-col class="d-flex justify-center" :class="mobile ? 'my-4' : ''">
        <v-form class="w-90" cols="12" sm="6" @submit.prevent="submit" :disabled="isSubmitting">
          <v-text-field label="預約人姓名" :class="addClass" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>
          <v-text-field label="預約人電話" :class="addClass" v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>
          <v-row>
            <v-col cols=4 class="pa-0 ps-3">
              <v-sheet class="bg-transparent my-2" elevation="2" rounded>
                <v-img :src="dogImg" height="70" cover></v-img>
              </v-sheet>
            </v-col>
            <v-col>
              <v-text-field readonly>預約狗狗：
                <v-sheet class="text-h6 font-weight-bold bg-transparent">{{ Dinfo.dogName }}</v-sheet></v-text-field>
            </v-col>
          </v-row>
          <v-text-field readonly>預約日期：
            <v-sheet class="text-h6 font-weight-bold bg-transparent">{{ dateForm }}</v-sheet>
          </v-text-field>
          <v-text-field readonly>預約時段：
            <v-list class="my-0 pa-0 bg-transparent" :items="selectedTime.sort((a, b) => parseInt(a) - parseInt(b))"></v-list>
          </v-text-field>
          <v-text-field readonly>預約總時數：
            <v-sheet class="text-h5 font-weight-bold bg-transparent">{{ totalBTime }}</v-sheet>&nbsp小時
          </v-text-field>
          <v-text-field readonly>總計金額：
            <v-sheet class="text-h5 font-weight-bold bg-transparent">{{ Total }}</v-sheet>&nbsp元
          </v-text-field>
          <v-btn class="w-40 mt-5" type="submit" color="green" :loading="isSubmitting">送出預約</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <!-- ● 送出訂單成功後，彈出已下單的資訊 -->
    <v-dialog v-model="dialogOrderInfo">
      <OrderInfoCard :bigTitle="'已預約資訊'" :orderInfoData="orderInfoData.infor" :orderInfoDataImg="orderInfoData.img" :dialogClose="dialogClose" :submit="submit" :isSubmitting="isSubmitting"></OrderInfoCard>
    </v-dialog>
  </v-container>
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

// ● 引進 Swiper 套件以及相關檔案
// Swiper_Centered auto
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Pagination, Navigation, History, HashNavigation } from 'swiper/modules'


const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const { backApi, apiAuth } = useApi()
const User = useUserStore()
const BookingOrderStore = useBookingOrderStore()
// console.log('BookingOrderStore', BookingOrderStore)
const createSnackbar = useSnackbar()
const modules = [Pagination, Navigation, HashNavigation, History]


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

// 取出日期並將日期當地化
const dateForm = computed(() => {
  if (date.value === null || isNaN(date.value.getTime())) {
    return '左側選擇日期'
  } else {
    return date.value.toLocaleDateString()
  }
})

// 限制允許選取的時間為當天以後的日期（不含當天）
const allowedSelectDate = (date) => {
  return date > nowDate.value
}


// ● 將全部狗狗資訊匯入上方的 Swiper 元件
const items = ref([])
const loadItems = async () => {
  try {
    const { data } = await backApi.get('/dogs')
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


// ● 動態指定 id 的狗狗訊息
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


// 路徑解析查询参数中的 id
// console.log(route.query.id)

// 定義網址上的 hash 變數
const urlHash = ref(null)

// 監聽 hash 的變化
// 如果有變化，清空選擇的日期和時段
watch(urlHash, (newId, oldId) => {
  // console.log('哈希newId:', newId, '哈希oldId:', oldId)
  if (newId !== oldId) {
    return selectedTime.value = [],
      date.value = null,
      image.value.value = Dinfo.value.image
  }
})

// 更新成當前頁面的 hash 值
const reHash = () => {
  if (route.query.id) {
    // 讀取從"帥氣狗狗"頁面點擊過來的 id
    urlHash.value = route.query.id
    // 滑動至指定的 hash 圖片
    window.location.hash = `booking#${route.query.id}`
    // 將原本的 route.query.id 賦值空字串，避免影響後續的 Swiper 滑動圖片時 hash 值的更新
    route.query.id = ''
  } else {
    urlHash.value = window.location.hash.substring(10)
  }
}

// 事件 @slideChangeTransitionEnd 當滑動動畫結束時觸發函式 onHashChange
const onHashChange = () => {
  reHash()
  loadDinfo()
}


// onMounted(()=>{}) 用來執行在組件首次渲染（DOM 元素掛載）完成後的操作。
// 無論你將 onMounted 放在 <script setup> 的哪個位置，都會在組件掛載完成後自動執行。
// ● 使用時機：
// 初始化數據：從 API 或服務器請求數據。
// 設置事件監聽器：比如監聽瀏覽器事件、窗口大小改變等。
// 操作 DOM：比如設置焦點、滾動事件、第三方庫初始化等。
onMounted(() => {
  // 因在進入頁面時會自動跳轉至當前 Swiper 圖片的 hash 值，同時網址也會添加上 hash 值
  // 但初次渲染時無 hash 值，故會是預設值 null
  // 為了正確抓到跳轉後網址的 hash 值，延遲 500 毫秒觸發函式抓取 hash 值
  setTimeout(() => {
    reHash()
    loadDinfo()
  }, 500)
})



// ● 回傳指定 id 的狗狗訊息
const loadDinfo = async () => {
  if (urlHash.value === null) return

  try {

    await nextTick()

    // 利用 id 只回傳某一隻狗狗的資料
    const { data } = await backApi.get('/dogs/' + urlHash.value)

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
loadDinfo()



// 彈窗效果
const dialog = ref(false) // 預設不跳出

// 選取日期觸發觸發彈窗事件
// 綁定事件 @click="dialogOpen($event)" 藉由 $event 原生事件物件做判斷，當點取的日期數字相同時觸發彈窗事件
// .slice(-2) 擷取文字，-2 表示從後面開始接取 2 位
const dialogOpen = ($event) => {
  // console.log('$event', $event)
  // console.log('$event.target.innerText:', $event.target.innerText)
  // console.log(`dateForm.value.slice(-2).replace('/',''):`, dateForm.value.slice(-2).replace('/',''))
  // console.log('dateForm.value.slice(-2)', dateForm.value.slice(-2))
  if ($event.target.innerText == dateForm.value.slice(-2).replace('/', '')) {
    dialog.value = true
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

// 關閉彈窗
const dialogClose = () => {
  dialog.value = false
  dialogOrderInfo.value = false
}

// ● 用來觸發滑鼠滑入、滑出的圖示。
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

// ● 預約總時數計算
const totalBTime = computed(() => {
  return selectedTime.value.length * 2;
})

// ● 計算總金額
const Total = computed(() => {
  return Dinfo.value.price * selectedTime.value.length
})

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
    date.value = null
    selectedTime.value = []

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

// watch 監聽響應式（ref、reactive、computed）的變化
// watch(dateForm, (newValue, oldValue) => {
//   console.log('newValue', typeof newValue, newValue, 'oldValue', oldValue)
// }, { deep: true })

</script>



<style scoped>
/* 狗狗簡述資訊卡片 Swiper_Centered auto 的樣式 */
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide {
  width: 50%;
}

::v-deep .swiper-pagination {
  position: initial;
  margin-top: 30px;
}

/* 將上下頁滑動按鈕面積加大 */
::v-deep .swiper-button-prev {
  width: calc(var(--swiper-navigation-size) / 44* 100);
  height: inherit;
  top: 0;
  left: 0;
}

::v-deep .swiper-button-next {
  width: calc(var(--swiper-navigation-size) / 44* 100);
  height: inherit;
  top: 0;
  right: 0;
}

/* --- 分隔線 --- */
/* 在彈窗選擇時段物件添加關閉安鈕的 class 設定 */
.dialogClosePosition {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}


/* --- 分隔線 --- */
/* 在預約表格上添加自定義的 class */
.myClass {
  color: #424242;
}

/* 
  1. 因為想選擇的 class（.v-field__input） 其他的欄位也有，但只需要修改指定的欄位
  2. 故先添加自定義的 myClass 到指定的物件標籤裡，方便後續指定某一個標籤修改樣式
  3. 在指定選擇 .myClass .v-field__input 做樣式的修改，如下所示
*/
::v-deep .myClass .v-field__input {
  font-size: 1.2rem;
  font-weight: 600;
}

::v-deep .v-list-item-title {
  font-size: 1.2rem;
  font-weight: 600;
}

::v-deep .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
  padding: 0;
}
</style>