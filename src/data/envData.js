// ● 方法 1：使用迴圈生成陣列物件，將圖片路徑儲存至陣列中
// export const envData = [];

// // 圖片資料夾位置
// const urlDress = new URL(`@/assets/img/env_img`, import.meta.url).href;

// // 圖片總數量
// const totalImg = 19;

// for (let i = 1; i <= totalImg; i++) {
//   envData.push(urlDress + `/img-${i}.avif`);
// }

// console.log(envData);

// =========******=============
// ● 方法 2：使用 Vite 提供的特殊 API，用來「批次抓取資料夾裡的檔案」。
// 可以不用自己計算有幾張圖，系統會自己抓取圖片
const totalImg = import.meta.glob("@/assets/img/env_img/*.avif", {
  eager: true, // 立即 import 檔案，而不是等到使用時才載入
  import: "default", // 只取每個檔案的 default export（通常就是檔案的 URL）
});
// console.log(totalImg);

const envTxt = [
  `我們把空間，<br/>整理成狗狗也會安心的樣子。`,
  `明亮又柔軟的空間<br/>每天清潔、定期消毒<br/>分區互動，不吵不擠<br/>專人照顧，狗狗與你都放心`,
  `在 DOST，<br/>可以慢慢走、慢慢坐、慢慢被治癒。`,
];

// ● 輸出單純圖片的陣列（昇幂排序）
// export const envData = Object.values(totalImg) // 將物件的 value（也就是每張圖片的 URL）取出來
//   // // ▲ 方法 A（正則表達，抓取對應的數字做排序）
//   // .sort((a, b) => {
//   //   // parseInt() 字串轉數字，方便後續排列
//   //   // (\d+) → 捕獲群組，匹配一個或多個數字：
//   //   // ◆ \d = 數字 [0-9]
//   //   // ◆ + = 一個或多個
//   //   // ◆ () = 表示「捕獲群組」，如果有用 console.log(a.match(/img-(\d+)\.avif$/)); 則輸出：["img-12.avif", "12"]，match 回傳陣列的第二個元素就是這個數字
//   //   const numA = parseInt(a.match(/\d+/)[0]);
//   //   const numB = parseInt(b.match(/\d+/)[0]);
//   //   // console.log("numA", numA);
//   //   return numA - numB; // ✅ 一定要回傳差值
//   // });

//   // ▲ 方法 B：自訂比較函式（不用正則抓數字）
//   // a：要比較的字串
//   // b：另一個字串
//   // locales（可選）：指定語言，用來決定排序規則，通常不用就填 undefined
//   // options（可選）：控制排序方式的物件
//   //  - numeric：將字串中的數字視為數值比較，而不是單純字元
//   //             例如 "img-2" 會小於 "img-10"
//   //             如果沒有 numeric: true，字串排序會逐字比較 → "img-10" 會排在 "img-2" 前面
//   //  - sensitivity（可選）：控制大小寫、重音符號是否影響排序
//   .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

// // ● 輸出文字和圖片隨機排序的陣列
// const envDataOriginal = [
//   // 1️⃣ 取出 URL 陣列並排序
//   ...Object.values(totalImg),

//   // 2️⃣ 文字內容
//   ...envTxt,
// ];

// // 隨機排列函式
// function render(data) {
//   // 先複製陣列，避免改動到原陣列
//   const copyArray = [...data];

//   for (let i = copyArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
//   }

//   return copyArray;
// }

// // 輸出
// export const envData = render(envDataOriginal);

// ● 將文字插入指定位置
const txtInsertIndex = [0, 5, 8];

const envDataOriginal = Object.values(totalImg);

// .splice(idx, 0, texts[i])
// idx → 插入位置
// 0 → 不刪除原本元素
// texts[i] → 插入文字
txtInsertIndex.forEach((el, i) => {
  if (envTxt.length > 0) {
    envDataOriginal.splice(el, 0, envTxt[i]);
  }
});

export const envData = envDataOriginal;
// console.log("envData", envData);
