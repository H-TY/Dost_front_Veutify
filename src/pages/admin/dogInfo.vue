<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col>
        <h1>狗狗資訊管理</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn class="d-inline-flex pa-4" color="green" @click="openDialog(null)">新增夥伴資訊</v-btn>
      </v-col>
      <!-- 跳出視窗 -->
      <v-dialog v-model="dialog.open" persistent width="500">
        <!-- 表格（新增/編輯商品） -->
        <v-form @submit.prevent="submit">
          <v-card>
            <v-card-title>{{ dialog.id ? '編輯狗狗資訊' : '新增狗狗資訊' }}</v-card-title>
            
              <v-card-text class="pb-0">
                <!-- 上傳（圖片）檔案 -->
                <p>狗狗大頭照：</p>
                <vue-file-agent
                  v-model="fileRecords"
                  v-model:raw-model-value="rawFileRecords"
                  accept="image/jpeg,image/jpg,image/png"
                  deletable
                  max-size="1MB"
                  help-text="選擇檔案或拖曳到這裡"
                  :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
                  ref="fileAgent"
                ></vue-file-agent>
                <v-row class="mt-4">
                  <v-col>
                    <v-text-field
                      label="狗狗名字"
                      v-model="dogName.value.value"
                      :error-messages="dogName.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="年齡"
                      type="number" min="0"
                      v-model="age.value.value"
                      :error-messages="age.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="d-flex ma-0">
                  <v-col class="d-flex align-self-center ps-0">
                    <v-text-field
                      label="預約價格"
                      type="number" min="0"
                      v-model="price.value.value"
                      :error-messages="price.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                  <v-checkbox
                  label="上架"
                  class="d-flex justify-center"
                  v-model="sell.value.value"
                  :error-messages="sell.errorMessage.value"
                  ></v-checkbox>
                </v-row>

                <v-radio-group 
                  class="d-flex"
                  inline
                  hide-spin-buttons
                  v-model="booking.value.value">
                  <v-sheet class="d-flex align-center">
                    <p><v-icon class="me-1">mdi-invoice-clock</v-icon>預約狀態：</p>
                  </v-sheet>
                  <v-radio label="可預約" value="可預約"></v-radio>
                  <v-radio label="預約已滿" value="預約已滿"></v-radio>
                </v-radio-group>
                <template v-if="booking.value.value === '可預約'">
                  <v-sheet class="mt-4">
                    <p><v-icon class="me-1">mdi-clock</v-icon>可預約時段：</p>
                    <v-chip-group
                      selected-class="bg-amber-darken-4"
                      multiple
                      v-model="bookingTime.value.value"
                      :error-messages="bookingTime.errorMessage.value"
                      >
                      <v-chip
                        v-for="time of times"
                        :key="time"
                        :text="time"
                        :value="time"
                      ></v-chip>
                    </v-chip-group>
                  </v-sheet>
                </template>

                <v-textarea
                  label="狗狗的性格、特徵"
                  class="mt-6"
                  v-model="feature.value.value"
                  :error-messages="feature.errorMessage.value"
                ></v-textarea>
            </v-card-text>
            <!-- 送出 & 取消 按鈕 -->
            <v-card-actions class="justify-center mb-5">
              <v-btn class="bg-red me-5" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
              <v-btn class="bg-green" type="submit" :loading="isSubmitting">送出</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <!-- ● 所有的狗狗個人資訊表格 -->
    <v-row class="justify-center mt-10" width="1500">
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <!-- Title -->
          <h3>狗狗個人資訊</h3>
          <v-spacer></v-spacer>
          <!-- 搜尋欄位 -->
          <v-text-field
            label="搜尋"
            v-model="tableSearch"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
            @click:prepend-inner="tableLoadItems(true)"
            @keydown.enter="tableLoadItems(true)"
          ></v-text-field>
        </v-card-title>
      
        <v-divider></v-divider>

        <v-data-table-server
          class="text-center"
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items="items"
          :headers="itemsHeaders"
          :items-length="tableItemsLength"
          :loading="tableLoading"
          :search="tableSearch"
          @update:items-per-page="tableLoadItems(false)"
          @update:sort-by="tableLoadItems(false)"
          @update:page="tableLoadItems(false)"
          >
          <!-- 大頭照欄位 -->
          <template #['item.image']='{value}'>
            <v-card class="my-2" elevation="2" rounded>
              <v-img
                :src="value"
                width="200"
                height="150"
                cover
              ></v-img>
            </v-card>
          </template>
          <!-- 預約狀態欄位 -->
          <template #['item.booking']='{value}'>
            <v-chip
              :text="value"
              :color="value === '可預約' ? 'green' : 'red'"
              size="small"
              label
            ></v-chip>
          </template>
          <!-- 預約時段欄位 -->
          <template #['item.bookingTime']='{value}'>
            <v-list>
              <!--
              ● 因 value 是雖然是陣列，但時間段未分割（"value": ["15:00～17:00,13:00～15:00"]）
              ● 故用 .join(' ') 先轉成純文字串
              ● 供後續 .split(',') 轉成有分割時間段的陣列（["15:00～17:00", "10:00～12:00"]）
              ● 最後再用排序 .sort((a, b) => parseInt(a) - parseInt(b)) 由小到大排列，加 parseInt() 是為了將 a、b 參數從文字轉數字才可以做比較排序
              -->
              <v-list-item v-for="(el, index) in value.join(' ').split(',').sort((a, b) => parseInt(a) - parseInt(b))" :key="index">{{ el }}</v-list-item>
            </v-list>
          </template>
          <!-- 上下架欄位 -->
          <template #['item.sell']='{value, item}'>
            <!-- 顯示 item 的 值 -->
            <!-- <div><span v-text="JSON.stringify(item, null, 2)"></span></div> -->
            <!-- :model-value 依據目前 sell 的值，顯示勾選狀態 -->
            <!-- @update:modelValue 更新 model-value 狀態 -->
            <v-checkbox 
            :model-value="value"
            @update:modelValue="checkboxChange(item._id, $event)"></v-checkbox>
          </template>
          <template #['item.edit']='{item}'>
            <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table-server>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, reactive, computed, warn, watch} from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'


definePage({
  meta: {
    title: 'Dost | 狗狗資訊管理',
    login: true,
    admin: true
  }
})

const { backApi, apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)
// 要抓頁面上的東西時的寫法　ref=""，同時在 <script setup> 內也要建立一個同名的 ref 預設值為 null
// null 表示“空”或“无”，是一个被显式赋值为“没有对象”的值。通常用于指示某个变量尚未保存任何对象或数据。（let obj = null）
// undefined　表示“未定义”，当一个变量声明了但没有赋值时，其默认值就是 undefined。（let x　未寫等於任何的值，console.log(x); // undefine）
// NaN　表示无效数字结果，通常出现在错误的数学运算中。


// 可以預約的時段
const times = ref([
  '10:00～12:00', 
  '13:00～15:00',
  '15:00～17:00', 
  '19:00～21:00'
])


// 視窗動作
const dialog = ref({
  // 預設沒有彈出狀態
  open:false,
  // 用來判斷用是否為 "新增" 或 "編輯" 狀態
  id:''
})
// 彈出表單內容視窗
const openDialog = (item)=>{
  if(item){
    dialog.value.id = item._id
    dogName.value.value = item.dogName
    age.value.value = item.age
    price.value.value = item.price
    booking.value.value = item.booking
    bookingTime.value.value = item.bookingTime
    feature.value.value = item.feature
    sell.value.value = item.sell
  }else{
    dialog.value.id=''
  }
  dialog.value.open = true
}


// 關閉彈窗
const closeDialog = () => {
  dialog.value.open = false
  // 重置表單
  resetForm()
  // 因上述的 "resetForm() 重置表單" 不會一併將上傳的檔案也重置，故需要自己再呼叫另一個函式 .deleteFileRecord() 來刪除已上傳的檔案
  fileAgent.value.deleteFileRecord()
}

// 自定義表單驗證
const formSchema = yup.object({
  dogName: yup
  .string()
  .required('狗狗名字必填'),
  age: yup
  .number()
  .required('狗狗年齡必填')
  .min(0, '年齡不能小於 0'),
  price:yup
  .number()
  .required('預約價格必填')
  .typeError('商品價格格式錯誤')
  .min(0, '商品價格不能小於 0'),
  booking: yup
  .string('')
  .required('預約狀態必填'),
  bookingTime: yup
  .array(),
  feature: yup
  .string()
  .required('狗狗性格、特徵必填'),
  // 是否上架
  sell: yup
    .boolean()
})

// 送出後執行驗證表單
// useForm 指的是使用者填寫的 form
// useField 指的是表單欄位
// resetForm 是一個函式，作用為重置表單內容
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: formSchema,
  // initialValues 設定表單各欄位的初始值
  initialValues: {
    dogName: '',
    age:0,
    price: 0,
    booking:'',
    bookingTime:[],
    feature: '',
    sell: true
  }
})
const price = useField('price')
const dogName = useField('dogName')
const age = useField('age')
const feature = useField('feature')
const booking = useField('booking')
const bookingTime = useField('bookingTime')
const sell = useField('sell')

// ● 綁定上傳檔案的動作
// fileRecords 上傳檔案資料的物件陣列，用於展示和管理文件。
const fileRecords = ref([])
// fileRecords 原始文件資料，用於更底層的文件操作，例如文件上傳的動作或處理。
const rawFileRecords = ref([])


// ● 送出做完驗證後，才會再繼續執行上傳檔案的驗證（須要自己寫檔案上傳的驗證）
const submit = handleSubmit(async(values)=>{
  // ?. 可選鏈結操作符
  // 當 fileRecords.value[0] 為 undefined 或 null 時，不會拋出錯誤，而是直接返回 undefined，不會繼續嘗試訪問 error 屬性，避免在屬性不存在時拋出 TypeError 錯誤。
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1) return

  try {
    // 一般都是直接寫成 json 格式傳到後端
    // 表格需要寫成物件，採用 formdata
    const fd = new FormData()

    // 要將東西放進去的語法 fd.append(key, value)
    fd.append('dogName', values.dogName)
    fd.append('age', values.age)
    fd.append('price', values.price)
    fd.append('booking', values.booking)
    fd.append('bookingTime', values.bookingTime)
    fd.append('feature', values.feature)
    fd.append('sell', values.sell)
    // 判斷如果大於 0 時，才需要放檔案進去
    if(fileRecords.value.length > 0){
      fd.append('image', fileRecords.value[0].file)
    }
  
    if(dialog.value.id === ''){
      // .post(網址, 送出的資料, 請求的設定)
      // 這邊 fd 是送出的資料
      await apiAuth.post('/dogs', fd)
    }else{
      await apiAuth.patch('/dogs/' + dialog.value.id, fd)
    }

    createSnackbar({
      text:dialog.value.id === ''? '新增成功' : '編輯成功',
      snackbarProps:{
        color:'green',
      }
    })
    closeDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text:error?.response?.data?.message || '發生錯誤',
      snackbarProps:{
        color:'red'
      }
    })
  }
})


// ● 表格一頁要顯示幾個物件
const tableItemsPerPage = ref(10)
// ● 排序功能
const tableSortBy = ref([
  // key 以什麼作為排序標準；order 正序(升序)或倒序(降序)排列
  // desc 是 descending 降序排列；ascending 升序排列
  { key: 'createdAt', order: 'desc' }
])

// ● 表示目前表格翻到哪一頁
const tablePage = ref(1)
// ● 表格要顯示的所有東西
const items = ref([])
// ● 表格的表頭(欄位設定)，基本上欄位的項目都是固定的，故不用 ref
// 定義欄位名稱、格式、功能、key
// ★★★ key 的名字要與後端資料庫定義的欄位相同 ★★★ 後端會自動將符合 key 的資料欄位帶入表格
const itemsHeaders = [
  {title:'名字', align: 'center', sortable: true, key:'dogName'},
  {title:'大頭照', align: 'center', sortable: false, key:'image'},
  {title:'年齡', align: 'center', sortable: true, key:'age'},
  {title:'價格', align: 'center', sortable: true, key:'price'},
  {title:'預約狀態', align: 'center', sortable: true, key:'booking'},
  {title:'預約時段', align: 'center', sortable: true, key:'bookingTime'},
  {title:'性格、特徵', align: 'center', sortable: false, key:'feature'},
  {title:'點檯', align: 'center', sortable: true, key:'counter'},
  {title:'上下架', align: 'center', sortable: false, key:'sell'},
  {title:'編輯', align: 'center', sortable: false, key:'edit'},
]
// ● 顯示讀取狀態
const tableLoading = ref(true)
// ● 表示後端全部資料的總數（不是指每一頁資料的總數）
const tableItemsLength = ref(0)
// ● 搜尋
const tableSearch = ref('')
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1 //若重置表格讀取物件，表格頁數默認至第 1 頁
  tableLoading.value = true
  try {
    // .get(網址, 請求的設定)　　get 沒有送出的資料，所以只有 2 個參數
    const { data } = await apiAuth.get('/dogs/all' , {
      params:{
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    items.value.splice(0, items.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  tableLoading.value = false
}
// 要呼叫 function
tableLoadItems()



// ● 更改上架的勾選狀態
const checkboxChange = async (id, newValue) =>{
  try {
    // 發送至後端修改指定 id 的陣列資料裡 sell 的值
    await apiAuth.patch('/dogs/'+ id ,{
      sell: newValue
    })

    // 更新 items 中的相應 id 的 sell 的值，讓 checkbox 的勾選狀態同步顯示
    const item = items.value.find(item => item._id === id)
    if (item) {
      item.sell = newValue // 更新状态
    }

    createSnackbar({
      text: newValue === true? '上架成功' : '下架完成',
      snackbarProps:{
        color: 'green',
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error.response.data.message,
      snackbarProps:{
        color: 'red',
        class: 'custom-snackbar',
      }
  })
  }
}


</script>


<!-- 沒有寫 scoped，設定的樣式為全局樣式（所有頁面同名的 class 都會被影響） -->
<style>
/* 設定 snackbar 的全局樣式 */
.v-snackbar__wrapper{
  min-width: auto;
}

</style>


<route lang="yaml">
  meta:
    layout: admin
  </route>