import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { showerror } from "./toast";
import { roles } from "./constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const err = error?.response?.data?.errors as any[];

  if (!navigator.onLine) {
    return showerror("No internet connection.");
  }
  if (error?.code === "ERR_NETWORK") {
    return showerror("Network error occurred.");
  }

  if (error?.message) {
    return showerror(error.message);
  }
  if (typeof error == "string") {
    return showerror(error);
  }

  if (error?.data?.message) {
    return showerror(error?.data?.message);
  }
  if (error?.request) {
    return showerror(error?.statusText);
  } else {
    return showerror("An error occurred");
  }
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const convertSecToMin = (val: number) => {
  const min = Math.floor(val / 60);

  const sec = (val % 60).toString().padStart(2, "0");
  return min + ":" + sec;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName[0] + lastName[0]).toUpperCase();
};
export const roleMap = Object.fromEntries(
  roles.map((role) => [role.id, role.name])
);
