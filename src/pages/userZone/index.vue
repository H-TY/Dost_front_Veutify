<template>
  
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: 'Dost | 會員專區',
    login: true,
    admin: false
  }
})
</script>

<route lang="yaml">
  meta:
    layout: userZone
</route>