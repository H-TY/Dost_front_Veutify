// 建立 "訂單資料狀態"

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import UserRole from "@/enums/UserRole";
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from "@/composables/axios";

export const useBookingOrderStore = defineStore("BookingOrderData", () => {
  const { apiAuth } = useApi();
  const UserStore = useUserStore();
  // console.log('UserStore.isLogin', UserStore.isLogin)

  // 預設要回傳的資料
  const bookingOrderNumber = ref(null);
  const image = ref("");
  const dogName = ref("");
  const bookingDate = ref("");
  const bookingTime = ref("");
  const orderStatus = ref("");

  // ● 訂單修改
  const edit = async (values) => {
    // console.log('values', values)

    // 判斷是否為登入狀態
    if (!UserStore.isLogin) return;

    try {
      const { data } = await apiAuth.patch("/order/" + values.id, values);
      // console.log('data.result', data.result)
      // console.log('data.result.orderStatus', data.result.orderStatus)
      // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料
      orderStatus.value = data.result.orderStatus;

      return {
        text: "修改訂單成功",
        // 回傳前端更新的訂單狀態，供前端即時更新狀態
        reOrderStatus: orderStatus.value,
      };
    } catch (error) {
      console.log(error);
      return error?.response?.data?.message || "訂單修改發生錯誤，請稍後再試";
    }
  };

  // 要 return 出去，前端才收的到資料
  return {
    bookingOrderNumber,
    image,
    dogName,
    bookingDate,
    bookingTime,
    orderStatus,
    edit,
  };
});
