// ● 默認導出/匿名函數 export default () => {...}
// 引用在 .vue 檔時，可以任意名 → import AAA from '@/composables/adminNavItems'
// 調用導入的函數 const { logo, navItems } = AAA()
// 適合簡單的情況，尤其是當導出的是一個簡單的匿名函數，且不需要在模塊內部引用該函數。

// ● 命名導出 export const AdminNavItems = () => {...}
// 引用在 .vue 檔時，需與命名一致 → import { AdminNavItems } from '@/composables/adminNavItems'
// 調用導入的函數 const { logo, navItems } = AdminNavItems()
// 適合需要重複使用、提高可讀性或遵循一致性風格的場合。

export default () => {

  // Logo
  const logo = { to: '/admin', img: new URL('@/assets/Dost_logo.png', import.meta.url).href }

  // 導覽列項目
  const navItems = [
    { to: '/', text: '返回首頁', icon: 'mdi-home' },
    { to: '/admin/dogInfo', text: '狗狗資訊', icon: 'mdi-dog' },
    { to: '/admin/manageBooking', text: '預約管理', icon: 'mdi-list-box' },
  ]

  return {
    logo,
    navItems
  }
}
