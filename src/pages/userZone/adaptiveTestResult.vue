<template>
  <div class="test-result">
    <div class="userZone-page-title">
      <h2>適性測驗結果</h2>
    </div>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: 'Dost | 適性測驗結果',
    login: true,
    admin: false
  }
})
</script>

<route lang="yaml">
  meta:
    layout: userZone
</route>