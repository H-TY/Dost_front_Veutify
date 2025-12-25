<template>
  <v-container class="pa-4">
    <v-sheet class="pa-4" elevation="1">
      <h3>Vuetify breakpoint 測試器</h3>
      <p>
        當前 viewport 寬度：<strong>{{ width }}</strong> px —
        當前 breakpoint 名稱：<strong>{{ name }}</strong>
      </p>

      <v-row class="mb-3">
        <v-col cols="12" sm="6" md="4" lg="3" class="tester-col">
          <div class="box">cols="12" sm="6" md="4" lg="3"</div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="tester-col">
          <div class="box">cols="12" sm="6" md="4" lg="3"</div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="tester-col">
          <div class="box">cols="12" sm="6" md="4" lg="3"</div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="tester-col">
          <div class="box">cols="12" sm="6" md="4" lg="3"</div>
        </v-col>
      </v-row>

      <div class="mb-3">
        <strong>useDisplay() 回傳狀態（實時）：</strong>
        <v-chip class="ma-1" v-if="xs">xs</v-chip>
        <v-chip class="ma-1" v-if="sm">sm</v-chip>
        <v-chip class="ma-1" v-if="md">md</v-chip>
        <v-chip class="ma-1" v-if="lg">lg</v-chip>
        <v-chip class="ma-1" v-if="xl">xl</v-chip>
        <div class="mt-2">
          <small>mdAndUp: <strong>{{ mdAndUp }}</strong> • smAndDown: <strong>{{ smAndDown }}</strong></small>
        </div>
      </div>

      <div>
        <small>快速測試：建議使用瀏覽器 DevTools 的 Device Toolbar（或手動縮放視窗）測試以下閾值：</small>
        <ul>
          <li><code>xs</code> : &lt; 576 px</li>
          <li><code>sm</code> : ≥ 576 px 且 &lt; 768 px</li>
          <li><code>md</code> : ≥ 768 px 且 &lt; 992 px</li>
          <li><code>lg</code> : ≥ 992 px 且 &lt; 1200 px</li>
          <li><code>xl</code> : ≥ 1200 px</li>
        </ul>
      </div>

      <div class="mt-4">
        <v-btn @click="printDebug" class="mr-2" small>Console: print display object</v-btn>
        <v-btn @click="highlightCols" small>暫時顯示每個 col 的實際寬度</v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()

// 直接暴露方便在 template 讀
const width = ref(display.width)     // number
const name = ref(display.name)       // string
const xs = ref(display.xs)
const sm = ref(display.sm)
const md = ref(display.md)
const lg = ref(display.lg)
const xl = ref(display.xl)
const mdAndUp = ref(display.mdAndUp)
const smAndDown = ref(display.smAndDown)

// watch display 變化並同步
watch(
  () => display.width,
  (val) => { width.value = val }
)

watch(
  () => display.name,
  (val) => { name.value = val }
)

// 也可以 watch 任意 boolean props
watch(
  () => display.xs,
  (val) => xs.value = val
)
watch(
  () => display.sm,
  (val) => sm.value = val
)
watch(
  () => display.md,
  (val) => md.value = val
)
watch(
  () => display.lg,
  (val) => lg.value = val
)
watch(
  () => display.xl,
  (val) => xl.value = val
)
watch(
  () => display.mdAndUp,
  (val) => mdAndUp.value = val
)
watch(
  () => display.smAndDown,
  (val) => smAndDown.value = val
)

// debug helper
function printDebug () {
  // 印出整個 display 物件（注意某些屬性是 reactive ref）
  // 你會在 console 看到 width / name / mdAndUp / smAndDown 等
  // 這裡也把當前值分別印出
  // eslint-disable-next-line no-console
  console.log('display (raw):', display)
  // eslint-disable-next-line no-console
  console.log('display.width', display.width)
  // eslint-disable-next-line no-console
  console.log('display.name', display.name)
  // eslint-disable-next-line no-console
  console.log('mdAndUp', display.mdAndUp)
  // eslint-disable-next-line no-console
  console.log('smAndDown', display.smAndDown)
}

// 顯示 col 實際寬度（短暫 toast 於每個 box）
async function highlightCols () {
  await nextTick()
  const boxes = document.querySelectorAll('.tester-col .box')
  boxes.forEach((b) => {
    const w = b.parentElement.getBoundingClientRect().width.toFixed(0)
    const prev = b.innerText
    b.innerText = `${prev}\n(${w}px)`
    b.style.transition = 'background-color .2s ease'
    b.style.background = '#FFF59D' // 輕黃色，便於觀察
    setTimeout(() => {
      b.innerText = prev
      b.style.background = ''
    }, 1200)
  })
}
</script>

<style scoped>
.tester-col { padding: 6px; }
.box {
  border: 2px dashed rgba(0,0,0,0.2);
  padding: 18px;
  text-align: center;
  white-space: pre-line;
  font-size: 14px;
  border-radius: 6px;
}
</style>