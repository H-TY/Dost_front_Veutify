<template>
  <v-container class="w-75 mt-12">
    <v-row>
      <v-col class="text-center" cols="12">
        <h1 class="text-spacing1">登入</h1>
        <h4 class="text-spacing2">與狗狗歡度快樂時刻</h4>
      </v-col>
      <v-divider class="py-2"></v-divider>
      <v-col>
        <!-- 
        @submit.prevent="submit" 表單不會被送出
        :disabled="isSubmitting" 表單送出中，表單不顯示 / 停用
        -->
        <v-form class="text-center" @submit.prevent="submit" :disabled="isSubmitting">
          <!-- 表格內容 -->
          <v-text-field type="account" label="帳號" minlength="4" maxlength="20" counter v-model="account.value.value" :error-messages="account.errorMessage.value"></v-text-field>
          <v-text-field type="password" label="密碼" minlength="4" maxlength="20" counter v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
          <!-- 送出按鈕 -->
          <!-- :loading="isSubmitting" 表單送出後，按鈕會顯示轉圈 loading 的樣子 -->
          <v-btn class="w-25" type="submit" color="green" :loading="isSubmitting">登入</v-btn>
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
import { useRouter } from 'vue-router'
import { definePage } from 'vue-router/auto'
// 引用 stores 資料夾內的 user.js
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'


definePage({
  meta: {
    title: 'Dost | 登入',
    login: false,
    admin: false
  }
})

const router = useRouter()
const UserStore = useUserStore()
const createSnackbar = useSnackbar()

// 用 yup 將要驗證的資料建立成物件陣列
const loginFormData = yup.object({
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
})

// ● 順序一定要"先建立驗證表單，後面接建立的驗證欄位"
// 驗證表單 useForm
// handleSubmit 指送出表單的動作
// isSubmitting 指表單正在發送的狀態
// validationSchema 定義驗證規則（定義表單字段的驗證規則和約束）
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginFormData
})

// 建立欄位 useField（要與定義 loginFormData 的欄位名稱一樣 ）
const account = useField('account')
const password = useField('password')

// formData 表單的內容
const submit = handleSubmit(async (formData) => {
  const result = await UserStore.login(formData)
  if (result === '登入成功') {
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'green'
      }
    })
    // 登入後導向首頁
    return router.push('/')
  } else {
    createSnackbar({
      text: result,
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