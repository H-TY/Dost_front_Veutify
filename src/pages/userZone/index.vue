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
        <v-text-field type="birthday" label="生日" placeholder="YYYY-MM-DD" v-model="birthday.value.value" :error-messages="birthday.errorMessage.value"></v-text-field>
        <v-text-field type="phone" label="電話" v-model="phone.value.value" :error-messages="phone.errorMessage.value"></v-text-field>
        <v-text-field type="email" label="信箱" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>

        <div class="btn-box">
          <!-- 取消按鈕 -->
          <v-btn class="cancle-btn" type="button" :disabled="inputChange" @click="resetForm">放棄修改</v-btn>

          <!-- 送出按鈕 -->
          <v-btn class="submit-btn" type="submit" :disabled="inputChange" :loading="isSubmitting">確認修改</v-btn>
        </div>
      </v-form>
    </div>

    <div class="other-info">
      <template v-for="(el, index) in otherInfos" :key="index">
        <!-- <customCard :class="el.text.狀態 ? '' : 'cancel-status'" :to="el.to" :title="el.title" :icon="el.icon" :ishave="el.ishave" :text="el.text"></customCard> -->
        <customCard :to="el.to" :title="el.title" :icon="el.icon" :ishave="el.ishave" :content="el.content"></customCard>
      </template>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { definePage } from 'vue-router/auto'
import { ref, computed, watch, onMounted } from 'vue'
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
const isLogin = ref(user.isLogin)
const createSnackbar = useSnackbar()




// ● 要迴圈生成的物件
const otherInfos = computed(() => {
  return [
    { to: '/userZone/dogBookingSearch', title: '最新訂單', ishave: haveOrderData.value.ishave, content: haveOrderData.value.data, icon: 'mdi mdi-shopping' },
    { to: '/userZone/adaptiveTestResult', title: '適性測驗結果', ishave: haveTestData.value.ishave, content: haveTestData.value.data, icon: 'mdi mdi-atom-variant' }
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

    // 判斷最新訂單的狀態，若為 true，則再判斷 "預約日期" 使否小於今天日期，若小於今天日期，則將狀態改為 completed
    const today = new Date().setHours(0, 0, 0, 0)
    const bookingD = new Date(order.bookingDate).setHours(0, 0, 0, 0)
    const isCompleted = computed(() => {
      if (order.orderStatus && bookingD < today) {
        return 'completed'
      } else {
        return order.orderStatus
      }
    })


    // 將資料放到 lastOrder
    lastOrder.value.訂單編號 = order.bookingOrderNumber
    lastOrder.value.狀態 = isCompleted.value
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


// ● 使用 useForm() 建立表格驗證和設定預設值，並傳入 yup 定義的驗證規則（validationSchema: formSchema）
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: formSchema,
  // validateOnInput: true, // 即時驗證，使用者輸入資料的當下，同時驗證欄位
  validateOnBlur: true, // 使用者輸入完資料，離開欄位時，才驗證欄位資料
  initialValues: {
    // 若在後端資料的值 null，而在 UI 層（例：v-text-field）處理的資料通常為 string 字串，所以會發生錯誤
    // 所以在前端要將 null 將換為字串，Nullish Coalescing（空值合併運算子）是 JavaScript 裡的 ??，用來在「值是 null 或 undefined 時，提供預設值」。
    nickname: user.nickname ?? "",
    birthday: user.birthday ?? "",
    phone: user.phone ?? "",
    email: user.email ?? "",
  }
})


// ● 註冊表格欄位，並與 UI 的表格綁定
const nickname = useField('nickname')
const birthday = useField('birthday')
const phone = useField('phone')
const email = useField('email')
// console.log('nickname', nickname)



// ● 當表格資料有變動時，取消按鈕和送出按鈕才會啟用
const inputChange = computed(() => {
  // console.log('user.nickname', user.nickname)
  // console.log('user.nickname ?? ""', user.nickname ?? "")
  // console.log('user.birthday ?? ""', user.birthday ?? "")
  // console.log('user.phone ?? ""', user.phone ?? "")
  // console.log('user.email ?? ""', user.email ?? "")

  const isChange =
    (user.nickname ?? "") === nickname.value.value &&
    (user.birthday ?? "") === birthday.value.value &&
    (user.phone ?? "") === phone.value.value &&
    (user.email ?? "") === email.value.value

  // console.log('isChange', isChange)

  return isChange



  // ◆ 補充知識
  // 核心觀念：JavaScript 的物件不是比「內容」是否相等，而是比「參考位置」是否相等，所以即使物件 A{} 和 B{} 的內容完全一樣，但因為它們是兩個不同的物件，所以比較的結果會是 false。
  // JSON.stringify() 會把物件轉成「字串」，這樣就可以比較「內容」是否相等。
  // 以下幾點要注意！！！ 
  // - key 順序不同會 false
  // - null / undefined 差異可能造成 false
  // - date 格式容易不一致
  // return JSON.stringify(initialField) === JSON.stringify(currentField)
})



// ● 表格送出至後端，使用 handleSubmit() 包裹，並傳入 async 函式（formData 為表格資料）
const submit = handleSubmit(async (formData) => {

  // 先判斷是否為登入狀態
  if (!isLogin.value) {
    console.log(`目前登入狀態為 ${isLogin.value}`)

    createSnackbar({
      text: '請先登入會員',
      snackbarProps: {
        class: 'snackbar-fail',
      }
    })

    router.push("/login")
    return
  }


  try {

    // ⭐ throw new Error() 強制觸發錯誤
    // 👉 會產生一個 "同步例外 (exception)，try...catch 會立刻捕捉到，後面的程式（例如 API 呼叫）完全不會執行
    // throw new Error('這是測試錯誤');

    const fd = new FormData()

    fd.append('nickname', formData.nickname)
    fd.append('birthday', formData.birthday)
    fd.append('phone', formData.phone)
    fd.append('email', formData.email)
    // console.log('userZone_fd', [...fd.entries()])

    const data = await user.edit(fd);
    // console.log('回傳 userZone_data', data)

    createSnackbar({
      text: data.text,
      snackbarProps: {
        class: 'snackbar-success',
        // timeout: -1   // ✅ 永不自動關閉
      }
    })

  } catch (error) {
    console.log('error', error)

    createSnackbar({
      text: error,
      snackbarProps: {
        class: 'snackbar-fail',
        // timeout: -1   // ✅ 永不自動關閉
      }
    })
  }
})

</script>

<route lang="yaml">
  meta:
    layout: userZone
</route>