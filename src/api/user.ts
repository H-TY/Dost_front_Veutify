import { useApi } from "./axios";
import type {
  User,
  ApiRes,
  ApiResWithoutResult,
  LoginData,
  LoginRes,
  UserProfileRes,
  UserEditRes,
} from "@/types";

export const userApi = () => {
  const { backApi, apiAuth } = useApi();

  const loginApi = (values: LoginData) => {
    return backApi.post<ApiRes<LoginRes>>("/user/login", values);
  };

  const userProfileApi = () => {
    return apiAuth.get<ApiRes<UserProfileRes>>("/user/profile");
  };

  const userEditApi = (values: FormData) => {
    return apiAuth.patch<ApiRes<UserEditRes>>("/user/", values);
  };

  const logoutApi = () => {
    return apiAuth.delete<ApiResWithoutResult>("/user/logout");
  };

  return {
    loginApi,
    userProfileApi,
    userEditApi,
    logoutApi,
  };
};
