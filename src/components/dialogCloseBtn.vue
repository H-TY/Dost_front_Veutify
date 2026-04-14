<template>
  <div class="dialog-close">
    <v-btn @click="emit('click')">
      <v-icon :icon="mouseToggle ? 'mdi-close-circle' : 'mdi-close-circle-outline'" @mouseover="mouseToggle = true" @mouseout="mouseToggle = false"></v-icon>
    </v-btn>
  </div>
</template>


<script setup>
// ● 子元件只做傳遞資訊，只能用 emit 通知父層要觸發的事件，父層再去做事件處理。
const emit = defineEmits(['click']) // 宣告子元件會發出哪些事件


// ● 用滑鼠滑入、滑出，觸發改變圖示。
// * 滑鼠事件：
// mouseenter：當滑鼠進入元素時觸發（不冒泡，滑鼠在父元素也不會觸發事件）。
// mouseleave：當滑鼠離開元素時觸發（不冒泡）。
// mouseover：當滑鼠移動到元素上方時觸發（冒泡，滑鼠在父元素也會觸發事件）。
// mouseout：當滑鼠移動離開元素上方時觸發（冒泡）
const mouseToggle = ref(false)

</script>