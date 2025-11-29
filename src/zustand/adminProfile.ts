import { IAdminInfo } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminStore = {
  adminStore: IAdminInfo | null;
  setAdminStore: (newData: Partial<IAdminInfo>) => void;
  logOutAdminStore: () => void;
};
const initialState: IAdminInfo | null = null;

export const useAdminProfileStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminStore: initialState,
      setAdminStore: (newData: Partial<IAdminInfo>) =>
        set((state) => {
          if (!state.adminStore) return state;
          return { adminStore: { ...state.adminStore, ...newData } };
        }),
      logOutAdminStore: () => set({ adminStore: initialState }),
    }),
    {
      name: "admin-profile",
      version: 0,
      migrate: (persistedState: any, version: number) => {
        const now = Date.now();
        const weekInMs = 7 * 24 * 60 * 60 * 1000;

        if (
          persistedState.timestamp &&
          now - persistedState.timestamp > weekInMs
        ) {
          return { adminStore: initialState };
        }
        return persistedState;
      },
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value: any) => {
          localStorage.setItem(
            name,
            JSON.stringify({ ...value, timestamp: Date.now() })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
