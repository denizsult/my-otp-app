import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";
import { RenderIf } from "./RenderIf";
import { useOTPStore } from "../stores/otpStore";
import { useOTPVerification } from "../hooks/useOTPVerification";

interface OTPActionsProps {
  onVerifyOTP: () => void;
  onResendCode: () => void;
  onBack: () => void;
}

export const OTPActions: React.FC<OTPActionsProps> = ({
  onVerifyOTP,
  onResendCode,
  onBack,
}) => {
  const { otpCode, isVerifyingOTP, isSendingOTP, canResend, timeLeft } = useOTPStore();
  const isCodeComplete = otpCode.join("").length === 6;

  return (
    <VStack space="md">
      <Button
        size="lg"
        action="primary"
        variant="solid"
        onPress={onVerifyOTP}
        disabled={ timeLeft <= 0}
      >
        <RenderIf
          condition={isVerifyingOTP}
          fallback={<ButtonText>VERIFY CODE</ButtonText>}
        >
          <HStack space="sm" className="items-center">
            <Spinner size="small" color="white" />
            <ButtonText>Verifying...</ButtonText>
          </HStack>
        </RenderIf>
      </Button>

      <RenderIf condition={canResend}>
        <Button
          size="sm"
          variant="outline"
          action="primary"
          onPress={onResendCode}
          className="bg-gray-200 border-gray-200 rounded-lg"
          disabled={isVerifyingOTP || isSendingOTP}
        >
          <ButtonText>{isSendingOTP ? "Sending..." : "Resend Code"}</ButtonText>
        </Button>
      </RenderIf>
      <Button
        size="sm"
        variant="outline"
        action="primary"
        onPress={onBack}
        className="border-gray-200 rounded-lg"
        disabled={isVerifyingOTP || isSendingOTP}
      >
        <ButtonText>Change Phone Number</ButtonText>
      </Button>
    </VStack>
  );
};
