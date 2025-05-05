// store/modalStore.ts
import React from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  data?: React.ReactNode;
  openModal: (type?: string, data?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  data: null,
  openModal: (type, data) =>
    set({ isOpen: true, modalType: type, data: data || null }),
  closeModal: () => set({ isOpen: false, modalType: null, data: null }),
}));
