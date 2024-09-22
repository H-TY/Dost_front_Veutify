import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'


export const useBookingOrderStore = defineStore('BookingOrderData', () => {

  const { apiAuth } = useApi()
  const nowDate = ref(new Date().toLocaleDateString().replace(/\//g, ''))
  console.log('nowDate:', nowDate.value)

  // 預設要回傳的資料
  const bookingOrderNumber = ref(null)
  const dogName = ref('')
  const bookingDate = ref('')
  const bookingTime = ref('')

  // 讀取後端的 order 資料
  const endBookingOrderData = async () => {
    try {
      console.log('Store觸發')
      const { data } = await apiAuth.get('/order', {
        params: {
          // 設定要搜尋的關鍵字
          search: nowDate.value
        }
      })
      // console.log('data.result.data', data.result.data)

      // 用 .map() 抓出所有的 bookingOrderNumber 的值，組成新的陣列
      // Number() 將資料類型轉成"數字類型"
      // Math.max() 找出最大值，只能用數字做比較，且無法用於陣列，故需用 ... 將陣列展開
      bookingOrderNumber.value = Math.max(...data.result.data.map(el => Number(el.bookingOrderNumber)))
      // console.log('SbookingOrderNumber', bookingOrderNumber.value)

    } catch (error) {
      console.log(error)
      createSnackbar({
        text: error?.response?.data?.message || '發生錯誤',
        snackbarProps: {
          color: 'red'
        }
      })
    }
  }
  endBookingOrderData()

  // 要 return 出去，前端才收的到資料
  return {
    bookingOrderNumber,
    dogName,
    bookingDate,
    bookingTime,
    endBookingOrderData,
  }
})