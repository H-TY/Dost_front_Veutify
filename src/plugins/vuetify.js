/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css"; // 提供 Vuetify Icon 元件（如 <v-icon>) 所需的字型和 CSS
import "vuetify/styles"; // 元件的預設樣式、Grid、RWD 斷點支援
import "@/styles/style.scss"; // 引用自定義的 SCSS 樣式檔案，後續 vite 打包時會自動處理轉譯成 CSS 檔案

// Composables
import { createVuetify } from "vuetify";

// 翻譯成地區語言(中文)
import { zhHant } from "vuetify/locale";

// component
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { VCalendar } from "vuetify/labs/VCalendar";

// 使用共用的斷點設定
import { setBreakpoints } from "@/styles/setBreakpoints";
// console.log('vuetify setBreakpoints:', setBreakpoints)

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  // 這邊的斷點控制的是 JavaScript Display Service，例如：$vuetify.display.sm、$vuetify.display.mobile、useDisplay() 之類的 JS 層級（useDisplay(), v-if, component behaviors）
  display: {
    mobileBreakpoint: "sm", // 寬度 < 576px 都算 mobile
    thresholds: setBreakpoints,
  },
  // 預設元素樣式
  defaults: {
    VBtn: {
      ripple: false, // 關閉按鈕水波紋效果
      variant: "plain", // 預設按鈕樣式為 plain
    },
    VSheet: {
      class: "bg-transparent", // 預設 VSheet 元件背景 none
    },
  },
  // 啟用 TimePicker 元件
  components: {
    VTimePicker,
    VCalendar,
  },
  // 設定翻譯成地區語言(中文)
  locale: {
    locale: "zhHant",
    messages: { zhHant },
  },
});
