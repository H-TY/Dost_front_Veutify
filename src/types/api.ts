export interface ApiRes<T> {
  success: boolean;
  message: string;
  result: T;
}

// unknown 表示資料型別我不知道，但 TypeScript 還是要幫我保持型別安全。
// 其實 ApiRes<unknown> 不一定要寫 unknown，寫其他任意一種都可以；以下的 code 來講，最後 result 都會被移除，寫上 unknown 比較偏向說明：「我現在不需要知道 result 是什麼型別，因為我要把它拿掉。」
export type ApiResWithoutResult = Omit<ApiRes<unknown>, "result">;

// 針對 isAxiosError 若為 true，則用來定義 AxiosError 內的 response.data 的型別
// 寫法 axios.isAxiosError<ApiError>(error)
export interface ApiError {
  success: false;
  message: string;
}
