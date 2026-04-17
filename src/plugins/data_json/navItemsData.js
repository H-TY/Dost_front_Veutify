// ● 默認導出/匿名函數 export default () => {...}
// 引用在 .vue 檔時，可以任意名 → import AAA from '@/composables/adminNavItems'
// 調用導入的函數 const { logo, navItems } = AAA()
// 適合簡單的情況，尤其是當導出的是一個簡單的匿名函數，且不需要在模塊內部引用該函數。

// ● 命名導出 export const AdminNavItems = () => {...}
// 引用在 .vue 檔時，需與命名一致 → import { AdminNavItems } from '@/composables/adminNavItems'
// 調用導入的函數 const { logo, navItems } = AdminNavItems()
// 適合需要重複使用、提高可讀性或遵循一致性風格的場合。

// export default () => {

//   // Logo
//   const logo = { to: '/admin', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }

//   // 導覽列項目
//   const navItems = [
//     { to: '/', text: '返回首頁', icon: 'mdi-home' },
//     { to: '/admin/dogInfo', text: '狗狗資訊', icon: 'mdi-dog' },
//     { to: '/admin/manageBooking', text: '預約管理', icon: 'mdi-list-box' },
//   ]

//   return {
//     logo,
//     navItems
//   }
// }

// ● 輸出 Logo
export const logo = {
  to: "/",
  img: new URL("@/assets/Dost_logo.png", import.meta.url).href,
  desc: "logo_img",
};

// ● 輸出 admin 導覽列項目
export const adminNavItems = [
  {
    to: "/admin",
    text: "管理首頁",
    icon: "mdi-view-dashboard",
    desc: "歡迎使用管理後台，您可以在此管理狗狗資訊並查看所有預約訂單。",
  },
  {
    to: "/admin/dogInfo",
    text: "狗狗資訊",
    icon: "mdi-dog",
    desc: "新增或編輯狗狗資料，管理每隻狗狗的基本資訊與介紹內容。",
  },
  {
    to: "/admin/manageBooking",
    text: "預約管理",
    icon: "mdi-list-box",
    desc: "查看所有狗狗預約訂單，掌握預約時間與訂單狀態。",
  },
];

// ● 輸出 userZone 導覽列項目
export const userZoneNavItems = [
  { to: "/", text: "回首頁", icon: "mdi-home" },
  { to: "/userZone", text: "會員基本資料", icon: "mdi-list-box" },
  { to: "/userZone/dogBookingSearch", text: "預約狗狗查詢", icon: "mdi-dog" },
  { to: "/", text: "狗狗適性測試結果", icon: "mdi-tooltip-edit" },
  { to: "/", text: "設定", icon: "mdi-cog-outline" },
  // { to: '/', text: '預約住宿查詢', icon: 'mdi-bed' },
  // { to: '/', text: '喜愛商品追蹤', icon: 'mdi-heart' },
  // { to: '/', text: '訂單查詢', icon: 'mdi-text-box-search' },
];
