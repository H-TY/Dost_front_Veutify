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

// ● 輸出 登入/註冊 導覽列項目
export const regLogin = (userIsLogin, isAdmin) => {
  return [
    {
      to: "/register",
      text: "註冊",
      icon: "mdi-account-plus",
      show: !userIsLogin && !isAdmin,
    },
    {
      to: "/login",
      text: "登入",
      icon: "mdi-account-circle",
      show: !userIsLogin && !isAdmin,
    },
    {
      to: "/userZone",
      text: "會員專區",
      icon: "mdi-account-box",
      show: userIsLogin && !isAdmin,
    },
    {
      to: "/admin",
      text: "管理區",
      icon: "mdi-account-tie",
      show: userIsLogin && isAdmin,
    },
  ];
};

// ● 輸出 home 導覽列項目
// 因為需要用到 store/user.js 的資料，改成使用函式，在使用頁面導入 store 的資料
// 避免在此檔案直接 useUserStore()，因為此檔案可能在 Pinia 初始化前就被載入，
export const homeNavItems = (userIsLogin) => {
  return [
    {
      to: "/",
      text: "Home",
      icon: "mdi-home",
      show: true,
    },
    {
      to: "/coolDogs",
      text: "帥氣狗狗",
      icon: "mdi-dog",
      show: true,
    },
    {
      to: "/booking",
      text: "預約時間",
      icon: "mdi-calendar-clock",
      show: true,
    },
    // {
    //   to: "/test",
    //   text: "狗狗適性測驗",
    //   icon: "mdi-dog-side",
    //   show: true,
    // },
    // { to: '/shop', text: '寵物用品', icon: 'mdi-store', show: true },
    // { to: '/cart', text:'購物車', icon:'mdi-cart-variant', show: user.isLogin},
  ];
};

// ● 輸出 admin 導覽列項目
export const adminNavItems = [
  {
    to: "/admin",
    title: "管理首頁",
    icon: "mdi-view-dashboard",
    desc: "歡迎使用管理後台，您可以在此管理狗狗資訊並查看所有預約訂單。",
  },
  {
    to: "/admin/dogInfo",
    title: "狗狗資訊",
    icon: "mdi-dog",
    desc: "新增或編輯狗狗資料，管理每隻狗狗的基本資訊與介紹內容。",
  },
  {
    to: "/admin/manageBooking",
    title: "預約管理",
    icon: "mdi-list-box",
    desc: "查看所有狗狗預約訂單，掌握預約時間與訂單狀態。",
  },
  {
    to: "/settingsConfig",
    title: "設定",
    icon: "mdi-cog-outline",
    desc: "調整您的使用偏好與系統設定",
  },
];

// ● 輸出 userZone 導覽列項目
export const userZoneNavItems = [
  { to: "/", title: "回首頁", icon: "mdi-home" },
  { to: "/userZone", title: "帳戶總覽", icon: "mdi-list-box" },
  { to: "/userZone/dogBookingSearch", title: "預約查詢", icon: "mdi-dog" },
  { to: "/userZone/favorite", title: "收藏夾", icon: "mdi-heart" },
  // { to: "/userZone/adaptiveTestResult", title: "測驗結果", icon: "mdi-tooltip-edit", },
  { to: "/settingsConfig", title: "設定", icon: "mdi-cog-outline" },
  // { to: '/', title: '預約住宿查詢', icon: 'mdi-bed' },
  // { to: '/', title: '訂單查詢', icon: 'mdi-text-box-search' },
];
