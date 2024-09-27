<template>
  <v-container fluid class="pa-0 d-flex flex-column">
    <v-sheet class="bg-transparent" @click="openDialog">
      <v-img :src="User.image" class="rounded-circle" min-width="130" min-height="130" cover></v-img>
      <v-btn class="iconBtnPosition d-flex justify-center align-center pa-0" flat>
        <v-icon icon="mdi-camera" class="iconStyle"></v-icon>
      </v-btn>
    </v-sheet>
    <!-- <v-sheet class="bg-transparent text-center mt-2 accountName">
      {{ User.account }}
    </v-sheet> -->

    <!-- 彈窗替換大頭照 -->
    <v-dialog v-model="dialog" width="320" persistent>
      <v-form @submit.prevent="submit">
        <v-card height="370">
          <v-card-title class="text-h6 font-weight-bold text-center pa-0 pt-7">目前大頭照</v-card-title>
          <v-card-text class="pa-0 px-6 py-7 flex-grow-0">
            <vue-file-agent
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/jpg,image/jpeg,image/png"
              max-size="1MB"
              help-text="選擇檔案或拖曳到這裡"
              :error-text="{ type:'檔案格式不支援' , size:'檔案大小不能超過 1MB'}"
              deletable
              ref="fileAgent"
            ></vue-file-agent>
          </v-card-text>
          <!-- 送出 & 取消 按鈕 -->
          <v-card-actions class="justify-center pa-0 pb-7">
            <!-- <v-btn class="bg-grey-darken-2 me-5" :loading="isSubmitting" @click="deletePhoto">刪除圖片</v-btn> -->
            <v-btn class="bg-green w-25" type="submit" :loading="isSubmitting">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <v-sheet class="dialogClosePosition rounded-circle bg-transparent d-flex">
        <v-btn class="rounded-circle d-flex pa-0 bg-grey-lighten-3 opacity-100" min-width="60" min-height="60" variant="plain" @click="dialogClose" flat>
          <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" size="48" color="red-darken-4" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickHandleOff"></v-icon>
        </v-btn>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>


<script setup>
import {ref, computed, watch} from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'


const User = useUserStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()


// 宣告選擇上傳的圖片，但尚未送出至後端（僅是上傳至當前頁面）
const fileAgent = ref(null)

// 刪除當前所選的大頭照
const deletePhoto = ()=>{
  fileAgent.value.deleteFileRecord()
}

// 宣告彈窗
const dialog = ref(false)
// 開啟彈窗函式
const openDialog = () => {
  dialog.value = true
}
// 關閉彈窗函式
const closeDialog = () => {
  dialog.value = false
}

// watch(dialog, (now, old) => {
//   console.log('now=', now, 'old=', old)
// })

// ● 用來觸發滑鼠滑入、滑出的值，進而控制要顯示的圖示。
const mouseToggle = ref(false)
// 滑鼠懸浮於上時
const mouseoverHandle = ()=>{
  mouseToggle.value = !mouseToggle.value
}
// 滑鼠點擊時，關閉彈窗
const clickHandleOff = ()=>{
  closeDialog()
  deletePhoto()
  mouseToggle.value = false
}

// ● 綁定上傳圖片/檔案的動作
// fileRecords 上傳圖片/檔案資料的物件陣列，用於展示和管理文件。
const fileRecords = ref([])
// fileRecords 原始文件資料，用於更底層的文件操作，例如文件上傳的動作或處理。
const rawFileRecords = ref([])


const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 初始化表單資料
  initialValues: {
    image: '123'
  }
})



const submit = handleSubmit ( async (userEditData) => {

  if (fileRecords.value[0]?.error) return

  try {
    // 判斷是否有上傳圖片
    if(fileRecords.value.length > 0){
      // console.log('fileRecords.value[0].file', fileRecords.value[0].file)
        userEditData.image = fileRecords.value[0].file
      }else{
        createSnackbar({
        text: '未選擇圖片上傳',
        snackbarProps:{
          color: 'red',
          location: 'center center',
        }
      })
      return
      }

    // new FormData() 作成後端可以接收的表格資料格式，給後端的 middlewares/upload.js 作驗證以及轉格式
    const fd = new FormData()
    fd.append('image', userEditData.image)

    const result = await User.edit(fd)

    if( result === '上傳圖片成功'){
      createSnackbar({
        text: result,
        snackbarProps:{
          color: 'green'
        }
      })
    }
    closeDialog()

  } catch (error) {
    console.log(error)
    createSnackbar({
        text: result,
        snackbarProps:{
          color: 'red'
        }
    })
  }
})

</script>


<style scoped>
/* 使用者名稱的文字樣式設定 */
.accountName{
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
}

/* iconBtn 定位設定 */
.iconBtnPosition{
  position: absolute;
  background: transparent;
  bottom: 0;
  right: 0;
  transform: translate(-30%, -120%);
  border-radius: 50%;
  min-width: fit-content;
  min-height: fit-content;
}

.iconStyle{
  font-size: 22px;
  background: #FFFDE7;
  color: #BDBDBD;
  border: 2px solid #BDBDBD;
  border-radius: 50%;
  padding: 16px;
}

::v-deep .v-btn__overlay .v-btn__underlay {
  display: none;
  min-width: none;
  opacity: 0;
}

/* 彈窗關閉按鈕設定樣式 */
.dialogClosePosition{
  position: absolute;
  top:100%;
  left:50%;
  transform: translate(-50%, -50%);
}

</style>