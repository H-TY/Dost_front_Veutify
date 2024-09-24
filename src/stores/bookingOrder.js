import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'


export const useBookingOrderStore = defineStore('BookingOrderData', () => {

  const { apiAuth } = useApi()
  const nowDate = ref(new Date().toLocaleDateString().replace(/\//g, ''))
  // console.log('nowDate:', typeof (nowDate.value), nowDate.value)

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

      // 若沒有資料可以抓取需做判斷， console.log(data.result.data) 輸出是 [] ，故用長度段 data.result.data.length == 0，回傳 當天日期並加上流水號 '000'
      // 若有資料可以抓取，用 .map() 抓出所有的 bookingOrderNumber 的值，組成新的陣列
      // Number() 將資料類型轉成"數字類型"
      // Math.max() 找出最大值，只能用數字做比較，且無法用於陣列，故需用 ... 將陣列展開
      // .padStart(2, '0') 在數字前自動補 2 位數的零
      // .padEnd(number.toString().length + 3, '0') 在數字後自動補 3 位數的零，第一個參數計算出字串長度再加上要補零的位數
      const maxBookingOrderNumber = computed(() => {
        if (data.result.data.length == 0) {
          return nowDate.value + '000'
        } else {
          return Math.max(...data.result.data.map(el => Number(el.bookingOrderNumber)))
        }
      })
      bookingOrderNumber.value = maxBookingOrderNumber.value
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