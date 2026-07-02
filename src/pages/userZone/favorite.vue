<template>
  <div class="favorite">
    <div class="userZone-page-title">
      <h2>收藏夾</h2>
    </div>

    <div class="content">
      <v-tabs v-model="tab" align-tabs="center">
        <template v-for="(el, index) in tabContent" :key="index" :value="index">
          <v-tab>{{ el.title }}</v-tab>
        </template>
      </v-tabs>

      <hr>

      <v-tabs-window v-model="tab" class="tab-window">
        <v-tabs-window-item class="tab-window-box" v-for="(el, index) in tabContent" :key="index" :value="index">
          <template v-for="(el, index) in el.content" :key="index">
            <dogsCard v-bind="el"></dogsCard>
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useFavoriteStore } from "@/stores/favorite";
import dogsCard from "@/components/dogsCard.vue";
import { useSnackbar } from 'vuetify-use-dialog'



definePage({
  meta: {
    title: 'Dost | 收藏夾',
    login: true,
    admin: false
  }
})


const { backApi, apiAuth } = useApi()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const { favoriteData } = storeToRefs(favoriteStore)
const createSnackbar = useSnackbar()


// ● 定義 tab 抓取的值
const tab = ref(0)
// watch(tab, (newVal) => {
//   console.log("tab-newVal", newVal)
// })

// ● 預設 "狗狗蒐藏" 的容器
const dogLikeDetail = ref("")

// ● 預設 "商品追蹤" 的容器
const productLikeDetail = ref("")


// ● 定義 tab 名稱以及其內容
const tabContent = computed(() => {
  return [
    {
      title: "狗狗收藏",
      content: dogLikeDetail.value
    },
    {
      title: "商品追蹤",
      content: productLikeDetail.value
    }
  ]
})


// ● 監視 favoriteData.value.dogLike 的變化，當其變化時，重新抓取狗狗資料
watch(() => favoriteData.value.dogLike, (newVal) => {
  getDogLikeDetail()
})



// ● 呼叫狗狗資料 API，將 favoriteData.value.dogLike 的值傳入後端，作為依據抓取後端的狗狗資料
const getDogLikeDetail = async () => {

  // 先判斷是否為登入狀態
  if (!userStore.isLogin) {
    createSnackbar({
      text: "請先登入",
      snackbarProps: {
        class: 'snackbar-fail'
      }
    })
    return
  }


  // 判斷 favoriteData.value.dogLike 為空陣列，若是則不發送請求
  if (favoriteData.value.dogLike.length === 0) {
    return
  }

  try {
    const { data } = await apiAuth.get(`/dogs/multipleItems`, {
      params: {
        dogIds: favoriteData.value.dogLike
      }
    })
    // console.log("getDogLikeDetail-data", data)

    dogLikeDetail.value = data.result

  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  getDogLikeDetail()
})



</script>



<route lang="yaml">
  meta:
    layout: userZone
</route>