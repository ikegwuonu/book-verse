"use client";
import { LayoutDashboard } from "lucide-react";
import React, { PropsWithChildren, useEffect, useState } from "react";

export default function AppLoader({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return !isLoading ? <Loader /> : children;
}
export const Loader = () => {
  return (
    <div className="bg-white w-screen h-screen flex justify-center items-center inset-0 fixed ">
      <div className="h-8 w-8 rounded-md bg-navy-800 flex items-center justify-center ">
        <LayoutDashboard
          className="h-4 w-4 text-white animate-spin"
          style={{ animationDuration: "2s" }}
        />
      </div>
    </div>
  );
};
