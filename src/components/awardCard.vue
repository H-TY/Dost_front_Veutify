<template>
  <v-sheet class="bg-transparent pa-6">
    <v-sheet class="bg-transparent position-relative d-flex flex-column align-center justify-center cssSet">
      <v-sheet class="bg-transparent mb-1">
        <slot name="icon">預設 icon 位置</slot>
      </v-sheet>
      <v-sheet class="bg-transparent overflow-hidden rounded-circle cssZindex" :width="mobile ? 220 : 300" :height="mobile ? 220 : 300">
        <slot name="img">預設 img 位置</slot>
      </v-sheet>
      <!-- <v-sheet class="bg-transparent mt-5 namePosition">
        <slot name="dogName">預設 dogName 位置</slot>
      </v-sheet> -->
      <v-sheet class="shadowPosition" :class="getShadowColor(index)" :width="mobile ? 102 : 120" :height="mobile ? 102 : 120">
        <v-sheet class="bg-transparent namePosition">
          <slot name="dogName">預設 dogName 位置</slot>
        </v-sheet>
      </v-sheet>
      <v-sheet class="bg-transparent borderPosition" :class="getBorderColor(index)" :width="mobile ? 250 : 330" :height="mobile ? 250 : 330"></v-sheet>
    </v-sheet>
  </v-sheet>
</template>


<script setup>
import { useDisplay } from 'vuetify'

// 解構出 mobile 的斷點
const { mobile } = useDisplay()

const props = defineProps(['index'])

// shadow 動態綁定 class
const getShadowColor = (index) => {
  if (index === 0) {
    return 'shadowColorA'
  } else if (index === 1) {
    return 'shadowColorB'
  } else if (index === 2) {
    return 'shadowColorC'
  }
}

// 圓框動態綁定 class
const getBorderColor = (index) => {
  if (index === 0) {
    return 'borderColorA'
  } else if (index === 1) {
    return 'borderColorB'
  } else if (index === 2) {
    return 'borderColorC'
  }
}


</script>


<style scoped>
/* 設定最外層的寬度，寬度符合內容 */
.cssSet {
  width: fit-content;
}

/* 設定圖片層數 */
.cssZindex {
  z-index: 1;
}

.namePosition {
  position: absolute;
  top: 60%;
  left: 60%;
  transform: translate(-40%, -40%) rotate(-45deg);
  z-index: 2;
}

.shadowPosition {
  border-radius: 50%;
  position: absolute;
  bottom: -20px;
  right: -25px;
}

.borderPosition {
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: -20px;
}


/* 3種陰影顏色 */
.shadowColorA {
  background: #CFD8DC;
}

.shadowColorB {
  background: #FDD835;
}

.shadowColorC {
  background: #d35f12;
}

/* 3種外框顏色 */
.borderColorA {
  border: 8px solid #CFD8DC;
  box-shadow: -1px -1px 5px rgba(0, 0, 0, 0.3);

}

.borderColorB {
  border: 8px solid #FDD835;
  box-shadow: -1px -1px 5px rgba(0, 0, 0, 0.3);

}

.borderColorC {
  border: 8px solid #d35f12;
  box-shadow: -1px -1px 5px rgba(0, 0, 0, 0.3);
}
</style>