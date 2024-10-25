<template>
  <v-container class="h-100 d-flex justify-center position-relative">
    <v-sheet class="bg-transparent d-flex flex-column align-center h-100 NavItemsPosition">
      <h1 class="text-center my-5">請選擇管理項目</h1>
      <v-sheet class="bg-transparent d-flex mt-4">
        <itemsCard v-for="item in navItems" :key="text" :to="item.to" :text="item.text" :icon="item.icon"></itemsCard>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import AdminNavItems from '@/components/AdminNavItems'
import itemsCard from '@/components/Card'

definePage({
  meta: {
    title: 'Dost | 管理區',
    login: true,
    admin: true
  }
})

const {logo, navItems} = AdminNavItems()

</script>



<style scoped>
.NavItemsPosition{
  position: absolute;
  top: 8%;
}
</style>



<route lang="yaml">
meta:
  layout: admin
</route>