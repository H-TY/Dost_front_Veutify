<template>
  <div class="userZone-home">
    <div class="userZone-page-title">
      <h2>帳戶總覽</h2>
    </div>

    <div class="member-info">
      <div class="subtitle-box">
        <v-icon icon="mdi mdi-account"></v-icon>
        <h6>會員基本資料</h6>
      </div>

      <v-form class="box" @submit.prevent="submit" :disabled="isSubmitting">
        <v-text-field type="nickname" label="暱稱" minlength="4" maxlength="20" counter v-model="nickname.value.value" :error-messages="nickname.errorMessage.value"></v-text-field>
        <v-text-field type="birthday" label="生日" placeholder="YYYY-MM-DD" persistent-placeholder v-model="birthday.value.value" :error-messages="birthday.errorMessage.value"></v-text-field>
        <v-text-field type="phone" label="電話" maxlength="10" counter placeholder="09XX-XXX-XXX" persistent-placeholder v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>
        <v-text-field type="email" label="信箱" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>

        <!-- 送出按鈕 -->
        <v-btn class="submit-btn" type="submit" :loading="isSubmitting">確認修改</v-btn>
      </v-form>
    </div>

    <div class="other-info">
      <template v-for="(el, index) in otherInfos" :key="index">
        <customCard :class="el.text.狀態 ? '' : 'cancel-status'" :to="el.to" :title="el.title" :icon="el.icon" :ishave="el.ishave" :text="el.text"></customCard>
      </template>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { definePage } from 'vue-router/auto'
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useApi } from '@/composables/axios'
import customCard from '@/components/Card.vue'
import { accountFields } from '@/plugins/data_json'
import { useSnackbar } from 'vuetify-use-dialog'




definePage({
  meta: {
    title: 'Dost | 會員專區',
    login: true,
    admin: false
  }
})


const { apiAuth } = useApi()
const user = useUserStore()
const userName = ref(user.account)
const userID = ref(user.id)
const isLogin = ref(user.isLogin)
const createSnackbar = useSnackbar()




// ● 要迴圈生成的物件
const otherInfos = computed(() => {
  return [
    { to: '/userZone/dogBookingSearch', title: '最新訂單', ishave: haveOrderData.value.ishave, text: haveOrderData.value.data, icon: 'mdi mdi-shopping' },
    { to: '/userZone/adaptiveTestResult', title: '適性測驗結果', ishave: haveTestData.value.ishave, text: haveTestData.value.data, icon: 'mdi mdi-atom-variant' }
  ]
})



// ● 最新訂單資訊
const lastOrder = ref({
  "訂單編號": '',
  "狀態": '',
  "預約狗狗": '',
  "狗狗圖片": '',
  "預約日期": '',
  "預約時段": [],
  "總金額": ''
})


// ● 測試結果
const lastTestResult = ref({
  "狀態": '',
  "測試日期": '',
  "測試結果": ''
})


// ● 若 '訂單' 沒有資料，則回傳 '暫無資料'
// ishave 為傳入子元件（customCard）的參數，用來判斷要顯示哪種樣式的 UI 內容
const haveOrderData = computed(() => {
  // console.log('lastOrder.value', lastOrder.value)
  // console.log('lastOrder.value.訂單編號', lastOrder.value.訂單編號)
  if (lastOrder.value.訂單編號 !== "") {
    return {
      ishave: true,
      data: lastOrder.value
    }
  } return {
    ishave: false,
    data: '暫無資料'
  }
})
// watch(haveOrderData, (val) => {
//   console.log('haveOrderData 更新:', val)
// })

// ● 若 '測試' 沒有資料，則回傳 '暫無資料'
const haveTestData = computed(() => {
  if (lastTestResult.value.測試日期 !== "") {
    return {
      ishave: true,
      data: lastTestResult.value
    }
  }
  return {
    ishave: false,
    data: '暫無資料'
  }
})



// ● 向後端請求 "最新訂單資料"
const postData = async () => {
  if (!isLogin.value) return

  try {
    const { data } = await apiAuth.get("/order", {
      params: {
        // 傳至後端的搜尋關鍵字"帳戶名稱"，用來只找出相對應用戶的訂單
        search: userName.value
      }
    })
    // console.log('data', data)

    const allOrder = data.result.data
    // console.log('allOrder', allOrder)

    // ▲ 當後端回傳無訂單資料 []
    if (!allOrder.length) {
      // console.log('沒有訂單資料')
      return
    }

    // 使用 .reduce 找最大值（根據 bookingOrderNumber 抓取最新訂單）
    const order = allOrder.reduce((max, current) => {
      return current.bookingOrderNumber > max.bookingOrderNumber ? current : max
    })
    // console.log('order', order)

    // 將資料放到 lastOrder
    lastOrder.value.訂單編號 = order.bookingOrderNumber
    lastOrder.value.狀態 = order.orderStatus
    lastOrder.value.預約狗狗 = order.dogName
    lastOrder.value.狗狗圖片 = order.image
    lastOrder.value.預約日期 = order.bookingDate
    lastOrder.value.預約時段 = order.bookingTime
    lastOrder.value.總金額 = order.totalPrice + ' 元'
    // console.log('lastOrder', lastOrder.value)

  } catch (error) {
    console.log(error)
  }
}
postData()



// ● 用 yup.object({}) 定義表格資料格式（建立成物件陣列）
const formSchema = yup.object({
  nickname: accountFields.nickname,
  birthday: accountFields.birthday,
  phone: accountFields.phone,
  email: accountFields.email,
})


const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
  // validateOnInput: true, // 即時驗證，使用者輸入資料的當下，同時驗證欄位
  validateOnBlur: true, // 使用者輸入完資料，離開欄位時，才驗證欄位資料
  initialValues: {
    nickname: user.nickname,
    birthday: user.birthday,
    phone: user.phone,
    email: user.email,
  }
})


// 註冊表格欄位，並與 UI 的表格綁定
const nickname = useField('nickname')
const birthday = useField('birthday')
const phone = useField('phone')
const email = useField('email')
// console.log('nickname', nickname)


const submit = handleSubmit(async (formData) => {

  // 先判斷是否為登入狀態
  if (!isLogin.value) {
    console.log(`目前登入狀態為 ${isLogin.value}`)

    createSnackbar({
      text: '請先登入會員',
      snackbarProps: {
        color: 'red'
      }
    })

    router.push("/login")
    return
  }


  try {

    const fd = new FormData()

    fd.append('nickname', formData.nickname)
    fd.append('birthday', formData.birthday)
    fd.append('phone', formData.phone)
    fd.append('email', formData.email)


    const { data } = await apiAuth.patch('/:id', fd, {
      params: {
        id: userID
      }
    })
    // console.log('回傳 data', data)

    createSnackbar({
      text: data.message,
      snackbarProps: {
        color: 'green'
      }
    })



  } catch (error) {
    console.log('error', error)

    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }

})

</script>

<route lang="yaml">
  meta:
    layout: userZone
</route>