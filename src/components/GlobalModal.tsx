// components/GlobalModal.tsx
"use client";
import { useModal } from "@/zustand/modalStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GlobalModal() {
  const { isOpen, modalType, data, closeModal } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    closeModal();
  }, [pathname]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-600 bg-opacity-20 flex items-center justify-center z-50">
      {data}
    </div>
  );
}
