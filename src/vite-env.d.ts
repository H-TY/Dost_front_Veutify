// 告訴 TS：「這不是純 TypeScript 專案，這是 Vite 專案，請額外載入 Vite 套件自己提供的 client.d.ts 型別。」
// client.d.ts 的檔案沒有在 @types 的路徑下，雖然可以在 tsconfig.json 設定 "types": [vite/client]，但會變成只載入 vite/client 的型別檔案，不會另外自動載入 @types 的路徑下的型別檔案。
/// <reference types="vite/client" />
