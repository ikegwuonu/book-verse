import { IAdminInfo } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminStore = {
  adminStore: IAdminInfo;
  setAdminStore: (newData: Partial<IAdminInfo>) => void;
  logOutAdminStore: () => void;
};
const initialState: IAdminInfo = {
  created_at: "",
  email: "",
  first_name: "",
  image: "",
  last_name: "",
  notes: "",
  role: "",
};

export const useAdminProfileStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminStore: { ...initialState },
      setAdminStore: (newData: Partial<IAdminInfo>) =>
        set((state) => ({ adminStore: { ...state.adminStore, ...newData } })),
      logOutAdminStore: () => set({ adminStore: initialState }),
    }),
    {
      name: "admin-profile",
    }
  )
);
