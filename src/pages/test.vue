<template>
此頁是狗狗適性測驗
  <testBreakpoint></testBreakpoint>

</template>

<script setup>
  import testBreakpoint from '@/components/TEST_Breakpointvue.vue'

  import { useDisplay } from 'vuetify';

  const display = useDisplay();

  console.log('目前斷點資訊:',  display.thresholds.value);
</script>