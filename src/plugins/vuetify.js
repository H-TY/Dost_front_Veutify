/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// 翻譯成地區語言(中文)
import { zhHant } from 'vuetify/locale'

// component
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VCalendar } from 'vuetify/labs/VCalendar'



// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  // 斷點
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  // 啟用 TimePicker 元件
  components: {
    VTimePicker,
    VCalendar,
  },
  // 設定翻譯成地區語言(中文)
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  },
})
