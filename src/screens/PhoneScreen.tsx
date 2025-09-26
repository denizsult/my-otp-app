import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useOTPStore } from "../stores/otpStore";

import PhoneInput from "../components/PhoneInput";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack/index";
import { Text } from "@/components/ui/text/index";
import { Heading } from "@/components/ui/heading/index";
import { Button, ButtonText } from "@/components/ui/button";
import { useCustomToast } from "../hooks/useCustomToast";
import { Spinner } from "@/components/ui/spinner/index";
import { RenderIf } from "../components/RenderIf";
import { RootStackParamList } from "../navigation/AppNavigator";
import { sendOTP } from "../api";
import { ErrorCode } from "../types";

type PhoneScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Phone"
>;

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  "10": "This phone number has already been used recently. Please wait before requesting another code.",
  "15": "Verification code was already sent to this number. Please check your messages or wait before requesting another.",
  "17": "This phone number is not valid. Please check and try again.",
  "19": "Too many verification attempts. Please wait before trying again.",
};

const getErrorMessage = (status: string, fallbackMessage?: string): string => {
  return (
    ERROR_MESSAGES[status as ErrorCode] ||
    fallbackMessage ||
    "Failed to send verification code"
  );
};

export default function PhoneScreen() {
  const navigation = useNavigation<PhoneScreenNavigationProp>();
  const toast = useCustomToast();

  const {
    phoneNumber,
    isSendingOTP,
    getFullPhoneNumber,
    setSendingOTP,
    setRequestId,
    setTimeLeft,
    setCanResend,
  } = useOTPStore();

  const handleSendCode = async () => {
    setSendingOTP(true);

    try {
      const fullPhoneNumber = getFullPhoneNumber();
      const result = await sendOTP(fullPhoneNumber.replace(/\D/g, ""));

      if (result.status === "0") {
        setRequestId(result.request_id);
        setTimeLeft(300);
        setCanResend(false);
        navigation.navigate("OTP");
        toast.success(
          "Code Sent",
          "A new verification code has been sent to your phone."
        );
      } else {
        const errorMessage = getErrorMessage(result.status, result.error_text);
        toast.error("Error", errorMessage);
      }
    } catch (err: any) {
      const errorStatus = err.response?.data?.status;
      const errorMessage = errorStatus
        ? getErrorMessage(errorStatus, err.message)
        : err.message || "Network error. Please try again.";

      toast.error("Network Error", errorMessage);
    } finally {
      setSendingOTP(false);
    }
  };

  return (
    <Box className="flex-1 bg-background-0 justify-center p-6">
      <Center>
        <Card
          className="max-w-96 w-full bg-white rounded-xl shadow-lg p-6"
          size="lg"
          variant="elevated"
        >
          <VStack space="lg">
            {/* Header Section */}
            <VStack space="md" className="items-center">
              <Heading size="xl" className="text-typography-900 text-center">
                Enter Your Phone Number
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                We'll send you a verification code to confirm your identity
              </Text>
            </VStack>

            {/* Content Section */}
            <VStack space="lg">
              <VStack space="sm">
                <Text className="text-typography-700 text-sm font-medium">
                  Phone Number
                </Text>
                <PhoneInput
                  placeholder="Enter phone number"
                  disabled={isSendingOTP}
                />
              </VStack>

              <Button
                size="lg"
                action=""
                variant="solid"
                className="!bg-gray-200 border-gray-200 rounded-lg"
                onPress={handleSendCode}
                disabled={!phoneNumber || isSendingOTP}
              >
                <RenderIf
                  condition={isSendingOTP}
                  fallback={
                    <ButtonText className="text-black">
                      SEND VERIFICATION CODE
                    </ButtonText>
                  }
                >
                  <HStack space="sm" className="items-center">
                    <Spinner size="small" color="white" />
                    <ButtonText>Sending Code...</ButtonText>
                  </HStack>
                </RenderIf>
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
