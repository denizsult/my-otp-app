import React, { useRef } from "react";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { useOTPStore } from "../stores/otpStore";
import { handleOtpChange, handleKeyPress } from "../utils/otpUtils";

export const OTPInput: React.FC = () => {
  const { otpCode, updateOtpDigit, setOtpCode } = useOTPStore();
  const inputRefs = useRef<(any | null)[]>([]);

  return (
    <Box className="space-y-2">
      <HStack space="sm" className="justify-center mt-4">
        {otpCode.map((digit, index) => (
          <Input key={index} className="w-12 h-12">
            <InputField
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index, otpCode, updateOtpDigit, setOtpCode, inputRefs)}
              onKeyPress={(e) => handleKeyPress(e, index, otpCode, inputRefs)}
              keyboardType="number-pad"
              maxLength={index === 0 ? 6 : 1}
              textAlign="center"
              textContentType={index === 0 ? "oneTimeCode" : "none"}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className={`text-lg font-bold ${
                digit ? "border-primary-500" : "border-border-300"
              }`}
            />
          </Input>
        ))}
      </HStack>
    </Box>
  );
};
