import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ApiConfigState {
  apiKey: string;
  apiSecret: string;
  isConfigured: boolean;
  setApiKey: (key: string) => void;
  setApiSecret: (secret: string) => void;
  setConfigured: (configured: boolean) => void;
  reset: () => void;
}

export const useApiConfigStore = create<ApiConfigState>()(
  persist(
    (set, get) => ({
      // Initial state
      apiKey: "",
      apiSecret: "",
      isConfigured: false,

      // Actions
      setApiKey: (key) => set({ apiKey: key }),
      setApiSecret: (secret) => set({ apiSecret: secret }),
      setConfigured: (configured) => set({ isConfigured: configured }),
      
      reset: () => set({
        apiKey: "",
        apiSecret: "",
        isConfigured: false,
      }),
    }),
    {
      name: "api-config-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
