<template>
  <!-- ● 狗狗小檔案 pages\dogsResume\[id].vue -->
  <section class="dog-profile">
    <v-container>
      <div class="bg">

        <!-- 加入我的最愛 icon -->
        <div class="like-box" @click="clickLikeIcon('dog', dogId)">
          <v-icon :class="['like-icon', { active: isLike, anime }]" icon="mdi-heart" @animationend="anime = false"></v-icon>
        </div>

        <sectionTitle title="汪星人小檔案" enTitle="profile"></sectionTitle>

        <div class="content-box">
          <v-col cols="auto">
            <div class="img-box">
              <img :src="items.image"></img>
            </div>

            <div class="text-box">
              <h6 class="name-and-age">
                <v-icon class="mdi mdi-card-bulleted"></v-icon>
                {{ items.dogName }}｜{{ items.age }} 歲
              </h6>
              <p>{{ items.feature }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="text-box">
              <div class="box">
                <h6>
                  <v-icon class="mdi mdi-book-open-page-variant"></v-icon>
                  我的故事
                </h6>
                <p>{{ items.story }}</p>
              </div>
              <div class="box">
                <h6>
                  <v-icon class="mdi  mdi-virus"></v-icon>
                  疫苗接踵
                </h6>
                <v-list class="vax-list">
                  <v-list-item v-for="(el, index) in items.vaccine" :key="index" class="vax-item">
                    <v-icon class="mdi mdi-needle"></v-icon>
                    <p>{{ el.date }}</p>
                    <p>{{ el.name }}</p>
                    <p>{{ el.hospital }}</p>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-col>
        </div>

        <div class="btn-box">
          <v-btn @click="goToPageById('booking', items._id)">
            <p>開始相遇</p> <span>→</span>
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { definePage } from 'vue-router/auto'
import { storeToRefs } from "pinia";
import { useFavoriteStore } from "@/stores/favorite";
import { useRoute } from "vue-router";
import { useApi } from "@/composables/axios";
import { useNavigationById } from '@/composables/navigationById'
import sectionTitle from '@/components/sectionTitle.vue'
import { useSnackbar } from 'vuetify-use-dialog'



definePage({
  meta: {
    title: 'Dost | 狗狗小檔案',
    login: false,
    admin: false
  }
})


const favoriteStore = useFavoriteStore()
const { clickedId, favoriteData } = storeToRefs(favoriteStore)
const route = useRoute()
// console.log('route', route)
const { backApi } = useApi()
const dogId = route.params.id
// console.log('dogId', dogId)
const { goToPageById } = useNavigationById()
const createSnackbar = useSnackbar()


// ● 用來儲存後端回傳的狗狗資料
const items = ref("")

// ● 向後端發請求索取狗狗資料
const getDogData = async () => {
  try {
    const { data } = await backApi.get('/dogs/' + dogId, {
      params: {
        id: dogId
      }
    })
    // console.log('getDogData-data', data)

    items.value = data.result
    // console.log('items.value', items.value)


  } catch (error) {
    console.log('getDogData-error：', error)
  }
}
getDogData() // 這邊要自己呼叫一次，才能在載入頁面時觸發向後端請求資料


// ● 計算是否已加入收藏/追蹤
const isLike = computed(() => {
  const isHave = favoriteData.value.dogLike.includes(dogId)

  return isHave
})


// ● 點擊 icon，觸發加入 收藏/追蹤 
const clickLikeIcon = async (passInCat, passInId) => {
  const res = await favoriteStore.toggleLike(passInCat, passInId)

  if (!res.success) {
    createSnackbar({
      text: res.msg || "發生錯誤",
      snackbarProps: {
        class: "snackbar-fail",
        timer: "5000",
      },
    })
  }
}


// ● 點擊後，添加動畫
const anime = ref(false)

watch(() => favoriteData.value.dogLike, (newVal) => {
  if (clickedId.value === dogId) {
    anime.value = true
  }
})


</script>
