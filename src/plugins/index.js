/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
// UI方塊跳出提示
import VuetifyUseDialog from 'vuetify-use-dialog'
// 引用上傳檔案套件(可拖曳並預覽圖片和顯示檔案大小)
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'


export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VuetifyUseDialog, {
      snackbar: {
        // 不顯示"關閉按鈕"
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
        }
      }
    })
    .use(VueFileAgentNext)
}


