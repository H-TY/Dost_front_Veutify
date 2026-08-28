// 建立與購物相關的狀態（購物車、購物清單）

import { defineStore } from "pinia";
import { ref } from "vue";
import type { MiniCart } from "@/types";

export const useShoppingStore = defineStore("Shopping", () => {
  const cart = ref(0);

  return {
    cart,
  };
});
