/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// router.beforeEach ( async (要去哪裡, 從哪裡來, 重新導向) => {} ) 每次進入頁面"前"，執行函式
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // 進入頁面後的第一次/初始導航
  if (from === START_LOCATION) {
    // 向後端取使用者的資料
    await user.profile()
  }

  // .includes(to.path) 表示要前往的頁面路徑
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 重新導向至首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 跳出需登入提示
    alert('您需要登入才能進行預約')
    // 導向至登入頁面
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

// router.afterEach ( (要去哪裡, 從哪裡來) => {} ) 每次進入頁面"後"，執行指定動作
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
