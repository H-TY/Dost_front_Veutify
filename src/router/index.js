/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHashHistory,
  START_LOCATION,
} from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { useUserStore } from "@/stores/user";
import { useThemeSettingStore } from "@/stores/themeSettings.js";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: setupLayouts(routes),
});

console.log("router\index.js_router", router.getRoutes());

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

// ▲ router.beforeEach ( async (要去哪裡, 從哪裡來, 重新導向) => {} ) 每次進入頁面"前"，執行函式
router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  const themeSettingStore = useThemeSettingStore();

  // ● 進入頁面後的第一次/初始導航
  if (from === START_LOCATION) {
    // 向後端取使用者的資料
    await user.profile();
    // 向後端取使用者的設定資料
    await themeSettingStore.settingProfile();
  }

  // ● .includes(to.path) 表示要前往的頁面路徑
  if (user.isLogin && ["/register", "/login"].includes(to.path)) {
    // 重新導向至首頁
    next("/");
  } else if (to.meta.login && !user.isLogin) {
    // 跳出需登入提示
    alert("您需要登入才能進行預約");
    // 導向至登入頁面
    next("/login");
  } else if (to.meta.admin && !user.isAdmin) {
    next("/");
  } else {
    next();
  }

  // ● 從 userZone 使用者後台 "前往首頁前"，移除 localStorage 內儲存的指定資料 localStorage.removeItem('')
  // localStorage 儲存資料的 code 寫在，@/layouts/userZone.vue:153
  if (to.path === "/") {
    localStorage.removeItem("isFirstEnter");
  }
});

// ▲ router.afterEach ( (要去哪裡, 從哪裡來) => {} ) 每次進入頁面"後"，執行指定動作
router.afterEach((to, from) => {
  // ● 當進入頁面後，自動滾動至頁面頂部
  document.title = to.meta.title;
  window.scrollTo(0, 0);
});

export default router;
