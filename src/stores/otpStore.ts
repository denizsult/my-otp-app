import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OTPState } from "../types";

export const useOTPStore = create<OTPState>()(
  persist(
    (set, get) => ({
      // Initial state
      phoneNumber: "",
      countryCode: "+90",
      otpCode: ["", "", "", "", "", ""],
      requestId: "",
      isSendingOTP: false,
      isVerifyingOTP: false,
      timeLeft: 300, // 5 minutes
      canResend: false,

      // Actions
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setCountryCode: (code) => set({ countryCode: code }),
      getFullPhoneNumber: () => {
        const state = get();
        return `${state.countryCode}${state.phoneNumber}`;
      },

      setOtpCode: (code) => set({ otpCode: code }),

      updateOtpDigit: (index, value) => {
        const newCode = [...get().otpCode];
        newCode[index] = value;
        set({ otpCode: newCode });
      },

      clearOtpCode: () => set({ otpCode: ["", "", "", "", "", ""] }),

      setRequestId: (id) => set({ requestId: id }),

      setSendingOTP: (loading) => set({ isSendingOTP: loading }),

      setVerifyingOTP: (loading) => set({ isVerifyingOTP: loading }),

      setTimeLeft: (time) => set({ timeLeft: time }),

      setCanResend: (can) => set({ canResend: can }),

      reset: () =>
        set({
          phoneNumber: "",
          countryCode: "+90",
          otpCode: ["", "", "", "", "", ""],
          requestId: "",
          isSendingOTP: false,
          isVerifyingOTP: false,
          timeLeft: 300,
          canResend: false,
        }),
    }),
    {
      name: "otp-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist certain fields to avoid storing loading states
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        countryCode: state.countryCode,
        requestId: state.requestId,
        timeLeft: state.timeLeft,
        canResend: state.canResend,
      }),
    }
  )
);
