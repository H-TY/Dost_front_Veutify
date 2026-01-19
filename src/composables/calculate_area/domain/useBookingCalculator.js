// Domain 層（規則層）——「一定要最乾淨」
// 計算「筆數、時數、金額」
//  - 只處理商業規則
//  - 完全不知道 UI 長怎樣
//  - 計算完後的東西交給 Feature 層（功能整合層）處理

import { computed } from "vue";

export function useBookingCalculator(selectedTime, passInPrice) {
  // 驗證傳入的參數，防呆爆掉
  const paramData = computed(() => {
    return {
      times: selectedTime.value || selectedTime || [],
      price: passInPrice.value.price || 0,
    };
  });

  const serviceTime = 2; // 預設狗狗服務時段為 2 小時

  // ● 計算預約 "總時數"
  const totalBTime = computed(() => {
    return paramData.value.times.length * serviceTime;
  });

  // ● 計算預約 "總金額"
  const totalBPrice = computed(() => {
    return paramData.value.times.length * paramData.value.price;
  });

  return {
    totalBTime,
    totalBPrice,
  };
}
