// 建立 "訂單資料狀態"

import { defineStore } from "pinia";
import { ref, computed, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import UserRole from "@/enums/UserRole";
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from "@/composables/axios";

export const useBookingOrderStore = defineStore("BookingOrderData", () => {
  const { backApi, apiAuth } = useApi();
  const UserStore = useUserStore();
  // console.log('UserStore.isLogin', UserStore.isLogin)

  // 建立 pinia 的資料
  // 這邊建立的資料可以提供給需要的元件做渲染，只要這邊資料有更新，所有使用這筆資料的元件都會抓到一樣的更新資料
  const topThreeDogsData = ref([]);

  // ● 抓取訂單最多的前三名
  const topThreeOrder = async () => {
    // 抓取資料邏輯：依據訂單編號（編號格式 YYYYMM001）找出總計幾個月內的訂單資料，所以將當下日期的月份往回推算月份

    try {
      // 宣告當下日期
      const nowDate = ref(new Date());
      // console.log("nowDate", nowDate.value);

      // 抓取年和月份
      // 「由狀態推導出的值，需要跟隨追蹤狀態並更新資料，用 computed；一次性計算，用 function。」
      // computed((不吃任何參數) => {})，丟進參數就會報錯
      const getYM = function () {
        // 找出年份 .getFullYear()
        const nowDateYear = nowDate.value.getFullYear();

        // 找出月份 .getMonth()
        const nowDateMonth = nowDate.value.getMonth() + 1;

        // 輸出成物件，方便後續依據 key 找到相對應的值
        // 當 key 與 "變數" 名稱相同時，可以寫成下列這樣的簡寫（語法糖）
        // 但若要改變 key 的名稱，就要完整寫出：
        // return {
        //   year: nowDateYear,
        //   month: nowDateMonth,
        // };
        return {
          nowDateYear,
          nowDateMonth,
        };
      };
      // console.log("getYM", getYM());

      const YM = getYM();
      // console.log("YM", YM);

      // 後端回傳數量最多的前 3 筆訂單資料
      const { data } = await backApi.get("/order/topOrder", {
        params: {
          date: {
            year: YM.nowDateYear,
            month: YM.nowDateMonth,
          },
        },
      });

      const rspTopDogsData = data.result;
      // console.log("rspTopDogsData", rspTopDogsData);

      // 同時更新預先建立的 pinia 的資料
      topThreeDogsData.value = rspTopDogsData;
      // console.log("topThreeDogsData", topThreeDogsData.value);

      return rspTopDogsData;
    } catch (error) {
      console.log("尋找訂單前3名狗狗，發生錯誤", error);
    }
  };

  // ====== 以下預計移動到其他地方(後端?)======
  // 預設要回傳的資料
  const orderStatus = ref("");

  // ● 訂單修改（預計要移到操作頁面，這邊不留）
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
    topThreeOrder,
    edit,
  };
});
