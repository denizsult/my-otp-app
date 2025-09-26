import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useOTPStore } from "../stores/otpStore";
import { formatTime } from "../utils/timeUtils";

export const OTPHeader: React.FC = () => {
  const { phoneNumber, countryCode, timeLeft } = useOTPStore();

  const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  return (
    <VStack space="md" className="items-center">
      <Heading size="xl" className="text-typography-900 text-center">
        Verify Your Code
      </Heading>
      <Text className="text-typography-600 text-center text-md font-medium">
        Enter the 6-digit code sent to {fullPhoneNumber}
      </Text>

      <VStack space="xs" className="items-center">
        <Text className="text-typography-500 text-md font-medium text-center">
          Code expires in {formatTime(timeLeft)}
        </Text>
      </VStack>
    </VStack>
  );
};
