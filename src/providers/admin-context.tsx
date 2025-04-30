"use client";
import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

export interface userInfoType {
  created_at: string;
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  notes: string;
  role: string;
}
export type adminContextType = {
  user: User;
  userInfo: userInfoType;
  setUserInfo: Dispatch<SetStateAction<userInfoType>>;
  setUser: Dispatch<SetStateAction<User>>;
};
export const AdminContext = createContext<adminContextType>({
  user: {} as User,
  userInfo: {} as userInfoType,
  setUserInfo: () => {},
  setUser: () => {},
});
