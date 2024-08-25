<template>
  <v-container class="mt-10">
    <v-row>
      <v-col cols="4" v-for="item in items" :key="item._id">
        <DogsCard v-bind="item"></DogsCard>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="page" :length="pages" rounded="circle" @update:model-value="loadProducts"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import DogsCard from '@/components/dogsCard.vue'

definePage({
  meta: {
    title: 'Dost | 帥氣狗狗',
    login: false,
    admin: false
  }
})

const { backApi, apiAuth } = useApi()
const createSnackbar = useSnackbar()

const page = ref(1)
const pages = ref(1)
const ITEMS_PER_PAGE = 6
const items = ref([])
const loadProducts = async () => {
  try {
    const { data } = await backApi.get('/dogs', {
      params: {
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE)
    items.value.splice(0, items.value.length, ...data.result.data)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
loadProducts()



</script>
