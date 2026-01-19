<template>
  <div class="dialog-close">
    <v-btn @click="emitClose">
      <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" @mouseover="mouseoverHandle" @mouseout="mouseoverHandle" @click="clickmouseToggleOff"></v-icon>
    </v-btn>
  </div>
</template>


<script setup>
// ● 定義從元件傳入的資料
// const props = defineProps([dialogName]) // 簡寫
// 詳細寫
const props = defineProps({
  dialogName: {
    type: String,
    require: true,
  },
})

// ● 通知父層要關閉的 dialog 名字
// 無法在子元件修改 props 的值，可能會讓後續整個狀態亂掉
// 子元件只做傳遞資訊，只能用 emit 通知父層要關閉的動作
const emit = defineEmits(['close']) // 宣告子元件會發出哪些事件
const emitClose = () => {
  emit('close', props.dialogName) // 傳遞給父層要觸發的動作、名子參數
}


// ● 用滑鼠滑入、滑出，觸發改變圖示。
// * 滑鼠事件：
// mouseenter：當滑鼠進入元素時觸發（不冒泡，滑鼠在父元素也不會觸發事件）。
// mouseleave：當滑鼠離開元素時觸發（不冒泡）。
// mouseover：當滑鼠移動到元素上方時觸發（冒泡，滑鼠在父元素也會觸發事件）。
// mouseout：當滑鼠移動離開元素上方時觸發（冒泡）
const mouseToggle = ref(false)

const mouseoverHandle = () => {
  mouseToggle.value = !mouseToggle.value
}

const clickmouseToggleOff = () => {
  mouseToggle.value = false
}
</script>