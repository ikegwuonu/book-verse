import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addTextBook,
  deleteTextbook,
  getAllTextbooks,
  getTextbookById,
  updateTextbook,
} from "../textbook";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";
import { queryKeys } from "./query-keys";
import { IGetTextBook, IUpdateTextbook } from "@/lib/types";

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
export const useGetTextbookById = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.getTextBooks, id],
    queryFn: () => getTextbookById(id),
  });
};
export const useDeleteTextbook = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTextbook(id),
    onSuccess: () => {
      showsuccess("Textbook deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.getTextBooks] });
    },
  });
};
export const useUpdateTextbook = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateTextbook }) =>
      updateTextbook(id, data),
    onSuccess: () => {
      showsuccess("Textbook updated");
      queryClient.invalidateQueries({ queryKey: [queryKeys.getTextBooks] });
    },
  });
};
