import axios from "axios";
import { useUserStore } from "@/stores/user";

// 自己寫 axios 的 use（建立自己的 axios）
// baseURL 設定基準的網址，可設成自己的後端 api，後續內容只要設定相對路徑即可
const backApi = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// 發登入請求，會走這邊的 api 路徑
// 所有登入後需要執行操作的部分，都走　apiAuth，可以省去寫帶證明 token 的 code
const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// apiAuth 設置 axios 攔截器
// 請求攔截發至後端的資訊，並在原本的資訊 "加上 toke 資訊（認證資訊）" 後，再發送至後端
// ● 攔截器的執行"請求/回應"流程
// 1. axios.get / axios.post
// 2. interceptors.request
// 3. 執行完攔截器請求的動作後，才會送出
// 4. interceptors.response
// 5. .then() .catch()
// config 代表這次請求的設定（目標網址、請求方式(get、post...等)、資料...等）
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore(); // 必須放在函式裡，放外面的話，user 的資料會保持在剛進網頁的狀態
  // 用 'Bearer ' + user.token 覆蓋掉 config.headers.Authorization 原先的值
  config.headers.Authorization = "Bearer " + user.token;
  return config; // 這邊的 config 已經是修改後的東西
});

// ● 攔截器的執行"回應/回來"流程
// res 代表回來的請求
// apiAuth.interceptors.response.use ( ()=>{}, ()=>{} ) 參數放 2 個函式
// ● 攔截器的執行完整流程 ↓
// 1. apiAuth.get(/user/profile)
// 2. apiAuth.interceptors.request  自動加上 JWT（指執行上述的攔截 code）
// 3. 傳送出去
// 4. apiAuth.interceptors.response(成功處理, 失敗處理)
// 5. 如果成功，回傳收到的資料，結束
// 6. 如果失敗，且是登入過期，自動傳送舊換新
// 7. 舊換新成功，修改 apiAuth.get(/user/profile) 的 jwt 後重新送出
// 8. 舊換新失敗，回傳 apiAuth.get(/user/profile) 的錯誤
apiAuth.interceptors.response.use(
  (res) => {
    // 如果成功收到回傳資料，就直接送出收到的資料
    return res;
  },
  async (error) => {
    // 如果失敗有回應 (網路斷線也算是失敗，網路斷線不會有回應)
    if (error.response) {
      // 如果得到登入過期的回應訊息，且 URL 的網址不是舊換新的網址
      if (
        error.response.data.message === "登入過期" &&
        error.config.url !== "/user/extend"
      ) {
        const user = useUserStore();
        try {
          // 傳送舊換新請求
          const { data } = await apiAuth.patch("/user/extend");
          // 舊換新成功，更新 store 的 token（data.result 指的是後端的 controllers/user.js 的 extend 的 result）
          user.token = data.result;
          // 修改原本發生錯誤的請求的設定
          error.config.headers.Authorization = "Bearer " + user.token;
          // 重新傳送一次原本的請求
          return axios(error.config);
        } catch (_) {
          // 舊換新錯誤，登出
          user.logout();
        }
      }
    }
    // 回傳原本請求的錯誤到呼叫 apiAuth 的地方
    return Promise.reject(error);
  }
);

export const useApi = () => {
  return { backApi, apiAuth };
};
