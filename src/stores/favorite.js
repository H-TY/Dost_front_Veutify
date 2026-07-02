// 建立我的最愛 / 商品追蹤狀態

import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "@/composables/axios";
import { useUserStore } from "./user";

export const useFavoriteStore = defineStore(
  "useFavoriteData",
  () => {
    const { apiAuth, backApi } = useApi();
    const userStore = useUserStore();

    const clickedId = ref("");

    // ★ 儲存最愛資料，用來全域同步資料狀態，避免其他頁面資料不一致
    const favoriteData = ref({
      dogLike: [],
      productLike: [],
    });

    // ● 添加 狗狗收藏/追蹤商品 API 函式
    const addFavoriteAPI = async (cat, id) => {
      const { data } = await apiAuth.post("/favorite/add", {
        type: cat,
        id,
      });
      // console.log("addFavoriteAPI_Data", data);

      return data;
    };

    // ● 移除 狗狗收藏/追蹤商品 API 函式
    const removeFavoriteAPI = async (cat, id) => {
      const { data } = await apiAuth.post("/favorite/remove", {
        type: cat,
        id,
      });
      // console.log("removeFavoriteAPI_Data", data);

      return data;
    };

    // ● 點擊 icon 添加或移除 狗狗收藏 / 商品追蹤的資料
    const toggleLike = async (passInCat, passInId) => {
      try {
        if (!userStore.isLogin) {
          throw new Error("使用 <<收藏/追蹤>> 功能，請先登入會員");
        }

        // 目前點擊的 id
        clickedId.value = passInId;

        // ◇ 狗狗收藏處理
        if (passInCat === "dog") {
          const findIndex = favoriteData.value.dogLike.findIndex(
            (el) => el === passInId,
          );

          if (findIndex === -1) {
            // 傳送至後端
            const res = await addFavoriteAPI(passInCat, passInId);

            // 更新 store 的資料
            favoriteData.value.dogLike = res.result.dogLike;
          } else {
            // favoriteData.value.dogLike.splice(findIndex, 1);
            const res = await removeFavoriteAPI(passInCat, passInId);

            // 更新 store 的資料
            favoriteData.value.dogLike = res.result.dogLike;
          }

          // ◇ 商品追蹤處理
        } else if (passInCat === "product") {
          const findIndex = favoriteData.value.productLike.findIndex(
            (el) => el === passInId,
          );

          if (findIndex === -1) {
            const res = await addFavoriteAPI(passInCat, passInId);

            // 更新 store 的資料
            favoriteData.value.productLike = res.result.productLike;
          } else {
            const res = await removeFavoriteAPI(passInCat, passInId);

            // 更新 store 的資料
            favoriteData.value.productLike = res.result.productLike;
          }
        }

        return {
          success: true,
          msg: "成功加入/移除 <<狗狗收藏/追蹤商品>>",
        };
      } catch (error) {
        // console.log("error：", error);
        // console.log("error：", error.response.data.message);

        return {
          success: false,
          msg:
            error?.message ||
            error.response.data.message ||
            "點擊 like icon 發生錯誤",
        };
      }
    };

    // ● 向後端發送要儲存的資料
    const favoriteSave = async () => {
      try {
        console.log("favoriteSave_values", favoriteData.value);

        const { data } = await apiAuth.put("/favorite", favoriteData.value);
        console.log("favoriteSave_data", data);
      } catch (error) {
        console.log("favoriteSave_error：", error.response.data.message);
      }
    };

    // ● 呼叫我的最愛資料
    const getFavorite = async () => {
      if (!userStore.isLogin) return; // 沒有登入的話，不執行

      const { data } = await apiAuth.get("/favorite/profile");
      // console.log("getFavorite_data：", data);

      if (data.success) {
        // 更新 store 的資料
        favoriteData.value.dogLike = data.result.dogLike;
        // favoriteData.value.productLike = data.result.productLike;
      } else {
        // 當回傳的資料 success 為 false 時，為"資料庫未有此使用者的 <<收藏狗狗/追蹤商品>> 相關資料"
        return;
      }
    };

    // ● 恢復預設值函式
    const resetDefault = () => {
      favoriteData.value.dogLike = [];
      favoriteData.value.productLike = [];
    };

    return {
      clickedId,
      favoriteData,
      toggleLike,
      favoriteSave,
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
