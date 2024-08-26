<template>
  <v-container class="text-center my-8">
    <h1>預約狗狗時間</h1>
    <!-- ● 狗狗簡述資訊卡片 -->
    <swiper :slidesPerView="'auto'" :centeredSlides="true" :spaceBetween="30" :pagination="{
      clickable: true,
    }" :navigation="true" :modules="modules" ref="mySwiperRef" class="mySwiper my-10">
      <swiper-slide v-for="item in items" :key="item._id">
        <v-sheet style="width: 100%;">
          <DogsCard v-bind="item"></DogsCard>
        </v-sheet>
      </swiper-slide>
    </swiper>

    <v-row class="my-7">
      <!-- ● 日期選擇 -->
      <v-col class="d-flex flex-wrap justify-center" cols="12" sm="6">
        <v-date-picker width="400" color="primary" v-model="date" show-adjacent-months @click="dialogOpen"></v-date-picker>
        <!-- 點擊日期，跳出視窗選擇預約時段 -->
        <v-dialog v-model="dialog" width="auto">
          <v-form>
            <v-sheet class="bg-white d-flex flex-column text-center justify-self-center pa-7" width="350">
              <h3>可預約時段</h3>
              <v-divider class=" my-4"></v-divider>
              <v-checkbox class="d-flex justify-center" v-model="selectedTime" v-for="el in Dinfo.bookingTime.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" :label="el" :value="el" false-icon="mdi-paw-outline" true-icon="mdi-paw"></v-checkbox>
              <!-- <v-btn class="mt-6 w-25 align-self-center" @click="dialogClose">X</v-btn> -->
            </v-sheet>
          </v-form>
        </v-dialog>
      </v-col>
      <v-col class="d-flex justify-center">
        <!-- ● 預約表單 -->
        <v-form class="w-90" cols="12" sm="6" @submit.prevent="submit" :disabled="isSubmitting">
          <v-text-field label="預約人姓名" :class="addClass" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>
          <v-text-field label="預約人電話" :class="addClass" v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>
          <v-text-field readonly>預約狗狗：
            <v-sheet class="text-h6 font-weight-bold bg-transparent">{{ Dinfo.dogName }}</v-sheet></v-text-field>
          <v-text-field readonly>預約日期：
            <v-sheet class="text-h6 font-weight-bold bg-transparent">{{ dateForm }}</v-sheet>
          </v-text-field>
          <v-text-field readonly>預約時間：
            <v-list class="my-0 pa-0 bg-transparent" :items="selectedTime.sort((a, b) => parseInt(a) - parseInt(b))"></v-list>
          </v-text-field>
          <v-text-field readonly>總計金額：
            <v-sheet class="text-h5 font-weight-bold bg-transparent">{{ Total }}</v-sheet>&nbsp元
          </v-text-field>
          <v-btn class="w-40 mt-5" type="submit" color="green" :loading="isSubmitting">送出預約</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import DogsCard from '@/components/dogsCard.vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

// ● 引進 Swiper 套件以及相關檔案
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import '@/styles/style.css'
// import required modules
import { Pagination, Navigation } from 'swiper/modules'


const route = useRoute()
const router = useRouter()
const { backApi, apiAuth } = useApi()
const User = useUserStore()
const createSnackbar = useSnackbar()
const modules = [Pagination, Navigation]


definePage({
  meta: {
    title: 'Dost | 預約時間',
    login: true,
    admin: false
  }
})

// ● 備註待處理
// 1. Swiper 自動滑到相應的狗狗
// 2. 彈窗觸發判斷要再重寫，目前只要是日曆的範圍都會觸發到（包含非日期的部分）


// 取帳戶名稱
const userName = computed(() => {
  if (!User.isLogin) {
    router.push('/login')
    return
  }
  return User.account
})


// 綁定時間，讓日期和表格時間一致
// 綁定日期
const date = ref(new Date(''))

// 取出日期並將日期當地化
const dateForm = computed(() => {
  return isNaN(date.value.getTime()) ? '左側選擇日期' : date.value.toLocaleDateString()
})


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

// ● 回傳指定 id 的狗狗訊息
const loadDinfo = async () => {
  try {
    // 路徑解析查询参数中的 id
    const Rid = route.query.id

    if (route.query.id === undefined) return

    // 利用 id 只回傳某一隻狗狗的資料
    const { data } = await backApi.get('/dogs/' + Rid)

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
const dialogOpen = () => {
  dialog.value = true
}

// 關閉彈窗（未綁動作）
const dialogClose = () => {
  dialog.value = false
}


// ● 動態選取預約時段
const selectedTime = ref([])

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
  totalPrice: yup
    .number()
    .required('預約總金額必填')
    .typeError('預約總金額格式錯誤')
    .min(0, '預約總金額不能小於 0'),
  accountName: yup
    .string()
    .required('帳戶名稱必填'),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: bookingFormSchema,
  // initialValues 設定表單各欄位的初始值
  initialValues: {
    name: userName.value,
    phone: '',
    dogName: '',
    bookingDate: '',
    bookingTime: [],
    totalPrice: 0,
    accountName: '',
  }
})

const name = useField('name')
const phone = useField('phone')
const dogName = useField('dogName')
const bookingDate = useField('bookingDate')
const bookingTime = useField('bookingTime')
const totalPrice = useField('totalPrice')
const accountName = useField('accountName')




// 監聽綁定使用者和狗狗名字
watch(dateForm, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return accountName.value.value = userName.value,
      dogName.value.value = Dinfo.value.dogName
  }
})

// 監聽綁定預約時間
// 監聽選取的日期，當選取的日期不同時，取消原選擇的預約時段，並同時傳遞更新的預約日期給裏表格(要送至後端的表格資訊)
// 外表格的綁定不是用 v-model，而是借由此函式監聽觸發更改日期並回傳值給裏表格
watch(dateForm, (newValue, oldValue) => {
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

// 監聽綁定總計金額
watch(Total, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    return totalPrice.value.value = Total.value
  }
})


// ★ FormData 直接傳至後端處理會失敗，需再經過 multer 的套件解析 form-data，才能傳入後端
const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    // 要將東西放進去的語法 fd.append(key, value)
    fd.append('name', values.name)
    fd.append('phone', values.phone)
    fd.append('dogName', values.dogName)
    fd.append('bookingDate', values.bookingDate)
    fd.append('bookingTime', values.bookingTime)
    fd.append('totalPrice', values.totalPrice)
    fd.append('accountName', values.accountName)


    await apiAuth.post('/order', fd)

    createSnackbar({
      text: '預約成功',
      snackbarProps: {
        color: 'green'
      }
    })

    resetForm()
    // 因不是綁在表格上，故 resetForm() 僅對有手動輸入表格的資料有效；其他欄位需另外手動設定重置
    dateForm.value = NaN
    selectedTime.value = []
    Total.value = 0

  } catch (error) {
    console.log(error)
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
console.log(addClass)

// watch 監聽響應式（ref、reactive、computed）的變化
// watch(dateForm, (newValue, oldValue) => {
//   console.log('newValue', typeof newValue, newValue, 'oldValue', oldValue)
// }, { deep: true })

// watch(dialog, (newValue, oldValue) => {
//   console.log('newValue', newValue, 'oldValue', oldValue)
// }, { deep: true })

// watch(selectedTime,(newValue, oldValue)=>{
//   console.log('newValue', newValue, 'oldValue', oldValue)
// }, { deep: true })

</script>

<style scoped>
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