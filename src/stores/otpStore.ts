import { create } from 'zustand';

interface OTPState {
  // Phone number state
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  
  // OTP code state
  otpCode: string[];
  setOtpCode: (code: string[]) => void;
  updateOtpDigit: (index: number, value: string) => void;
  clearOtpCode: () => void;
  
  // Request ID from Vonage
  requestId: string;
  setRequestId: (id: string) => void;
  
  // Loading states
  isSendingOTP: boolean;
  isVerifyingOTP: boolean;
  setSendingOTP: (loading: boolean) => void;
  setVerifyingOTP: (loading: boolean) => void;
  
  // Error handling
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
  
  // Timer state
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  canResend: boolean;
  setCanResend: (can: boolean) => void;
  
  // Reset all state
  reset: () => void;
}

export const useOTPStore = create<OTPState>((set, get) => ({
  // Initial state
  phoneNumber: '',
  otpCode: ['', '', '', '', '', ''],
  requestId: '',
  isSendingOTP: false,
  isVerifyingOTP: false,
  error: '',
  timeLeft: 300, // 5 minutes
  canResend: false,
  
  // Actions
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  
  setOtpCode: (code) => set({ otpCode: code }),
  
  updateOtpDigit: (index, value) => {
    const newCode = [...get().otpCode];
    newCode[index] = value;
    set({ otpCode: newCode });
  },
  
  clearOtpCode: () => set({ otpCode: ['', '', '', '', '', ''] }),
  
  setRequestId: (id) => set({ requestId: id }),
  
  setSendingOTP: (loading) => set({ isSendingOTP: loading }),
  
  setVerifyingOTP: (loading) => set({ isVerifyingOTP: loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: '' }),
  
  setTimeLeft: (time) => set({ timeLeft: time }),
  
  setCanResend: (can) => set({ canResend: can }),
  
  reset: () => set({
    phoneNumber: '',
    otpCode: ['', '', '', '', '', ''],
    requestId: '',
    isSendingOTP: false,
    isVerifyingOTP: false,
    error: '',
    timeLeft: 300,
    canResend: false,
  }),
}));
