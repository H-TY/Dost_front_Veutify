# 🐶 個人專案 DOST - 寵物狗陪伴預約服務

## 🌐 Demo

- **Live Demo**：https://h-ty.github.io/Dost_front_Veutify/

---

## 📷 Screenshots

### 首頁

<!-- ![首頁](./README_screenshot/img-1.avif)

### 登入

![Login](./README_screenshot/img-2.avif)

### 線上預約

![Booking](./README_screenshot/img-3.avif)

### 會員中心

![Member](./README_screenshot/img-4.avif)

### 管理員後台

![Admin](./README_screenshot/img-5.avif) -->

<table>
  <tr>
    <td rowspan="4" width="50%">
      <p align="center">首頁</p>
      <img src="./README_screenshot/img-1.avif" width="500">
    </td>
    <td width="50%">
      <p align="center">登入</p>
      <img src="./README_screenshot/img-2.avif" width="500">
    </td>

  </tr>

  <tr>
    <td>
      <p align="center">線上預約</p>
      <img src="./README_screenshot/img-3.avif" width="500">
    </td>
  </tr>

  <tr>
    <td>
      <p align="center">會員中心</p>
      <img src="./README_screenshot/img-4.avif" width="500">
    </td>
  </tr>

  <tr>
    <td>
      <p align="center">管理員後台</p>
      <img src="./README_screenshot/img-5.avif" width="500">
    </td>
  </tr>
</table>
---

## 📁 專案介紹

DOST 為個人模擬開發之寵物陪伴預約平台，使用 Vue 3 建立，提供狗狗資訊瀏覽、會員登入、預約服務、收藏功能及後台管理。

● 使用者可以：

- 了解商家資訊
- 瀏覽狗狗資訊
- 收藏喜歡的狗狗
- 線上預約
- 管理個人訂單

● 管理員可以：

- 管理狗狗資料
- 管理預約訂單

---

## ✨ 功能

### 前台

- 首頁（品牌故事、人氣狗狗、服務介紹、店內環境）
- 狗狗介紹
- 線上預約
- 會員登入
- 會員中心
- 收藏功能
- 訂單查詢（查詢、取消訂單）

### 後台

- 狗狗資訊管理（新增、修改）
- 訂單管理（查詢、取消訂單）

---

## 🛠️ 技術

### Frontend

- Vue 3
- Composition API
- Vue Router
- Pinia
- Axios
- Vuetify
- Swiper
- GSAP
- SCSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

**Project Experience**

- API Route 設計
- CRUD 功能開發
- MongoDB Schema 建立
- 前後端資料串接

### Deployment

- GitHub Pages
- Render

---

## 🏗️ 專案架構

```text
src
├── assets
├── components
├── composables
├── enums
├── layouts
├── pages
├── plugins
├── router
├── stores
└── styles
```

---

## 🔌 API

| Method | Endpoint      | Description  |
| ------ | ------------- | ------------ |
| POST   | /user/login   | 使用者登入   |
| GET    | /dogs         | 取得狗狗資料 |
| POST   | /booking      | 建立預約     |
| POST   | /favorite/add | 收藏狗狗     |

---

## ⭐ 專案特色

✔ Booking 預約流程與日期時段判斷

✔ Pinia 狀態管理

✔ Axios API 封裝

✔ RESTful API 設計與 CRUD 實作

✔ 表單驗證 (Yup)

✔ JWT 驗證與會員登入流程

✔ Router Guard 路由權限控制

✔ GitHub Actions 自動部署

✔ 響應式 RWD

---

## 💻 環境

- Node.js 22
- npm 10
- Vite

---

## 💿 Install

```bash
git clone https://github.com/H-TY/Dost_front_Veutify.git

cd Dost_front_Veutify

npm install

npm run dev
```

---

## 🚧 Future Improvements

- TypeScript 重構
- Booking Component / Composable 模組化
- API Module 分層與錯誤處理
- Pinia Store 分層最佳化
- Vitest 單元測試
- Playwright E2E Testing
- Docker 化部署
- 新增購物車、房型預約、小遊戲 ...等功能
