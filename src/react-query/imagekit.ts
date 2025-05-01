import { uploadFile } from "@/api/imagekit";
import { showsuccess } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data: File) => uploadFile(data),
    onSuccess: () => showsuccess("Image uploaded"),
  });
};
