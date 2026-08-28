import { useApi } from "./axios";
import type { ThemeSettingsData, ApiRes } from "@/types";

export const themeSettingsApi = () => {
  const { apiAuth } = useApi();

  const settingSaveApi = (values: ThemeSettingsData) => {
    return apiAuth.post<ApiRes<ThemeSettingsData>>("/userSetting", values, {
      // 設定幾秒內沒收到後端回應，Axios 會將 Promise reject
      // 呼叫端的 await 遇到 rejected Promise 後會拋出錯誤，由 try/catch 捕捉
      timeout: 5000,
    });
  };

  const settingProfileApi = (value: string) => {
    return apiAuth.get<ApiRes<ThemeSettingsData>>(
      "/userSetting/settingProfile",
      {
        params: { userId: value },
      },
    );
  };

  return {
    settingSaveApi,
    settingProfileApi,
  };
};
