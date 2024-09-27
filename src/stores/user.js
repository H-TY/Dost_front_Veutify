// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
// 引進 axios （已將路徑定義至後端 api）
import { useApi } from '@/composables/axios'


export const useUserStore = defineStore('User', () => {
  const { backApi, apiAuth } = useApi()

  // 設定 pinia 的資料欄位
  // 要從後端取得的資料（要與後端回傳的資料一致）
  const token = ref('')
  const account = ref('')
  const image = ref('')
  const role = ref(UserRole.USER) //預設值 UserRole.USER
  const cart = ref(0)

  // 判斷是否為登入狀態
  const isLogin = computed(() => {
    return token.value.length > 0
  })

  // 判斷是否為管理員狀態
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  const login = async (values) => {
    try {
      // values 指的是使用者填寫完後發送的表格
      // 這裡的 { data } 指的是 login後，後端回傳的資料（參照 controllers/user.js 的 login 部分）
      const { data } = await backApi.post('/user/login', values)
      // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料
      token.value = data.result.token
      account.value = data.result.account
      image.value = data.result.image
      role.value = data.result.role
      cart.value = data.result.cart
      return '登入成功'
    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '發生錯誤，請稍後再試'
    }
  }

  // 向前端請求資料
  const profile = async () => {
    if (!isLogin.value) return // 沒有登入的話，return 不執行

    try {
      // 如果不另外設定一個新的 apiAuth，需要寫成 ↓ 
      // const { data } = await apiAuth.get('/user/profile', {
      //   headers: {
      //     Authorization: 'Bearer ' + token.value
      //   }
      // })
      // 且登入後的每一個操作（新增商品、商品放入購物車、結帳...等請求動作），都需要帶(寫)著這個 headers 的證明，故用新設的一個 apiAuth 來簡化 code
      const { data } = await apiAuth.get('/user/profile')
      account.value = data.result.account
      image.value = data.result.image
      role.value = data.result.role
      cart.value = data.result.cart
    } catch (error) {
      // 如果發生錯誤，將資料清空
      token.value = ''
      account.value = ''
      image.value = ''
      role.value = UserRole.USER
      cart.value = 0
    }
  }

  // 使用者編輯資料傳至後端
  const edit = async (values) => {
    // 先判斷是否為登陸狀態
    if (!isLogin.value) return

    try {
      const { data } = await apiAuth.patch('/user/' + account.value, values)
      console.log('data.result.image', data.result.image)
      // 將後端回傳的資料，替換掉原本 pinia 的欄位的資料
      image.value = data.result.image
      return '上傳圖片成功'

    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '上傳圖片發生錯誤，請稍後再試'
    }
  }


  const logout = async () => {
    try {
      await apiAuth.delete('/user/logout')
    } catch (error) {
      console.log(error)
    }
    // 清空所有資料
    token.value = ''
    account.value = ''
    image.value = ''
    role.value = UserRole.USER
    cart.value = 0
  }


  return {
    token,
    account,
    image,
    role,
    cart,
    isLogin,
    isAdmin,
    login,
    profile,
    edit,
    logout,
  }
}, {
  // 設定保存在 local storage 的 key 叫做 shop、值(paths)保存 token 的資料
  persist: {
    key: 'shop',
    paths: ['token']
  }
})
