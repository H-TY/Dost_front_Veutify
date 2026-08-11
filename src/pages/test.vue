<template>
  <!-- ● 狗狗適性測驗頁面 pages/test.vue -->
  <section id="test" class="test">
    <v-container>
      <sectionTitle title="狗狗適性測驗" enTitle="TEST"></sectionTitle>

      <div class="content">
        <p>* 僅供趣味測驗。</p>

        <v-stepper v-model="step" alt-labels>
          <v-stepper-header>
            <template v-for="(el, index) in items" :key="index">
              <v-stepper-item :value="index + 1" :error="ansRules(index)">
                {{ el.title }}
              </v-stepper-item>
              <v-divider></v-divider>
            </template>

            <v-stepper-item class="result-icon" :value="items.length + 1" icon="mdi-emoticon-outline">
              測驗結果
            </v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <template v-for="(el, index) in items" :key="index">
              <v-stepper-window-item :value="index + 1">
                <p>
                  Q{{ index + 1 }}.
                  {{ el.text }}
                </p>
                <v-radio-group v-model="userAns[index]">
                  <template v-for="element in el.option" :key="element">
                    <v-radio :label="element.subtitle" :value="element.score"></v-radio>
                  </template>
                </v-radio-group>
              </v-stepper-window-item>
            </template>

            <v-stepper-window-item :value="items.length + 1">
              <div class="result-box">
                <template v-if="countScore.num.length">
                  <p>{{ countScore.text }}</p>

                  <v-list>
                    <v-list-item v-for="el in countScore.num">
                      <template #prepend>
                        <span>● </span>
                      </template>
                      題目 {{ el }}
                    </v-list-item>
                  </v-list>
                </template>

                <template v-else>
                  <p>測驗結果－－－－</p>
                  <h6>最適合您的狗狗：</h6>
                  <h5>{{ countScore.text }}</h5>
                  <p>{{ countScore.details }}</p>
                </template>
              </div>
            </v-stepper-window-item>
          </v-stepper-window>

          <hr>

          <v-stepper-actions :class="[prevNextBtnShow, nextBtnText.css]" prev-text="上一題" :next-text="nextBtnText.text" @click:next="changeAns('step++')" @click:prev="changeAns('step--')"></v-stepper-actions>
        </v-stepper>
      </div>
    </v-container>
  </section>

</template>



<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify';
import { useApi } from '@/composables/axios'
import sectionTitle from '@/components/sectionTitle.vue'



definePage({
  meta: {
    title: 'Dost | 適性測驗',
    login: false,
    admin: false
  }
})


// const { mobile } = useDisplay();

// ● 測驗問題&選項
const items = [
  {
    title: "偏好犬型",
    text: "比較偏好哪種體型的狗狗？",
    option: [
      {
        subtitle: "小型犬（小於 10 公斤）",
        score: 1
      }
      ,
      {
        subtitle: "中型犬（11 ~ 25 公斤）",
        score: 2
      }
      ,
      {
        subtitle: "大型犬（26 公斤以上）",
        score: 3
      }
    ]
  },
  {
    title: "狗狗個性",
    text: "喜歡什麼樣個性的狗狗？",
    option: [
      {
        subtitle: "溫和穩定",
        score: 8
      }
      ,
      {
        subtitle: "聰明服從",
        score: 9
      }
      ,
      {
        subtitle: "活潑親人",
        score: 10
      }
    ]
  },
  {
    title: "活動量",
    text: "希望與狗狗一起活動多久時間？",
    option: [
      {
        subtitle: "小於 40 分鐘",
        score: 21
      }
      ,
      {
        subtitle: "介於 40 ~ 60 分鐘之間",
        score: 22
      }
      ,
      {
        subtitle: "大於 1 小時",
        score: 23
      }
    ]
  },
]

// ● 測驗結果
const QuizResults = [
  {
    min: 30,
    max: 32,
    text: "法國鬥牛犬",
    desc: "體型小巧、性情溫和，活動量較低，適合喜歡安靜陪伴的你。"
  },
  {
    min: 33,
    max: 34,
    text: "柯基犬",
    desc: "個性活潑親人，喜歡與人互動，適合喜歡和狗狗一起活動的你。"
  },
  {
    min: 35,
    max: 36,
    text: "澳洲牧羊犬",
    desc: "聰明、活潑且精力充沛，適合喜歡長時間與狗狗互動的你。"
  }
]


const step = ref(1)

// ● 綁定使用者選擇（隨著使用者更改選項，而更新），使用者選擇的答案都放在這裡
// 預設每個答案都是 null，方便後續判斷是否有未填寫答案
const userAns = ref(Array(items.length).fill(null))

// watch(userAns, (newVal) => {
//   console.log('userAns', newVal)
// },
//   {
//     deep: true
//   }
// )


// ● 當到最後的題目時，next 按鈕改成顯示 "測驗結果"
const nextBtnText = computed(() => {

  const isLast = step.value === items.length

  if (isLast) {
    return {
      text: "測驗結果",
      css: "result-btn"
    }
  }

  return {
    text: "下一題",
    css: ""
  }
})


// ● 測驗題的第一頁的 prev 按鈕不顯示，測驗結果頁的 next 按鈕不顯示
const prevNextBtnShow = computed(() => {
  if (step.value === 1) {
    return "prev-btn-noShow"
  } else if (step.value === items.length + 1) {
    return "next-btn-noShow"
  }
})


// ● 點擊上下頁按鈕時，若未作答，族觸發修改答案填寫狀態 null ==> ""
const changeAns = (value) => {
  if (value === "step++") {
    step.value++

    if (userAns.value[step.value - 2] === null) {
      userAns.value[step.value - 2] = ""
    }
  } else {
    step.value--

    if (userAns.value[step.value] === null) {
      userAns.value[step.value] = ""
    }
  }
}


// ● 檢查是否有填寫答案，未填寫 <v-stepper-item> 會標示錯誤
const ansRules = (index) => {
  // console.log('userAns.value', userAns.value)
  if (userAns.value[index] === "") return true
}


// ● 計算測驗分數
const countScore = computed(() => {
  let result = {
    text: "",
    num: [],
    details: ""
  }

  // 找尋答案為 ""，並回傳題號（index + 1），做成陣列資料
  const quziNum = userAns.value.reduce((arry, el, index) => {
    if (el === "") {
      arry.push(index + 1)
    }
    return arry
  }, [])
  // console.log('quziNum', quziNum)
  // console.log('userAns.value', userAns.value)

  // 題目未填寫完整
  if (quziNum.length) {
    result.text = '以下題目尚未填寫答案，請再確認！'
    result.num = quziNum

  } else {

    // ▲ 答案都有填寫，觸發計算
    const counter = userAns.value.reduce((sum, el) => {
      return sum + el
    }, 0)
    // console.log('counter', counter)

    QuizResults.find((el) => {
      if (counter >= el.min && counter <= el.max) {
        result.text = el.text
        result.details = el.desc
      }
    })
  }

  // console.log('result', result)
  return result
})



</script>