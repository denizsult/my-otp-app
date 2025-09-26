import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useOTPVerification } from "../hooks/useOTPVerification";
import { OTPHeader } from "../components/OTPHeader";
import { OTPInput } from "../components/OTPInput";
import { OTPActions } from "../components/OTPActions";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useOTPStore } from "../stores/otpStore";
import { useCustomToast } from "../hooks/useCustomToast";

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, "OTP">;

export default function OTPScreen() {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const { reset, setOtpCode } = useOTPStore();
  const { handleVerifyOTP, handleResendCode } = useOTPVerification();
  const toast = useCustomToast();

  const onVerify = () => handleVerifyOTP(() => navigation.navigate("Success"));

  return (
    <Box className="flex-1 bg-background-0 justify-center p-6">
      <Center>
        <Card
          className="max-w-96 w-full bg-white rounded-xl shadow-lg p-6"
          size="lg"
          variant="elevated"
        >
          <VStack space="lg">
            <OTPHeader />
            <VStack space="lg">
              <OTPInput />
              <OTPActions
                onVerifyOTP={onVerify}
                onResendCode={handleResendCode}
                onBack={() => {
                  reset();
                  navigation.navigate("Phone");
                }}
              />
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
