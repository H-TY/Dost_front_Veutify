<template>
  <v-container fluid class="pa-0">
    <!-- ● Banner區 -->
    <v-sheet class="bg-transparent">
      <BannerSwiper></BannerSwiper>
    </v-sheet>

    <!-- ● 熱門狗狗區 -->
    <v-sheet class="justify-center bg-transparent my-12 px-10">
      <v-sheet class="text-center font-weight-black bg-transparent my-12" :class="mobile ? 'text-h4' : 'text-h3'">人氣狗狗大集合！</v-sheet>
      <v-row :class="mobile ? '' : 'mt-5'">
        <v-col class=" d-flex justify-center" v-for="(el, index) in topOrderdata" :key="index" :class="mobile ? 'my-5' : ''">
          <AwardCard :index="index">
            <template #icon>
              <v-icon :class="[getCrownColor(index), mobile ? getMobileCrownPosition(index) : '']" icon="mdi-crown"></v-icon>
            </template>
            <template #dogName>
              <p class="awardTextCss" :class="mobile ? 'text-h6' : 'text-h5'">{{ el.dogName }}</p>
            </template>
            <template #img>
              <img :src="el.img" class="h-100"></img>
            </template>
          </AwardCard>
        </v-col>
      </v-row>
    </v-sheet>

    <v-divider class="my-10 w-80 mx-auto"></v-divider>

    <!-- ● 影音生活區 -->
    <v-sheet class="bg-transparent px-10">
      <v-sheet class="text-center font-weight-black bg-transparent my-12" :class="mobile ? 'text-h4' : 'text-h3'">
        狗狗生活札記
      </v-sheet>
      <v-sheet class="bg-transparent d-flex pa-0">
        <v-row>
          <v-col cols="12" sm="5" class="pa-0 d-flex" :class="mobile ? 'pa-3 justify-center' : 'pa-0 pe-7 align-center'">
            <v-sheet class="bg-transparent d-flex flex-column">
              <h1 class="mb-3 text-center" :class="mobile ? 'text-h5' : 'text-h4'">可愛影片～療癒身心～</h1>
              大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="7" class="pa-0">
            <v-responsive aspect-ratio="16/9">
              <video class="w-100 rounded-xl" controls>
                <source src="@/assets/video/01_Dog_1280x720.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </v-responsive>
          </v-col>
        </v-row>
      </v-sheet>
    </v-sheet>

    <!-- ● 照片區 -->
    <v-sheet class="bg-transparent px-10 my-13">
      <v-row class="d-flex" :class="mobile ? 'flex-column-reverse' : ''">
        <v-col cols="12" sm="7" class="pa-0">
          <v-sheet class="bg-transparent">
            <!-- <PhotoCardSwiper></PhotoCardSwiper> -->
            <PhotoCard></PhotoCard>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="5" class="position-relative pa-0 d-flex mt-5" :class="mobile ? 'pa-3 justify-center' : 'pa-0 ps-7 align-center'">
          <v-sheet class="bg-transparent d-flex flex-column">
            <h1 class="mb-3 text-center" :class="mobile ? 'text-h5' : 'text-h4'">滿滿的精采歡樂回憶！</h1>
            大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- ● 關於我們 / 品牌故事 -->


  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'
import { useApi } from '@/composables/axios'
import BannerSwiper from '@/components/bannerSwiper.vue'
import AwardCard from '@/components/awardCard.vue'
import PhotoCardSwiper from '@/components/photoCardSwiper.vue'
import PhotoCard from '@/components/photoCard.vue'


definePage({
  meta: {
    title: 'Dost',
    login: false,
    admin: false
  }
})

// 解構出 mobile 的斷點
const { mobile } = useDisplay()
const { backApi } = useApi()

const topOrderdata = reactive([])

// ● 向後端請求訂單最多的前 3 名狗狗
// 用 watchEffect 監聽訂單變動情形，有變動時會自動更新狀態
watchEffect(async () => {

  // 只計算 4 個月內的有效訂單
  const nowDate = ref(new Date())

  // 要傳至後端作為搜尋訂單編號用的關鍵字
  const reNowDate = computed(() => {
    // 找出年份 .getFullYear()，並 .toString() 轉成文字
    const nowDateYear = nowDate.value.getFullYear().toString()

    // 找出月份 .getMonth()，並 .toString() 轉成文字
    // 資料類型須為文字/字符/字符串 .padStart(2, '0') 用零補足至 2 位數
    const nowDateMonth = (nowDate.value.getMonth() + 1).toString().length > 1 ? (nowDate.value.getMonth() + 1).toString() : (nowDate.value.getMonth() + 1).toString().toString().padStart(2, '0')

    // 將年、月、日組合
    return nowDateYear + nowDateMonth
  })
  // console.log('reNowDate', reNowDate.value)

  // 後端回傳數量最多的前 3 筆訂單資料
  const { data } = await backApi.get('/order/topOrder', {
    params: {
      reNowDate: reNowDate.value
    }
  })
  // console.log('data.result', data.result)

  const reData = data.result
    .map(el => {
      return { dogName: el.dogName, img: el.image, counter: el.counter }
    })
    // 以 counter 做降冪排序
    .sort((a, b) => {
      return b.counter - a.counter
    })
  // 修改第二筆的資料排序，放至第一位
  // 在頁面上由左而右顯示的樣子 2nd 1st 3rd
  const [secondData] = reData.splice(1, 1)
  reData.unshift(secondData)
  // console.log('reData', reData)

  // 將回傳的資料放入 topOrderdata 的陣列中
  topOrderdata.push(...reData)
})
// console.log('topOrderdata', topOrderdata)


// 動態綁定 class 皇冠顏色
const getCrownColor = (index) => {
  if (index === 0) {
    return 'crownColorA'
  } else if (index === 1) {
    return 'crownColorB'
  } else if (index === 2) {
    return 'crownColorC'
  }
}

// moble狀態下，動態綁定 class 皇冠位置
const getMobileCrownPosition = (index) => {
  if (index === 1) {
    return 'mobileCrownPositionA'
  } else {
    return 'mobileCrownPositionB'
  }
}

</script>


<style scoped>
/* 獎牌文字樣式設定 */
.awardTextCss {
  font-weight: 600;
  letter-spacing: 2px;
  color: white;
  text-shadow: 2px 2px 2px rgba(78, 78, 78, 0.5);
}

/* 皇冠樣式設定 */
.crownColorA {
  font-size: 50px;
  color: #CFD8DC;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(31%, -75%) rotate(-35deg);
  z-index: 2;
}

.crownColorB {
  font-size: 70px;
  color: #FDD835;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0%, -75%) rotate(-35deg);
  z-index: 2;
}

.crownColorC {
  font-size: 50px;
  color: #d35f12;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(31%, -75%) rotate(-35deg);
  z-index: 2;
}

/* mobile 狀態下，皇冠的位置 */
.mobileCrownPositionA {
  transform: translate(-20%, -85%) rotate(-35deg);
}

.mobileCrownPositionB {
  transform: translate(-10%, -82%) rotate(-35deg);
}
</style>
