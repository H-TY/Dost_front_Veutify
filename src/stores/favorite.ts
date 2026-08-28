// 建立我的最愛 / 商品追蹤狀態

import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi, favoriteApi } from "@/api";
import { useUserStore } from "./user";
import { isAxiosError } from "axios";
import type { ApiError, FavoriteData } from "@/types";

export const useFavoriteStore = defineStore(
  "useFavoriteData",
  () => {
    const { apiAuth, backApi } = useApi();
    const { addFavoriteApi, removeFavoriteApi, getFavoriteApi } = favoriteApi();
    const userStore = useUserStore();

    const clickedId = ref("");

    // ★ 儲存最愛資料，用來全域同步資料狀態，避免其他頁面資料不一致
    const favoriteData = ref<FavoriteData>({
      dogLike: [],
      productLike: [],
    });

    // ● 點擊 icon 添加或移除 狗狗收藏 / 商品追蹤的資料
    const toggleLike = async (type: string, id: string) => {
      try {
        if (!userStore.isLogin) {
          throw new Error("使用 <<收藏/追蹤>> 功能，請先登入會員");
        }

        // 目前點擊的 id
        clickedId.value = id;

        // 用來保存執行後的狀態和資訊，以利後續資訊的輸出
        let result = null;
        function returnData(success: boolean, message: string) {
          return {
            success,
            message,
          };
        }

        // ◇ 狗狗收藏處理
        if (type === "dog") {
          const findIndex = favoriteData.value.dogLike.findIndex(
            (el) => el === id,
          );

          if (findIndex === -1) {
            // 傳送至後端
            const { data } = await addFavoriteApi(type, id);
            // console.log("dog_add_data", data);

            // 更新 store 的資料
            favoriteData.value.dogLike = data.result.dogLike;

            result = returnData(data.success, data.message);
          } else {
            // favoriteData.value.dogLike.splice(findIndex, 1);
            const { data } = await removeFavoriteApi(type, id);
            // console.log("dog_remove_data", data);

            // 更新 store 的資料
            favoriteData.value.dogLike = data.result.dogLike;

            result = returnData(data.success, data.message);
          }

          // ◇ 商品追蹤處理
        } else if (type === "product") {
          const findIndex = favoriteData.value.productLike.findIndex(
            (el) => el === id,
          );

          if (findIndex === -1) {
            const { data } = await addFavoriteApi(type, id);

            // 更新 store 的資料
            favoriteData.value.productLike = data.result.productLike;

            result = returnData(data.success, data.message);
          } else {
            const { data } = await removeFavoriteApi(type, id);

            // 更新 store 的資料
            favoriteData.value.productLike = data.result.productLike;

            result = returnData(data.success, data.message);
          }
        }

        return result?.message;
      } catch (error) {
        // console.log("error：", error);
        // console.log("error：", error.response.data.message);

        // AxiosError：API / HTTP 請求相關錯誤，包含後端回傳的錯誤資訊
        if (isAxiosError<ApiError>(error)) {
          throw new Error(
            error?.response?.data.message ||
              error.message ||
              "點擊 like icon 發生錯誤",
          );
        } else if (error instanceof Error) {
          // 一般 Error：前端程式本身發生的錯誤
          throw new Error(error.message);
        } else {
          // 非 Error 物件，例如：前端內部程式寫 throw "錯誤"
          throw new Error("發生未知錯誤");
        }
      }
    };

    // ● 呼叫我的最愛資料
    const getFavorite = async () => {
      if (!userStore.isLogin) return; // 沒有登入的話，不執行

      try {
        const { data } = await getFavoriteApi();
        // console.log("getFavorite_data：", data);

        if (data.success) {
          // 更新 store 的資料
          favoriteData.value.dogLike = data.result.dogLike;
          // favoriteData.value.productLike = data.result.productLike;
        } else {
          // 當回傳的資料 success 為 false 時，為"資料庫未有此使用者的 <<收藏狗狗/追蹤商品>> 相關資料"
          return;
        }
      } catch (error) {
        console.log("getFavorite_error：", error);
        resetDefault();
      }
    };

    // ● 恢復預設值函式
    const resetDefault = () => {
      // console.log("重置 favorite");
      favoriteData.value.dogLike = [];
      favoriteData.value.productLike = [];
    };

    return {
      clickedId,
      favoriteData,
      toggleLike,
      getFavorite,
      resetDefault,
    };
  },
  {
    // ● 這一段「幫 Pinia/store 自動做 localStorage 永久化」，所以 favoriteData.dogLike 才能跨刷新存在；
    // 運作原理：頁面刷新時
    //  → Pinia/store 重建（空 state）
    //  → persist plugin 啟動
    //  → 自動從 localStorage 讀取 key 的值 value
    //  → 將讀取的 value 自動還原 paths 的位置
    // 設定保存在 local storage 的 key 叫做 favoriteDog
    // paths 指定要保存的資料 favoriteData.dogLike
    // paths: ["favoriteData.dogLike"] 的意思是：「請幫我把 state 裡叫 favoriteData.dogLike 的那一格資料存起來」
    persist: [
      {
        key: "favorite-dog",
        paths: ["favoriteData.dogLike"],
      },
      {
        key: "favorite-product",
        paths: ["favoriteData.productLike"],
      },
    ],
  },
);
