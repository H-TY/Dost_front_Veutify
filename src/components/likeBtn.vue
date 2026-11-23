<template>
  <div class="like-btn">
    <div :class="['like-box', { disabled: isClickingLikeBtn }]" @click="clickLikeIcon(type, id)">
      <!-- <v-icon :class="['like-icon', { active: isLike, anime }]" icon="mdi-heart" @animationend="anime = false"></v-icon> -->

      <v-icon class="like-icon" icon="mdi-heart"></v-icon>
      <v-icon :class="['like-icon-fill', { active: isLike }]" icon="mdi-heart"></v-icon>
    </div>

    <div class="overlay"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'
import { useSnackbar } from 'vuetify-use-dialog'


const props = defineProps(['id', 'type'])


const favoriteStore = useFavoriteStore()
const { clickedId, favoriteData } = storeToRefs(favoriteStore)
const createSnackbar = useSnackbar()



// const anime = ref(false) // 定義是否添加動畫樣式名稱 .anime
const isClickingLikeBtn = ref(false) // 用於防止重複點擊收藏/追蹤按鈕



// ● 渲染收藏/追蹤狀態
const isLike = computed(() => {
  // console.log('isLike 有觸發')

  let isHave = false;

  if (props.type === 'dog') {
    isHave = favoriteData.value.dogLike.includes(props.id);

  } else if (props.type === 'product') {
    isHave = favoriteData.value.productLike.includes(props.id);
  }

  return isHave;
});


// ● 當點擊 收藏/追蹤 icon
const clickLikeIcon = async (type, id) => {
  // console.log('clickLikeIcon', type, id)

  // 依據點擊的 dogId 判斷是否與傳入的 dogsCard 的 props.id 是否相等 => 等於動畫只作用於有觸發點擊的 dogsCard
  // if (clickedId.value === id) {
  //   anime.value = true
  // }

  isClickingLikeBtn.value = true // 點擊按鈕後，將 isClickingLikeBtn 設為 true，防止重複點擊

  try {
    const res = await favoriteStore.toggleLike(type, id)

    createSnackbar({
      text: res,
      snackbarProps: {
        class: "snackbar-success",
        timer: "5000",
      },
    });
  } catch (error) {
    createSnackbar({
      text: error.message,
      snackbarProps: {
        class: "snackbar-fail",
        timer: "5000",
      },
    });
  } finally {
    setTimeout(() => {
      isClickingLikeBtn.value = false // 無論成功或失敗，最後都將 isClickingLikeBtn 設為 false，允許再次點擊
    }, 2000); // 延遲 2 秒後才允許再次點擊
  }
}



</script>