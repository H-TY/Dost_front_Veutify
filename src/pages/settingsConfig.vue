<template>
  <div id="settings-config-area" class="settings-config-area">
    <div :class="titleCss">
      <h2>設定</h2>
    </div>

    <v-form class="box" @submit.prevent="submit" :disabled="isSubmitting">
      <div class="item">
        <h6>主題顏色</h6>
        <v-switch v-model="themeColor.value.value" true-value="green-theme" false-value="default" :label="handleSwitchChange.text" :class="handleSwitchChange.color" hide-details></v-switch>
      </div>

      <div class="item">
        <h6>文字大小</h6>
        <v-slider class="font-size-btn" v-model="fontSize.value.value" :min="minText" :max="maxText" step="1" hide-details></v-slider>
        <p>{{ fontSizeContrl }}</p>
      </div>


      <div class="btn-box">
        <!-- 恢復預設按鈕 -->
        <v-btn class="default-btn" type="button" @click="themeSettingStore.resetDefault">恢復預設</v-btn>

        <!-- 取消按鈕 -->
        <!-- <v-btn class="cancle-btn" type="button" @click="resetForm">取消</v-btn> -->

        <!-- 送出按鈕 -->
        <v-btn class="submit-btn" type="submit" :disabled="!meta.dirty" :loading="isSubmitting">儲存</v-btn>
      </div>
    </v-form>
  </div>
</template>



<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import { useThemeSettingStore } from '@/stores/themeSettings.js'
import { useFormDirtyStore } from "@/stores/formDirty";
import { settingFields } from '@/plugins/data_json'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
// import { useRoute } from 'vue-router'
import { definePage } from 'vue-router/auto'
import { alertInfo } from '@/composables/alertInfo'
import { useSnackbar } from 'vuetify-use-dialog'



definePage({
  meta: {
    title: 'Dost | 設定',
    login: true,
  }
})



// const route = useRoute()
// console.log('route', route)
const userStore = useUserStore()
const themeSettingStore = useThemeSettingStore()
// 若要保持響應式且能連動 store 內的值，直接使用 themeSettingStore.switchContrl
// 但還是想要解構並保持響應式，就要使用 storeToRefs()（需要 import { storeToRefs } from 'pinia'）
const { switchContrl, fontSizeContrl, minText, maxText } = storeToRefs(themeSettingStore)
const formDirtyStore = useFormDirtyStore();
const alert = alertInfo()
const createSnackbar = useSnackbar()



// ● 控制 "標題" 的 CSS 樣式
const titleCss = computed(() => {
  if (userStore.isAdmin && userStore.isLogin) {
    return 'admin-page-title'
  } else {
    return 'userZone-page-title'
  }
})


// ● 根據 switchContrl 的值返回對應的標籤和樣式
const handleSwitchChange = computed(() => {
  if (switchContrl.value === "green-theme") {
    return {
      text: 'Green',
      color: 'green-theme-btn'
    }
  } else {
    return {
      text: 'Blue',
      color: 'blue-theme-btn'
    }
  }
})



// ● 定義/驗證欄位
const settingFormSchema = yup.object(settingFields)


// ● 表格預設值、欄位驗證時機
// 解構出：
// - handleSubmit 處理送出表單
// - isSubmitting 表單送出中
// - resetForm 表單重置為預設值
// - meta 整份表單狀態（非個別欄位的狀態）
//      meta 的結構：
//      meta.value = {
//         touched: true,
//         dirty: false,
//         valid: true,
//         pending: false,
//         initialValues: {
//           name: '',
//           age: 18
//         }
//       }
//   => 這邊使用 dirty 這個參數，判斷表單是否有修改值，來控制 "恢復預設按鈕"、"儲存按鈕" 是否可以點擊

const { handleSubmit, isSubmitting, resetForm, meta } = useForm({
  validationSchema: settingFormSchema,
  validateOnBlur: true, // 使用者輸入完資料，離開欄位時，才驗證欄位資料
  initialValues: {
    userId: userStore.id,
    settings: {
      themeColor: switchContrl.value,
      fontSize: fontSizeContrl.value
    },
  }
})


// ● 註冊表格欄位，並與 UI 的表格綁定
const userId = useField('userId')
const settings = useField('settings')
const themeColor = useField('settings.themeColor')
const fontSize = useField('settings.fontSize')


// ▲ 監聽欄位的 themeColor.value.value，有變動，就同步到 switchContrl；讓表格欄位和 store 狀態同步
watch(themeColor.value, (newVal) => {
  // console.log('newVal', newVal)
  // switchContrl.value = newVal
  themeSettingStore.changeStoreValue({ themeColor: newVal })
})

watch(fontSize.value, (newVal) => {
  // console.log('newVal', newVal)
  fontSizeContrl.value = newVal
})

// ▲ 監聽 store 的 switchContrl，有變動，就同步到 themeColor.value.value；讓表格欄位和 store 狀態同步
// watch 合併寫法
watch([switchContrl, fontSizeContrl], ([newSC, newFC]) => {
  themeColor.value.value = newSC
  fontSize.value.value = newFC
})



// ● 判斷修改表單，但尚未按下儲存按鈕，在離開頁面時跳出提示
// 用 watch 監聽 () => meta.value.dirty，並同步到 formDirtyStore
watch(() => meta.value.dirty, (newVal) => {
  formDirtyStore.changeFormDirtyValue({
    passInValue: newVal,
    passInMsg: "尚未儲存設定，確定離開頁面？"
  })
})

// ● 這邊 alert.leavePageAlert() 預先綁定/註冊事件
// { onConfirm: resetForm } 傳入參數：resetForm，
// 上述參數作用：針對跳出的警告訊息("尚未儲存設定，確定離開頁面？")，按下確定按鈕，恢復使用者原先設定
alert.leavePageAlert({ onConfirm: resetForm })



// ### 補充知識：
// watchEffect(() => {} 自動追蹤，「這個 function 裡用到什麼 reactive → 全部監聽 → 任何變化就重跑」
// 缺點：追蹤是系統自己建立的，無法指定要追蹤的值，若要查詢追蹤的值有哪些也不清楚
// watchEffect(() => {
//   formDirtyStore.changeFormDirtyValue({
//     passInValue: meta.value.dirty,
//     passInMsg: "尚未儲存設定，確定離開頁面？"
//   })
// })


// // ### 以下為補充知識：
// // 因為 themeColor 欄位需要的是資料格式是 "字串"，但 switchContrl 是 "布林值"，故需要中間做字串和布林值的轉換，才可綁定表格
// // 使用 computed(()=>{get:()=>{}, set:()=>{}})，這邊的 computed 不是只是單純的讀，還能寫入；用來作為字串和布林值的轉換
// const themeColorConvert = computed({
//   // 讀取值
//   // 以下這段意思：判斷是否相等 themeColor.value.value === "green-theme"，若相等，則輸出 true；所以 v-switch 的 v-model 會收到 true
//   get() {
//     return themeColor.value.value === "green-theme"
//   },
//   // 修改值
//   // 以下這段意思：v-switch 的 v-model 傳入值若為 false，
//   set(val) {
//     // themeColor.value.value = value 並不是判斷 themeColor.value.value 是否與 val 相等，而是做 "指定值（賦值）的動作"
//     // 邏輯說明：依據 val 是 true 或 false，決定要對 themeColor.value.value 賦值哪一個。
//     themeColor.value.value = val ? "green-theme" : "default"

//     switchContrl.value = val

//     // ★ 注意！雖然 code 一樣可以運行，但這樣一來就有 2 個狀態來源（themeColor.value.value 和 switchContrl.value），若有其他地方使用到這兩個來源的其中一個，就會造成 "狀態不同步"，會產生錯誤；vue 官方強烈建議：狀態來源唯一
//   }
// })



// ● 送出表單
const submit = handleSubmit(async (formData) => {

  if (!userStore.isLogin) {
    createSnackbar({
      text: '並未登入會員',
      snackbarProps: {
        class: 'snackbar-fail',
      }
    })

    return
  };


  try {

    // ● 建立符合後端可接收格式的表格
    const fd = new FormData()

    // ● 新建表單放入資料
    fd.append('userId', formData.userId)
    fd.append('settings', JSON.stringify(formData.settings))
    // ★ 不用再寫 themeColor、fontSize，因為資料已經包在 fd.append('settings', JSON.stringify(formData.settings)) 裡面了，這樣傳至後端才會是巢狀結構

    const data = await themeSettingStore.settingSave(fd)
    // console.log("pages_settingsConfig_res_data", data)

    // ● 使用 resetForm() 重建整個 form 的狀態基準（values + initialValues + meta）
    // 重新定義當前狀態為乾淨狀態
    resetForm({
      values: {
        settings: {
          themeColor: switchContrl.value,
          fontSize: fontSizeContrl.value
        }
      }
    })


    createSnackbar({
      text: data.message,
      snackbarProps: {
        class: 'snackbar-success',
      }
    })


  } catch (error) {
    console.log("pages_settingsConfig_submit_error", error)
    console.log({
      message: error.message,
      code: error.code,
      response: error.response,
      request: error.request,
    })

    createSnackbar({
      text: error.message,
      snackbarProps: {
        class: 'snackbar-fail',
      }
    })
  }

})

</script>


<route lang="yaml">
  meta:
    layout: "empty"
</route>