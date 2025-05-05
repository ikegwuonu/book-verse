import { useMutation, useQuery } from "@tanstack/react-query";
import { addTextBook, getAllTextbooks } from "../textbook";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";
import { queryKeys } from "./query-keys";

export const useAddTextbook = () => {
  return useMutation({
    mutationFn: (data: addTextbookSchemaType & { added_by: string }) =>
      addTextBook(data),
    onSuccess: () => showsuccess("Textbook added"),
  });
};
export const useGetTextBooks = () => {
  return useQuery({
    queryKey: [queryKeys.getTextBooks],
    queryFn: () => getAllTextbooks(),
  });
};
