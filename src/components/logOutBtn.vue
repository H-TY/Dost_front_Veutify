<template>
  <v-btn v-if="User.isLogin" class="logOut-btn" prepend-icon="mdi-account-arrow-right" @click="logout" text="登出"></v-btn>
</template>


<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { alertInfo } from '@/composables/alertInfo'
import { useSnackbar } from 'vuetify-use-dialog'


const User = useUserStore()
const router = useRouter()
const { onBeforeLogOut } = alertInfo()
const createSnackbar = useSnackbar()





// ● 登出函式
const logout = async () => {

  // 如果有尚未儲存的設定，跳出警告，中斷登出動作
  // - 若依一般邏輯：
  // ture 中斷登出動作，但確認面板詢問的是 "尚未儲存設定，確定離開頁面？"
  // 按下面板的確定按鈕，if (onBeforeLogOut()) 回傳為 true，那就變成中斷登出
  // 這跟原本預想的不一樣（確定離開頁面 --> 繼續執行登出動作）
  // - 故這邊的邏輯：
  // 先看 onBeforeLogOut() 回傳的值：true = 可以登出、false = 不能登出
  //  if (!布林值) return 這邊判斷是否要中斷 logOut 動作
  // 布林值 = true（可以執行登出動作），結合 ! => 變成 false → 不進 return → 繼續 logout
  // 布林值 = false（不能登出，跳出警告），結合 ! => 變成 true → 進 return → 停止 logout
  if (!onBeforeLogOut()) return
  // console.log("繼續 logOut 動作");

  await User.logout()

  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      class: 'snackbar-success',
    }
  })
  return router.push('/')
}
</script>