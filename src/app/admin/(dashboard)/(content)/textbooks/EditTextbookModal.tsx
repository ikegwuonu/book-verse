"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/zustand/modalStore";
import { IGetTextBook } from "@/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTextbookSchema,
  updateTextbookSchemaType,
} from "@/lib/form-validation";
import { useUpdateTextbook } from "@/api/react-query/textbook";

type Props = {
  textbook: IGetTextBook & { id: string };
};

export default function EditTextbookModal({ textbook }: Props) {
  const { closeModal } = useModal();
  const { mutateAsync: updateFn, isPending } = useUpdateTextbook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateTextbookSchemaType>({
    resolver: zodResolver(updateTextbookSchema),
    defaultValues: { ...textbook },
  });
  console.log(errors);
  const onSubmit = async (data: updateTextbookSchemaType) => {
    console.log(data);
    await updateFn({
      id: textbook.id,
      data: { author: data.author, title: data.title, isbn: data.isbn },
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-6 max-w-md w-full animate-in fade-in-0 slide-in-from-bottom-10 shadow-xl space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-800">Edit Textbook</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            error={errors.title?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            {...register("author")}
            error={errors.author?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input id="isbn" {...register("isbn")} error={errors.isbn?.message} />
        </div>

        {/* Add more fields as needed */}

        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
