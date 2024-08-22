<template>
  <v-container class="text-center">
    <h1>預約狗狗時間</h1>
    <!-- ● 狗狗簡述資訊卡片 -->
    <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    ref="mySwiperRef"
    class="mySwiper my-10"
    >
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
        <!-- 複數狗狗時段可預約時，跳出視窗給選擇 -->
        <v-dialog v-model="dialog" width="auto">
          <v-sheet class="bg-white d-flex flex-column text-center justify-self-center pa-7" width="350">
            <h3>可預約時段</h3>
            <v-divider class=" my-4"></v-divider>
            <v-checkbox 
              class="d-flex justify-center" 
              v-model="selectedTime" 
              v-for="el in Dinfo.bookingTime.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" 
              :label="el" 
              :value="el"
              false-icon="mdi-paw-outline"
              true-icon="mdi-paw"></v-checkbox>
          </v-sheet>
        </v-dialog>
      </v-col>
      <v-col class="d-flex justify-center">
        <!-- ● 預約表單 -->
        <v-form class="w-75" cols="12" sm="6">
          <v-text-field type="name" label="預約人姓名"></v-text-field>
          <v-text-field type="phone" label="預約人電話"></v-text-field>
          <v-text-field type="text" readonly>預約狗狗：<div class="text-h6 font-weight-bold">{{ Dinfo.dogName }}</div></v-text-field>
          <v-text-field type="text" readonly>預約日期：<div class="text-h6 font-weight-bold">{{ dateForm }}</div></v-text-field>
          <v-text-field type="text" readonly>預約時間：
            <v-list class="my-0" :items="selectedTime.sort((a, b) => parseInt(a) - parseInt(b))" bg-color="transparent"></v-list>
          </v-text-field>
          <v-text-field type="text" readonly>總計金額：<div class="text-h5 font-weight-bold">{{ Total }}</div>&nbsp元</v-text-field>
          <v-btn class="w-40 mt-5" type="submit" color="green">送出預約</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter} from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import DogsCard from '@/components/dogsCard.vue'

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
import { number, object } from 'yup'

const route = useRoute()
const router = useRouter()
const { backApi,apiAuth } = useApi()
const createSnackbar = useSnackbar()
const modules = [Pagination, Navigation]



definePage({
  meta: {
    title: 'Dost | 預約時間',
    login: true,
    admin: false
  }
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

// const mySwiperRef = ref(null);
// onMounted(() => {
//   const targetIndex = 2; // Set the index of the slide you want to automatically go to
//   if (mySwiperRef.value && mySwiperRef.value.swiper) {
//     mySwiperRef.value.swiper.slideTo(targetIndex); // Automatically slide to the specified index



    
//   }
// })



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

    if(route.query.id === undefined ) return

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

// 若日期的值不是 NaN，觸發彈窗事件
const dialogOpen = computed(()=>{
  if(!isNaN(date.value.getTime())){
    return dialog.value = true }
  })
  
  
  // ● 動態選取預約時段
  const selectedTime = ref([])


  // ● 計算總金額
  const Total = computed(()=>{
    return Dinfo.value.price * selectedTime.value.length
  })


// watch 監聽響應式（ref、reactive、computed）的變化
watch(dateForm, (newValue, oldValue) => {
  console.log('newValue',typeof newValue, 'oldValue',oldValue)
},{deep: true})

watch(Dinfo.value.price, (newValue, oldValue) => {
  console.log('newValue',newValue, 'oldValue',oldValue)
},{deep: true})

</script>

<style scoped>

</style>