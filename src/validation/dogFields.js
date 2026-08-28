import * as yup from "yup";
import validator from "validator";

// ● 定義 "狗狗資訊" 表格欄位
export const dogFields = {
  dogName: yup.string().required("狗狗名字必填"),
  age: yup
    .number()
    .required("狗狗年齡必填")
    .typeError("年齡格式錯誤，請輸入數字")
    .min(0, "年齡不能小於 0"),
  price: yup
    .number()
    .required("預約價格必填")
    .typeError("商品價格格式錯誤，請輸入數字")
    .min(0, "商品價格不能小於 0"),
  booking: yup.string("").required("預約狀態必填"),
  bookingTime: yup.array().of(yup.string().required("請輸入時段")),
  feature: yup.string().required("狗狗性格、特徵必填"),
  story: yup.string().required("狗狗背景故事必填"),
  vaccine: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("疫苗名稱必填"),
        date: yup.string().required("接踵日期必填寫"),
        hospital: yup.string().required("接踵醫院必填寫"),
      }),
    )
    .min(1, '至少需要一筆記錄或選擇"無疫苗紀錄"')
    .required("疫苗接踵記錄必填"),
  // 是否上架
  sell: yup.boolean(),
};
