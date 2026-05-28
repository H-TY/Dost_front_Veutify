<template>
  <div class="admin-all theme-box" :class="themeColorCss">
    <!-- Logo & 導覽列 -->
    <v-navigation-drawer class="admin-navigation-drawer" :width="adminNavbarWidth" :location="mobileNarbarPosition" permanent :rail="mdAndUp" :rail-width="adminNavbarRailWidth" :expand-on-hover="lgAndUp" @mouseover="isExpanded = true" @mouseleave="isExpanded = false">

      <!-- ● Logo -->
      <div class="logo-box">
        <v-btn :to="logo.to">
          <img :src="logo.img">
        </v-btn>
      </div>

      <!-- ● 導覽列項目 -->
      <v-list>
        <v-list-item v-for="(item, index) in adminNavItems" :key="index" :to="item.to" :title="item.title" :prepend-icon="item.icon"></v-list-item>
      </v-list>

      <!-- ● 登出按鈕 -->
      <div class="logout-box">
        <logOutBtn :class="logOutBtnChange.class" :text="logOutBtnChange.text"></logOutBtn>
      </div>
    </v-navigation-drawer>


    <!-- 右下角固定按鈕，只在斷點 sm 以下顯示 -->
    <template v-if="smAndDown">
      <floatingBtn></floatingBtn>
    </template>


    <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
    <v-main class="admin-main" :style="{ '--v-layout-left': adminVLayoutLeft, '--v-layout-bottom': adminVLayoutBottom }">
      <section>
        <div class="admin-bg">
          <router-view></router-view>
        </div>
      </section>
    </v-main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useThemeSettingStore } from '@/stores/themeSettings.js'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import logOutBtn from '@/components/logOutBtn.vue'
import floatingBtn from '@/components/floatingBtn.vue'
// 引進生成的 data_json 檔案
import { logo, adminNavItems } from '@/plugins/data_json'


// 解構出 mobile的斷點
const { mobile, smAndDown, mdAndUp, lgAndUp } = useDisplay()
// console.log(mobile, lgAndUp)

const user = useUserStore()
const themeSettingStore = useThemeSettingStore()
const { themeColorCss } = storeToRefs(themeSettingStore)
const router = useRouter()
const createSnackbar = useSnackbar()


// ● 預設 admin 頁面的導覽列 "收闔/展開" 的寬度
const adminNavbarRailWidth = ref(null)
const adminNavbarWidth = ref(null)
adminNavbarRailWidth.value = 120;
adminNavbarWidth.value = 200;


// ● mobile 版，v-navigation-drawer 的位置設定
const mobileNarbarPosition = computed(() => {
  if (smAndDown.value === true) {
    return "bottom"
  } else {
    return "left"
  }
})


// ● 在導覽列 v-navigation-drawer 增添綁定動作事件 @mouseover @mouseleave
const isExpanded = ref(false)
// // 監聽動作事件判定導覽列是開啟或關閉狀態
// watch(isExpanded, (nweE, oldE) => {
//   // console.log('nweE:', nweE, 'oldE:', oldE)
// })


// ● 根據導覽列是開啟或關閉狀態，計算 admin-main 的版面寬度
const adminVLayoutLeft = computed(() => {
  // 當頁面寬度 >= lg 時，觸發
  if (lgAndUp.value === true) {
    return isExpanded.value ? adminNavbarWidth.value + 'px' : adminNavbarRailWidth.value + 'px'
  } else if (smAndDown.value === true) {
    return '0px'
  } else {
    return adminNavbarRailWidth.value + 'px'
  }
})

const adminVLayoutBottom = computed(() => {
  // 當頁面寬度 <= sm 時，觸發
  if (smAndDown.value === true) {
    return adminNavbarRailWidth.value - 30 + 'px'
  } else {
    return '0px'
  }
})


// ● 根據導覽列是開啟或關閉狀態，控制 "登出按鈕" 樣式是否開/闔
const logOutBtnChange = computed(() => {
  return {
    text: lgAndUp.value && isExpanded.value ? '登出' : '',
    class: lgAndUp.value && isExpanded.value ? 'expanded-btn' : ''
  }
})


// ● 登出函式
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