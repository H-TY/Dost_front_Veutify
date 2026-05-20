// 跳出 警告/提示資訊，提醒使用者

import { ref, computed, onUnmounted, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { storeToRefs } from "pinia";
import { useFormDirtyStore } from "@/stores/formDirty";

export const alertInfo = () => {
  // 表格狀態
  const formDirtyStore = useFormDirtyStore();
  const { dirty, msg } = storeToRefs(formDirtyStore);

  // watch(dirty, (newVal) => {
  //   console.log("newVal", newVal);
  // });

  // ● 離開頁面、刷新頁面、關閉頁面時，觸發條件，跳出 提醒/警告 面板
  // const A = (banana = {}) => {...}，其中 (banana = {}) 意指如果沒傳參數，則預設用空物件 {}，避免系統報錯；也就是允許使用者不傳入參數；邏輯如下：
  // => banana = { x }
  // => 代回原式子 ({ x } = {})
  // => 有傳入參數 = banana.x ； 反之沒有傳入參數 = {}.X = undefined 但系統不會報錯。
  const leavePageAlert = ({ onConfirm } = {}) => {
    // ◆ onBeforeRouteLeave 僅能控管 "router 換頁的行為 "
    onBeforeRouteLeave((to, from) => {
      // dirty.value 若為 true，要執行的動作
      if (dirty.value) {
        const confirmReplay = confirm(msg.value);

        if (confirmReplay) {
          // 當確定離開當前頁面，按下警告版面的確定按鈕後，執行指定動動作
          onConfirm?.(); // 這邊是恢復使用者原先設定
        }

        return confirmReplay;
      }
    });

    // ◆ 刷新頁面，跳出警告
    // 刷新頁面、關閉分頁、離開網站，使用原生瀏覽器事件
    const handler = (event) => {
      if (dirty.value) {
        // console.log("event", event);
        event.preventDefault(); // 只是「標記：這次離開需要確認」，與ㄧ般 DOM 事件不太一樣。
        event.returnValue = ""; // ⚠️ 必須這樣寫才會觸發瀏覽器提示，這是想穩定觸發的標準寫法，避免某些瀏覽器或開發時沒有觸發；但是無法自訂文字訊息，目前 Chrome / Edge / Firefox 不允許自訂 beforeunload message
      }
    };

    window.addEventListener("beforeunload", handler);

    // ★ 重要：離開時清掉監聽事件
    onUnmounted(() => {
      // console.log("有觸發，清除 beforeunload 的 EventListener");
      window.removeEventListener("beforeunload", handler);
    });
  };

  const onBeforeLogOut = () => {
    // console.log("有觸發 onBeforeLogOut");
    // return confirm(msg.value) 這邊輸出的值會是由 confirm 面板上的按鈕決定
    // 這邊若用一般的 if(dirty.value) return confirm(msg.value) 會與後續跳出的警告面板的確認和取消按鈕有衝突
    // 故這邊使用的邏輯：控制是否可以執行登出動作

    // 沒有修改資料（dirty = false），可以執行登出離開
    if (!dirty.value) return true;

    return confirm(msg.value);
  };

  return {
    dirty,
    msg,
    leavePageAlert,
    onBeforeLogOut,
  };
};
