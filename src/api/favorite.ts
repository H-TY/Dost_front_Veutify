import { useApi } from "./axios";
import type { ApiRes, FavoriteData, FavoriteRes } from "@/types";

export const favoriteApi = () => {
  const { apiAuth } = useApi();

  // ● 添加 <<狗狗收藏/追蹤商品>> API 函式
  const addFavoriteApi = (type: string, id: string) => {
    return apiAuth.post<ApiRes<FavoriteRes>>("/favorite/add", {
      type,
      id,
    });
  };

  // ● 移除 <<狗狗收藏/追蹤商品>> API 函式
  const removeFavoriteApi = (type: string, id: string) => {
    return apiAuth.post<ApiRes<FavoriteRes>>("/favorite/remove", {
      type,
      id,
    });
  };

  // ● 取得當前使用者 <<狗狗收藏/追蹤商品>> 的資料 API 函式
  const getFavoriteApi = () => {
    return apiAuth.get<ApiRes<FavoriteRes>>("/favorite/profile");
  };

  // ※ 目前還用不到 saveFavoriteApi
  // ● 一次儲存整包 <<狗狗收藏/追蹤商品>> 資料至後端資料庫 API 函式
  // const saveFavoriteApi = (values) => {
  //   return apiAuth.put("/favorite", values);
  // };

  return {
    addFavoriteApi,
    removeFavoriteApi,
    getFavoriteApi,
    // saveFavoriteApi,
  };
};
