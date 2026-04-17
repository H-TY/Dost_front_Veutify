<template>
  <div class="user-account-bg">
    <!-- 帳戶背景圖片 -->
    <div class="bg-box">
      <img :class="isDefaultBg ? 'default-bg' : ''" :src="userAccountBg"></img>
    </div>

    <v-btn class="chang-photo-btn" @click="openDialog">
      <v-icon icon="mdi-camera"></v-icon>
    </v-btn>
  </div>

  <!-- 彈窗替換帳戶背景圖 -->
  <v-dialog content-class="user-account-bg-dialog" v-model="dialog" persistent>
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <div class="box">
        <h6 class="title">目前背景圖</h6>
        <vue-file-agent v-model="fileRecords" v-model:raw-model-value="rawFileRecords" accept="image/jpg,image/jpeg,image/png" max-size="1MB" help-text="選擇檔案或拖曳到這裡" :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }" deletable ref="fileAgent"></vue-file-agent>

        <!-- 送出 & 恢復預設 按鈕 -->
        <div class="btn-box">
          <v-btn type="submit" :loading="isSubmitting" @click="defaultPhoto">預設圖片</v-btn>
          <v-btn type="submit" :loading="isSubmitting">送出</v-btn>
        </div>
      </div>
    </v-form>

    <!-- 關閉彈窗按鈕 -->
    <dialogCloseBtn @click="closeDialog"></dialogCloseBtn>
  </v-dialog>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import dialogCloseBtn from './dialogCloseBtn.vue'
import { logo } from '@/plugins/data_json'


const User = useUserStore()
const { apiAuth } = useApi()
// 解構出 mobile的斷點
const { mobile } = useDisplay()
const createSnackbar = useSnackbar()

// 宣告使用者大頭照變數
const userAccountBg = ref(User.accountBgImage)

// 宣告選擇上傳的圖片，但尚未送出至後端（僅是上傳至當前頁面）
const fileAgent = ref(null)

// 恢復預設的大頭照按鈕預設 false，尚未被點擊
const defaultPhotoBtn = ref(false)
// watch(defaultPhotoBtn,(A, B) => {
//   console.log('A:', A, 'B:', B)
// })

// 恢復預設大頭照按鈕觸發點擊狀態 並 刪除目前已上傳的圖片
const defaultPhoto = () => {
  defaultPhotoBtn.value = true
  deletePhoto()

  // 1 秒後，按鈕變回預設值 false
  setTimeout(() => {
    defaultPhotoBtn.value = false
  }, 1000);
}

// 移除已選定上傳的圖片紀錄（尚未送出至後端）
const deletePhoto = () => {
  fileAgent.value.deleteFileRecord()
}


// 使用者背景圖片更換時，依據圖片路徑的名稱來判斷是否為預設圖片，並變更樣式設定
const isDefaultBg = computed(() => {
  if (userAccountBg.value.includes('Dost_logo')) {
    return true
  } else {
    return false
  }
})

// 宣告彈窗
const dialog = ref(false)

// 開啟彈窗函式
const openDialog = () => {
  dialog.value = true
}

// 關閉彈窗函式
const closeDialog = () => {
  dialog.value = false
  deletePhoto()
}


// ● 綁定上傳圖片/檔案的動作
// fileRecords 上傳圖片/檔案資料的物件陣列，用於展示和管理文件。
const fileRecords = ref([])
// fileRecords 原始文件資料，用於更底層的文件操作，例如文件上傳的動作或處理。
const rawFileRecords = ref([])


const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 初始化表單資料
  initialValues: {
    fromCP: 'userAccountBg',
    accountBgImage: '帳戶背景圖片欄位'
  }
})



const submit = handleSubmit(async (userEditData) => {
  // console.log('fileRecords.value[0]?.error', fileRecords.value[0]?.error)
  if (fileRecords.value[0]?.error) return

  try {
    // 判斷是否有上傳圖片
    if (fileRecords.value.length > 0) {
      // console.log('fileRecords.value[0].file', fileRecords.value[0].file)
      // console.log('觸發 上傳圖片')
      userEditData.accountBgImage = fileRecords.value[0].file
      console.log('userEditData.accountBgImage1', userEditData.accountBgImage)

      // 判斷是否按下 "恢復預設按鈕"
    } else if (defaultPhotoBtn.value === true) {
      // console.log('觸發 defaultPhotoBtn')
      userEditData.accountBgImage = logo.img

      // 恢復預設按鈕的值為 false 且 未上傳圖片
    } else if (defaultPhotoBtn.value === false && fileRecords.value.length < 1) {
      createSnackbar({
        text: '未選擇圖片上傳',
        snackbarProps: {
          color: 'red',
          location: 'center center',
        }
      })
      return
    }

    // new FormData() 作成後端可以接收的表格資料格式，給後端的 middlewares/upload.js 作驗證以及轉格式
    const fd = new FormData()
    fd.append('fromCP', userEditData.fromCP)
    fd.append('accountBgImage', userEditData.accountBgImage)

    const result = await User.edit(fd)
    // console.log('result', result)

    if (result.text) {
      // 即時更新前端使用者大頭照
      userAccountBg.value = result.reAccountBgImage

      createSnackbar({
        text: result.text,
        snackbarProps: {
          color: 'green'
        }
      })
    }

    closeDialog()

  } catch (error) {
    console.log(error)
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

</script>