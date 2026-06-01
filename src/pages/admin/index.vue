<template>
  <div class="admin-home">
    <div class="back-home">
      <div class="text-box">
        <h4>歡迎回來，管理者！</h4>
        <p>您可以在此管理狗狗資訊並查看所有預約訂單。</p>
        <small>※ 點擊 LOGO 可回首頁</small>
      </div>
      <v-card :to="logo.to">
        <img :src="logo.img"></img>
      </v-card>
    </div>

    <div class="admin-page-title">
      <h2>選擇管理項目</h2>
    </div>

    <div class="card-box">
      <customCard class="admin-home-card" v-for="item in adminNavItems.slice(1)" :key="item.text" :to="item.to" :title="item.title" :text="item.desc" :icon="item.icon"></customCard>
    </div>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { logo, adminNavItems } from '@/plugins/data_json'
import customCard from '@/components/Card'



definePage({
  meta: {
    title: 'Dost | 管理區',
    login: true,
    admin: true
  }
})


</script>


<route lang="yaml">
meta:
  layout: admin
</route>