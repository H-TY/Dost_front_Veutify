<template>
  <div class="booking-search">
    <div class="userZone-page-title">
      <h2>預約訂單查詢</h2>
    </div>

    <!-- ● 訂單清單 -->
    <orderList :headers="headers"></orderList>
  </div>
</template>


<script setup>
import { definePage } from 'vue-router/auto'
import orderList from '@/components/orderList.vue'


definePage({
  meta: {
    title: 'Dost | 預約狗狗查詢',
    login: true,
    admin: false
  }
})


// asc 升冪（由小至大排序）；desc 降冪（由大至小排序）
// const sortBy = [{key: 'bookingOrderNumber', order:'desc'}]
const headers = [
  { align: 'center', title: '訂單編號', key: 'bookingOrderNumber' },
  { align: 'center', title: '訂單狀態', key: 'orderStatus' },
  { align: 'center', title: '下單日期', key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
  // { align: 'center', title: '帳號名稱', key: 'accountName' },
  { align: 'center', title: '預約人', key: 'name' },
  { align: 'center', title: '電話', key: 'phone' },
  { align: 'center', title: '預約狗狗', key: 'dogName' },
  { align: 'center', title: '圖片', key: 'image' },
  { align: 'center', title: '預約日期', key: 'bookingDate' },
  { align: 'center', title: '預約時段', key: 'bookingTime' },
  { align: 'center', title: '預約總時數', key: 'totalBookingTime' },
  { align: 'center', title: '預約總金額', key: 'totalPrice' },
]

</script>



<route lang="yaml">
  meta:
    layout: userZone
</route>
