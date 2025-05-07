import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "../newsletter";
import { subscribeNewsletterSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (data: subscribeNewsletterSchemaType) =>
      subscribeNewsletter(data),
    onSuccess: () => showsuccess("Subscribed to newsletter"),
  });
};
