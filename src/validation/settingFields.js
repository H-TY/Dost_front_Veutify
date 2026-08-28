import * as yup from "yup";
import validator from "validator";

// ● 定義 "設定" 表格欄位
export const settingFields = {
  userId: yup.string().required("使用者 ID 必填"),
  settings: yup
    .object({
      themeColor: yup
        .string()
        .oneOf(["default", "green-theme"], "themeColor 無效，輸入非指定值"),
      fontSize: yup
        .number()
        .typeError('資料型態必須為 "數字"')
        .integer("數字必須為整數")
        .min(12, "文字 size 最小值 12")
        .max(28, "文字 size 最大值 28"),
    })
    .required(""),
};
