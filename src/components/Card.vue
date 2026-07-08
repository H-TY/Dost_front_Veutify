<template>
  <v-card class="custom-card" :class="textStatus.class" :to="to">
    <div class="card-title">
      <v-icon :icon="icon"></v-icon>
      <h6>{{ title }}</h6>
    </div>

    <template v-if="ishave">
      <div class="detail-box">
        <template v-if="'狀態' in content">
          <v-btn>{{ textStatus.text }}</v-btn>
        </template>
        <ul>
          <template v-for="(value, key, index) in filteredText" :key="index">
            <li>
              <template v-if="Array.isArray(value)">
                <p>
                  {{ key }}：
                  <template v-for="el in value">
                    <span>- {{ el }}</span>
                  </template>
                </p>
              </template>

              <template v-else>
                <p>{{ key }}：{{ value }}</p>
              </template>
            </li>
          </template>
        </ul>
      </div>
    </template>

    <template v-else>
      <p>{{ content }}</p>
    </template>

  </v-card>
</template>



<script setup>
import { ref, computed } from 'vue'

// props 都是帶有響應式的（reactive）
const props = defineProps(['to', 'title', 'ishave', 'content', 'icon'])
// watch(() => props.content, (val) => {
//   console.log('props.content 更新:', val)
// })

// ● 依據 content 所顯示的訂單狀態，判斷 class 的樣式
const textStatus = computed(() => {
  if (props.ishave) {
    if (props.content.狀態 === 'completed') {
      return {
        text: '已完成',
        class: 'completed'
      }
    } else if (props.content.狀態 === false) {
      return {
        text: '已取消',
        class: 'cancelled'
      }
    } else {
      return {
        text: '進行中',
        class: ''
      }
    }
  } else {
    return {
      class: 'cancelled'
    }
  }
})


// ● 若 content 為物件資料，在頁面迴圈生成的內容，指定過濾掉不想生成的 key
const excludeKeys = ['狀態', '狗狗圖片']

const filteredText = computed(() => {
  // Object.entries() 先將物件轉為陣列
  // 再用 .filter 過濾掉不要的 key
  const reText = Object.entries(props.content).filter(([key]) => !excludeKeys.includes(key))
  // console.log('reText', reText)

  // 最後用 Object.fromEntries() 還原成 "物件資料格式"
  return Object.fromEntries(reText)
})



</script>