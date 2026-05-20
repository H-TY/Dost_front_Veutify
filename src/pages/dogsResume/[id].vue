<template>
  <!-- ● 狗狗小檔案 pages\dogsResume\[id].vue -->
  <section class="dog-profile">
    <v-container>
      <div class="bg">
        <sectionTitle title="汪星人小檔案" enTitle="profile"></sectionTitle>

        <div class="content-box">
          <v-col cols="auto">
            <div class="img-box">
              <img :src="items.image"></img>
            </div>

            <div class="text-box">
              <p>{{ items.dogName }}</p>
              <p>{{ items.age }} 歲</p>
              <p>{{ items.feature }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="text-box">
              <div class="box">
                <h6>我的故事</h6>
                <p>{{ items.story }}</p>
              </div>
              <div class="box">
                <h6>疫苗接踵紀錄</h6>
                <v-list class="vax-list">
                  <v-list-item v-for="(el, index) in items.vaccine" :key="index">
                    <p>{{ el.date }}</p>
                    <p>{{ el.name }}</p>
                    <p>{{ el.hospital }}</p>
                  </v-list-item>
                </v-list>
              </div>
            </div>
            <div class="btn-box">
              <v-btn @click="goToPageById('booking', items._id)">
                <p>預約相遇</p> <span>→</span>
              </v-btn>
            </div>
          </v-col>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router";
import { useApi } from "@/composables/axios";
import sectionTitle from '@/components/sectionTitle.vue'
import { useNavigationById } from '@/composables/navigationById'




const route = useRoute()
// console.log('route', route)
const { backApi } = useApi()
const dogId = route.params.id
// console.log('dogId', dogId)
const { goToPageById } = useNavigationById()


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
    console.log('items.value', items.value)


  } catch (error) {
    console.log('getDogData-error：', error)
  }
}
getDogData() // 這邊要自己呼叫一次，才能在載入頁面時觸發向後端請求資料



</script>