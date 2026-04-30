<template>
  <p>設定頁面</p>
</template>

<script setup>
import { definePage } from 'vue-router/auto'


definePage({
  meta: {
    title: 'Dost | 設定',
    login: true,
  }
})


</script>


<route lang="yaml">
  meta:
    layout: "empty"
</route>