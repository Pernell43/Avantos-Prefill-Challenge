import { create } from 'zustand';
import type { FormField } from '../../models/FormTypes.ts';

interface ModalStore {
  isOpen: boolean;
  field: FormField | null;
  open: (field: FormField) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  field: null,
  open: (field) => set({ isOpen: true, field }),
  close: () => set({ isOpen: false, field: null }),
}));