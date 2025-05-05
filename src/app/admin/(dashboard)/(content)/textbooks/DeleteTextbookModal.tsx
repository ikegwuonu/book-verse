"use client";

import { useDeleteTextbook } from "@/api/react-query/textbook";
import { Button } from "@/components/ui/button";
import { IGetTextBook } from "@/lib/types";
import { useModal } from "@/zustand/modalStore";
import { XCircle } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  textbook: IGetTextBook & {
    id: string;
  };
};

export default function ConfirmDeleteModal({
  textbook,
  title = "Delete Textbook",
  description = "Are you sure you want to delete this textbook? This action cannot be undone.",
}: Props) {
  const { closeModal } = useModal();
  const { isPending, mutateAsync: deleteFn } = useDeleteTextbook();
  const deleteTextbook = async () => {
    await deleteFn(textbook.id);
    closeModal;
  };
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
        <Button
          disabled={isPending}
          variant="destructive"
          onClick={deleteTextbook}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
