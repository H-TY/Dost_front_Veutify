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
                <v-col cols="7">
                  <template v-if="isArray(el.value)">
                    <p v-for="(element, index) in el.value" :key="index">
                      ● {{ element }}
                    </p>
                  </template>
                  <template v-else>
                    {{ el.value }}
                  </template>
                </v-col>
              </v-row>
            </template>
          </div>
          <div class="img-box">
            <img :src="orderInfoDataImg"></img>
          </div>
        </div>

        <!-- slot 插拔區塊：確認取消訂單按鈕 -->
        <slot name="cancelOrderBtn"></slot>

        <!-- slot 插拔區塊：提示取消訂單的方法 -->
        <slot name="noticeInfo"></slot>
      </div>

      <dialogCloseBtn @click="dialogClose()"></dialogCloseBtn>
    </div>
  </v-form>
</template>



<script setup>
import dialogCloseBtn from '@/components/dialogCloseBtn.vue'

// ● 定義從外部接收資料的 props 名稱
const props = defineProps(['bigTitle', 'orderInfoData', 'orderInfoDataImg', 'changeOrderStatus', 'dialogClose', 'submit', 'isSubmitting'])

// ● 判斷資料型態是否為陣列
const isArray = (passInData) => {
  return Array.isArray(passInData)
}

</script>