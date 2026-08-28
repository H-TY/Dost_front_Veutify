// 這邊為共享 "主題樣式" 的 store，主要用於在不同組件之間共享主題顏色的狀態和相關邏輯

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useApi, themeSettingsApi } from "@/api";
import { useUserStore } from "@/stores/user";
import type { ApiError, ThemeSettings, ThemeSettingsData } from "@/types";
import { isAxiosError } from "axios";

export const useThemeSettingStore = defineStore(
  "ThemeSetting",
  () => {
    const { apiAuth } = useApi();
    const { settingSaveApi, settingProfileApi } = themeSettingsApi();
    const userStore = useUserStore();

    // ● 綁定控制主題顏色的按鈕
    const switchContrl = ref<ThemeSettings["themeColor"]>("default");

    // ● 綁定控制文字大小的滑稈
    const fontSizeContrl = ref<ThemeSettings["fontSize"]>(16);
    const minText = ref(14); // 文字最小值
    const maxText = ref(22); // 文字最大值

    // ● 恢復預設值函式
    const resetDefault = () => {
      switchContrl.value = "default";
      fontSizeContrl.value = 16;
    };

    // ● 對於唯一資料／狀態來源的變數，統一修改窗口，所有修改值都「必須經過這個函式」，可以集中控制邏輯
    const changeStoreValue = ({ themeColor, fontSize }: ThemeSettings) => {
      if (themeColor !== undefined) {
        switchContrl.value = themeColor;
      }

      if (fontSize !== undefined) {
        fontSizeContrl.value = fontSize;
      }
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
    const settingSave = async (passInData: ThemeSettingsData) => {
      if (!userStore.isLogin) return;

      try {
        const { data } = await settingSaveApi(passInData);
        // console.log("stores_themeSettings_settingSave_data", data);

        // ● 更新 store 狀態
        switchContrl.value = data.result.settings.themeColor;
        fontSizeContrl.value = data.result.settings.fontSize;

        return {
          message: data.message,
        };
      } catch (error) {
        // console.log("stores_themeSettings_settingSave_error", error);

        let errorMessage = "";

        if (isAxiosError<ApiError>(error)) {
          if (error.code === "ECONNABORTED") {
            errorMessage = "請求逾時，請稍後再試";
          }

          errorMessage =
            error?.response?.data.message ?? "settings 表單送出，發生未知錯誤";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = "發生未知錯誤";
        }

        throw new Error(errorMessage);
      }
    };

    // ● 向後端請求完整的 "使用者設定" 資料
    const settingProfile = async () => {
      if (!userStore.isLogin) return;

      try {
        // ● 傳入使用者 id，提供 id 讓後端查詢是否有對應的 "使用者設定" 資料
        const { data } = await settingProfileApi(userStore.id);
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
        // console.log("stores_themeSettings_settingProfile_error", error);
        // 發生錯誤，恢復預設值
        resetDefault();
      }
    };

    return {
      switchContrl,
      fontSizeContrl,
      minText,
      maxText,
      themeColorCss,
      resetDefault,
      changeStoreValue,
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
