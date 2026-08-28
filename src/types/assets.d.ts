// 自訂「專案資產型別宣告檔」，用來告訴 TypeScript 某些不是 .ts/.js 的檔案，也可以被 TypeScript 程式 import，以及它們是什麼型別。

// ============================================================
// 專案全域 TypeScript 型別宣告
// ============================================================

// ● CSS / Virtual Module
// ============================================================
declare module "*.css";
declare module "vuetify/styles";
declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";
declare module "virtual:generated-layouts";
declare module "@/layouts/admin.vue";
declare module "@/layouts/userZone.vue";

// ● TypeScript 無法解析，暫時權變處理（臨時宣告）
// ============================================================
declare module "@boindil/vue-file-agent-next"; // 第三方套件已有型別，但 package.json 沒有將 types 的欄位 exports，目前只能暫時這樣處理錯誤。

// ● 型別擴充
// ============================================================
// import "vue-router";
// declare module "vue-router" {
//   interface RouteMeta {
//     title: string;
//   }
// }

// ● 待處理
// ============================================================
declare module "node:fs";
declare module "node:path";
