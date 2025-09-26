import { useToastStore } from '../stores/toastStore';

export const useCustomToast = () => {
  const { showToast, hideToast, clearAllToasts } = useToastStore();

  const toast = {
    success: (title: string, description?: string, duration?: number) => {
      showToast({ title, description, type: 'success', duration });
    },
    error: (title: string, description?: string, duration?: number) => {
      showToast({ title, description, type: 'error', duration });
    },
    warning: (title: string, description?: string, duration?: number) => {
      showToast({ title, description, type: 'warning', duration });
    },
    info: (title: string, description?: string, duration?: number) => {
      showToast({ title, description, type: 'info', duration });
    },
    hide: hideToast,
    clear: clearAllToasts,
  };

  return toast;
};
