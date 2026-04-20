<template>
  <div class="user-photo" @click="openDialog">
    <img :src="userPhotoChange"></img>
    <div class="icon-box">
      <v-icon icon="mdi-camera"></v-icon>
    </div>
  </div>

  <!-- 彈窗替換大頭照 -->
  <v-dialog content-class="user-photo-bg-dialog" v-model="dialog" persistent>
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <div class="box">
        <h6 class="title">目前大頭照</h6>
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
import multiavatar from '@multiavatar/multiavatar/esm'



const User = useUserStore()
const { apiAuth } = useApi()
// 解構出 mobile的斷點
const { mobile } = useDisplay()
const createSnackbar = useSnackbar()

// 隨機生成英數字
// .random() 隨機 0（含）到 1（不含）之間的浮點數
// .toString(radix) 可以把數字轉成指定進位的字串，36 進位使用 0–9 + a–z 這 36 個字元
// .substring(start, end) 會擷取字串從 索引 start 到 end-1 的部分
const randomSeed = Math.random().toString(36).substring(2, 10)
// 根據生成的字串再生成 multiavatar 的 svg 程式碼
let svgCode = multiavatar(randomSeed)

// 宣告使用者大頭照變數
const userPhotoChange = ref(User.image)
// console.log(userPhotoChange.value)

// 宣告選擇上傳的圖片，但尚未送出至後端（僅是上傳至當前頁面）
const fileAgent = ref(null)

// 恢復預設的大頭照按鈕預設 false，尚未被點擊
const defaultPhotoBtn = ref(false)

// 恢復預設大頭照按鈕觸發點擊狀態 並 刪除目前已上傳的圖片
const defaultPhoto = () => {
  defaultPhotoBtn.value = true
  deletePhoto()

  // 1 秒後，按鈕變回預設值 false
  setTimeout(() => {
    defaultPhotoBtn.value = false
  }, 1000);
}

const deletePhoto = () => {
  fileAgent.value.deleteFileRecord()
}

// 宣告彈窗
// 設定 id 值
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

// watch(dialog, (now, old) => {
//   console.log('now=', now, 'old=', old)
// })


// ● 綁定上傳圖片/檔案的動作
// fileRecords 上傳圖片/檔案資料的物件陣列，用於展示和管理文件。
const fileRecords = ref([])
// fileRecords 原始文件資料，用於更底層的文件操作，例如文件上傳的動作或處理。
const rawFileRecords = ref([])


const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 初始化表單資料
  initialValues: {
    fromCP: 'userPhoto',
    image: '帳戶大頭照欄位',
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
      userEditData.image = fileRecords.value[0].file
      // console.log('userEditData.image1', userEditData.image)

      // 判斷是否按下 "恢復預設按鈕"
    } else if (defaultPhotoBtn.value === true) {
      // console.log('觸發 defaultPhotoBtn')
      // multiavatar 的 svg 程式碼圖片連結
      userEditData.image = `data:image/svg+xml;base64,${btoa(svgCode)}`

      // 當 "沒有按下恢復預設按鈕" 且 "沒有上傳圖片時"，跳出提示
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
    fd.append('image', userEditData.image)

    const result = await User.edit(fd)
    // console.log('result', result)

    if (result.text) {
      // 即時更新前端使用者大頭照
      userPhotoChange.value = result.reImage

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