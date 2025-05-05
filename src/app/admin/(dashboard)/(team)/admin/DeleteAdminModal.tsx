"use client";

import { Button } from "@/components/ui/button";
import { IGetAdmin } from "@/lib/types";
import { useModal } from "@/zustand/modalStore";
import { XCircle } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  admin: IGetAdmin;
};

export default function ConfirmDeleteModal({
  admin,
  title = "Delete Admin",
  description = "Are you sure you want to delete this admin? This action cannot be undone.",
}: Props) {
  const { closeModal } = useModal();

  const deleteAdmin = () => {};

  return (
    <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-in fade-in-0 slide-in-from-bottom-10 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <XCircle className="text-red-500 w-6 h-6" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-600">{description}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={deleteAdmin}>
          Delete
        </Button>
      </div>
    </div>
  );
}
