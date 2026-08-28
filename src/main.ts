/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// 引用 scss 檔案
import "@/styles/style.scss"; // 引用自定義的 SCSS 樣式檔案，後續 vite 打包時會自動處理轉譯成 CSS 檔案

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
