// ● 前往指定的頁面後，利用傳遞進元件的 ID，導航至相對應的東西
// 例如：在dogsCard.vue中，當使用者點擊預約按鈕時，會呼叫bookingAddId方法，將該狗狗的ID加入預約列表，並導航至預約頁面。

import { useRouter } from "vue-router";

export const useNavigationById = () => {
  const router = useRouter();

  const goToPageById = (page, id) => {
    router.push({
      path: `/${page}`,
      query: { id: id },
    });
  };

  // return{X} 把函式「從 composable 內部導出」給元件使用
  return { goToPageById };
};
