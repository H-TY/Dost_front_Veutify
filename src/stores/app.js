// 此 app.js 檔案作用與說明（就像是 "建立統整資料狀態倉庫"）
// * 定義一個 Pinia store：這裡用 defineStore 建立了一個名為 'app' 的 store 。
// * useAppStore 是你在組件中用來存取這個 store 的函式（Vue hook 風格）。
// 這個 store（指的是建立的 'app'）是整個應用程式（整個 Vue 應用程式）的 "全局資料狀態倉庫"。
// 後續會個別建立資料狀態（使用者資料狀態 user.js 、訂單資料狀態 bookingOrder.js ... 等），並匯聚到這裡供取用
// 用來統一管理一些跨組件會用到的資料（state），例如：
// - 使用者登入狀態 (token, isLogin)
// - 主題設定 (theme: 'dark' / 'light')
// - 購物車商品數量 (cartCount)
// - 全局通知訊息 (snackbarMessage)
// state：是 store 中存放的狀態資料（data）。

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
  }),
});
