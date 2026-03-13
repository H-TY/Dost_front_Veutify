// 在指定元素向下移動至一定距離時，於元素上添加指定的 CSS 樣式

import { ref, onMounted, onUnmounted } from "vue";

export const useTitleScrollDown = () => {
  const RefTitle = ref(null);

  const handleScroll = () => {
    if (!RefTitle.value) return;

    if (window.scrollY > 50) {
      RefTitle.value.classList.add("scroll-down");
    } else {
      RefTitle.value.classList.remove("scroll-down");
    }
  };

  // 若直接用 window.addEventListener 會立即執行，但 "元件" 可能尚未渲染完成；且在不同 page 都用這個 composable，每次都會綁一個新的 scroll listener → 每次滑動觸發多個 handler，效能差

  // onMounted → 等元件渲染完成再綁 scroll，且避免重複綁定
  onMounted(() => {
    // console.log("RefTitle", RefTitle.value);
    window.addEventListener("scroll", handleScroll);
  });

  // onUnmounted → 元件卸載時自動移除 scroll，避免 memory leak（如果 page 被切換或元件卸載，scroll handler 仍存在 → memory leak，可能導致 多個 handler 重複執行）
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    RefTitle,
  };
};
