import React, { useRef, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import { Pressable } from '@/components/ui/pressable';
import { useOTPStore } from '../stores/otpStore';
import vonageService from '../services/vonageService';

interface OTPScreenProps {
  onVerifySuccess: () => void;
  onBack: () => void;
}

export default function OTPScreen({ 
  onVerifySuccess, 
  onBack
}: OTPScreenProps) {
  // Get state from Zustand store
  const {
    phoneNumber,
    otpCode,
    requestId,
    isVerifyingOTP,
    isSendingOTP,
    error,
    timeLeft,
    canResend,
    updateOtpDigit,
    clearOtpCode,
    setVerifyingOTP,
    setSendingOTP,
    setError,
    clearError,
    setTimeLeft,
    setCanResend,
  } = useOTPStore();
  
  const inputRefs = useRef<(any | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    updateOtpDigit(index, value);
    clearError();

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    if (!requestId) {
      setError('No verification request found. Please go back and try again.');
      return;
    }

    setVerifyingOTP(true);
    clearError();

    try {
      const result = await vonageService.verifyOTP(requestId, code);

      if (result.status === '0') {
        onVerifySuccess();
      } else {
        setError(result.error_text || 'Invalid verification code');
        clearOtpCode();
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
      clearOtpCode();
      inputRefs.current[0]?.focus();
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendCode = async () => {
    setSendingOTP(true);
    clearError();

    try {
      const result = await vonageService.sendOTP(phoneNumber);

      if (result.status === '0') {
        setTimeLeft(300);
        setCanResend(false);
        clearOtpCode();
        inputRefs.current[0]?.focus();
      } else {
        setError(result.error_text || 'Failed to resend code');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setSendingOTP(false);
    }
  };

  return (
    <Box className="flex-1 bg-background-0 justify-center p-6">
      <Center>
        <Card className="max-w-96 w-full bg-white rounded-xl shadow-lg p-6" size="lg" variant="elevated">
          <VStack space="lg">
            {/* Header Section */}
            <VStack space="md" className="items-center">
              <Box className="bg-primary-500 p-4 rounded-full">
                <Text className="text-white text-2xl font-bold">
                  🔐
                </Text>
              </Box>
              <Heading size="xl" className="text-typography-900 text-center">
                Verify Your Code
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                Enter the 6-digit code sent to
              </Text>
              <Text className="text-primary-500 text-sm font-semibold">
                {phoneNumber}
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
                <Text className="text-typography-700 text-sm font-medium text-center">
                  Verification Code
                </Text>
                <HStack space="sm" className="justify-center">
                  {otpCode.map((digit, index) => (
                    <Input key={index} className="w-12 h-12">
                      <InputField
                        ref={(ref) => { inputRefs.current[index] = ref; }}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        className={`text-lg font-bold ${digit ? 'border-primary-500' : 'border-border-300'}`}
                      />
                    </Input>
                  ))}
                </HStack>
              </VStack>

              <VStack space="md">
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  onPress={handleVerifyOTP}
                  disabled={otpCode.join('').length !== 6 || isVerifyingOTP}
                >
                  {isVerifyingOTP ? (
                    <HStack space="sm" className="items-center">
                      <Spinner size="small" color="white" />
                      <ButtonText>Verifying...</ButtonText>
                    </HStack>
                  ) : (
                    <ButtonText>VERIFY CODE</ButtonText>
                  )}
                </Button>

                <VStack space="xs" className="items-center">
                  <Text className="text-typography-500 text-xs text-center">
                    Code expires in {formatTime(timeLeft)}
                  </Text>
                  
                  {canResend ? (
                    <Pressable onPress={handleResendCode} disabled={isSendingOTP}>
                      <Text className="text-primary-500 text-sm font-medium">
                        {isSendingOTP ? 'Sending...' : 'Resend Code'}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text className="text-typography-400 text-sm">
                      Resend code in {formatTime(timeLeft)}
                    </Text>
                  )}
                </VStack>

                <Button
                  size="sm"
                  variant="outline"
                  action="primary"
                  onPress={onBack}
                  disabled={isVerifyingOTP || isSendingOTP}
                >
                  <ButtonText>Change Phone Number</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
