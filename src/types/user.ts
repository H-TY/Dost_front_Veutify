import { UserRole } from "@/enums/UserRole";

export interface User {
  id: string;
  token: string;
  account: string;
  password: string;
  image: string;
  accountBgImage: string;
  email: string;
  role: UserRole;
  nickname: string | null;
  phone: string | null;
  birthday: string | null;
}

export type LoginData = Pick<User, "account" | "password">;

export type LoginRes = Pick<
  User,
  | "id"
  | "token"
  | "account"
  | "password"
  | "image"
  | "accountBgImage"
  | "email"
  | "role"
  | "nickname"
  | "phone"
  | "birthday"
>;

export type UserProfileRes = Pick<
  User,
  | "id"
  | "account"
  | "image"
  | "accountBgImage"
  | "email"
  | "role"
  | "nickname"
  | "phone"
  | "birthday"
>;

export interface UserEditRes {
  renewUserItem: string | undefined;
  userUpdate: UserUpdate;
}

// 目前 UserUpdate 與 UserProfileRes 完全一樣，若未來 UserEditRes 有新增欄位，再於後面 {} 增加新定義
export interface UserUpdate extends UserProfileRes {}
