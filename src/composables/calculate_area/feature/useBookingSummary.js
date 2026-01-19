// Feature 層（功能整合層）
//  - 組合多個 domain
//  - 把「純數字」(產出結果) 轉成「UI 可直接用」（提供給 componets / HTML 使用）

import { computed, ref } from "vue";
import { useBookingCalculator } from "@/composables/calculate_area/domain/useBookingCalculator";

export function useBookingSummary(selectedDate, selectedTime, passInPrice) {
  const { totalBTime, totalBPrice } = useBookingCalculator(
    selectedTime,
    passInPrice
  );

  // ● 將選取的日期當地化
  const chooseBDate = computed(() => {
    if (selectedDate.value === null || isNaN(selectedDate.value.getTime())) {
      return "";
    } else {
      return selectedDate.value.toLocaleDateString();
    }
  });

  // ● 將預約時段轉成文字條列式
  const BTimeTxt = computed(() => {
    return selectedTime.value
      .sort((a, b) => parseInt(a) - parseInt(b))
      .join("\n");
  });

  // ● 將總預約時間轉成文字顯示的格式
  const totalBTimeTxt = computed(() => {
    return `${totalBTime.value} 小時`;
  });

  // ● 將預約總金額轉成文字顯示的格式
  const totalBPriceTxt = computed(() => {
    return `${totalBPrice.value} 元`;
  });

  return {
    // 計算結果
    totalBTime,
    totalBPrice,

    // UI 顯示用
    chooseBDate,
    BTimeTxt,
    totalBTimeTxt,
    totalBPriceTxt,
  };
}
