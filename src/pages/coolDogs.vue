<template>
  <!-- ● 帥氣狗狗頁面 pages/coolDogs.vue -->
  <section id="cool-dogs" class="cool-dogs">
    <v-container>
      <div class="content">
        <div class="card-box">
          <!-- ● components/dogCard.vue 元件 -->
          <template v-for="item in items" :key="item._id">
            <DogsCard v-bind="item"></DogsCard>
          </template>
        </div>
        <v-pagination class="number-pages" v-model="page" :length="pages" rounded="circle" @update:model-value="loadProducts"></v-pagination>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'
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
const { mobile } = useDisplay()

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
