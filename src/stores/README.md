# Store

Pinia stores are used to store reactive state and expose actions to mutate it.

Full documentation for this feature can be found in the Official [Pinia](https://pinia.esm.dev/) repository.

===========

# 流程理解：

1. index.js 建立 Pinia = 倉庫系統

2. app.js = 統整全部資料狀態倉庫

3. user.js 建立使用者資料狀態 useUserStore() = 倉庫裡的櫃子

4. app.use(pinia) 只是把倉庫系統放進 Vue 裡

5. 在需要的頁面 import { useUserStore } from '@/stores/user' 或其他相對應的資料狀態 = 需要去拿相對應的櫃子（store）來操作資料
