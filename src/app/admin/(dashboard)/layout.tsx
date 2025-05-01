"use client";
import type React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Loader } from "@/providers/app-loader";
import { useIsAuth } from "@/hooks/use-is-auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthReady = useIsAuth();

  if (!isAuthReady) return <Loader />;

  return (
    <div className=" flex ">
      <AdminSidebar />

      <main className="w-full bg-gray-50 p-4 md:p-0 md:py-6">{children}</main>
    </div>
  );
}
