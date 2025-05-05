import { addAdmin, logIn } from "@/api/auth";
import { addAdminSchemaType, loginSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";

export const useAddAdmin = () => {
  return useMutation({
    mutationFn: (data: addAdminSchemaType) => addAdmin(data),
    onSuccess: () => {
      showsuccess("Admin added");
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: loginSchemaType) => logIn(data),
    onSuccess: () => {
      showsuccess("Login successful");
    },
  });
};
