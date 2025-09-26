/* API */
export interface VerifyRequestResponse {
  request_id: string;
  status: string;
  error_text?: string;
}

export interface VerifyCheckResponse {
  status: string;
  error_text?: string;
}

export interface VerifyCancelResponse {
  status: string;
  error_text?: string;
}

export type ErrorCode = "10" | "15" | "17" | "19";


/* Stores */
export interface OTPState {
  // Phone number state
  phoneNumber: string;
  countryCode: string;
  setPhoneNumber: (phone: string) => void;
  setCountryCode: (code: string) => void;
  getFullPhoneNumber: () => string;
  
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
  
  
  // Timer state
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  canResend: boolean;
  setCanResend: (can: boolean) => void;
  
  // Reset all state
  reset: () => void;
}



export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastStore {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

/* API Configuration */
export interface ApiConfigState {
  apiKey: string;
  apiSecret: string;
  isConfigured: boolean;
  setApiKey: (key: string) => void;
  setApiSecret: (secret: string) => void;
  setConfigured: (configured: boolean) => void;
  reset: () => void;
}