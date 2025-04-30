import type React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex ">
      <AdminSidebar />

      <main className="w-full">{children}</main>
    </div>
  );
}
