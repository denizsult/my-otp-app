import { useRef, useEffect } from "react";
import { useOTPStore } from "../stores/otpStore";
import { verifyOTP, sendOTP } from "../api";
import { useCustomToast } from "./useCustomToast";

export const useOTPVerification = () => {
  const {
    phoneNumber,
    otpCode,
    requestId,
    isVerifyingOTP,
    isSendingOTP,
    timeLeft,
    canResend,
    clearOtpCode,
    setVerifyingOTP,
    setSendingOTP,
    setTimeLeft,
    setCanResend,
  } = useOTPStore();

  const toast = useCustomToast();

  const inputRefs = useRef<(any | null)[]>([]);

  const handleVerifyOTP = async (onSuccess: () => void) => {
    const code = otpCode.join("");
    if (code.length !== 6) {
      toast.error("Verification Failed", "Invalid OTP code. Please try again.");
      return;
    }

    if (!requestId) {
      toast.error(
        "Verification Failed",
        "Request ID not found. Please try again."
      );
      return;
    }

    setVerifyingOTP(true);

    try {
      const result = await verifyOTP(requestId, code);

      if (result.status === "0") {
        onSuccess();
      } else {
        toast.error(
          "Verification Failed",
          result.error_text || "Invalid OTP code. Please try again."
        );
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      toast.error(
        "Verification Failed",
        err.response?.data?.error_text || err.message
      );
      inputRefs.current[0]?.focus();
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendCode = async () => {
    setSendingOTP(true);
    try {
      const result = await sendOTP(phoneNumber);

      if (result.status === "0") {
        setTimeLeft(300);
        setCanResend(false);
        clearOtpCode();
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      console.error("OTP Resend Error:", err);
    } finally {
      setSendingOTP(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft, setTimeLeft, setCanResend]);

  return {
    // State
    phoneNumber,
    otpCode,
    isVerifyingOTP,
    isSendingOTP,
    timeLeft,
    canResend,
    inputRefs,

    // Actions
    handleVerifyOTP,
    handleResendCode,
  };
};
