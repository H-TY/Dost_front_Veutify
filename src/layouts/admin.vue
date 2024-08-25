<template>
  <!-- Logo & 導覽列 -->
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <!-- Logo -->
    <v-list>
      <v-list-item :to="logo.to" :ripple="false" nav
      class=""
      :prepend-avatar="logo.img"
      title="管理區"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- 導覽項目 -->
    <v-list>
        <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon" border-radius="50" color="amber"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- 告知 Router 要渲染頁面的組件和當前路徑。 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>


<script setup>
// Logo
const logo = {to: '/admin', img: new URL('@/assets/Dost_logo.png', import.meta.url).href}

// 導覽列項目
const navItems = [
    { to: '/', text: '回首頁', icon: 'mdi-home'},
    { to: '/admin/dogInfo', text: '狗狗資訊管理', icon: 'mdi-dog' },
    { to: '/admin/bookingManage', text: '預約管理', icon: 'mdi-list-box'},
  ]

</script>


<style scoped>

</style>