import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { getAdmin, updateAdmin } from "../admin";
import { useMemo } from "react";
import { IUpdateAdmin } from "@/lib/types";
import { showsuccess } from "@/lib/toast";

export const useGetAdmin = () => {
  return useQuery({
    queryKey: [queryKeys.getAdmin],
    queryFn: () => getAdmin(),
  });
};
export const useUpdateAdmin = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (data: IUpdateAdmin) => updateAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getAdmin] });
      showsuccess("Admin updated");
    },
  });
};
