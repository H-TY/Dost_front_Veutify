import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import UserRole from '@/enums/UserRole'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'



export const useBookingOrderStore = defineStore('BookingOrderData', () => {

  const { apiAuth } = useApi()
  const UserStore = useUserStore()
  // console.log('UserStore.isLogin', UserStore.isLogin)
  // 判斷是否為登入狀態
  if (!UserStore.isLogin) return

  // 預設要回傳的資料
  const bookingOrderNumber = ref(null)
  const image = ref('')
  const dogName = ref('')
  const bookingDate = ref('')
  const bookingTime = ref('')
  const orderStatus = ref('')


  // 建立訂單
  const createBookingOrder = async (fd) => {
    try {
      // 宣告現在日期
      // 修改格式和轉成文字資料類型，傳入後端做尋找當日最新訂單用
      const nowDate = ref(new Date())

      // 修改現在日期的格式，變成純粹的一串數字
      // 訂單編號的設定：當天日期轉為一串數字 + 流水號(從 001 開始)
      const reNowDate = computed(() => {
        // 找出年份 .getFullYear()，並 .toString() 轉成文字
        const nowDateYear = nowDate.value.getFullYear().toString()

        // 找出月份 .getMonth()，並 .toString() 轉成文字
        // 資料類型須為文字/字符/字符串 .padStart(2, '0') 用零補足至 2 位數
        const nowDateMonth = (nowDate.value.getMonth() + 1).toString().length > 1 ? (nowDate.value.getMonth() + 1).toString() : (nowDate.value.getMonth() + 1).toString().toString().padStart(2, '0')

        // 找出日期 .getDate()，並 .toString() 轉成文字
        const nowDateDay = nowDate.value.getDate().toString().length > 1 ? nowDate.value.getDate().toString() : nowDate.value.getDate().toString().padStart(2, '0')

        // 將年、月、日組合
        return nowDateYear + nowDateMonth + nowDateDay
      })

      // data 為後端回傳的資料
      // 第一個參數要放傳至後端的路徑
      // 第二個參數要放傳至後端的 fd 表格資料
      // 第三個才放查詢參數 params 傳至後端做正則表達式的查詢關鍵字
      const { data } = await apiAuth.post('/order', fd, {
        params: {
          // 修改格式後的日期，傳入後端做尋找當日最新訂單用
          reNowDate: reNowDate.value
        }
      })
      console.log('data', data)

      return {
        text: data.message,
        // 回傳前端更新的訂單狀態，供前端即時更新狀態
        data,
      }

    } catch (error) {
      console.log(error)
    }
  }


  // ● 訂單修改
  const edit = async (values) => {
    // console.log('values', values)
    try {
      const { data } = await apiAuth.patch('/order/' + values.id, values)
      // console.log('data.result', data.result)
      // console.log('data.result.orderStatus', data.result.orderStatus)
      // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料
      orderStatus.value = data.result.orderStatus

      return {
        text: '修改訂單成功',
        // 回傳前端更新的訂單狀態，供前端即時更新狀態
        reOrderStatus: orderStatus.value,
      }

    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '訂單修改發生錯誤，請稍後再試'
    }
  }


  // 要 return 出去，前端才收的到資料
  return {
    bookingOrderNumber,
    image,
    dogName,
    bookingDate,
    bookingTime,
    orderStatus,
    createBookingOrder,
    edit,
  }
})