<template>
  <v-btn v-if="User.isLogin" prepend-icon="mdi-account-arrow-right" @click="logout">登出</v-btn>
</template>


<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'


const User = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()



// ● 登出函式
const logout = async () => {
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