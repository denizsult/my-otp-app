import { create } from "zustand";
import { ToastStore, ToastMessage } from "../types";

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto hide after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, newToast.duration);
  },

  hideToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));
