// 建立 "使用者資料狀態"

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import UserRole from "@/enums/UserRole";
import { useThemeSettingStore } from "@/stores/themeSettings.js";
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from "@/composables/axios";

export const useUserStore = defineStore(
  "User",
  () => {
    const { backApi, apiAuth } = useApi();
    const themeSettingStore = useThemeSettingStore();

    // 設定 pinia 的資料欄位
    // 要從後端取得的資料（要與後端回傳的資料一致）
    const token = ref("");
    const id = ref("");
    const account = ref("");
    const image = ref("");
    const accountBgImage = ref("");
    const nickname = ref("");
    const phone = ref("");
    const birthday = ref("");
    const email = ref("");
    const role = ref(UserRole.USER); //預設值 UserRole.USER
    const cart = ref(0);

    // 判斷是否為登入狀態
    const isLogin = computed(() => {
      return token.value.length > 0;
    });

    // 判斷是否為管理員狀態
    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN;
    });

    // ### 補充知識：呼叫後端 API，參數說明
    // - POST 新增
    // 寫法 .post(url, data, { params: {} })
    // - GET  查詢
    // 寫法 .get(url, { params: {} }) 沒有 body，所以通常只用 params。
    // - PATCH  修改（只修改我提供的欄位）
    // 寫法 .patch(url, data, { params: {} })
    // - PUT  修改（送來的資料，取代整筆資源）
    // 寫法 .put(url, data, { params: {} })
    // - DELETE 刪除
    // 寫法 .delete(url, { params: {} })／.delete(url, { data: {} })／.delete(url, { data: {}, params: {} })
    // 第一個參數是 url；第二個參數是 body；第三個參數是 config（裡面可放 params、headers...）
    // post、patch 以及 Put 可接受 3 個參數；get 和 delete 只接受 2 個參數

    // ● 登入動作
    const login = async (values) => {
      try {
        // values 指的是使用者填寫完後發送的表格
        // 這裡的 { data } 指的是 login後，後端回傳的資料（參照 controllers/user.js 的 login 部分）
        const { data } = await backApi.post("/user/login", values);
        // console.log("login_data_result", data.result);

        // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料
        token.value = data.result.token;
        id.value = data.result.id;
        account.value = data.result.account;
        image.value = data.result.image;
        accountBgImage.value = data.result.accountBgImage;
        nickname.value = data.result.nickname;
        phone.value = data.result.phone;
        birthday.value = data.result.birthday;
        email.value = data.result.email;
        role.value = data.result.role;
        cart.value = data.result.cart;

        // 向後端取使用者的設定資料
        await themeSettingStore.settingProfile();

        return "登入成功";
      } catch (error) {
        console.log(error);
        return error?.response?.data?.message || "發生錯誤，請稍後再試";
      }
    };

    // ● 向後端請求資料
    // store 的特性：頁面刷新後，所有已儲存的資料會重置！
    // 所以這邊的 profile 在 router\index.js:48 有呼叫，可以在 "進入頁面後的第一次/初始導航" 時，向後端請求資料，再將這些資料加回來/還原使用者資料
    const profile = async () => {
      if (!isLogin.value) return; // 沒有登入的話，return 不執行

      try {
        // 如果不另外設定一個新的 apiAuth，需要寫成 ↓
        // const { data } = await apiAuth.get('/user/profile', {
        //   headers: {
        //     Authorization: 'Bearer ' + token.value
        //   }
        // })
        // 且登入後的每一個操作（新增商品、商品放入購物車、結帳...等請求動作），都需要帶(寫)著這個 headers 的證明，故用新設的一個 apiAuth 來簡化 code
        const { data } = await apiAuth.get("/user/profile");
        // console.log("profile_data_result", data.result);

        id.value = data.result.id;
        account.value = data.result.account;
        image.value = data.result.image;
        accountBgImage.value = data.result.accountBgImage;
        nickname.value = data.result.nickname;
        phone.value = data.result.phone;
        birthday.value = data.result.birthday;
        email.value = data.result.email;
        role.value = data.result.role;
        cart.value = data.result.cart;
      } catch (error) {
        // 如果發生錯誤，將資料清空
        token.value = "";
        id.value = "";
        account.value = "";
        image.value = "";
        accountBgImage.value = "";
        nickname.value = "";
        phone.value = "";
        birthday.value = "";
        email.value = data.result.email;
        role.value = UserRole.USER;
        cart.value = 0;
      }
    };

    // ● 使用者編輯資料傳至後端修改資料庫
    const edit = async (values) => {
      // 因 values 為 FormData 物件，直接 console.log(values)，看不到東西，需用"迴圈"或使用擴展運算符（...）或 Array.from() 將這些鍵值對轉換為陣列，檢查陣列是否有有效的值。
      const valuesArray = [...values.entries()];
      // console.log("valuesArray", valuesArray);

      // 先判斷是否為登入狀態
      if (!isLogin.value) return;

      try {
        const { data } = await apiAuth.patch("/user/" + id.value, values);
        // console.log("store_data.result", data.result);

        // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料（同步更新修改後的資料）
        nickname.value = data.result.userUpdate.nickname;
        phone.value = data.result.userUpdate.phone;
        birthday.value = data.result.userUpdate.birthday;
        email.value = data.result.userUpdate.email;
        image.value = data.result.userUpdate.image;
        accountBgImage.value = data.result.userUpdate.accountBgImage;

        // 用來判斷是使用者"頭像" 還是 "背景圖"，決定後續要顯示的訊息 => 上傳圖片成功、恢復預設圖片
        const renewUserItem = data.result.renewUserItem;

        const replaytext = (renewUserItem) => {
          if (renewUserItem === "userPhoto") {
            return image.value.includes("database-1")
              ? "上傳圖片成功"
              : "恢復預設圖片";
          } else if (renewUserItem === "userAccountBg") {
            return accountBgImage.value.includes("database-1")
              ? "上傳圖片成功"
              : "恢復預設圖片";
          } else {
            return "使用者資料修改成功";
          }
        };

        return {
          // 要顯示的訊息
          text: replaytext(renewUserItem),
          // 回傳圖片更新資料
          reImage: image.value,
          reAccountBgImage: accountBgImage.value,
        };
      } catch (error) {
        console.log(error);

        throw new Error(
          error?.response?.data?.message ||
            "使用者資料修改發生未知錯誤，請稍後再試",
        );
      }
    };

    // ● 登出動作
    const logout = async () => {
      try {
        await apiAuth.delete("/user/logout");
      } catch (error) {
        console.log(error);
      }

      // 將 store 所有儲存的資料清空
      token.value = "";
      id.value = "";
      account.value = "";
      image.value = "";
      accountBgImage.value = "";
      nickname.value = "";
      phone.value = "";
      birthday.value = "";
      email.value = "";
      role.value = UserRole.USER;
      cart.value = 0;

      // 登出時，使用者設定恢復預設
      themeSettingStore.resetDefault();
    };

    return {
      token,
      id,
      account,
      image,
      accountBgImage,
      nickname,
      phone,
      birthday,
      email,
      role,
      cart,
      isLogin,
      isAdmin,
      login,
      profile,
      edit,
      logout,
    };
  },
  {
    // ● 這一段「幫 Pinia/store 自動做 localStorage 永久化」，所以 token 才能跨刷新存在；
    // 運作原理：頁面刷新時
    //  → Pinia/store 重建（空 state）
    //  → persist plugin 啟動
    //  → 自動從 localStorage 讀取 shop 的值
    //  → 自動還原 token
    // 設定保存在 local storage 的 key 叫做 shop、值(paths)保存 token 的資料
    // paths: ["token"] 的意思是：「請幫我把 state 裡叫 token 的那一格資料存起來」
    persist: {
      key: "shop",
      paths: ["token"],
    },
  },
);
