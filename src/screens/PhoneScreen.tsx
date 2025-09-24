import React from "react";

import { useOTPStore } from "../stores/otpStore";
import vonageService from "../services/vonageService";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack/index";
import { Text } from "@/components/ui/text/index";
import { Heading } from "@/components/ui/heading/index";
import { Input, InputField } from "@/components/ui/input/index";
import { Button, ButtonText } from "@/components/ui/button/index";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert/index";
import { Spinner } from "@/components/ui/spinner/index";

interface PhoneScreenProps {
  onSendCode: () => void;
}

export default function PhoneScreen({ onSendCode }: PhoneScreenProps) {
  // Get state from Zustand store
  const {
    phoneNumber,
    isSendingOTP,
    error,
    setPhoneNumber,
    setSendingOTP,
    setError,
    setRequestId,
    clearError,
  } = useOTPStore();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    return digits;

    /*  // Format as +1 (XXX) XXX-XXXX for US numbers
    if (digits.length <= 1) return digits;
    if (digits.length <= 4) return `+90 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+90 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`; */
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    clearError();
  };

  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.startsWith("9");
  };

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid US phone number");
      return;
    }

    setSendingOTP(true);
    clearError();

    try {
      const result = await vonageService.sendOTP(
        phoneNumber.replace(/\D/g, "")
      );

      if (result.status === "0") {
        setRequestId(result.request_id);
        onSendCode();
      } else {
        setError(result.error_text || "Failed to send verification code");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
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
              <Box className="bg-primary-500 p-4 rounded-full">
                <Text className="text-white text-2xl font-bold">📱</Text>
              </Box>
              <Heading size="xl" className="text-typography-900 text-center">
                Enter Your Phone Number
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                We'll send you a verification code to confirm your identity
              </Text>
            </VStack>

            {/* Content Section */}
            <VStack space="lg">
              {error && (
                <Alert action="error" variant="solid">
                  <AlertIcon />
                  <AlertText>{error}</AlertText>
                </Alert>
              )}

              <VStack space="sm">
                <Text className="text-typography-700 text-sm font-medium">
                  Phone Number
                </Text>
                <Input>
                  <InputField
                    placeholder="+90 (555) 123-4567"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                </Input>
                <Text className="text-typography-500 text-xs">
                  Enter your Turkish phone number with country code
                </Text>
              </VStack>

              <Button
                size="lg"
                action="primary"
                variant="solid"
                onPress={handleSendCode}
                disabled={!phoneNumber || isSendingOTP}
              >
                {isSendingOTP ? (
                  <HStack space="sm" className="items-center">
                    <Spinner size="small" color="white" />
                    <ButtonText>Sending Code...</ButtonText>
                  </HStack>
                ) : (
                  <ButtonText>SEND VERIFICATION CODE</ButtonText>
                )}
              </Button>

              <VStack space="xs" className="items-center">
                <Text className="text-typography-500 text-xs text-center">
                  By continuing, you agree to receive SMS messages
                </Text>
                <Text className="text-typography-400 text-xs text-center">
                  Standard message and data rates may apply
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
