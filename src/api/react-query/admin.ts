import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { deleteAdmin, getAdmin, updateAdmin } from "../admin";
import { useMemo } from "react";
import { IUpdateAdmin } from "@/lib/types";
import { showsuccess } from "@/lib/toast";

export const useGetAdmin = () => {
  return useQuery({
    queryKey: [queryKeys.getAdmin],
    queryFn: () => getAdmin(),
  });
};
export const useUpdateAdminProfile = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ data, uid }: { data: IUpdateAdmin; uid: string }) =>
      updateAdmin(data, uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getAdmin] });
      showsuccess("Admin updated");
    },
  });
};
export const useDeleteAdmin = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (email: string) => deleteAdmin(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getAdmin] });
      showsuccess("Admin deleted");
    },
  });
};
