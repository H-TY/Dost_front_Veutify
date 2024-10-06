import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'


export const useBookingOrderStore = defineStore('BookingOrderData', () => {

  const { apiAuth } = useApi()

  // 宣告現在日期
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
  // console.log('reNowDate:', reNowDate.value)



  // 預設要回傳的資料
  const bookingOrderNumber = ref(null)
  const image = ref('')
  const dogName = ref('')
  const bookingDate = ref('')
  const bookingTime = ref('')

  // 讀取後端的 order 資料
  const endBookingOrderData = async () => {
    try {
      // console.log('Store觸發')
      const { data } = await apiAuth.get('/order', {
        params: {
          // 設定要搜尋的關鍵字，用來搜尋後端訂單資料庫的訂單編號
          // 訂單編號的設定：當天日期轉為一串數字 + 流水號(從 001 開始)
          search: reNowDate.value
        }
      })
      // console.log('data.result.data', data.result.data)

      // 若沒有資料可以抓取需做判斷， console.log(data.result.data) 輸出是 [] ，故用長度段 data.result.data.length == 0，回傳 當天日期並加上流水號 '000'
      // 若有資料可以抓取，用 .map() 抓出所有的 bookingOrderNumber 的值，組成新的陣列
      // Number() 將資料類型轉成"數字類型"
      // Math.max() 找出最大值，只能用數字做比較，且無法用於陣列，故需用 ... 將陣列展開
      // 資料類型須為文字/字符/字符串.padStart(2, '0') 用零補足至 2 位數
      // .padEnd(number.toString().length + 3, '0') 在數字後自動補 3 個零，第一個參數計算出字串長度再加上要補零的位數
      const maxBookingOrderNumber = computed(() => {
        if (data.result.data.length == 0) {
          // 搜尋後端訂單資料庫的訂單編號無當天訂單資料時，回傳前端 當天日期數字+000 的數字，以利前端用 +1 計算
          return reNowDate.value + '000'
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
  // endBookingOrderData()


  // 要 return 出去，前端才收的到資料
  return {
    bookingOrderNumber,
    image,
    dogName,
    bookingDate,
    bookingTime,
    endBookingOrderData,
  }
})