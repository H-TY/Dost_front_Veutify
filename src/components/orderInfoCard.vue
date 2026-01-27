  <!-- submit && submit() 說明：
    1. 先判斷 submit 是否存在且不是 false、null、undefined
    2. 如果存在 → 執行 submit()
    3. 如果不存在 → 不執行，安全跳過
  -->
<template>
  <v-form @submit.prevent="submit && submit()" :disabled="isSubmitting">
    <div class="order-info-card">
      <div class="card-content">

        <h3>{{ bigTitle }}</h3>

        <div class="content-txt-img">
          <div class="txt-box">
            <template v-for="el in orderInfoData" :key="el.title">
              <v-row>
                <v-col>{{ el.title }}</v-col>
                <v-col cols="7"> {{ el.value }}</v-col>
              </v-row>
            </template>
          </div>
          <div class="img-box">
            <img :src="orderInfoDataImg"></img>
          </div>
        </div>

        <!-- 確認取消訂單按鈕 -->
        <template v-if="displayCancelBtn">
          <v-btn class="cancel-btn" type="submit" variant="plain" flat @click="changeOrderStatus" :loading="isSubmitting">確認取消</v-btn>
        </template>

        <!-- 提示取消訂單的方法 -->
        <template v-else>
          <p>
            <v-icon icon="mdi-message-alert"></v-icon>
            如需<span>取消預約訂單</span>，請前往
            <router-link :to="{ path: '/userZone/dogBookingSearch' }">會員專區</router-link>
            做取消，謝謝！
          </p>
        </template>
      </div>

      <dialogCloseBtn dialogName="dialogOrderInfo" @close="dialogClose"></dialogCloseBtn>
    </div>
  </v-form>
</template>



<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dialogCloseBtn from '@/components/dialogCloseBtn.vue'

const route = useRoute()

// ● 定義從外部接收資料的 props 名稱
const props = defineProps(['bigTitle', 'orderInfoData', 'orderInfoDataImg', 'changeOrderStatus', 'dialogClose', 'submit', 'isSubmitting'])

// ● 在指定頁面顯示 "取消訂單按鈕"
const CancelBtnPage = ['/userZone/dogBookingSearch',]

// 用 computed 自動計算前進的頁面是否需要顯示 "取消訂單按鈕"
const displayCancelBtn = computed(() =>
  CancelBtnPage.includes(route.path)
)

</script>