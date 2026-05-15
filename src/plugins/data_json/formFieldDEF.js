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
  phone: yup.string().test("驗證 phone", "電話格式錯誤", (value) => {
    if (!value) return true;
    return validator.isMobilePhone(value);
  }),
  birthday: yup
    .string()
    // d => digit 數字的縮寫語法
    // \（反斜線）作用，\ + 字母（/d） 表示「特殊語法：數字」；若直接寫 d 就只是表示字母 d
    // ■ 相關語法：
    // \d	數字 => [0-9]
    // \D	非數字 => [^0-9]
    // \w	英數字+底線 => [a-zA-Z0-9_]
    // \W	非上述
    // \s	空白（空格、tab）
    // \S	非空白
    // \d{4} 表示「剛好 4 個數字」
    // \d{2,4} 表示「2～4 個」
    // \d+「1 個以上」
    // \d*「0 個以上」
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: "格式必須為 YYYY-MM-DD",
      excludeEmptyString: true, // 如果是 "" → 直接跳過 regex 驗證
    })
    .test("驗證 birthday", "生日日期不存在", (value) => {
      // 當 value = ''、null、undefined 👉 這些都不是有效日期 → 直接不通過 false
      // 但是這邊要預設不填寫或維持原來的 value 也通過，故改為 true
      if (!value) return true;

      // 先將使用者輸入的日期拆成陣列，後續再轉換成 JS 格式的日期
      const [year, month, day] = value.split("-").map(Number);
      // JS 的月份計算方式：
      // 1 月	0
      // 2 月 1
      // 3 月 2
      // ...
      // 12 月 11
      // 所以這邊要 -1 才會等於使用者輸入的月份（例：使用者輸入 5 月，SJ 月份則是為 4）
      const JSdate = new Date(year, month - 1, day);
      // console.log("JSdate", JSdate);

      // 最後將 JSdate 取出年、月、日比對使用者輸入的年、月、日是否完全一樣
      return (
        JSdate.getFullYear() === year &&
        // 這邊因需比對使用者輸入的月份是否正確，故要將 SJ 月份 +1
        JSdate.getMonth() + 1 === month &&
        JSdate.getDate() === day
      );
    }),
  nickname: yup
    .string()
    // 清洗資料：去除字串前後空白，若資料的值為 ""、" "、undefined 則轉換成 null
    .transform((v) => v?.trim() || null)
    // 代表這個欄位允許為 null（也就是空值），如果沒有這行，當 nickname 為 null 時，會直接被 yup 判定為不合法，因為預設情況下 yup 不允許 null 值。
    .nullable()
    .min(4, "暱稱文字最少 4 個字")
    .max(20, "暱稱文字最多 20 個字")
    // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
    .test("驗證 nickname", "暱稱格式錯誤", (value) => {
      // ✔ 空值直接放行
      if (!value) return true;

      // ✔ 格式檢查：
      // 自訂可以輸入的格式：允許所有 語言文字、數字、底線(_)、加號(+)、減號(-)，並使用 Unicode 模式解析 \p{} Unicode 屬性，避免壞掉。
      // \p{L} 代表任何語言的文字（Letter）
      // \p{N} 代表任何語言的數字（Number）
      // 此寫法 JavaScript 原生 RegExp
      return /^[\p{L}\p{N}_+\-]+$/u.test(value);

      // 系統預設驗證：只允許英文或數字（不包含中文、底線）
      // return validator.isAlphanumeric(value);
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
