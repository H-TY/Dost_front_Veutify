<template>
  <div class="booking-info">
    <div class="admin-page-title" ref="RefTitle">
      <h2>預約訂單管理</h2>
    </div>

    <orderList :headers="headers"></orderList>

  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useTitleScrollDown, useTableScroll } from '@/composables/scrollAddClass'
import orderList from '@/components/orderList.vue'



definePage({
  meta: {
    title: 'Dost | 預約狗狗查詢',
    login: true,
    admin: false
  }
})


const { RefTitle } = useTitleScrollDown()


const headers = [
  { title: '訂單編號', key: 'bookingOrderNumber', align: 'center' },
  { title: '訂單狀態', key: 'orderStatus', align: 'center' },
  { title: '下單日期', key: 'createdAt', align: 'center', value: item => new Date(item.createdAt).toLocaleString() },
  { title: '帳號名稱', key: 'accountName', align: 'center' },
  { title: '預約人', key: 'name', align: 'center' },
  { title: '電話', key: 'phone', align: 'center' },
  { title: '預約狗狗', key: 'dogName', align: 'center' },
  { title: '圖片', key: 'image', align: 'center' },
  { title: '預約日期', key: 'bookingDate', align: 'center' },
  { title: '預約時段', key: 'bookingTime', align: 'center' },
  { title: '預約總時數', key: 'totalBookingTime', align: 'center' },
  { title: '預約總金額', key: 'totalPrice', align: 'center' },
]

</script>



<route lang="yaml">
  meta:
    layout: admin
</route>