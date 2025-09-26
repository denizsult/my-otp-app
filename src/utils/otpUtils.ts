export const handleOtpChange = (
  value: string,
  index: number,
  otpCode: string[],
  updateOtpDigit: (index: number, value: string) => void,
  setOtpCode: (code: string[]) => void,
  inputRefs: React.MutableRefObject<(any | null)[]>
) => {
  if (value.length > 1) {
    const digits = value.replace(/\D/g, "").split("").slice(0, 6);

    const newOtpCode = [...otpCode];
    for (let i = 0; i < digits.length && index + i < 6; i++) {
      newOtpCode[index + i] = digits[i];
    }

    // Update all digits at once using setOtpCode
    setOtpCode(newOtpCode);

    // Focus on the next empty input or the last input
    const nextEmptyIndex = digits.length + index;
    const targetIndex = nextEmptyIndex < 6 ? nextEmptyIndex : 5;
    inputRefs.current[targetIndex]?.focus();

    return;
  }

  // Handle single character input
  updateOtpDigit(index, value);

  // Auto-focus next input
  if (value && index < 5) {
    setTimeout(() => {
      inputRefs.current[index + 1]?.focus();
    }, 0);
  }
};

export const handleKeyPress = (
  e: any,
  index: number,
  otpCode: string[],
  inputRefs: React.MutableRefObject<(any | null)[]>
) => {
  if (e.nativeEvent.key === "Backspace" && !otpCode[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};
