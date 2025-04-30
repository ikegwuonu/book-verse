import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className=" flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
