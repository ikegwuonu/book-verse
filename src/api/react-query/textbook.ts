import { useMutation } from "@tanstack/react-query";
import { addTextBook } from "../textbook";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";

export const useAddTextbook = () => {
  return useMutation({
    mutationFn: (data: addTextbookSchemaType & { added_by: string }) =>
      addTextBook(data),
    onSuccess: () => showsuccess("Textbook added"),
  });
};
