<template>
  <!-- Logo & 導覽列 -->
  <v-navigation-drawer 
  width="200" 
  expand-on-hover 
  rail 
  @mouseover="isExpanded = true" 
  @mouseleave="isExpanded = false">
    <!-- ● Logo -->
    <v-sheet class=" my-4 d-flex">
      <v-col class="pa-0 d-flex justify-end pe-2">
        <v-list-item 
        class="rounded-circle pa-1" 
        color="white" 
        width=" 50" 
        height="50" 
        :to="logo.to" 
        :ripple="false">
          <v-img :src="logo.img" cover></v-img>
        </v-list-item>
      </v-col>
      <v-col class="pa-0 d-flex align-center">
        <v-list-item 
        :to="logo.to" 
        :ripple="false" 
        min-height="0" 
        class="align-center justify-center pa-0" 
        text="管理區"></v-list-item>
      </v-col>
    </v-sheet>

    <v-divider></v-divider>

    <!-- ● 導覽項目 -->
    <v-list class=" d-flex flex-column align-center">
      <v-list-item 
      v-for="(item, index) in navItems" 
      :key="index" 
      :to="item.to" 
      :title="item.text" 
      :prepend-icon="item.icon" 
      border-radius="50" 
      color="light-blue-darken-2"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- ● 登出按鈕 -->
    <v-col>
      <v-sheet class="d-flex justify-center mt-6">
        <v-btn 
        v-if="user.isLogin" 
        prepend-icon="mdi-account-arrow-right" 
        class="bg-deep-orange-darken-2 w-50" 
        :rounded="isExpanded == true ? '' : 'circle'" 
        :text="isExpanded == true ? '登出' : ''" 
        :ripple="false" 
        variant="outlined" 
        @click="logout" 
        :height="isExpanded == true ? '36' : ''"
        ></v-btn>
      </v-sheet>
    </v-col>
  </v-navigation-drawer>

  <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import AdminNavItems from '@/components/AdminNavItems'


// 解構出 mobile的斷點
const { mobile } = useDisplay()

const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()
const {logo, navItems} = AdminNavItems()


// 在導覽列 v-navigation-drawer 增添綁定動作事件 @mouseover @mouseleave
// 再監聽動作事件判定導覽列是開啟或關閉狀態
const isExpanded = ref(false)
// watch(isExpanded, (nweE, oldE) => {
//   console.log('nweE:', nweE, 'oldE:', oldE)
// })


// 登出函式
const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
  return router.push('/')
}

</script>


<style scoped>
/* logo 欄位的設定 */
::v-deep .v-list-item-title {
  padding-left: 15px;
}

::v-deep .v-list-item__spacer {
  display: none;
}

/* 導覽列物件欄位的設定 */
::v-deep .v-list-item--density-default.v-list-item--one-line {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

/* 登出按鈕縮小時 */
::v-deep .v-btn--size-default {
  --v-btn-size: 1rem;
  --v-btn-height: 30px;
  min-width: 30px;
  padding: 0;
}

::v-deep .v-btn__prepend {
  margin-inline: auto;
}
</style>