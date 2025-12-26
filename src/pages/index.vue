<template>
  <div id="home" class="home">
    <!-- ● Banner區 -->
    <div id="banner" class="banner">
      <v-container fluid class="pa-0">
        <BannerSwiper></BannerSwiper>

        <div class="banner-txt">

          <h1>
            嘿～～<br />今天要不要被狗狗療育一下？
          </h1>

          <h4>
            DOST
            <span>｜寵物狗狗陪伴</span>
          </h4>
          <p>
            摸摸、陪伴、慢慢來
            <br />這裡有剛剛好的溫柔
          </p>
          <v-btn to="/booking">
            預約狗狗陪伴
            <div class="arrow-box">
              <v-icon icon="mdi mdi-chevron-right"></v-icon>
              <v-icon icon="mdi mdi-chevron-right"></v-icon>
              <v-icon icon="mdi mdi-chevron-right"></v-icon>
            </div>
          </v-btn>
        </div>
      </v-container>
    </div>

    <!-- ● 品牌故事 -->
    <section id="story" class="story">
      <div class="dog-foot-box">
        <div class="box">
          <img src="../assets/img/decorate/dog_foot-1.avif" alt="狗狗腳印">
          <img src="../assets/img/decorate/dog_foot-1.avif" alt="狗狗腳印">
          <img src="../assets/img/decorate/dog_foot-1.avif" alt="狗狗腳印">
          <img src="../assets/img/decorate/dog_foot-1.avif" alt="狗狗腳印">
        </div>
      </div>

      <v-container fluid>
        <!-- 如需修改或新增標題，前往下方的 sectionTitleData 陣列 -->
        <sectionTitle v-bind="sectionTitleData[0]"></sectionTitle>

        <div class="content">
          <v-row>
            <v-col cols="12" sm="6" md="5" lg="auto" class="txt-box">
              <p>
                有時候，
                <br />生活真的有一點累。
                <br />
                <br />但你知道嗎？
                <br />有一群狗狗，
                <br />正在很認真地等你出現。
                <br />
                <br />在 DOST，
                <br />狗狗不會問你怎麼了，
                <br />只會把頭輕輕靠過來。
              </p>
            </v-col>

            <v-col cols="12" sm="6" md="7" lg="auto" class="img-box">
              <img src="@/assets/img/decorate/home/story-2.avif" alt="品牌故事_圖片">
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="5" lg="auto" class="txt-box">
              <p>
                你可以跟牠說話，
                <br />也可以什麼都不說。
                <br />牠們都會乖乖陪著你。
                <br />
                <br />我們希望，
                <br />這裡能成為你生活裡
                <br />最不需要逞強的地方。
              </p>
            </v-col>

            <v-col cols="12" sm="6" md="7" lg="auto" class="img-box">
              <img src="@/assets/img/decorate/home/story-3.avif" alt="品牌故事_圖片">
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- ● 熱門狗狗區 -->
    <section id="top-area" class="top-area">
      <v-container fluid>
        <sectionTitle v-bind="sectionTitleData[1]"></sectionTitle>

        <div class="content">
          <div class="w-100 ga-5 ga-sm-0 d-flex flex-column flex-sm-row justify-center align-center">
            <div v-for="(item, index) in topOrderdata" :key="index" class="dog-card" :class="{ show: item.expend, 'order-sm-1': index === 1, 'order-sm-2': index === 0, 'order-sm-3': index === 2 }" @click="toggleExpend(index)">
              <div class="crown-box">
                <img :src="generateImg(index)" alt="獎牌圖示">
              </div>
              <div class="img-box">
                <img :src="item.img" alt="狗狗圖片">
              </div>
              <div class="txt-box">
                <h4>{{ item.dogName }}</h4>
                <p>溫柔第一名
                  <br />最會靜靜靠著你
                </p>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- ● 服務項目 -->
    <section id="service" class="service">
      <v-container fluid>
        <div class="content">
          <v-row class="box">
            <v-col sm="4" md="5" lg="6" class="d-flex">
              <div class="img-box">
                <img src="../assets/img/decorate/service/img-1.avif" alt="服務項目背景圖片">
              </div>
            </v-col>
            <v-col sm="8" md="7" lg="6" class="service-card-box">
              <sectionTitle v-bind="sectionTitleData[2]"></sectionTitle>

              <div v-for="(el, index) in serviceData" :key="el.title" class="service-card">
                <div class="card-title">
                  <div class="icon-box">
                    <!-- <v-icon :icon="el.icon"></v-icon> -->
                    <img :src="el.img" :alt="el.title + '圖示'">
                  </div>
                  <h4>{{ el.title }}</h4>
                </div>
                <div class="card-txt">
                  <p v-for="txt in el.desc">{{ txt }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <v-divider class="my-10 w-80 mx-auto"></v-divider>

    <!-- ● 影音生活區 -->
    <section>
      <v-sheet class="text-center font-weight-black bg-transparent my-12" :class="mobile ? 'text-h4' : 'text-h3'">
        狗狗生活札記
      </v-sheet>
      <v-sheet class="bg-transparent d-flex pa-0">
        <v-row class="ma-0">
          <v-col cols="12" sm="5" class="pa-0 d-flex" :class="mobile ? 'pa-3 justify-center' : 'pa-0 align-center'">
            <v-sheet class="bg-transparent d-flex flex-column">
              <h1 class="mb-3 text-center" :class="mobile ? 'text-h5' : 'text-h4'">可愛影片～療癒身心～</h1>
              大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="7" class="pa-0">
            <v-responsive aspect-ratio="16/9" class="w-100">
              <video class="w-100 rounded-xl" controls>
                <source src="@/assets/video/01_Dog_1280x720.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </v-responsive>
          </v-col>
        </v-row>
      </v-sheet>
    </section>

    <!-- ● 照片區 -->
    <section>
      <v-row class="ma-0 d-flex" :class="mobile ? 'flex-column-reverse' : ''">
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
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onMounted, nextTick } from 'vue'
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'
import { useApi } from '@/composables/axios'
import gsap from '@/plugins'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { serviceData } from '@/plugins/data_json/serviceData' // 具名匯入
import sectionTitle from '@/components/sectionTitle.vue'
import BannerSwiper from '@/components/bannerSwiper.vue'
// import AwardCard from '@/components/awardCard.vue'
import PhotoCardSwiper from '@/components/photoCardSwiper.vue'
import PhotoCard from '@/components/photoCard.vue'


definePage({
  meta: {
    title: 'Dost',
    login: false,
    admin: false
  }
})

// 欄位區域的標題
const sectionTitleData = [
  {
    title: "品牌故事",
    enTitle: "brand story",
  },
  {
    title: "人氣狗狗",
    enTitle: "top dogs",
  },
  {
    title: "主要服務",
    enTitle: "service",
  },
]

// 解構出 mobile 的斷點
const { mobile } = useDisplay()
const { backApi } = useApi()

// ● 向後端請求訂單最多的前 3 名狗狗
// 用 watchEffect 監聽訂單變動情形，有變動時會自動更新狀態
const topOrderdata = reactive([])

watchEffect(async () => {
  try {

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
    }, { timeout: 10 })
    // console.log('topOrder_data.result', data.result)

    const reData = data.result
      .map(el => {
        // expend 給後續卡片做開合狀態的設定，目前預設為 false 關閉
        return { dogName: el.dogName, img: el.image, counter: el.counter, expend: false }
      })
      // 以 counter 做降冪排序
      .sort((a, b) => {
        return b.counter - a.counter
      })
    // 修改第二筆的資料排序，放至第一位
    // 在頁面上由左而右顯示的樣子 2nd 1st 3rd
    // const [secondData] = reData.splice(1, 1)
    // reData.unshift(secondData)
    // console.log('reData', reData)

    // 將回傳的資料放入 topOrderdata 的陣列中
    topOrderdata.push(...reData)

  } catch (error) {
    console.log('請求訂單最多的前 3 名狗狗_error', error)

  }
})
// console.log('topOrderdata', topOrderdata)

// 動態生成圖片
// 原因：Vite 的 @ 別名 只會在編譯時靜態解析。
// 動態字串（template literal + 變數）在編譯階段無法解析：
// img-${index + 1}.avif 是運行時才知道
// Vite 編譯器不知道 @ 應該對應哪個檔案 → 會報錯
function generateImg(index) {
  return new URL(`../assets/img/decorate/top_area/img-${index + 1}.avif`, import.meta.url).href
}

//● dog-card 點擊展開
function toggleExpend(index) {
  topOrderdata.forEach((el, i) => {
    if (i === index) {
      el.expend = !el.expend
    } else {
      el.expend = false
    }
  })
}

// 讓 GSAP 可以抓到正確位置（確定圖片完全載入）


// * onMounted：
// Vue 組件的 DOM 已經被放進頁面，但是 DOM 可能還沒有完成更新內部的資料或屬性(某些由 v-for 或 v-if 動態生成的元素還沒出現)。

// * nextTick：
// 保證 Vue 更新完成，DOM 節點、資料綁定、class/style 都已經準備好。

// * requestAnimationFrame：
// 保證瀏覽器重繪完成，元素位置、尺寸、offset 都是正確的，適合做動畫初始化或 ScrollTrigger 計算。
onMounted(async () => {
  await nextTick();

  // 因 .box 有多個 img，後續需要用迴圈個別設定 gsap
  const footImgs = gsap.utils.toArray(".dog-foot-box .box img")

  // gsap ScrollTrigger 初始化函式
  function initScrollTrigger() {
    // 因有用到 Vutify 的元件(v-container、v-col ... 等)，故需要 requestAnimationFrame() 才能抓取到掛載後的正確位置
    requestAnimationFrame(() => {
      footImgs.forEach(el => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleClass: "anim",
            // markers: true
          }
        })
      })
      // 確保 ScrollTrigger 第一次抓到正確位置
      ScrollTrigger.refresh()
    })
  }

  // 用來計算圖片是否已經全部載入
  let loadedCount = 0

  footImgs.forEach(img => {
    // complete + naturalWidth → 處理 "已經載入完成的圖片（快取）"
    if (img.complete && img.naturalWidth > 0) {
      loadedCount++
    } else {
      // 事件監聽 load → 只處理 "尚未載入的圖片"。
      // { once: true } 事件只觸發一次，避免重複累計。
      // 無論圖片成功或失敗，載入圖片數量都 +1，避免卡住計數(無法滿足完整載入圖片數量)，導致永遠無法初始化 scrollTrigger。
      img.addEventListener("load", onLoad, { once: true })
      img.addEventListener("error", onLoad, { once: true })
    }
  })

  function onLoad() {
    loadedCount++
    if (loadedCount === footImgs.length) {
      initScrollTrigger()
    }
  }

  // ★ 這段是防止 "所有圖片已經在頁面☆快取中☆載入完成" 的情況，就不會觸發 onLoad。
  // 本質上是「重複初始化 ScrollTrigger 的安全機制」。
  if (loadedCount === footImgs.length) {
    initScrollTrigger()
  }



})


</script>
