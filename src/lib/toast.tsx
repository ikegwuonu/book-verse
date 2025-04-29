import { toast } from "sonner";

export const showsuccess = (message: string, options: any = {}) => {
  toast.success(message, {
    duration: options.duration || 2000,
    onDismiss: (toast: any) => toast.dismiss(),
  });
};
export const showerror = (message: string, options: any = {}) => {
  toast.error(message, {
    duration: options.duration || 2000,
    onDismiss: (toast: any) => toast.dismiss(),
  });
};
export const showinfo = (message: string, options: any = {}) => {
  toast.info(message, {
    duration: options.duration || 2000,
    onDismiss: (toast: any) => toast.dismiss(),
  });
};
