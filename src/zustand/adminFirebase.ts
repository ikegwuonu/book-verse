import { IAdminInfo } from "@/lib/types";
import {
  IdTokenResult,
  User,
  UserCredential,
  UserMetadata,
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminFirebaseStore = {
  adminFirebaseStore: User;
  setAdminFirebaseStore: (newData: Partial<User>) => void;
  logOutAdminFirebaseStore: () => void;
};
const initialState: User = {
  emailVerified: false,
  isAnonymous: false,
  metadata: {} as UserMetadata,
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: () => <Promise<void>>{},
  getIdToken: (forceRefresh?: boolean): Promise<string> => {
    return Promise.resolve("");
  },
  getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
    throw new Error("Function not implemented.");
  },
  reload: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  },
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: "",
  uid: "",
};

export const useAdminFirebaseStore = create<AdminFirebaseStore>()((set) => ({
  adminFirebaseStore: { ...initialState },
  setAdminFirebaseStore: (newData: Partial<User>) =>
    set((state) => ({
      adminFirebaseStore: { ...state.adminFirebaseStore, ...newData },
    })),
  logOutAdminFirebaseStore: () => set({ adminFirebaseStore: initialState }),
}));
