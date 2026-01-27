/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/stores";
import router from "@/router";

// ● UI方塊跳出提示
import VuetifyUseDialog from "vuetify-use-dialog";

// ● 引用上傳檔案套件(可拖曳並預覽圖片和顯示檔案大小)
import VueFileAgentNext from "@boindil/vue-file-agent-next";
import "@boindil/vue-file-agent-next/dist/vue-file-agent-next.css";

// ● 引用 Swiper 套件以及相關檔案
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ● 引用 GSAP 核心以及其套件
import { gsap } from "gsap";
// 啟用 ScrollSmoother 必須搭配 ScrollTrigger 套件
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// 讓 JS 模組全域皆可以使用，不用另外再寫一次註冊
// 告訴 GSAP：「這些是我之後可能會用到的功能模組」
// 要注意！雖然這邊已經註冊 plugin，但僅在 gsap 裡使用，例如：
// gsap.to({ scrollTrigger: {})，程式會知道要怎麼使用 scrollTrigger
// 若是要單獨使用 plugin 的變數，例如：ScrollTrigger.refresh()，需在要應用的檔案裡做引進的動作 import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 要輸出，才能被其他文件引進使用
export default gsap;

// 讓 Vue 應用程式的全域皆可以使用。
export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia) // 就像安裝倉庫系統(倉庫系統放進 Vue 裡)
    .use(VuetifyUseDialog, {
      snackbar: {
        // 不顯示"關閉按鈕"
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
        },
      },
    })
    .use(VueFileAgentNext);

  // 註冊為全域元件(可以直接當作標籤使用，不用另外 import)
  app.component("Swiper", Swiper);
  app.component("SwiperSlide", SwiperSlide);
}
