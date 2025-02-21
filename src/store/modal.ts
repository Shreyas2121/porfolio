import { create } from "zustand";

interface Store {
  opened: boolean;
  content: React.ReactNode | null;
  openContent: (content: React.ReactNode) => void;
  closeContent: () => void;
}

export const useModal = create<Store>((set) => ({
  opened: false,
  content: null,
  openContent: (content: React.ReactNode) => set({ content, opened: true }),
  closeContent: () => set({ content: null, opened: false }),
}));
