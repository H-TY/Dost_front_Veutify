import * as yup from "yup";
import validator from "validator";

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
