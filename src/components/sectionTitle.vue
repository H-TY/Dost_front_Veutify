<template>
  <div class="section-title-box">
    <!-- mobile 標題 -->
    <div class="section-title-m">
      <h2>{{ title }}</h2>
      <span>{{ enTitle }}</span>
    </div>

    <!-- PC 標題 -->
    <div class="section-title-l">
      <h2>{{ title }}</h2>
      <span>{{ enTitle }}</span>
    </div>
  </div>
</template>

<script setup>

// 這樣寫也可以 defineProps([ 'title', 'enTitle' ])
// 但推薦以下寫法，原因：
// - 型別明確
// - 傳錯會警告
// - IDE / TS 友善
// - 團隊可讀性最高

defineProps({
  title: {
    type: String,
    required: true,
  },
  enTitle: {
    type: String,
    required: true,
  },
})

</script>