import fs from "node:fs";
import path from "node:path";

// 設定統一的響應式斷點，給 plugins/vuetify 和 SCSS 使用
// 這邊修改後，plugins/vuetify 和 SCSS 都會同步更新
export const setBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// 產生斷點`$grid-breakpoints 的 scss 檔案，提供給 style/_mixins.scss 使用
// $grid-breakpoints 的斷點用於控制 Vuetify CSS Utility (class、grid、mixins)，例如：.d-sm-none、.text-lg-h4、grid cols
// 不設定 xs 斷點，避免 Vuetify 的 Utility class 從 d-xs-{value} 開始生成樣式，導致 d-flex 無效（所有沒有寫斷點的樣式都無效）
export function generateBreakpointsScss() {
  return {
    name: "generate-breakpoints-scss",
    buildStart() {
      const sassGridBPContent = `$grid-breakpoints: (
        // xs: ${setBreakpoints.xs}px,
        mobile: ${setBreakpoints.sm}px,
        sm: ${setBreakpoints.sm}px,
        md: ${setBreakpoints.md}px,
        lg: ${setBreakpoints.lg}px,
        xl: ${setBreakpoints.xl}px,
        xxl: ${setBreakpoints.xxl}px
      ) !default;`;

      // 設定檔案最終輸出的路徑
      const filePath = path.resolve("src/styles/_breakpoints.scss");
      fs.writeFileSync(filePath, sassGridBPContent);
    },
  };
}
