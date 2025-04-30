"use client";
import type React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminContext } from "@/providers/admin-context";
import { routes } from "@/lib/routes";
import { Loader } from "@/providers/app-loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useContext(AdminContext);

  useEffect(() => {
    if (!user.getIdToken) {
      //showerror("Unauthorized");
      router.replace(routes.login);
    }
  }, [router, user]);
  if (!user) return null;
}
