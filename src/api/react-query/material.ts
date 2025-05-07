import { addMaterialSchemaType } from "@/lib/form-validation";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addMaterial,
  deleteMaterial,
  getAllMaterials,
  updateMaterial,
} from "../material";
import { showsuccess } from "@/lib/toast";
import { queryKeys } from "./query-keys";
import { IGetMaterial } from "@/lib/types";

export const useAddMaterial = () => {
  return useMutation({
    mutationFn: (data: addMaterialSchemaType & { added_by: string }) =>
      addMaterial(data),
    onSuccess: () => showsuccess("Material added"),
  });
};
export const useGetMaterial = () => {
  return useQuery({
    queryKey: [queryKeys.getTextBooks],
    queryFn: () => getAllMaterials(),
  });
};
export const useDeleteMaterial = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMaterial(id),
    onSuccess: () => {
      showsuccess("Material deleted");
      queryClient.invalidateQueries({ queryKey: [queryKeys.getMaterials] });
    },
  });
};
export const useUpdateTextbook = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IGetMaterial> }) =>
      updateMaterial(id, data),
    onSuccess: () => {
      showsuccess("Material updated");
      queryClient.invalidateQueries({ queryKey: [queryKeys.getMaterials] });
    },
  });
};
