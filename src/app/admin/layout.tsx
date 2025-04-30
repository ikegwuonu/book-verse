"use client";
import { useIsAuth } from "@/hooks/use-is-auth";
import { AdminContext, userInfoType } from "@/providers/admin-context";
import { User } from "firebase/auth";
import React, { PropsWithChildren, useState } from "react";

const AdminProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({} as User);
  const [userInfo, setUserInfo] = useState({} as userInfoType);

  return (
    <AdminContext.Provider value={{ user, setUser, setUserInfo, userInfo }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
