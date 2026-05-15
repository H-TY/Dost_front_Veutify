<template>
  <div class="dog-info">
    <div class="admin-page-title" ref="RefTitle">
      <h2>狗狗資訊管理</h2>
      <v-btn class="add-btn" @click="openDialog(null)">
        <v-icon class="mdi mdi-plus-circle"></v-icon>
      </v-btn>
    </div>

    <!-- ● 彈窗（狗狗資訊建檔） -->
    <v-dialog content-class="dog-info-dialog" v-model="dialog.open" persistent>
      <!-- 表格（新增/編輯商品） -->
      <v-form @submit.prevent="submit">
        <v-card>
          <div class="dialog-title-box">
            <h5 class="dialog-title">{{ dialog.id ? '編輯狗狗資訊' : '新增狗狗資訊' }}</h5>
          </div>

          <div class="dialog-content">
            <!-- 上傳（圖片）檔案 -->
            <p>狗狗大頭照：</p>
            <!-- 
                  * v-model:raw-model-value="rawFileRecords" 多個不同的可綁定屬性時，可以這樣寫做綁定
                  * :raw-model-value 是自訂義的名稱，方便辨識其他綁定的屬性
                  * 詳細參數說明：https://safrazik.github.io/vue-file-agent/
                -->
            <div class="photo-box">
              <vue-file-agent v-model="fileRecords" v-model:raw-model-value="rawFileRecords" accept="image/jpeg,image/jpg,image/png" deletable max-size="1MB" help-text="選擇檔案或拖曳到這裡" :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }" ref="fileAgent"></vue-file-agent>
            </div>

            <div class="content-box">
              <v-text-field label="狗狗名字" v-model="dogName.value.value" :error-messages="dogName.errorMessage.value"></v-text-field>
              <v-text-field label="年齡" type="number" min="0" v-model="age.value.value" :error-messages="age.errorMessage.value"></v-text-field>
              <v-text-field label="預約價格" type="number" min="0" v-model="price.value.value" :error-messages="price.errorMessage.value"></v-text-field>
              <v-checkbox label="上架" v-model="sell.value.value" :error-messages="sell.errorMessage.value"></v-checkbox>

              <v-radio-group class="booking-state-box" inline v-model="booking.value.value">
                <p><v-icon>mdi-invoice-clock</v-icon>預約狀態：</p>
                <v-radio label="可預約" value="可預約"></v-radio>
                <v-radio label="預約已滿" value="預約已滿"></v-radio>
              </v-radio-group>
              <template v-if="booking.value.value === '可預約'">
                <div class="time-box">
                  <p><v-icon>mdi-clock</v-icon>可預約時段：</p>
                  <v-chip-group selected-class="selected-item" multiple v-model="bookingTime.value.value" :error-messages="bookingTime.errorMessage.value">
                    <v-chip v-for="(time, index) of times" :key="index" :text="time" :value="time"></v-chip>
                  </v-chip-group>
                </div>
              </template>

              <!-- 疫苗接踵資訊 -->
              <div class="vaccine-list">
                <p>
                  <v-icon class="mdi mdi-needle"></v-icon>疫苗接踵紀錄：
                  <span class="warning-txt">{{ vaccine.errorMessage.value }}</span>
                </p>
                <div class="vaccine-box">
                  <template v-for="(el, index) in vaccineFields" :key="el.key">
                    <div class="vaccine-item">
                      <h6>紀錄 {{ index + 1 }}</h6>

                      <!-- 疫苗名稱 -->
                      <Field :name="`vaccine[${index}].name`" v-slot="{ field, errorMessage }">
                        <v-combobox placeholder="也可手動輸入疫苗名稱" v-model="el.value.name" :items="vaccineList" chips label="疫苗名稱" :error-messages="errorMessage" />
                      </Field>

                      <!-- 日期 -->
                      <Field :name="`vaccine[${index}].date`" v-slot="{ errorMessage }">
                        <v-text-field placeholder="YYYY-MM-DD" v-model="el.value.date" label="接踵日期" :error-messages="errorMessage" />
                      </Field>

                      <!-- 醫院 -->
                      <Field :name="`vaccine[${index}].hospital`" v-slot="{ errorMessage }">
                        <v-text-field v-model="el.value.hospital" label="接踵醫院" :error-messages="errorMessage" />
                      </Field>

                      <div class="delet-btn">
                        <v-icon class="mdi mdi-delete-forever" @click="deletItem(index)"></v-icon>
                      </div>
                    </div>
                  </template>

                  <div class="add-btn">
                    <v-icon class="mdi mdi-plus-box-outline" @click="addItem"></v-icon>
                  </div>
                </div>
              </div>

              <v-textarea label="狗狗的性格、特徵" v-model="feature.value.value" :error-messages="feature.errorMessage.value"></v-textarea>

              <v-textarea label="狗狗背景故事" v-model="story.value.value" :error-messages="story.errorMessage.value"></v-textarea>
            </div>
          </div>

          <!-- 送出 & 取消 按鈕 -->
          <div class="btn-box">
            <v-btn :loading="isSubmitting" @click="closeDialog">取消</v-btn>
            <v-btn type="submit" :loading="isSubmitting">送出</v-btn>
          </div>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- ● 顯示所有的狗狗資訊表格清單 -->
    <div class="list-box">

      <!-- 搜尋欄位 -->
      <v-text-field class="search-box" label="搜尋" v-model="tableSearch" prepend-inner-icon="mdi-magnify" variant="solo-filled" density="comfortable" flat hide-details single-line @click:prepend-inner="tableLoadItems(true)" @keydown.enter="tableLoadItems(true)"></v-text-field>

      <v-divider></v-divider>

      <v-data-table-server ref="refTableBox" class="table-box" :class="isSlideTable ? 'right-slide' : ''" :height="tableHeight" v-model:items-per-page="tableItemsPerPage" v-model:sort-by="tableSortBy" v-model:page="tablePage" :items="items" :headers="itemsHeaders" :items-length="tableItemsLength" :loading="tableLoading" :search="tableSearch" :items-per-page-options="itemsPerPageOptions" @update:items-per-page="tableLoadItems(false)" @update:sort-by="tableLoadItems(false)" @update:page="tableLoadItems(false)">

        <!-- 大頭照欄位 -->
        <template #['item.image']='{ value }'>
          <div class="img-box">
            <img :src="value"></img>
          </div>
        </template>

        <!-- 預約狀態欄位 -->
        <template #['item.booking']='{ value }'>
          <v-chip :text="value" :class="value === '可預約' ? 'no-fill' : 'fill'" label></v-chip>
        </template>

        <!-- 預約時段欄位 -->
        <template #['item.bookingTime']='{ value }'>
          <v-list>
            <!--
              ● 因 value 是雖然是陣列，但時間段未分割（"value": ["15:00～17:00,13:00～15:00"]）
              ● 故用 .join(' ') 先轉成純文字串
              ● 供後續 .split(',') 轉成有分割時間段的陣列（["15:00～17:00", "10:00～12:00"]）
              ● 最後再用排序 .sort((a, b) => parseInt(a) - parseInt(b)) 由小到大排列，加 parseInt() 是為了將 a、b 參數從文字轉數字才可以做比較排序
              -->
            <v-list-item v-for="(el, index) in value.sort((a, b) => parseInt(a) - parseInt(b))" :key="index">
              <template v-if="el">
                <v-icon class="mdi mdi-clock-time-four"> </v-icon>
                {{ el }}
              </template>
            </v-list-item>
          </v-list>
        </template>

        <!-- 疫苗接踵紀錄 -->
        <template #['item.vaccine']='{ value }'>
          <v-list class="vaccine-record">
            <v-list-item v-for="(el, index) in value" :key="index">
              <p>● {{ el.name }}</p>
              <small>
                日期：{{ el.date }}
              </small>
              <small>
                醫院：{{ el.hospital }}
              </small>
            </v-list-item>
          </v-list>
        </template>

        <!-- 上下架欄位 -->
        <template #['item.sell']='{ value, item }'>
          <!-- 顯示 item 的 值 -->
          <!-- <div><span v-text="JSON.stringify(item, null, 2)"></span></div> -->
          <!-- :model-value 依據目前 sell 的值，顯示勾選狀態 -->
          <!-- @update:modelValue 更新 model-value 狀態 -->
          <v-checkbox :model-value="value" @update:modelValue="checkboxChange(item._id, $event)"></v-checkbox>
        </template>

        <template #['item.edit']='{ item }'>
          <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import * as yup from 'yup'
import { useForm, useField, useFieldArray, Field } from 'vee-validate'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useTitleScrollDown, useTableScroll } from '@/composables/scrollAddClass'
import { scrollToTop } from "@/composables/scrollToTop";
import { dogFields } from '@/plugins/data_json'
import { useSnackbar } from 'vuetify-use-dialog'




definePage({
  meta: {
    title: 'Dost | 狗狗資訊管理',
    login: true,
    admin: true
  }
})


const { smAndDown, mdAndUp, height } = useDisplay()
const { backApi, apiAuth } = useApi()
const { RefTitle } = useTitleScrollDown()
const { refTableBox, isSlideTable, resetTableScroll } = useTableScroll()
const createSnackbar = useSnackbar()

// ● 上傳圖片
// 宣告上傳的圖片變數，目前圖片尚未送出至後端，僅是上傳至當前頁面
const fileAgent = ref(null)
// 要抓頁面上的東西時的寫法　ref=""，同時在 <script setup> 內也要建立一個同名的 ref 預設值為 null
// null 表示“空”或“无”，是一个被显式赋值为“没有对象”的值。通常用于指示某个变量尚未保存任何对象或数据。（let obj = null）
// undefined　表示“未定义”，当一个变量声明了但没有赋值时，其默认值就是 undefined。（let x　未寫等於任何的值，console.log(x); // undefine）
// NaN　表示无效数字结果，通常出现在错误的数学运算中。


// ● 可以預約的時段
const times = ref([
  '10:00～12:00',
  '13:00～15:00',
  '15:00～17:00',
  '19:00～21:00'
])


// ● 疫苗清單
const vaccineList = ref([
  '無疫苗紀錄',
  '五合一',
  '七合一',
  '八合一',
  '十合一',
  '十一合一',
  '狂犬病疫苗',
  '萊姆病疫苗',
])

// ● vaccine 表單欄位的初始值設定
const initialVaccineItems = () => ({
  name: null,
  date: '',
  hospital: ''
})


// ● 彈窗動作
const dialog = ref({
  // 預設沒有彈出狀態
  open: false,
  // 用來判斷用是否為 "新增" 或 "編輯" 狀態
  id: ''
})

// ● 彈出表單內容視窗
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    dogName.value.value = item.dogName
    age.value.value = item.age
    price.value.value = item.price
    booking.value.value = item.booking
    bookingTime.value.value = item.bookingTime
    feature.value.value = item.feature
    story.value.value = item.story
    vaccine.value.value = item.vaccine
    sell.value.value = item.sell
  } else {
    dialog.value.id = ''
    addItem() // 新增一筆 vaccine 的初始值，確保在新增狀態下至少有一筆 vaccine 的欄位可以填寫
  }

  dialog.value.open = true
}


// ● 關閉彈窗
const closeDialog = () => {
  dialog.value.open = false

  // 重置表單
  resetForm()

  // 因上述的 "resetForm() 重置表單" 不會一併將上傳的檔案也重置，故需要自己再呼叫另一個函式 .deleteFileRecord() 來刪除已上傳的檔案
  fileAgent.value.deleteFileRecord()
}



// ● 自定義表單驗證
const formSchema = yup.object(dogFields)



// ● 送出後執行驗證表單
// useForm 指的是使用者填寫的 form
// useField 指的是表單欄位
// resetForm 是一個函式，作用為重置表單內容
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: formSchema,
  // validateOnInput: true, // 即時驗證，使用者輸入資料的當下，同時驗證欄位
  validateOnBlur: true, // 使用者輸入完資料，離開欄位時，才驗證欄位資料
  // ▲ initialValues 設定表單各欄位的初始值
  initialValues: {
    dogName: '',
    age: null,
    price: null,
    booking: '可預約',
    bookingTime: [],
    feature: '',
    story: '',
    vaccine: [],
    sell: true,
  }
})



const { fields: vaccineFields, push: vaccinePush, remove: vaccineRemove } = useFieldArray('vaccine')
// console.log(`useFieldArray('vaccine')`, useFieldArray('vaccine'))
// console.log('vaccineFields', vaccineFields)
// console.log('vaccineFields.value', vaccineFields.value)
// vaccineFields.value.forEach((el) => {
//   console.log('el.value', el.value)
//   console.log('el.value.name', el.value.name)
// })


// ● 新增疫苗接踵紀錄
const addItem = () => {
  vaccinePush(initialVaccineItems())
}

// ● 移除疫苗接踵紀錄
const deletItem = (index) => {
  vaccineRemove(index)
}


// ● 疫苗接踵記錄欄位，當選擇 "無疫苗紀錄"，日期和醫院欄位自動帶入 "無紀錄" 的文字；當選擇其他疫苗名稱時，日期和醫院欄位恢復為空值
watch(() => vaccineFields.value.map((el) => el.value.name), (newValue, oldValue) => {
  // console.log('newValue', newValue)
  newValue.forEach((el, index) => {
    // 變數宣告：指定欄位 specField
    const specField = vaccineFields.value[index]

    if (!specField) return

    if (el === '無疫苗紀錄') {
      specField.value.date = "無紀錄"
      specField.value.hospital = "無紀錄"

    } else if (oldValue[index] === '無疫苗紀錄') {
      // 當從 "無疫苗紀錄" 變更為其他疫苗名稱時，將日期和醫院欄位恢復為空值
      specField.value.date = ""
      specField.value.hospital = ""
    }
  })
})


// ● useField('XXX') 作用為：
// * 註冊一個叫 'XXX' 的表單欄位
// * 生成一個 響應式物件 XXX，可用來：
//    - 讀取與更新欄位值
//    - 監控驗證狀態
//    - 顯示錯誤訊息
//    - 控制欄位元件行為
const price = useField('price')
const dogName = useField('dogName')
const age = useField('age')
const feature = useField('feature')
const story = useField('story')
const vaccine = useField('vaccine')
const booking = useField('booking')
const bookingTime = useField('bookingTime')
const sell = useField('sell')

// watch(() => bookingTime.value.value, (newValue) => {
//   console.log('newValue', newValue)
// })




// ● 綁定上傳檔案的動作
// fileRecords 上傳檔案資料的物件陣列，用於展示和管理文件。
const fileRecords = ref([])
// fileRecords 原始文件資料，用於更底層的文件操作，例如文件上傳的動作或處理。
const rawFileRecords = ref([])

// ● 勾選 "預約已滿狀態" 清空選取時段
// 推薦監聽 "涵式"，() => booking.value.value 明確：監聽「值」
// 若是監聽的是 booking.value，裡面的來源複雜(包裝過的 ref 帶 getter/setter )，可能造成監聽有時候不會觸發
watch(() => booking.value.value, (newValue) => {
  // console.log('newValue', newValue)

  // 利用 !!value 強制轉成 boolean（true / false），較為直覺的 boolean 值判斷目前是 "新增" 還是 "編輯" 狀態，不局限於特定的 id 值（例如：id 為空字串 '' 就是新增狀態；id 有值就為編輯狀態）
  // ※ 運作原理：
  // !value   // 先轉成 boolean 再取反
  // !!value  // 再反一次 → 回到原本的 boolean
  const isEditMode = !!dialog.value.id // 代表 id 值存在，boolean 值 = true 

  if (newValue === '預約已滿' && !isEditMode) {
    // console.log('新增狀態_觸發')
    bookingTime.value.value = []
  }
})


// ● 送出做完驗證後，才會再繼續執行上傳檔案的驗證（須要自己寫檔案上傳的驗證）
const submit = handleSubmit(async (values) => {
  // ?. 可選鏈結操作符
  // 當 fileRecords.value[0] 為 undefined 或 null 時，不會拋出錯誤，而是直接返回 undefined，不會繼續嘗試訪問 error 屬性，避免在屬性不存在時拋出 TypeError 錯誤。
  if (fileRecords.value[0]?.error) return
  // 當為 "新增商品且無已上傳的圖片" 時，停止送出。
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
    fd.append('bookingTime', JSON.stringify(values.bookingTime)) // 因為 bookingTime 是陣列，後端接收時會當成字串，所以要用 JSON.stringify() 轉成字串格式，後端再用 JSON.parse() 轉回陣列格式
    fd.append('feature', values.feature)
    fd.append('story', values.story)
    fd.append('vaccine', JSON.stringify(values.vaccine))
    fd.append('sell', values.sell)
    // 判斷如果大於 0 時，才需要放檔案進去
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id === '') {
      // .post(網址, 送出的資料, 請求的設定)
      // 這邊 fd 是送出的資料
      await apiAuth.post('/dogs', fd)
    } else {
      await apiAuth.patch('/dogs/' + dialog.value.id, fd)
    }

    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        class: 'snackbar-success',
      }
    })
    closeDialog()
    tableLoadItems(true)

  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        class: 'snackbar-fail'
      }
    })
  }
})


// ● 表格一頁要顯示幾個物件
const tableItemsPerPage = ref(10)

// 在螢幕寬度小於 md 的裝置，預設表格一頁顯示 5 筆資料
if (smAndDown.value) {
  tableItemsPerPage.value = 5
}

// ● 在下方 "每頁項目" 也新增一個選項（系統預設　10、25、50），讓使用者可以選擇每頁顯示 5、10、25、50 筆資料
const itemsPerPageOptions = computed(() => {
  // new Set() 刪除陣列中重複的值，但輸出後為 "物件格式"，故再用 Array.from() 轉回陣列格式
  return [...new Set([tableItemsPerPage.value, 10, 25, 50])]


})
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
  { title: '名字', align: 'center', sortable: true, key: 'dogName' },
  { title: '大頭照', align: 'center', sortable: false, key: 'image' },
  { title: '年齡', align: 'center', sortable: true, key: 'age' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  { title: '預約狀態', align: 'center', sortable: true, key: 'booking' },
  { title: '預約時段', align: 'center', sortable: true, key: 'bookingTime' },
  { title: '特徵', align: 'center', sortable: false, key: 'feature' },
  // { title: '小故事', align: 'center', sortable: false, key: 'story' },
  { title: '疫苗紀錄', align: 'center', sortable: false, key: 'vaccine' },
  { title: '上下架', align: 'center', sortable: true, key: 'sell' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' },
]
// ● 顯示讀取狀態
const tableLoading = ref(true)
// ● 表示後端全部資料的總數（不是指每一頁資料的總數）
const tableItemsLength = ref(0)
// ● 搜尋
const tableSearch = ref('')
// ● 向後端抓取資料，並更新 items 的內容
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1 //若重置表格讀取物件，表格頁數默認至第 1 頁
  tableLoading.value = true
  try {
    // .get(網址, 請求的設定)　　get 沒有送出的資料，所以只有 2 個參數
    const { data } = await apiAuth.get('/dogs/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    items.value.splice(0, items.value.length, ...data.result.data)
    // console.log('items.value', items.value)
    tableItemsLength.value = data.result.total

    // 切換頁數，表格會自動滾動回頂部
    handleEvent()

  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        class: 'snackbar-fail'
      }
    })
  }
  tableLoading.value = false
}
// 要呼叫 function
tableLoadItems()



// ● 依據不同裝置，將 "表格" 設定不同的高度
const tableHeight = computed(() => {
  // 當螢幕寬度小於 md 的裝置，不設定表格高度，讓表格高度自動適應內容高度
  if (!mdAndUp.value) return

  // 直接將計算出的高度傳遞至要使用的元素上（ex: v-data-table）
  // 350 是預抓的數值，包含：上方搜尋欄位、下方分隔線、表格內部的 padding 等等
  return `${height.value - 350}px`
})


// ● 表單換頁時，會觸發指定事件
const handleEvent = () => {
  // 表格滾動回頂部
  resetTableScroll()

  // 螢幕寬度小於 md 的裝置，點擊表單上下分頁按鈕時，會觸發 scrollToTop()
  if (!mdAndUp.value) {
    scrollToTop() // 頁面滾動回頂部
  }
}


// ● 更改上架的勾選狀態
const checkboxChange = async (id, newValue) => {
  try {
    // 發送至後端修改指定 id 的陣列資料裡 sell 的值
    await apiAuth.patch('/dogs/' + id, {
      sell: newValue
    })

    // 更新 items 中的相應 id 的 sell 的值，讓 checkbox 的勾選狀態同步顯示
    const item = items.value.find(item => item._id === id)
    if (item) {
      item.sell = newValue // 更新狀態
    }

    createSnackbar({
      text: newValue === true ? '上架成功' : '下架完成',
      snackbarProps: {
        class: 'snackbar-success',
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error.response.data.message,
      snackbarProps: {
        class: 'snackbar-fail'
      }
    })
  }
}


</script>



<route lang="yaml">
  meta:
    layout: admin
  </route>