import * as yup from "yup";
import validator from "validator";

// ● 定義 "會員帳號" 表格欄位
export const accountFields = {
  account: yup
    .string()
    .required("使用者帳號必填")
    .min(4, "使用者帳號文字最少 4 個字")
    .max(20, "使用者帳號文字最多 20 個字")
    // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
    .test("驗證 account", "使用者帳號格式錯誤", (value) => {
      return validator.isAlphanumeric(value);
    }),
  password: yup
    .string()
    .required("密碼必填")
    .min(4, "使用者密碼最少 4 個字")
    .max(20, "使用者密碼最多 20 個字"),
  passwordConfirm: yup
    .string()
    .required("確認密碼必填")
    // .oneOf(陣列, 錯誤訊息) 只允許符合陣列內其中一個值
    // .ref('password') 代表這個 schema 的 password 的欄位值
    .oneOf([yup.ref("password")], "密碼不一致"),
  email: yup
    .string()
    .required("信箱必填")
    .test("驗證 Email", "使用者信箱格式錯誤", (value) => {
      return validator.isEmail(value);
    }),
  phone: yup.string(),
  birthday: yup.string(),
  nickname: yup
    .string()
    .min(4, "暱稱文字最少 4 個字")
    .max(20, "暱稱文字最多 20 個字")
    // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
    .test("驗證 nickname", "暱稱格式錯誤", (value) => {
      // ✔ 空值直接放行
      if (value === null || value === undefined) return true;

      // ✔ 長度檢查（避免 minLength 提前炸）
      if (value.length < 4 || value.length > 20) return false;

      // ✔ 格式檢查
      return validator.isAlphanumeric(value);
    }),
  image: yup.string(),
  accountBgImage: yup.string(),
};

// ● 定義 "訂單" 表格欄位
export const orderFields = {
  name: yup.string().required("預約人名字必填"),
  phone: yup.string().required("預約人電話必填"),
  dogName: yup.string().required("狗狗名字必填"),
  bookingDate: yup.string().required("預約日期必填"),
  bookingTime: yup.array().required("預約時段必填").min(1, "預約時段必填"), // 至少要有 1 個元素
  // totalBookingTime: yup
  //   .number()
  //   .required('預約總時數必填')
  //   .typeError('預約總時數格式錯誤')
  //   .min(1, '預約總時數不能小於 1'),
  // totalPrice: yup
  //   .number()
  //   .required('預約總金額必填')
  //   .typeError('預約總金額格式錯誤')
  //   .min(1, '預約總金額不能小於 1'),
  accountName: yup.string().required("帳戶名稱必填"),
  orderStatus: yup.boolean().required("訂單狀態必填"),
};

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
