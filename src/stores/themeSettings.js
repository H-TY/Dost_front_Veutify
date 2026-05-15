// 這邊為共享 "主題樣式" 的 store，主要用於在不同組件之間共享主題顏色的狀態和相關邏輯

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useApi } from "@/composables/axios";
import { useUserStore } from "@/stores/user";

export const useThemeSettingStore = defineStore(
  "ThemeSetting",
  () => {
    const { apiAuth } = useApi();
    const userStore = useUserStore();

    // ● 綁定控制主題顏色的按鈕
    const switchContrl = ref("default");

    // ● 綁定控制文字大小的滑稈
    const fontSizeContrl = ref(16);
    const minText = ref(14); // 文字最小值
    const maxText = ref(22); // 文字最大值

    // ● 恢復預設值函式
    const resetDefault = () => {
      switchContrl.value = "default";
      fontSizeContrl.value = 16;
    };

    const themeColorCss = computed(() => {
      if (switchContrl.value === "green-theme") {
        return "green-theme";
      } else {
        return "default";
      }
    });

    // ### 補充知識：
    // watch 監聽 switchContrl 的變化，當其值改變時同步更新 localStorage 中 theme-color 的值
    // 不寫在上述的 themeColor，避免 computed 因自動重新計算，多次觸發更新 localStorage 的值或是造成 "副作用 side effect"。
    // 直接 localStorage，用其他帳號登入也會影響到主題顏色的設定，須改其他方法！！！
    // watch(switchContrl, (newValue) => {
    //   localStorage.setItem("theme-color", newValue ? "green" : "default");
    // });

    // ### 補充知識：
    // - 副作用 side effect 說明：執行一段程式時，除了「回傳結果」之外，還「改變了外部世界」（Vue 以外的東西）
    // - 判斷是否用 computed 👉「這段 code 有沒有直接去改 Vue 以外的東西？」
    //     沒有 → 計算（computed OK）
    //     有 → side effect（watch / method）

    // ● 向後端請求，存入 "使用者設定" 的資料
    const settingSave = async (passInData) => {
      if (!userStore.isLogin) return;

      try {
        const { data } = await apiAuth.post("/userSetting", passInData, {
          timeout: 5000, // 設定幾秒內沒收到後端的回應，axios 自動 Promise reject（axios 自己判定這次請求失敗，並把 async/await 丟進 catch）
        });
        // console.log("stores_themeSettings_settingSave_data", data);

        // ● 更新 store 狀態
        switchContrl.value = data.result.settings.themeColor;
        fontSizeContrl.value = data.result.settings.fontSize;

        return {
          message: data.message,
        };
      } catch (error) {
        console.log("stores_themeSettings_settingSave_error", error);

        let errorMessage = "";

        if (error?.response?.data?.message) {
          errorMessage = error?.response?.data?.message;
        } else if (error.code === "ECONNABORTED") {
          errorMessage = "請求逾時，請稍後再試";
        } else {
          errorMessage = "settings 表單送出，發生未知錯誤";
        }

        throw new Error(errorMessage);
      }
    };

    // ● 向後端請求完整的 "使用者設定" 資料
    const settingProfile = async () => {
      if (!userStore.isLogin) return;

      try {
        // ● 傳入使用者 id，提供 id 讓後端查詢是否有對應的 "使用者設定" 資料
        const { data } = await apiAuth.get("/userSetting/settingProfile", {
          params: { userId: userStore.id },
        });
        // console.log("stores_themeSettings_settingProfile_data", data);

        // ● 後端沒有使用者設定的資料，回傳 success: false
        if (!data.success) {
          return;
        } else {
          // ● 更新 store 狀態
          switchContrl.value = data.result.settings.themeColor;
          fontSizeContrl.value = data.result.settings.fontSize;
        }
      } catch (error) {
        console.log("stores_themeSettings_settingProfile_error", error);
      }
    };

    return {
      switchContrl,
      fontSizeContrl,
      minText,
      maxText,
      themeColorCss,
      resetDefault,
      settingSave,
      settingProfile,
    };
  },
  {
    // ● 這一段「幫 Pinia/store 自動做 localStorage 永久化」，所以才能跨刷新存在
    persist: {
      key: "settings",
      paths: ["switchContrl", "fontSizeContrl"],
    },
  },
);
