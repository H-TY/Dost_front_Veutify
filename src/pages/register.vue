<template>
  <section id="register" class="register">
    <v-container>

      <div class="title">
        <h2>註冊會員</h2>
        <h6>享受狗狗至上的服務</h6>
      </div>

      <v-divider></v-divider>

      <v-form @submit.prevent="submit" :disabled="isSubmitting">
        <!-- 表格內容 -->
        <v-text-field type="account" label="帳號" minlength="4" maxlength="20" counter variant="underlined" v-model="account.value.value" :error-messages="account.errorMessage.value"></v-text-field>

        <v-text-field type="email" label="信箱" variant="underlined" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>

        <v-text-field type="password" label="密碼" minlength="4" maxlength="20" counter variant="underlined" v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>

        <v-text-field type="password" label="確認密碼" minlength="4" maxlength="20" counter variant="underlined" v-model="passwordConfirm.value.value" :error-messages="passwordConfirm.errorMessage.value"></v-text-field>

        <div class="notice">
          <p>
            已加入會員？
            <br>
            點擊
            <router-link :to="{ path: '/login' }">登入</router-link>
            會員
          </p>
        </div>

        <!-- 註冊送出按鈕 -->
        <!-- :loading="isSubmitting" 表單送出後，按鈕會顯示轉圈 loading 的樣子 -->
        <v-btn type="submit" :loading="isSubmitting">註冊</v-btn>
      </v-form>
    </v-container>
  </section>
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
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { ref, computed, watch } from 'vue'
import multiavatar from '@multiavatar/multiavatar/esm'



definePage({
  meta: {
    title: 'Dost | 註冊',
    login: false,
    admin: false
  }
})

// Logo
const logo = { to: '/userZone', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }


// 隨機生成英數字
// .random() 隨機 0（含）到 1（不含）之間的浮點數
// .toString(radix) 可以把數字轉成指定進位的字串，36 進位使用 0–9 + a–z 這 36 個字元
// .substring(start, end) 會擷取字串從 索引 start 到 end-1 的部分
const randomSeed = Math.random().toString(36).substring(2, 10)
// 根據生成的字串再生成 multiavatar 的 svg 程式碼
let svgCode = multiavatar(randomSeed)


const { backApi } = useApi()
const router = useRouter()
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
    .string(),
  accountBgImage: yup
    .string(),
})


// ● 順序一定要"先建立驗證表單，後面接建立的驗證欄位"
// 驗證表單 useForm
// handleSubmit 指送出表單的動作
// isSubmitting 指表單正在發送的狀態
// validationSchema 定義驗證規則（定義表單字段的驗證規則和約束）
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: registerFormData,
  initialValues: {
    // 預設大頭照圖片（multiavatar 的 svg 程式碼圖片連結）
    image: `data:image/svg+xml;base64,${btoa(svgCode)}`,
    // 預設默認帳戶背景圖片
    accountBgImage: logo.img,
  }
})


// 建立欄位 useField（要與定義 registerFormData 的欄位名稱一樣 ）
const account = useField('account')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
const email = useField('email')
const image = useField('image')
const accountBgImage = useField('accountBgImage')
// console.log(account.value.value)
// console.log(image.value.value)


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
      accountBgImage: formData.accountBgImage,
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