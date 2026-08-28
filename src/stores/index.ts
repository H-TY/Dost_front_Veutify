// 此 index.js 作用與說明（就像是 "建立倉庫系統"）
// * 建立 Pinia 實例：createPinia() 會建立一個 Pinia 的管理器（store 的容器）。
// * 在後續於 main.js 或是 plugins\index.js 註冊 Pinia 實例，不過只是告訴 Vue，「我有一個全局狀態管理容器」，細部使用方式，在需使用資料狀態頁面引用相對應的資料狀態。
// ★ 使用插件：
// pinia.use(ppp) 是把 pinia-plugin-persistedstate 加入 Pinia。
// 這個插件可以幫助 store 資料 "自動儲存到 localStorage 或 sessionStorage"，刷新頁面也不會消失。

import { createPinia } from "pinia";
import ppp from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(ppp);

export default pinia;
