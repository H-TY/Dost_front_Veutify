export interface FavoriteRes {
  userId: string;
  dogLike: string[];
  productLike: string[];
}

export type FavoriteData = Pick<FavoriteRes, "dogLike" | "productLike">;

/* 
※ 補充說明
=============
看到實際回傳資料：
  "result": {
    "_id": "...",
    "userId": "...",
    "createdAt": "...",
    "dogLike": [],
    "productLike": [],
    "updatedAt": "..."
  }
覺得：FavoriteRes 是不是應該要完整寫成跟 API 一模一樣？

不一定。
型別定義不是單純「把 JSON 複製成 TypeScript」。

而是：描述程式實際會使用到、而且你希望 TypeScript 幫你保護的資料結構。
 */
