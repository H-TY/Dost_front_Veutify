// 這邊共享 "表格" 狀態

import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormDirtyStore = defineStore("FormDirty", () => {
  const dirty = ref(false);
  const msg = ref("待填寫");

  // ● 對於唯一資料／狀態來源的變數，統一修改窗口
  const changeFormDirtyValue = ({ passInValue, passInMsg }) => {
    dirty.value = passInValue;
    msg.value = passInMsg;
  };

  return {
    dirty,
    msg,
    changeFormDirtyValue,
  };
});
