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
                <img :src="item.image" alt="狗狗圖片">
              </div>
              <div class="txt-box">
                <h4>{{ item.dogName }}</h4>
                <p>{{ item.feature }}</p>
                <!-- <p>
                  小故事：<br />
                  {{ item.story }}
                </p> -->
                <v-btn @click="goToPageById('booking', item._id)">
                  前往相遇
                </v-btn>
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
            <v-col sm="5" lg="6" class="d-flex">
              <div class="img-box">
                <img src="../assets/img/decorate/service/img-1.avif" alt="服務項目背景圖片">
              </div>
            </v-col>
            <v-col sm="7" lg="6" class="service-card-box">
              <sectionTitle v-bind="sectionTitleData[2]"></sectionTitle>

              <div v-for="(el, index) in serviceData" :key="el.title" class="service-card">
                <div class="card-title">
                  <div class="icon-box">
                    <div class="dot-box">
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                    </div>
                    <img :src="el.img" :alt="el.title + '圖示'">
                  </div>
                  <h5>{{ el.title }}</h5>
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

    <!-- ● 環境 -->
    <section id="env" class="env">
      <v-container fluid>
        <sectionTitle v-bind="sectionTitleData[3]"></sectionTitle>

        <div class="content">
          <template v-for="(el, index) in envData" :key="index">
            <div class="box">
              <!-- 如果包含 .avif，就當作圖片 -->
              <div v-if="el.includes('.avif')" class="env-img">
                <img :src="el" alt="環境照片" />
              </div>

              <!-- 否則當作文字 -->
              <p v-else v-html="el" class="env-txt"></p>
            </div>
          </template>
        </div>
      </v-container>
    </section>

    <!-- ● 結尾影片 -->
    <section id="end-video" class="end-video">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="5">
            <div class="txt-box">
              <p>
                你走了這麼久，<br />
                牠也是。
              </p>
              <p>
                最後，<br />
                你們在這裡遇見了 🐾
              </p>
              <p>
                如果你願意，<br />
                我們幫你安排<v-btn to="/booking">下一次相遇<span>→</span></v-btn>
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="7">
            <video muted autoplay controls>
              <source src="@/assets/video/01_Dog_1280x720.mp4" type="video/mp4">
            </video>
          </v-col>
        </v-row>
      </v-container>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onMounted, nextTick } from 'vue'
import { definePage } from 'vue-router/auto'
import { useDisplay } from 'vuetify'
import { useApi } from '@/composables/axios'
import { useBookingOrderStore } from "@/stores/bookingOrder"
import { useNavigationById } from '@/composables/navigationById' // 這個是為了讓「熱門狗狗區」的按鈕能夠帶參數跳轉到預約頁面，並且直接定位到對應的狗狗卡片
import gsap from '@/plugins'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sectionTitle from '@/components/sectionTitle.vue'
import BannerSwiper from '@/components/bannerSwiper.vue'

// 引進生成的 data_json 檔案
import { serviceData, envData } from '@/plugins/data_json'



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
    title: "服務介紹",
    enTitle: "service",
  },
  {
    title: "店內環境",
    enTitle: "environment",
  },
]

// 解構出 mobile 的斷點
const { mobile } = useDisplay()
const { backApi } = useApi()
const bookingOrderStores = useBookingOrderStore()
const { goToPageById } = useNavigationById()


// ● 向後端請求訂單最多的前 3 名狗狗
// 建立空陣列，後續渲染資料的來源
const topOrderdata = ref([])

// 呼叫 stores/bookingOrder.js 裡的 API
const TTOdata = await bookingOrderStores.topThreeOrder()
// console.log('TTOdata', TTOdata)

// 將回傳的資料整理，賦值給預先設立的 topOrderdata 空陣列
topOrderdata.value = TTOdata.map(el => {
  // expend 給後續卡片做開合狀態的設定，目前預設為 false 關閉
  return { ...el, expend: false }
})
// console.log('topOrderdata', topOrderdata.value)

//● dog-card 點擊展開
function toggleExpend(index) {
  topOrderdata.value.forEach((el, i) => {
    if (i === index) {
      el.expend = !el.expend
    } else {
      el.expend = false
    }
  })
}


// ● 動態生成圖片
// 原因：Vite 的 @ 別名 只會在編譯時靜態解析。
// 動態字串（template literal + 變數）在編譯階段無法解析：
// <例如>：img-${index + 1}.avif 是運行時才知道，Vite 編譯器不知道 @ 應該對應哪個檔案 → 會報錯
function generateImg(index) {
  return new URL(`../assets/img/decorate/top_area/img-${index + 1}.avif`, import.meta.url).href
}



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


  // Timeline：負責「動畫順序」
  // ScrollTrigger：負責「什麼時候開始」
  const endVideoTl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".end-video",
        start: "top 60%",
        // 沒有指定 end 時，GSAP 預設 end: "bottom top"

        // 對應四個階段：
        // onEnter | onLeave | onEnterBack | onLeaveBack
        // - onEnter     ：第一次往下滾，進入觸發區
        // - onLeave     ：繼續往下滾，離開觸發區
        // - onEnterBack ：往上滾，從下面再進入觸發區
        // - onLeaveBack ：繼續往上滾，離開觸發區（回到上方）
        toggleActions: "play none none none", // 只會觸發一次動畫
        // toggleActions: "play reverse play reverse", // 每次滾回來都「整段重播」
      }
    }
  )

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

      // 根據 endVideoTl 觸發動畫時機，開始依照 p 標籤的順序，依序執行動畫
      endVideoTl.fromTo(".end-video .txt-box p",
        // 執行向上淡入的動畫
        // 設定初始狀態
        {
          y: 100,
          opacity: 0,
        },
        // 設定動畫觸發後的狀態
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power1.out",
          // stagger「啟動時間」錯開
          stagger: 0.7

          // 指定最後一句話的延遲時間更長一點
          // - index → 元素順序
          // - target → 當前元素 DOM
          // - list → 所有元素陣列
          // * 如果有用不到的參數，可以用佔位符 _ 代替，但像 target 這個用不到的參數不能省略(需用佔位符 _ )，不然後續的 list 會被誤認為 target
          // stagger: function (index, _, list) {
          //   const base = 0.6
          //   return index === list.length - 1 ? (index * base) + 1 : index * base
          // }
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
