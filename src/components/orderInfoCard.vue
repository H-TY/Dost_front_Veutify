<template>
  <v-form @submit.prevent="submit" :disabled="isSubmitting">
    <v-sheet class="bg-white d-flex flex-column justify-self-center align-self-center justify-center pa-7" max-width="600" height="auto">
      <v-sheet class="bg-transparent d-flex flex-wrap justify-center align-self-center">
        <h3 class="confirmCancelText">{{ bigTitle }}</h3>
        <v-sheet class="bg-transparent d-flex w-100 my-6">
          <v-col>
            <template v-for="el in orderInfoData" :key="el.value">
              <v-row>
                <v-col class="confirmCancelDataBorderCss">{{ el.title }}</v-col>
              </v-row>
            </template>
          </v-col>
          <v-col>
            <template v-for="el in orderInfoData" :key="el.value">
              <v-row>
                <v-col class="confirmCancelDataBorderCss">
                  {{ el.value }}
                </v-col>
              </v-row>
            </template>
          </v-col>
          <v-col class="pa-0 ms-4 d-flex justify-center  align-center">
            <v-img :src="orderInfoDataImg" width="160" height="100%" cover></v-img>
          </v-col>
        </v-sheet>
        <!-- 確認取消訂單按鈕 -->
        <template v-if="displayCancelBtn">
          <v-btn class="confirmCancelBtn my-6" type="submit" variant="plain" flat @click="changeOrderStatus" :loading="isSubmitting">確認取消</v-btn>
        </template>
      </v-sheet>
      <v-sheet class="dialogClosePosition rounded-circle bg-transparent d-flex">
        <v-btn class="rounded-circle d-flex pa-0 bg-white opacity-100" min-width="60" min-height="60" variant="plain" @click="dialogClose" flat>
          <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" size="48" color="red-darken-4" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-form>
</template>



<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ● 定義從外部接收資料的 props 名稱
const props = defineProps(['bigTitle', 'orderInfoData', 'orderInfoDataImg','changeOrderStatus', 'dialogClose', 'submit', 'isSubmitting'])

// ● 在指定頁面顯示 "取消訂單按鈕"
const CancelBtnPage = ['/userZone/dogBookingSearch',]

// 用 computed 自動計算前進的頁面是否需要顯示 "取消訂單按鈕"
const displayCancelBtn = computed (()=>
  CancelBtnPage.includes(route.path)
)

// ● 用來觸發判斷滑鼠滑入、滑出的圖示。
const mouseToggle = ref(false)

const mouseoverHandle = () => {
  mouseToggle.value = !mouseToggle.value
}

const clickmouseToggleOff = () => {
  mouseToggle.value = false
}
</script>



<style scoped>
/* 在彈窗選擇時段物件添加關閉安鈕的 class 設定 */
.dialogClosePosition {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 確認取消文字的樣式 */
.confirmCancelText {
  letter-spacing: 2px;
}

/* 確認取消按鈕的樣式 */
.confirmCancelBtn {
  width: 100px;
  background: #616161;
  color: white;
}

/* 確認取消資料的邊框樣式 */
.confirmCancelDataBorderCss {
  border: 1px solid #dfdfdf;
}

</style>