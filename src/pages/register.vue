<template>
  <v-container class="mt-3 mb-7">
    <v-row>
      <v-col class="text-center" cols="12">
        <h1 class="text-spacing1">歡迎註冊加入</h1>
        <h4 class="text-spacing2">享受狗狗至上的服務</h4>
      </v-col>
      <v-divider class="py-2"></v-divider>
      <v-col class="d-flex justify-center">
        <!-- 
        @submit.prevent="submit" 表單不會被送出
        :disabled="isSubmitting" 表單送出中，表單不顯示 / 停用
        -->
        <v-form class="text-center" :class="mobile ? 'w-50': 'w-40'" @submit.prevent="submit" :disabled="isSubmitting">
          <!-- 表格內容 -->
          <v-text-field type="account" label="帳號" minlength="4" maxlength="20" counter v-model="account.value.value" :error-messages="account.errorMessage.value"></v-text-field>
          <v-text-field type="email" label="信箱" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>
          <v-text-field type="password" label="密碼" minlength="4" maxlength="20" counter v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
          <v-text-field type="password" label="確認密碼" minlength="4" maxlength="20" counter v-model="passwordConfirm.value.value" :error-messages="passwordConfirm.errorMessage.value"></v-text-field>
          <v-sheet class="bg-transparent text-body-2 mb-5">
            已加入會員？點擊 <router-link class="text-subtitle-1 font-weight-black text-decoration-none text-blue" :to="{ path: '/login' }">登入</router-link> 會員
          </v-sheet>
          <!-- 註冊送出按鈕 -->
          <!-- :loading="isSubmitting" 表單送出後，按鈕會顯示轉圈 loading 的樣子 -->
          <v-btn class="w-25" type="submit" color="green" :loading="isSubmitting">註冊</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
// 引用 vee-validate 套件的 useForm、useField 來建立驗證表格和建立驗證欄位資料
import { useForm, useField } from 'vee-validate'
// yup 套件，用來建立定義驗證的資料格式
import * as yup from 'yup'
import validator from 'validator'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { ref, computed, watch } from 'vue'

definePage({
  meta: {
    title: 'Dost | 註冊',
    login: false,
    admin: false
  }
})


const { backApi } = useApi()
const router = useRouter()
const { mobile } = useDisplay()
const createSnackbar = useSnackbar()

// 用 yup 將要驗證的資料建立成物件陣列
const registerFormData = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '使用者帳號文字最少 4 個字')
    .max(20, '使用者帳號文字最多 20 個字')
    // .text(自訂驗證名稱, 錯誤訊息, 驗證 function)
    .test('驗證 account', '使用者帳號格式錯誤',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  password: yup
    .string()
    .required('密碼必填')
    .min(4, '使用者密碼最少 4 個字')
    .max(20, '使用者密碼最多 20 個字'),
  passwordConfirm: yup
    .string()
    .required('確認密碼必填')
    // .oneOf(陣列, 錯誤訊息) 只允許符合陣列內其中一個值
    // .ref('password') 代表這個 schema 的 password 的欄位值
    .oneOf([yup.ref('password')], '密碼不一致'),
  email: yup
    .string()
    .required('信箱必填')
    .test(
      '驗證 Email', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  image: yup
    .string()
    .required('大頭照必填'),
})


// ● 順序一定要"先建立驗證表單，後面接建立的驗證欄位"
// 驗證表單 useForm
// handleSubmit 指送出表單的動作
// isSubmitting 指表單正在發送的狀態
// validationSchema 定義驗證規則（定義表單字段的驗證規則和約束）
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: registerFormData,
})


// 建立欄位 useField（要與定義 registerFormData 的欄位名稱一樣 ）
const account = useField('account')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
const email = useField('email')
const image = useField('image')
// console.log(account.value.value)
// console.log(image.value.value)


// watch 監視使用者輸入的帳戶名稱觸發 "大頭照的賦值的函式"
watch (account.value, (now, old)=>{
  // console.log ('now=', now, 'old=', old)
  // 依據 "帳戶名稱" 默認大頭照
  image.value.value = `https://api.multiavatar.com/${account.value.value}.png`
})


// formData 代表送出表單各欄位的值
// 將表單送至 "後端的相對路徑" backApi.post('/user',{陣列物件})
// 送至後端的 "資料欄位" 要與後端的 model 定義的資料結構相同
const submit = handleSubmit(async (formData) => {
  try {
    await backApi.post('/user', {
      account: formData.account,
      password: formData.password,
      email: formData.email,
      image: formData.image,
    })
    createSnackbar({
      text: '註冊成功',
      snackbarProps: {
        color: 'green'
      }
    })
    // 送出表單後，設定跳頁至 login 頁面
    router.push('/login')
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

</script>



<style scoped>
/* 更改文字間距 */
.text-spacing1 {
  letter-spacing: 12px;
}

.text-spacing2 {
  letter-spacing: 12px;
}

.textC {
  text-align: center;
}
</style>